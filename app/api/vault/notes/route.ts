import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  try {
    const vaultDir = process.env.VAULT_DIR || '/home/azzaroth/vault'
    const fs = require('fs')
    const path = require('path')
    
    const notes: any[] = []
    
    const scanDirectory = (dir: string, relativePath: string = ''): void => {
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
              content: text.substring(0, 300), // First 300 chars for preview
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
  } catch (error) {
    console.error('Notes API Error:', error)
    return NextResponse.json({ 
      error: 'Failed to load notes',
      details: String(error)
    }, { status: 500 })
  }
}
