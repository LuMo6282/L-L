'use client'

import { motion } from 'framer-motion'

// Love notes - customize these with your own messages
const loveNotes = [
  {
    id: 1,
    note: "You make every ordinary day feel extraordinary. Thank you for being you.",
    from: "L",
  },
  {
    id: 2,
    note: "In a world full of chaos, you're my calm. I love you more than words can say.",
    from: "L",
  },
  {
    id: 3,
    note: "Three years ago, I found my forever. Every day with you proves I made the right choice.",
    from: "L",
  },
]

export default function LoveNotes() {
  return (
    <section id="notes" className="py-24 gradient-romantic">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-dustyRose text-sm tracking-widest uppercase">From The Heart</span>
          <h2 className="text-4xl md:text-5xl font-serif text-charcoal mt-4 mb-6">
            Love Notes
          </h2>
          <p className="text-warmGray max-w-xl mx-auto">
            Little reminders of how much you mean to me.
          </p>
        </motion.div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {loveNotes.map((note, index) => (
            <motion.div
              key={note.id}
              initial={{ opacity: 0, y: 30, rotate: -2 + index * 2 }}
              whileInView={{ opacity: 1, y: 0, rotate: -2 + index * 2 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              whileHover={{
                scale: 1.05,
                rotate: 0,
                boxShadow: '0 20px 40px rgba(139, 126, 116, 0.15)'
              }}
              className="bg-white p-8 rounded-lg shadow-md relative"
              style={{ transform: `rotate(${-2 + index * 2}deg)` }}
            >
              {/* Quote mark */}
              <span className="absolute top-4 left-4 text-5xl text-rose/30 font-serif leading-none">
                "
              </span>

              {/* Note content */}
              <p className="text-charcoal font-serif text-lg leading-relaxed pt-8 pb-4 italic">
                {note.note}
              </p>

              {/* Signature */}
              <div className="flex items-center justify-end">
                <span className="text-dustyRose text-xl font-serif">— {note.from}</span>
              </div>

              {/* Decorative tape effect */}
              <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-rose/40 rounded-sm" />
            </motion.div>
          ))}
        </div>

        {/* Anniversary Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-20"
        >
          <div className="inline-block bg-white/70 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-rose/20">
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-5xl block mb-6"
            >
              💕
            </motion.span>
            <h3 className="text-2xl md:text-3xl font-serif text-charcoal mb-4">
              Happy 3rd Anniversary
            </h3>
            <p className="text-warmGray max-w-md mx-auto leading-relaxed">
              To three years of laughter, love, and endless memories.
              Here's to many more adventures together.
            </p>
            <p className="text-dustyRose font-serif text-lg mt-6 italic">
              Forever yours ♥
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
