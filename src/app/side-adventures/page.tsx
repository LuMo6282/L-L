'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { sideAdventures, MiniCategory, Memory } from '@/data/categories'

export default function SideAdventuresPage() {
  const [selectedCategory, setSelectedCategory] = useState<MiniCategory | null>(null)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  const categoryIcons: Record<string, string> = {
    'date-nights': '🍽️',
    'hiking': '🥾',
    'cooking': '👨‍🍳',
    'holidays': '🎄',
    'pets': '🐕',
    'random': '🎲',
  }

  return (
    <main>
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden gradient-warm">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, var(--dusty-rose) 1px, transparent 0)`,
            backgroundSize: '30px 30px'
          }} />
        </div>

        <div className="relative z-10 text-center px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--charcoal)]/70 hover:text-[var(--charcoal)] transition-colors mb-6"
            >
              <span>←</span>
              <span>Back home</span>
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl md:text-7xl font-serif text-[var(--charcoal)] mb-4"
          >
            Side Adventures
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-[var(--warm-gray)] italic max-w-2xl mx-auto"
          >
            The little moments that make our everyday life extraordinary
          </motion.p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sideAdventures.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                onClick={() => setSelectedCategory(category)}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow border border-[var(--rose)]/10">
                  {/* Icon */}
                  <div className="text-5xl mb-4">
                    {categoryIcons[category.id] || '📸'}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-serif text-[var(--charcoal)] mb-2 group-hover:text-[var(--dusty-rose)] transition-colors">
                    {category.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[var(--warm-gray)] text-sm mb-4">
                    {category.description}
                  </p>

                  {/* Memory count */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-[var(--dusty-rose)]">
                      {category.memories.length > 0
                        ? `${category.memories.length} memories`
                        : 'Coming soon'}
                    </span>
                    <span className="text-[var(--warm-gray)] group-hover:text-[var(--dusty-rose)] group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add your own prompt */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-16 p-8 bg-[var(--blush)]/30 rounded-2xl"
          >
            <p className="text-[var(--warm-gray)] mb-4">
              Want to add more mini categories?
            </p>
            <p className="text-sm text-[var(--warm-gray)]/70">
              Edit the <code className="bg-white px-2 py-1 rounded">sideAdventures</code> array in{' '}
              <code className="bg-white px-2 py-1 rounded">src/data/categories.ts</code>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Detail Modal */}
      <AnimatePresence>
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCategory(null)}
            className="fixed inset-0 bg-[var(--charcoal)]/80 z-50 flex items-center justify-center p-6 cursor-pointer overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-[var(--cream)] rounded-2xl overflow-hidden shadow-2xl cursor-default my-8"
            >
              {/* Header */}
              <div className="p-8 bg-gradient-to-r from-[var(--blush)] to-[var(--rose)]/30 border-b border-[var(--rose)]/20">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">
                    {categoryIcons[selectedCategory.id] || '📸'}
                  </span>
                  <div>
                    <h2 className="text-3xl font-serif text-[var(--charcoal)]">
                      {selectedCategory.title}
                    </h2>
                    <p className="text-[var(--warm-gray)]">
                      {selectedCategory.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {selectedCategory.memories.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {selectedCategory.memories.map((memory) => (
                      <motion.div
                        key={memory.id}
                        whileHover={{ scale: 1.05 }}
                        onClick={() => setSelectedMemory(memory)}
                        className="aspect-square rounded-lg overflow-hidden bg-[var(--blush)] cursor-pointer shadow-sm"
                      >
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-3xl opacity-30">📷</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <span className="text-6xl mb-4 block">
                      {categoryIcons[selectedCategory.id] || '📸'}
                    </span>
                    <h3 className="text-xl font-serif text-[var(--charcoal)] mb-2">
                      No memories yet
                    </h3>
                    <p className="text-[var(--warm-gray)] text-sm">
                      Add photos to this category to see them here
                    </p>
                  </div>
                )}
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedCategory(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--charcoal)] hover:bg-white transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Memory Lightbox */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 bg-[var(--charcoal)]/95 z-[60] flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-[var(--cream)] rounded-2xl overflow-hidden"
            >
              <div className="aspect-video bg-[var(--blush)] flex items-center justify-center">
                <span className="text-8xl opacity-30">📷</span>
              </div>
              {selectedMemory.caption && (
                <div className="p-6 text-center">
                  <p className="text-[var(--charcoal)] font-serif text-xl">
                    {selectedMemory.caption}
                  </p>
                </div>
              )}
              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-[var(--charcoal)]"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  )
}
