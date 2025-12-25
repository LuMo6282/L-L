'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Category } from '@/data/categories'

interface CategoryCardProps {
  category: Category
  index: number
}

export default function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/trips/${category.slug}`}>
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="group relative aspect-[4/5] rounded-2xl overflow-hidden cursor-pointer shadow-lg"
        >
          {/* Background - placeholder gradient until image is added */}
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${category.color}40 0%, ${category.color} 100%)`
            }}
          >
            {/* Placeholder icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-6xl opacity-30">✈️</span>
            </div>

            {/* Uncomment when you have actual images:
            <Image
              src={category.coverImage}
              alt={category.title}
              fill
              className="object-cover"
            />
            */}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--charcoal)]/80 via-[var(--charcoal)]/20 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
            {/* Date badge */}
            <span className="inline-block self-start px-3 py-1 mb-3 text-xs tracking-wider uppercase bg-white/20 backdrop-blur-sm rounded-full">
              {category.date}
            </span>

            {/* Title */}
            <h3 className="text-2xl font-serif mb-1 group-hover:text-[var(--rose)] transition-colors">
              {category.title}
            </h3>

            {/* Subtitle */}
            <p className="text-white/80 text-sm mb-2">
              {category.subtitle}
            </p>

            {/* View more indicator */}
            <motion.div
              className="flex items-center gap-2 text-sm text-white/60 group-hover:text-white transition-colors"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              <span>View memories</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </motion.div>
          </div>

          {/* Decorative corner */}
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-white/30 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </Link>
    </motion.div>
  )
}
