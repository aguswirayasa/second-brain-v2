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
  const path = require('path')
  for (const dir of candidates) {
    try {
      if (fs.existsSync(dir) && fs.readdirSync(dir).some((f: string) => f.endsWith('.md') || fs.statSync(path.join(dir, f)).isDirectory())) {
        return dir
      }
    } catch {
      // ignore unreadable candidate
    }
  }
  for (const dir of candidates) {
    try { if (fs.existsSync(dir)) return dir } catch { /* ignore */ }
  }
  return process.env.VAULT_DIR || '/home/azzaroth/vault'
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const endpoint = url.searchParams.get('endpoint')
    
    const vaultDir = resolveVaultDir()
    
    if (endpoint === 'notes') {
      return handleNotes(vaultDir)
    }
    
    return NextResponse.json({ error: 'Invalid endpoint' }, { status: 400 })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function handleNotes(vaultDir: string) {
  const fs = require('fs')
  const path = require('path')
  
  const notes: Array<{ id: string; stem: string; folder: string; title: string; content: string }> = []
  
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
          
          notes.push({
            id: relativePath ? `${relativePath}/${file.replace('.md', '')}` : file.replace('.md', ''),
            stem: file.replace('.md', ''),
            folder: relativePath || '/',
            title,
            content: text.substring(0, 200), // First 200 chars
          })
        }
      }
    } catch (err) {
      console.error(`Error scanning ${dir}:`, err)
    }
  }
  
  if (fs.existsSync(vaultDir)) {
    scanDirectory(vaultDir)
  }
  
  return NextResponse.json(notes.sort((a, b) => a.title.localeCompare(b.title)))
}
