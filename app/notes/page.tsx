"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { BookOpen, Tag, Search } from 'lucide-react'

interface Note {
  id: string
  title: string
  folder: string
  content: string
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)

  useEffect(() => {
    // Load vault notes
    const loadNotes = async () => {
      try {
        const response = await fetch("/api/vault/notes")
        const data = await response.json()
        setNotes(data || [])
      } catch (error) {
        console.error("Failed to load notes:", error)
      }
    }
    
    loadNotes()
  }, [])

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.folder.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gothic-black via-gothic-dark to-gothic-darker p-4 pb-24 lg:pb-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-8"
      >
        <h1 className="font-serif text-5xl md:text-7xl mb-4 gold-text text-center tracking-tight">
          Sanctuary of Knowledge
        </h1>
        
        <p className="text-lg text-silver-500 text-center max-w-2xl mx-auto mb-8">
          Your personal collection of thoughts, ideas, and discoveries
        </p>

        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search your sanctuary..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 pl-14 bg-gothic-surface border-2 border-gothic-border 
                       rounded-xl text-white placeholder-silver-500
                       focus:border-gold-antique focus:outline-none focus:ring-2 
                       focus:ring-gold-antique/20 transition-all duration-300"
          />
          <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gold-antique">
            <Search size={20} />
          </div>
        </div>
      </motion.div>

      {/* Content Area - Desktop: Split View, Mobile: Detail on Selection */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Notes List */}
        <div className="space-y-3">
          {filteredNotes.length === 0 ? (
            <div className="panel-gothic text-center py-12">
              <BookOpen className="mx-auto text-silver-500 mb-4" size={48} />
              <p className="text-silver-500">
                {searchTerm ? "No notes match your search" : "Your sanctuary is empty"}
              </p>
            </div>
          ) : (
            filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: Math.min(index * 0.05, 0.3) }}
                whileHover={{ scale: 1.02, x: 4 }}
                onClick={() => setSelectedNote(note)}
                className={`card-gothic p-6 cursor-pointer transition-all duration-300 ${
                  selectedNote?.id === note.id 
                    ? 'border-gold-antiente shadow-lg shadow-gold-antique/20' 
                    : ''
                }`}
              >
                <h3 className="text-xl font-semibold mb-2 hover:text-crimson-400 transition-colors">
                  {note.title}
                </h3>
                
                <p className="text-silver-400 text-sm line-clamp-2 leading-relaxed mb-4">
                  {note.content}
                </p>
                
                <div className="flex items-center gap-4 text-xs text-silver-600">
                  <span className="flex items-center gap-1">
                    <Tag size={12} />
                    {note.folder}
                  </span>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Selected Note Detail (Desktop: Always visible, Mobile: Conditional) */}
        <div className="hidden lg:block">
          {selectedNote ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="card-gothic p-8 h-fit sticky top-24"
            >
              <h2 className="font-serif text-3xl mb-4 gold-text">{selectedNote.title}</h2>
              
              <div className="ornament-divider my-6" />

              <div className="prose prose-invert max-w-none">
                <pre className="whitespace-pre-wrap text-silver-300 leading-relaxed font-light">
                  {selectedNote.content}
                </pre>
              </div>

              <div className="mt-8 pt-6 border-t border-gothic-border flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-silver-500">
                  <BookOpen size={16} />
                  <span>{selectedNote.folder}</span>
                </div>
                <Link 
                  href={`/graph?note=${encodeURIComponent(selectedNote.id)}`}
                  className="text-gold-antique hover:text-gold-muted transition-colors"
                >
                  View in graph →
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="panel-gothic h-fit sticky top-24 min-h-[400px] flex items-center justify-center">
              <div className="text-center text-silver-500">
                <BookOpen className="mx-auto mb-4" size={48} />
                <p>Select a note to read</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Single-View Mode */}
      <div className="lg:hidden mt-6">
        {selectedNote && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-gothic p-6"
          >
            <button
              onClick={() => setSelectedNote(null)}
              className="flex items-center gap-2 text-silver-500 hover:text-gold-antient mb-6"
            >
              ← Back to list
            </button>

            <h2 className="font-serif text-3xl mb-4 gold-text">{selectedNote.title}</h2>
            
            <div className="ornament-divider my-6" />

            <div className="prose prose-invert max-w-none">
              <pre className="whitespace-pre-wrap text-silver-300 leading-relaxed">
                {selectedNote.content}
              </pre>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
