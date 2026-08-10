import { NextResponse } from "next/server"

export function GET() {
  return NextResponse.redirect(new URL("/api/vault/graph", "http://localhost"))
}

export const dynamic = "force-dynamic"
export const runtime = "nodejs"
