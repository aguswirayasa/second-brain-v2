import "./globals.css"
import type { Metadata } from "next"
import RootShell from "@/components/RootShell"

export const metadata: Metadata = {
  title: "Second Brain — Sanctuary of Knowledge",
  description: "Navigate your interconnected thoughts in the dark sanctuary",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootShell>{children}</RootShell>
      </body>
    </html>
  )
}
