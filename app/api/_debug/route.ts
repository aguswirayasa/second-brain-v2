import { NextResponse } from 'next/server'

export async function GET() {
  const fs = require('fs')
  const probe = (p: string) => {
    try {
      const st = fs.statSync(p)
      if (st.isDirectory()) {
        return { exists: true, isDir: true, entries: fs.readdirSync(p).slice(0, 20) }
      }
      return { exists: true, isDir: false }
    } catch (e: any) {
      return { exists: false, error: e.code }
    }
  }
  const root = fs.readdirSync('/').slice(0, 40)
  return NextResponse.json({
    cwd: process.cwd(),
    VAULT_DIR: process.env.VAULT_DIR,
    rootEntries: root,
    vault: probe('/vault'),
    homeAzzarothVault: probe('/home/azzaroth/vault'),
    appVault: probe('/app/vault'),
    homeAzzaroth: probe('/home/azzaroth'),
  })
}
