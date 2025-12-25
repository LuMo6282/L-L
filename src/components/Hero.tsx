'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-warm"
    >
      {/* Decorative floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-20"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
            }}
          >
            ♥
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        {/* Anniversary Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-block mb-8"
        >
          <span className="px-6 py-2 rounded-full bg-white/50 text-warmGray text-sm tracking-widest uppercase backdrop-blur-sm border border-rose/30">
            Celebrating 3 Years
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-6xl md:text-8xl font-serif text-charcoal mb-6"
        >
          L <span className="text-dustyRose">&</span> L
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl text-warmGray font-light mb-4"
        >
          Our Love Story
        </motion.p>

        {/* Date */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg text-dustyRose font-serif italic mb-12"
        >
          December 2021 — Forever
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-warmGray max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          A collection of our most cherished moments, adventures, and the little things
          that make our journey together so beautiful.
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href="#timeline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 10px 40px rgba(212, 165, 165, 0.3)' }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-8 py-4 bg-dustyRose text-white rounded-full font-medium
                     transition-all duration-300 hover:bg-warmGray cursor-pointer"
        >
          Explore Our Journey
        </motion.a>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-warmGray/50 flex items-start justify-center p-2"
          >
            <motion.div className="w-1 h-2 bg-warmGray/50 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
