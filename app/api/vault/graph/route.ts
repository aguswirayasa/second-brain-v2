import { NextResponse } from 'next/server'

// Resolve the vault directory: honor VAULT_DIR, but fall back through
// common Coolify mount points and pick the one that actually contains notes.
function resolveVaultDir(): string {
  const candidates = [
    process.env.VAULT_DIR,
    '/vault',
    '/home/azzaroth/vault',
    '/app/vault',
  ].filter(Boolean) as string[]

  const fs = require('fs')
  for (const dir of candidates) {
    try {
      if (fs.existsSync(dir) && fs.readdirSync(dir).some((f: string) => f.endsWith('.md') || fs.statSync(require('path').join(dir, f)).isDirectory())) {
        return dir
      }
    } catch {
      // ignore unreadable candidate
    }
  }
  // Fall back to the first existing candidate, else the default.
  for (const dir of candidates) {
    try { if (fs.existsSync(dir)) return dir } catch { /* ignore */ }
  }
  return process.env.VAULT_DIR || '/home/azzaroth/vault'
}

// Helper function to scan markdown files
function scanVault(vaultDir: string) {
  const fs = require('fs')
  const path = require('path')
  
  const notes: any[] = []
  
  function scanDirectory(dir: string, relativePath: string = '') {
    try {
      const files = fs.readdirSync(dir)
      
      for (const file of files) {
        const filePath = path.join(dir, file)
        const stats = fs.statSync(filePath)
        
        if (stats.isDirectory()) {
          scanDirectory(filePath, path.join(relativePath, file))
        } else if (file.endsWith('.md')) {
          const text = fs.readFileSync(filePath, 'utf-8')
          const titleMatch = text.match(/^# (.+)$/m)
          const title = titleMatch ? titleMatch[1].trim() : file.replace('.md', '')
          
          // Extract links using regex
          const linkRegex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
          const rawLinks: string[] = []
          let match: RegExpExecArray | null
          
          while ((match = linkRegex.exec(text)) !== null) {
            const target = match[1].trim()
            rawLinks.push(target)
          }
          
          notes.push({
            id: relativePath ? `${relativePath}/${file.replace('.md', '')}` : file.replace('.md', ''),
            stem: file.replace('.md', ''),
            folder: relativePath || '/',
            title,
            text,
            rawLinks,
          })
        }
      }
    } catch (error) {
      console.error(`Error scanning directory ${dir}:`, error)
    }
  }
  
  if (fs.existsSync(vaultDir)) {
    scanDirectory(vaultDir)
  }
  
  return notes
}

// Resolve links to node IDs
function resolveLink(target: string, notes: any[]) {
  const t = target.trim().toLowerCase()
  
  // Exact match
  const exactMatch = notes.find(n => n.stem.toLowerCase() === t)
  if (exactMatch) return exactMatch.id
  
  // Slug match
  const slugMatch = notes.find(n => {
    const slug = n.stem.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    return slug === t
  })
  
  return slugMatch ? slugMatch.id : null
}

export async function GET(request: Request) {
  try {
    const vaultDir = resolveVaultDir()
    const notes = scanVault(vaultDir)
    
    // Build nodes with gothic styling
    const nodes = notes.map(n => ({
      id: n.id,
      label: n.title.length > 30 ? n.title.slice(0, 27) + '...' : n.title,
      title: `${n.title}${n.rawLinks.length === 0 ? '\n⚠️ Unlinked note' : ''}`,
      folder: n.folder,
      orphan: n.rawLinks.length === 0,
    }))
    
    // Build edges
    const edges: any[] = []
    const seen = new Set<string>()
    
    for (const note of notes) {
      for (const target of note.rawLinks) {
        const resolvedId = resolveLink(target, notes)
        if (resolvedId && resolvedId !== note.id) {
          const edgeKey = `${note.id}->${resolvedId}`
          if (!seen.has(edgeKey)) {
            seen.add(edgeKey)
            edges.push({ from: note.id, to: resolvedId })
          }
        }
      }
    }
    
    // Calculate backlink counts for sizing
    const inboundCounts: Record<string, number> = {}
    for (const edge of edges) {
      inboundCounts[edge.to] = (inboundCounts[edge.to] || 0) + 1
    }
    
    // Enhance nodes with size based on importance
    const enhancedNodes = nodes.map(n => ({
      ...n,
      size: n.orphan 
        ? 15 
        : Math.max(12, Math.min(35, 18 + (inboundCounts[n.id] || 0))),
    }))
    
    return NextResponse.json({
      nodes: enhancedNodes,
      edges,
    })
  } catch (error) {
    console.error('Graph API Error:', error)
    return NextResponse.json({ 
      error: 'Failed to load graph',
      details: String(error)
    }, { status: 500 })
  }
}
