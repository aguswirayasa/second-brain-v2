"use client"

import { motion } from "framer-motion"
import { Shield, Sparkles, Lock, Unlock, Zap, Book, Target } from 'lucide-react'

// Sample skills data - this will come from your API
const skillsData = [
  {
    id: 1,
    name: "AI Employee Management",
    description: "Manage and deploy AI employees using Hermes harness",
    icon: Shield,
    category: "Automation",
    acquired: true,
    level: "Master",
    xp: 8500,
    color: "from-crimson-rich to-crimson-blood"
  },
  {
    id: 2,
    name: "Second Brain Architecture",
    description: "Design and maintain knowledge graphs with wikilinks",
    icon: Book,
    category: "Knowledge",
    acquired: true,
    level: "Expert",
    xp: 7200,
    color: "from-gold-antique to-gold-muted"
  },
  {
    id: 3,
    name: "Agent Communication",
    description: "Configure Composio connectors for agent tool integration",
    icon: Sparkles,
    category: "Integration",
    acquired: true,
    level: "Advanced",
    xp: 5600,
    color: "from-silver-metallic to-silver-frost"
  },
  {
    id: 4,
    name: "Cloud Computer Setup",
    description: "Deploy agents on cloud infrastructure (Orgo/Hetzner/DigitalOcean)",
    icon: Target,
    category: "Infrastructure",
    acquired: false,
    level: "Unlocked",
    xp: 0,
    color: "from-gray-700 to-gray-900"
  },
  {
    id: 5,
    name: "Multi-Agent Orchestration",
    description: "Coordinate multiple AI agents in parallel workflows",
    icon: Zap,
    category: "Automation",
    acquired: false,
    level: "Locked",
    xp: 10000,
    color: "from-purple-900 to-purple-950"
  },
  {
    id: 6,
    name: "Voice Interface Design",
    description: "Create natural language interfaces for agents",
    icon: Shield,
    category: "Interface",
    acquired: false,
    level: "Locked",
    xp: 6000,
    color: "from-indigo-900 to-indigo-950"
  }
]

export default function SkillsSection() {
  const acquiredSkills = skillsData.filter(s => s.acquired)
  const lockedSkills = skillsData.filter(s => !s.acquired)

  return (
    <div className="min-h-screen pt-24 px-4 lg:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto mb-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-crimson-rich to-crimson-blood
                     border-4 border-gold-antique flex items-center justify-center
                     shadow-2xl shadow-crimson-rich/50"
        >
          <Sparkles size={40} className="text-white" />
        </motion.div>
        
        <h1 className="font-serif text-5xl md:text-7xl mb-4 gold-text">
          Acquired Abilities
        </h1>
        <p className="text-lg text-silver-500 max-w-2xl mx-auto">
          Your arsenal of powers mastered through dark studies and digital alchemy
        </p>
      </motion.div>

      {/* Acquired Skills */}
      <div className="max-w-6xl mx-auto mb-16">
        <h2 className="font-serif text-3xl mb-6 gold-text flex items-center gap-3">
          <Unlock className="text-gold-antique" size={32} />
          Mastered Techniques ({acquiredSkills.length})
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {acquiredSkills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(139, 0, 0, 0.3)"
                }}
                className="card-gothic overflow-hidden group cursor-pointer"
              >
                {/* Progress bar at top */}
                <div className="h-1 w-full bg-gothic-highlight">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(skill.xp / 10000) * 100}%` }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className={`h-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} 
                                   flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="text-white" size={32} />
                    </motion.div>
                    
                    <div className="text-right">
                      <div className="text-sm text-silver-500 mb-1">{skill.category}</div>
                      <div className="text-2xl font-bold gold-text">{skill.level}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold mb-2 group-hover:text-crimson-500 transition-colors">
                    {skill.name}
                  </h3>
                  
                  <p className="text-silver-400 mb-4 leading-relaxed">
                    {skill.description}
                  </p>

                  {/* XP Bar */}
                  <div className="bg-gothic-dark rounded-lg p-3">
                    <div className="flex justify-between text-xs mb-2">
                      <span className="text-silver-500">Experience</span>
                      <span className="gold-text">{skill.xp.toLocaleString()} / 10,000 XP</span>
                    </div>
                    <div className="h-2 bg-gothic-highlight rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-gradient-to-r ${skill.color}`}
                        style={{ width: `${(skill.xp / 10000) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Locked Skills */}
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl mb-6 text-silver-600 flex items-center gap-3">
          <Lock className="text-silver-600" size={32} />
          Forbidden Knowledge ({lockedSkills.length})
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lockedSkills.map((skill, index) => {
            const Icon = skill.icon
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                className="card-gothic opacity-60 grayscale hover:opacity-100 hover:grayscale-0 
                           transition-all duration-300 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-50`} />
                
                <div className="relative p-6">
                  <div className="absolute top-4 right-4 bg-gothic-black/80 px-3 py-1 rounded-full">
                    <div className="flex items-center gap-2 text-silver-500">
                      <Lock size={16} />
                      <span className="text-sm font-medium">{skill.level}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${skill.color} 
                                    flex items-center justify-center opacity-50`}>
                      <Icon className="text-white" size={32} />
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-silver-400 mb-2">
                    {skill.name}
                  </h3>
                  
                  <p className="text-silver-600 mb-4">
                    {skill.description}
                  </p>

                  <div className="text-sm text-silver-500">
                    Requires {skill.xp.toLocaleString()} XP to unlock
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
