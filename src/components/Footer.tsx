'use client'

import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-cream py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-serif mb-4"
          >
            L <span className="text-dustyRose">&</span> L
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-warmGray text-center mb-6 italic"
          >
            "Two hearts, one love, endless memories"
          </motion.p>

          {/* Divider */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-dustyRose to-transparent mb-6" />

          {/* Heart animation */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            className="text-2xl mb-6"
          >
            ♥
          </motion.div>

          {/* Copyright */}
          <p className="text-warmGray/60 text-sm">
            Made with love • {currentYear}
          </p>

          {/* Anniversary date */}
          <p className="text-dustyRose/60 text-xs mt-2">
            Celebrating since December 2021
          </p>
        </div>
      </div>
    </footer>
  )
}
