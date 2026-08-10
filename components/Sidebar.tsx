"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Brain, BookOpen, Shield, Sparkles, Home, Settings, User } from 'lucide-react'

const navItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Brain, label: "Knowledge Graph", href: "/graph" },
  { icon: BookOpen, label: "Notes", href: "/notes" },
  { icon: Shield, label: "Skills", href: "/skills" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <motion.aside
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed left-0 top-0 h-full w-16 md:w-20 
                 bg-gothic-black/95 backdrop-blur-xl 
                 border-r-2 border-gothic-border 
                 z-50 flex flex-col items-center py-8
                 hidden lg:flex shadow-2xl"
    >
      {/* Gothic Maid Logo */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-crimson-rich to-crimson-blood
                   border-2 border-gold-antique flex items-center justify-center
                   mb-12 shadow-lg shadow-crimson-rich/30"
      >
        <span className="text-3xl">🖤</span>
      </motion.div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-4 px-2">
        {navItems.map((item, index) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item.href}
                className={`relative p-4 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-r from-crimson-rich to-crimson-blood text-white shadow-lg shadow-crimson-rich/50' 
                    : 'text-silver-500 hover:text-gold-antique hover:bg-gothic-highlight'
                }`}
              >
                <Icon size={24} />
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gold-antique rounded-l-full"
                  />
                )}
              </Link>
            </motion.div>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="flex flex-col gap-4 px-2 pb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 rounded-xl text-silver-500 hover:text-gold-antique hover:bg-gothic-highlight transition-all"
        >
          <Settings size={24} />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="p-4 rounded-xl text-silver-500 hover:text-gold-antique hover:bg-gothic-highlight transition-all"
        >
          <User size={24} />
        </motion.button>
      </div>
    </motion.aside>
  )
}
