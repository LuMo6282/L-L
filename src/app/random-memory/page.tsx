'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getAllMemoriesWithCategory, Memory, Category } from '@/data/categories'

interface MemoryWithCategory {
  memory: Memory
  category: Category
}

export default function RandomMemoryPage() {
  const [currentMemory, setCurrentMemory] = useState<MemoryWithCategory | null>(null)
  const [isShuffling, setIsShuffling] = useState(true)
  const [allMemories, setAllMemories] = useState<MemoryWithCategory[]>([])

  useEffect(() => {
    const memories = getAllMemoriesWithCategory()
    setAllMemories(memories)

    // Initial shuffle animation
    if (memories.length > 0) {
      let shuffleCount = 0
      const maxShuffles = 8
      const shuffleInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * memories.length)
        setCurrentMemory(memories[randomIndex])
        shuffleCount++

        if (shuffleCount >= maxShuffles) {
          clearInterval(shuffleInterval)
          setIsShuffling(false)
        }
      }, 150)

      return () => clearInterval(shuffleInterval)
    } else {
      setIsShuffling(false)
    }
  }, [])

  const shuffleMemory = () => {
    if (allMemories.length === 0) return

    setIsShuffling(true)
    let shuffleCount = 0
    const maxShuffles = 8

    const shuffleInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * allMemories.length)
      setCurrentMemory(allMemories[randomIndex])
      shuffleCount++

      if (shuffleCount >= maxShuffles) {
        clearInterval(shuffleInterval)
        setIsShuffling(false)
      }
    }, 150)
  }

  // No memories state
  if (!isShuffling && allMemories.length === 0) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8"
          >
            <span className="text-8xl">📸</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-serif text-white mb-4"
          >
            No Memories Yet
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white/50 mb-8 max-w-md mx-auto"
          >
            Add some photos to your trips to unlock the random memory feature!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back Home
            </Link>
          </motion.div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="fixed top-6 left-6 z-50"
      >
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm tracking-wider uppercase"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col lg:flex-row">
        {/* Photo Side */}
        <div className="lg:w-1/2 h-[50vh] lg:h-screen relative flex items-center justify-center p-6 lg:p-12">
          <AnimatePresence mode="wait">
            {currentMemory && (
              <motion.div
                key={currentMemory.memory.id}
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{
                  opacity: isShuffling ? 0.5 : 1,
                  scale: 1,
                  rotate: 0
                }}
                exit={{ opacity: 0, scale: 0.9, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="relative w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
              >
                {/* Photo placeholder with category color */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${currentMemory.category.color}40, ${currentMemory.category.color}20)` }}
                >
                  {currentMemory.memory.src ? (
                    <img
                      src={currentMemory.memory.src}
                      alt={currentMemory.memory.alt}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-6xl opacity-30">📷</span>
                  )}
                </div>

                {/* Shuffle overlay */}
                {isShuffling && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-black/50 flex items-center justify-center"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
                      className="text-4xl"
                    >
                      🎲
                    </motion.span>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
        </div>

        {/* Story Side */}
        <div className="lg:w-1/2 flex flex-col justify-center p-6 lg:p-12 xl:p-20">
          <AnimatePresence mode="wait">
            {currentMemory && !isShuffling && (
              <motion.div
                key={`story-${currentMemory.memory.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {/* Category Tag */}
                <Link href={`/trips/${currentMemory.category.slug}`}>
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    className="inline-block px-4 py-1 mb-6 text-xs tracking-widest uppercase rounded-full cursor-pointer"
                    style={{
                      background: `${currentMemory.category.color}30`,
                      color: currentMemory.category.color
                    }}
                  >
                    {currentMemory.category.title}
                  </motion.span>
                </Link>

                {/* Caption/Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-4 leading-tight">
                  {currentMemory.memory.caption || 'A Special Moment'}
                </h1>

                {/* Date */}
                {currentMemory.memory.date && (
                  <p className="text-white/40 text-sm tracking-wider uppercase mb-6">
                    {currentMemory.memory.date}
                  </p>
                )}

                {/* Story */}
                <div className="prose prose-invert max-w-none mb-8">
                  <p className="text-white/70 text-lg leading-relaxed">
                    {currentMemory.memory.story ||
                      "Every photo holds a story waiting to be told. Add a story to this memory to share what made this moment special."}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={shuffleMemory}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-pink-500/20 to-purple-500/20 hover:from-pink-500/30 hover:to-purple-500/30 border border-white/10 rounded-full text-white transition-all"
                  >
                    <span className="text-xl">🎲</span>
                    <span>Another Memory</span>
                  </motion.button>

                  <Link href={`/trips/${currentMemory.category.slug}`}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-white/70 hover:text-white transition-all"
                    >
                      <span>View Trip</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Loading state */}
          {isShuffling && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center lg:text-left"
            >
              <p className="text-white/50 text-lg">Finding a memory...</p>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}
