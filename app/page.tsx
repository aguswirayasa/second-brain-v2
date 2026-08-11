"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Brain, BookOpen, Shield, Sparkles, Home as HomeIcon, Tag } from 'lucide-react'

export default function Home() {
  const [nodes, setNodes] = useState<any[]>([])
  const [edges, setEdges] = useState<any[]>([])
  
  useEffect(() => {
    fetch("/api/vault/graph")
      .then((res) => res.json())
      .then((data) => {
        setNodes(data.nodes.map((n: any) => ({
          ...n,
          font: { 
            family: "Playfair Display", 
            color: "#d4af37",
            size: n.label.length > 40 ? 10 : 14
          },
          borderWidth: n.orphan ? 3 : 2,
          borderColor: n.orphan ? "#8b0000" : "#5c5221",
        })))
        setEdges(data.edges.map((e: any) => ({
          ...e,
          color: { color: "#5c5221", opacity: 0.4 },
          smooth: { type: "cubicBezier" },
        })))
      })
      .catch(console.error)
  }, [])

  const options = {
    nodes: {
      shape: "dot",
      size: 20,
      font: { family: "Playfair Display", color: "#d4af37" },
      borderWidth: 2,
      borderColor: "#5c5221",
      shadow: { enabled: true, color: "rgba(212, 175, 55, 0.3)", size: 10 },
    },
    edges: {
      color: { color: "#5c5221", opacity: 0.4 },
      width: 1,
      arrows: { to: { enabled: false } },
    },
    physics: {
      barnesHut: { 
        gravitationalConstant: -3000, 
        springLength: 150,
        springConstant: 0.04,
        damping: 0.09,
      },
      stabilization: { iterations: 100 },
    },
    interaction: { hover: true, dragNodes: true, zoomView: true },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gothic-black via-gothic-dark to-gothic-darker p-4 pb-24 lg:pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto mb-8"
      >
        <div className="ornament-divider my-8" />
        
        <h1 className="font-serif text-5xl md:text-7xl text-center mb-4 gold-text tracking-tight">
          Sanctuary of Knowledge
        </h1>
        
        <p className="text-lg text-silver-500 text-center max-w-2xl mx-auto mb-8">
          Navigate your interconnected thoughts in the dark sanctuary
        </p>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <StatCard icon="📄" count={nodes.length} label="Notes" delay={0} />
          <StatCard icon="🔗" count={edges.length} label="Connections" delay={0.1} />
          <StatCard icon="⚠️" count={nodes.filter(n => n.orphan).length} label="Orphans" delay={0.2} isWarning />
          <StatCard icon="❦" count={0} label="Status" delay={0.3} />
        </div>
      </motion.div>

      {/* Graph Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-7xl mx-auto min-h-[calc(100vh-400px)] lg:min-h-[600px]"
      >
        <div className="card-gothic p-2 lg:p-4 h-full relative overflow-hidden rounded-2xl bg-gradient-to-b from-gothic-card to-gothic-dark border-2 border-gothic-border shadow-2xl">
          
          {/* Background ornamentation */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute top-8 left-8 text-6xl gold-text transform -rotate-12">❧</div>
            <div className="absolute bottom-8 right-8 text-6xl gold-text transform rotate-12">❦</div>
            <div className="absolute top-1/2 left-1/4 text-4xl gold-text transform rotate-45">✦</div>
            <div className="absolute top-1/3 right-1/3 text-4xl gold-text transform -rotate-45">✦</div>
          </div>

          {!nodes.length && (
            <div className="flex flex-col items-center justify-center h-full text-silver-500">
              <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }} 
                className="text-6xl mb-4"
              >
                🕸️
              </motion.div>
              <p>Loading your sanctuary...</p>
            </div>
          )}

          {nodes.length > 0 && (
            <div className="relative grid min-h-[560px] grid-cols-2 gap-4 overflow-hidden rounded-xl bg-gothic-black/30 p-6 sm:grid-cols-3 lg:grid-cols-4">
              {nodes.slice(0, 24).map((node, index) => (
                <motion.div key={node.id} initial={{ opacity: 0, scale: .8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: Math.min(index * .03, .6) }} className={`rounded-xl border-2 p-4 shadow-lg ${node.orphan ? "border-crimson-blood bg-crimson-rich/30" : "border-gold-dim bg-gothic-surface/90"}`}>
                  <div className="mb-2 h-3 w-3 rounded-full bg-gold-antique shadow-[0_0_12px_#d4af37]" />
                  <div className="line-clamp-3 font-serif text-sm text-gold-antique">{node.label}</div>
                  <div className="mt-2 text-[10px] uppercase tracking-wider text-silver-600">{node.folder || "root"}</div>
                </motion.div>
              ))}
              <div className="absolute bottom-4 right-4 rounded-full border border-gold-dim bg-gothic-black/80 px-3 py-1 text-xs text-silver-500">{edges.length} connections</div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Legend & Categories */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-7xl mx-auto mt-8"
      >
        <div className="panel-gothic flex flex-wrap items-center justify-center gap-4 lg:gap-6 py-4 px-6">
          <CategoryBadge 
            color="#d4af37" 
            label="Root" 
            icon="⭐" 
            delay={0} 
          />
          <CategoryBadge 
            color="#58a6ff" 
            label="Concepts" 
            icon="💡" 
            delay={0.1} 
          />
          <CategoryBadge 
            color="#a371f7" 
            label="People" 
            icon="👤" 
            delay={0.2} 
          />
          <CategoryBadge 
            color="#3fb950" 
            label="Media" 
            icon="🎬" 
            delay={0.3} 
          />
          <CategoryBadge 
            color="#f85149" 
            label="Orphaned" 
            icon="⚠️" 
            delay={0.4} 
            isSpecial
          />
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-7xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <QuickActionCard 
          href="/notes"
          title="Browse Notes"
          description="Explore your collection"
          icon={BookOpen}
          color="from-crimson-rich to-crimson-blood"
        />
        <QuickActionCard 
          href="/skills"
          title="Acquired Skills"
          description="Track your abilities"
          icon={Shield}
          color="from-gold-antique to-gold-muted"
        />
      </motion.div>
    </div>
  )
}

function StatCard({ icon, count, label, delay, isWarning }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05 }}
      className={`panel-gothic ${isWarning ? 'border-gold-antique' : ''}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <div>
          <div className="text-2xl font-bold">{count.toLocaleString()}</div>
          <div className="text-xs text-silver-500 uppercase tracking-wide">{label}</div>
        </div>
      </div>
    </motion.div>
  )
}

function CategoryBadge({ color, label, icon, delay, isSpecial }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.1 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full cursor-pointer transition-all ${
        isSpecial ? 'bg-red-900/20 border-2 border-red-500/50' : 'bg-gothic-surface/50 border border-gothic-border'
      }`}
    >
      <div 
        className="w-3 h-3 rounded-full shadow-lg" 
        style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}60` }}
      />
      <span className="text-sm text-silver-400">{icon} {label}</span>
    </motion.div>
  )
}

function QuickActionCard({ href, title, description, icon: Icon, color }: any) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className={`panel-gothic group relative overflow-hidden`}
      >
        <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity`} />
        
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg`}>
            <Icon className="text-white" size={24} />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">{title}</h3>
            <p className="text-sm text-silver-400">{description}</p>
          </div>
          
          <div className="text-gold-antique transform group-hover:translate-x-1 transition-transform">
            →
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
