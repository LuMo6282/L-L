'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import CategoryCard from './CategoryCard'
import { categories } from '@/data/categories'

export default function CategoryGrid() {
  return (
    <section id="adventures" className="py-24 bg-[var(--cream)]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-[var(--dusty-rose)] text-sm tracking-widest uppercase">
            Our Travels
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--charcoal)] mt-4 mb-6">
            Adventures Together
          </h2>
          <p className="text-[var(--warm-gray)] max-w-2xl mx-auto">
            From mountain peaks to ocean shores, every destination becomes
            more beautiful when we explore it together.
          </p>
        </motion.div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}

          {/* Side Adventures Card - Special */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: categories.length * 0.1 }}
          >
            <Link href="/side-adventures">
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-lg bg-gradient-to-br from-[var(--blush)] to-[var(--rose)]"
              >
                {/* Pattern background */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, var(--dusty-rose) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                  }} />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center">
                  {/* Icon grid */}
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {['🍽️', '🥾', '🎄', '🐕', '🎬', '🎮'].map((emoji, i) => (
                      <motion.span
                        key={i}
                        className="text-2xl"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                      >
                        {emoji}
                      </motion.span>
                    ))}
                  </div>

                  <h3 className="text-2xl font-serif text-[var(--charcoal)] mb-2 group-hover:text-[var(--dusty-rose)] transition-colors">
                    Side Adventures
                  </h3>
                  <p className="text-[var(--warm-gray)] text-sm mb-4">
                    The little moments that make life special
                  </p>

                  {/* View more */}
                  <span className="text-sm text-[var(--dusty-rose)] group-hover:text-[var(--charcoal)] transition-colors">
                    Explore all →
                  </span>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-[var(--dusty-rose)]/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-[var(--dusty-rose)]/30 rounded-bl-lg opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
