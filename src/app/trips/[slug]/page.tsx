'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { getCategoryBySlug, categories, Memory } from '@/data/categories'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function TripPage() {
  const params = useParams()
  const slug = params.slug as string
  const category = getCategoryBySlug(slug)
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null)

  if (!category) {
    return (
      <main>
        <Navigation />
        <div className="min-h-screen flex items-center justify-center bg-[var(--cream)]">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-[var(--charcoal)] mb-4">Trip not found</h1>
            <Link href="/" className="text-[var(--dusty-rose)] hover:underline">
              ← Back to home
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  // Create placeholder photo slots (12 slots per trip)
  const photoSlots = Array.from({ length: 12 }, (_, i) => {
    const memory = category.memories[i]
    return memory || null
  })

  return (
    <main className="bg-[#1a1a1a] min-h-screen">
      <Navigation />

      {/* Hero Section - Full Width Image Placeholder */}
      <section className="relative h-[70vh] overflow-hidden">
        {/* Background gradient placeholder */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${category.color}60 0%, ${category.color}20 50%, #1a1a1a 100%)`
          }}
        />

        {/* Hero image placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white/30">
            <div className="text-8xl mb-4">📷</div>
            <p className="text-lg tracking-widest uppercase">Hero Image</p>
            <p className="text-sm mt-2 opacity-60">1920 x 1080 recommended</p>
          </div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent" />

        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute top-24 left-8 z-10"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm tracking-wider uppercase"
          >
            <span>←</span>
            <span>Back</span>
          </Link>
        </motion.div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span
              className="inline-block px-4 py-1 mb-4 text-xs tracking-widest uppercase rounded-full"
              style={{ background: `${category.color}40`, color: category.color }}
            >
              {category.date}
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-4">
              {category.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/60 italic max-w-xl">
              {category.subtitle}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16 px-8 md:px-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-white/70 text-lg md:text-xl max-w-3xl leading-relaxed"
        >
          {category.description}
        </motion.p>
      </section>

      {/* Photo Gallery Grid */}
      <section className="px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          {/* Gallery Layout - Masonry-style grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {/* Large Featured Photo - Spans 2 columns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="md:col-span-2 lg:col-span-2 row-span-2"
            >
              <div
                className="relative aspect-[16/10] rounded-2xl overflow-hidden cursor-pointer group"
                style={{ background: `${category.color}15` }}
              >
                {photoSlots[0] ? (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${photoSlots[0].src})` }} />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 group-hover:text-white/40 transition-colors">
                    <div className="text-6xl mb-3">📷</div>
                    <p className="text-sm tracking-widest uppercase">Featured Photo</p>
                    <p className="text-xs mt-1 opacity-60">Slot 1</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            </motion.div>

            {/* Vertical Photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="row-span-2"
            >
              <div
                className="relative aspect-[3/4] h-full rounded-2xl overflow-hidden cursor-pointer group"
                style={{ background: `${category.color}15` }}
              >
                {photoSlots[1] ? (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${photoSlots[1].src})` }} />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 group-hover:text-white/40 transition-colors">
                    <div className="text-5xl mb-3">📷</div>
                    <p className="text-sm tracking-widest uppercase">Portrait</p>
                    <p className="text-xs mt-1 opacity-60">Slot 2</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            </motion.div>

            {/* Standard Photos Row */}
            {[2, 3, 4].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
              >
                <div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                  style={{ background: `${category.color}15` }}
                >
                  {photoSlots[index] ? (
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${photoSlots[index]?.src})` }} />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 group-hover:text-white/40 transition-colors">
                      <div className="text-4xl mb-2">📷</div>
                      <p className="text-xs tracking-widest uppercase">Photo</p>
                      <p className="text-xs mt-1 opacity-60">Slot {index + 1}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              </motion.div>
            ))}

            {/* Wide Panorama Photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2"
            >
              <div
                className="relative aspect-[21/9] rounded-2xl overflow-hidden cursor-pointer group"
                style={{ background: `${category.color}15` }}
              >
                {photoSlots[5] ? (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${photoSlots[5].src})` }} />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 group-hover:text-white/40 transition-colors">
                    <div className="text-5xl mb-3">📷</div>
                    <p className="text-sm tracking-widest uppercase">Panorama</p>
                    <p className="text-xs mt-1 opacity-60">Slot 6</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            </motion.div>

            {/* Square Photo */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
            >
              <div
                className="relative aspect-square rounded-2xl overflow-hidden cursor-pointer group"
                style={{ background: `${category.color}15` }}
              >
                {photoSlots[6] ? (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${photoSlots[6].src})` }} />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 group-hover:text-white/40 transition-colors">
                    <div className="text-4xl mb-2">📷</div>
                    <p className="text-xs tracking-widest uppercase">Square</p>
                    <p className="text-xs mt-1 opacity-60">Slot 7</p>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
              </div>
            </motion.div>

            {/* More Standard Photos */}
            {[7, 8, 9, 10, 11].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * (index - 5) }}
              >
                <div
                  className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer group"
                  style={{ background: `${category.color}15` }}
                >
                  {photoSlots[index] ? (
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${photoSlots[index]?.src})` }} />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 group-hover:text-white/40 transition-colors">
                      <div className="text-4xl mb-2">📷</div>
                      <p className="text-xs tracking-widest uppercase">Photo</p>
                      <p className="text-xs mt-1 opacity-60">Slot {index + 1}</p>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add More Photos Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-white/30 text-sm">
              Add photos to <code className="bg-white/10 px-2 py-1 rounded text-xs">public/images/{category.slug}/</code>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Navigation to other trips */}
      <section className="py-20 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-8">
          <h3 className="text-center text-2xl font-serif text-white mb-10">
            More Adventures
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {categories
              .filter((c) => c.slug !== slug)
              .slice(0, 4)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/trips/${c.slug}`}
                  className="px-6 py-3 rounded-full text-white/70 hover:text-white border border-white/20 hover:border-white/40 hover:bg-white/5 transition-all"
                >
                  {c.title}
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMemory(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden cursor-default"
            >
              <div className="aspect-video relative flex items-center justify-center bg-white/5">
                {selectedMemory.type === 'video' && selectedMemory.videoUrl ? (
                  <iframe
                    src={selectedMemory.videoUrl}
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <img
                    src={selectedMemory.src}
                    alt={selectedMemory.alt}
                    className="max-w-full max-h-full object-contain"
                  />
                )}
              </div>

              {(selectedMemory.caption || selectedMemory.date) && (
                <div className="p-6 text-center bg-black/50">
                  {selectedMemory.caption && (
                    <h3 className="font-serif text-2xl text-white mb-2">
                      {selectedMemory.caption}
                    </h3>
                  )}
                  {selectedMemory.date && (
                    <p className="text-white/60">{selectedMemory.date}</p>
                  )}
                </div>
              )}

              <button
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
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
