'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Placeholder memories - you can replace these with your actual photos
const memories = [
  {
    id: 1,
    src: '/images/memory-1.jpg',
    alt: 'Our first date',
    caption: 'Our First Date',
    date: 'December 2021',
  },
  {
    id: 2,
    src: '/images/memory-2.jpg',
    alt: 'Beach sunset',
    caption: 'Beach Adventures',
    date: 'Summer 2022',
  },
  {
    id: 3,
    src: '/images/memory-3.jpg',
    alt: 'Cozy moments',
    caption: 'Cozy Moments',
    date: 'Winter 2022',
  },
  {
    id: 4,
    src: '/images/memory-4.jpg',
    alt: 'Road trip',
    caption: 'Road Trip Fun',
    date: 'Spring 2023',
  },
  {
    id: 5,
    src: '/images/memory-5.jpg',
    alt: 'Anniversary dinner',
    caption: 'Anniversary Celebrations',
    date: 'December 2023',
  },
  {
    id: 6,
    src: '/images/memory-6.jpg',
    alt: 'Adventure time',
    caption: 'New Adventures',
    date: '2024',
  },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<typeof memories[0] | null>(null)

  return (
    <section id="gallery" className="py-24 bg-blush/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-dustyRose text-sm tracking-widest uppercase">Our Collection</span>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mt-4 mb-6">
            Captured Memories
          </h2>
          <p className="text-warmGray max-w-2xl mx-auto">
            Every photograph tells a story of us — moments frozen in time,
            each one a treasure in our journey together.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memories.map((memory, index) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedImage(memory)}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-rose/20 shadow-lg">
                {/* Placeholder gradient - replace with actual images */}
                <div className="absolute inset-0 bg-gradient-to-br from-rose/40 to-dustyRose/60 flex items-center justify-center">
                  <span className="text-6xl opacity-50">♥</span>
                </div>

                {/* Uncomment when you have actual images:
                <Image
                  src={memory.src}
                  alt={memory.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                */}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent
                              opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full
                              group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-serif text-xl mb-1">{memory.caption}</h3>
                  <p className="text-white/80 text-sm">{memory.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add more photos CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-warmGray/70 text-sm italic">
            Add your photos to the /public/images folder to see them here
          </p>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-charcoal/90 z-50 flex items-center justify-center p-6 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-cream rounded-2xl overflow-hidden shadow-2xl cursor-default"
            >
              <div className="aspect-[4/3] relative bg-gradient-to-br from-rose/40 to-dustyRose/60 flex items-center justify-center">
                <span className="text-9xl opacity-30">♥</span>
                {/* Replace with actual image:
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                />
                */}
              </div>
              <div className="p-6 text-center">
                <h3 className="font-serif text-2xl text-charcoal mb-2">{selectedImage.caption}</h3>
                <p className="text-warmGray">{selectedImage.date}</p>
              </div>

              {/* Close button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full
                         flex items-center justify-center text-charcoal hover:bg-white/40 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
