"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Brain, BookOpen, Shield, Menu, X } from 'lucide-react'

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Brain, label: "Graph", href: "/graph" },
  { icon: BookOpen, label: "Notes", href: "/notes" },
  { icon: Shield, label: "Skills", href: "/skills" },
]

export default function MobileNav() {
  const pathname = usePathname()

  return (
    <>
      {/* Mobile Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 h-16 bg-gothic-black/95 backdrop-blur-xl 
                   border-b-2 border-gothic-border z-40 lg:hidden flex items-center justify-between px-4"
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
      </motion.header>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gothic-black/95 backdrop-blur-xl 
                      border-t-2 border-gothic-border z-40 lg:hidden pb-safe">
        <div className="flex items-center justify-around py-3">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            
            return (
              <motion.div
                key={item.href}
                whileTap={{ scale: 0.9 }}
                className={`relative p-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-gradient-to-r from-crimson-rich to-crimson-blood text-white shadow-lg shadow-crimson-rich/50' 
                    : 'text-silver-500 hover:text-gold-antique'
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

      {/* Overlay for when sidebar is open on mobile */}
      <MobileOverlay />
    </>
  )
}

function MobileOverlay() {
  return (
    <div className="lg:hidden hidden" id="mobile-overlay" />
  )
}
