"use client"

import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { Brain, BookOpen, Shield, Sparkles, Home, Settings, Menu, X } from "lucide-react"
import Sidebar from "./Sidebar"

const navItems = [
  { icon: Home, label: "Home", href: "/", tooltip: "Dashboard" },
  { icon: Brain, label: "Graph", href: "/graph", tooltip: "Knowledge Network" },
  { icon: BookOpen, label: "Notes", href: "/notes", tooltip: "Your Collection" },
  { icon: Shield, label: "Skills", href: "/skills", tooltip: "Acquired Abilities" },
]

export default function RootShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-gothic-darker text-white font-sans">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Navigation */}
      <MobileNav items={navItems} currentPath={pathname} />

      {/* Main Content Area */}
      <main className="lg:ml-20 xl:ml-24 pt-16 lg:pt-0 pb-16 lg:pb-0">
        {children}
      </main>
    </div>
  )
}

function MobileNav({ items, currentPath }: { items: typeof navItems; currentPath: string }) {
  return (
    <div className="lg:hidden">
      {/* Mobile Header */}
      <header
        className="fixed top-0 left-0 right-0 h-16 bg-gothic-black/95 backdrop-blur-xl
                   border-b-2 border-gothic-border z-40 flex items-center justify-between px-4"
      >
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 10 }}
            className="w-10 h-10 rounded-full bg-gradient-to-br from-crimson-rich to-crimson-blood
                       border-2 border-gold-antique flex items-center justify-center"
          >
            <span className="text-xl">🖤</span>
          </motion.div>

          <h1 className="font-serif text-xl gold-text">Second Brain</h1>
        </div>

        <button className="p-2 text-silver-500 hover:text-gold-antique">
          <Settings size={24} />
        </button>
      </header>

      {/* Bottom Navigation Bar */}
      <nav
        className="fixed bottom-0 left-0 right-0 bg-gothic-black/95 backdrop-blur-xl
                      border-t-2 border-gothic-border z-40 lg:hidden pb-safe"
      >
        <div className="flex items-center justify-around py-3 px-2">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = currentPath === item.href

            return (
              <motion.div
                key={item.href}
                whileTap={{ scale: 0.9 }}
                className={`relative p-3 rounded-xl transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-crimson-rich to-crimson-blood text-white shadow-lg shadow-crimson-rich/50"
                    : "text-silver-500 hover:text-gold-antique"
                }`}
              >
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />

                {isActive && (
                  <motion.div
                    layoutId="bottom-indicator"
                    className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gold-antique rounded-full"
                  />
                )}
              </motion.div>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
