'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

// Timeline milestones from your list
const milestones = [
  {
    id: 1,
    date: 'November 29, 2023',
    title: 'Washington',
    description: 'The day our story began.',
    link: '/memories/seattle',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607527/IMG_0614_lwyxfs.jpg',
  },
  {
    id: 2,
    date: 'January 20, 2024',
    title: 'Mexico',
    description: 'Our first international adventure together.',
    link: '/memories/mexico',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606903/IMG_0619_s1sdxw.jpg',
  },
  {
    id: 3,
    date: 'January 27, 2024',
    title: 'Tolo',
    description: 'A night to remember.',
    link: '/memories/formal#tolo',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606999/IMG_0475_emzphe.jpg',
  },
  {
    id: 4,
    date: 'February 20, 2024',
    title: 'Whistler',
    description: 'Snow-capped mountains and unforgettable moments.',
    link: '/memories/whistler',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766628280/IMG_0626_oz2ddu.jpg',
  },
  {
    id: 5,
    date: 'June 1, 2024',
    title: 'Prom',
    description: 'Dancing the night away.',
    link: '/memories/formal#prom',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607001/IMG_2777_ltlnsu.jpg',
  },
  {
    id: 6,
    date: 'June 8, 2024',
    title: 'Graduation',
    description: 'A milestone achieved together.',
    link: '/memories/graduation',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608102/IMG_4813_qflidx.jpg',
  },
  {
    id: 7,
    date: 'July 6, 2024',
    title: 'Another Summer Week',
    description: 'Music, adventure, and alpine beauty.',
    link: '/memories/another-summer-week',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607178/IMG_5885_r2xtlx.jpg',
    tripleImage: [
      'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607178/IMG_5885_r2xtlx.jpg',
      'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608197/IMG_3563_npambj.jpg',
      'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607756/IMG_6233_txmjej.jpg',
    ],
  },
  {
    id: 9,
    date: 'September 14, 2024',
    title: 'Sand Dunes',
    description: 'Endless sand under golden skies.',
    link: '/memories/sand-dunes',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766630342/IMG_0821_wetrog.jpg',
    imagePosition: 'center 70%',
  },
  {
    id: 12,
    date: 'October 3, 2024',
    title: 'Rise Festival',
    description: 'Lanterns lighting up the desert sky.',
    link: '/memories/rise-festival',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608223/IMG_0948_paf4mg.jpg',
  },
  {
    id: 13,
    date: 'December 7, 2024',
    title: 'Fall Formal \'25 - Telluride',
    description: 'Mountain elegance.',
    link: '/memories/formal#telluride-formal',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606964/IMG_0449_kcu8pg.jpg',
  },
  {
    id: 14,
    date: 'December 30, 2024',
    title: 'Alaska',
    description: 'The last frontier.',
    link: '/memories/alaska',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606657/IMG_0637_c5wlte.jpg',
  },
  {
    id: 15,
    date: 'March 19, 2025',
    title: 'Road Trip',
    description: 'Open roads and endless horizons.',
    link: '/memories/road-trip',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606596/IMG_0280_l2aeb1.jpg',
  },
  {
    id: 16,
    date: 'June 11, 2025',
    title: 'Europe',
    description: 'Adventures across the continent.',
    link: '/memories/europe',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606752/IMG_0758_qxmo30.jpg',
  },
]

// Places - locations without specific timeline dates
const places = [
  {
    id: 1,
    title: 'Whidbey',
    description: 'Island escapes and coastal memories.',
    link: '/memories/whidbey',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606469/IMG_5748_iht5zc.jpg',
  },
  {
    id: 2,
    title: 'Colorado',
    description: 'Mountain adventures in the Rockies.',
    link: '/memories/colorado',
    image: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607091/IMG_0636_k3ensl.jpg',
  },
]

export default function Timeline() {
  return (
    <section id="timeline" className="py-16 sm:py-24 bg-[#1a1d23]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="text-white/50 text-xs sm:text-sm tracking-widest uppercase">Our Journey</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mt-3 sm:mt-4 mb-4 sm:mb-6">
            Through The Years
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            Every moment with you has been a chapter in our beautiful story.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line - Desktop only */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-gradient-to-b from-white/20 via-white/10 to-white/20 hidden md:block" />

          {/* Mobile: Line on left side */}
          <div className="absolute left-[18px] top-0 w-px h-full bg-gradient-to-b from-white/20 via-white/10 to-white/20 md:hidden" />

          {/* Timeline Items - Mobile: stacked cards, Desktop: alternating absolute */}
          {/* Mobile view */}
          <div className="flex flex-col gap-5 md:hidden">
            {milestones.map((milestone) => (
              <motion.div
                key={milestone.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative pl-10 pr-2"
              >
                {/* Timeline dot - mobile */}
                <div className="absolute left-[14px] top-4 w-2 h-2 bg-white/40 rounded-full" />
                <Link href={milestone.link}>
                  <motion.div
                    whileHover={{ y: -3, scale: 1.01 }}
                    className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                  >
                    {/* Image */}
                    <div className="relative h-32 w-full bg-white/10 overflow-hidden">
                      {milestone.tripleImage ? (
                        <div className="absolute inset-0 flex overflow-hidden">
                          <div className="relative flex-1 h-full" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }}>
                            <Image
                              src={milestone.tripleImage[0]}
                              alt={`${milestone.title} - Odesza`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="relative flex-1 h-full -ml-[10%]" style={{ clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)' }}>
                            <Image
                              src={milestone.tripleImage[1]}
                              alt={`${milestone.title} - ATV`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="relative flex-1 h-full -ml-[10%]" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}>
                            <Image
                              src={milestone.tripleImage[2]}
                              alt={`${milestone.title} - Enchantments`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      ) : milestone.image && milestone.image !== '/placeholder-memory.jpg' ? (
                        <Image
                          src={milestone.image}
                          alt={milestone.title}
                          fill
                          className="object-cover"
                          style={{ objectPosition: milestone.imagePosition || 'center center' }}
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-white/30">
                          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-3">
                      <span className="text-white/40 text-xs font-medium tracking-wide">
                        {milestone.date}
                      </span>
                      <h3 className="text-base font-serif text-white mt-1 mb-1">
                        {milestone.title}
                      </h3>
                      <p className="text-white/50 leading-relaxed text-xs">
                        {milestone.description}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop view */}
          <div className="hidden md:block relative" style={{ minHeight: `${milestones.length * 180}px` }}>
            {milestones.map((milestone, index) => {
              const side = index % 2 === 0 ? 'left' : 'right'

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className={`absolute w-5/12 ${
                    side === 'left'
                      ? 'left-0 pr-8'
                      : 'left-auto right-0 pl-8'
                  }`}
                  style={{
                    top: `${index * 180}px`,
                  }}
                >
                  <Link href={milestone.link}>
                    <motion.div
                      whileHover={{ y: -3, scale: 1.01 }}
                      className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                    >
                      {/* Image - slightly smaller */}
                      <div className="relative h-40 w-full bg-white/10 overflow-hidden">
                        {milestone.tripleImage ? (
                          <div className="absolute inset-0 flex overflow-hidden">
                            <div className="relative flex-1 h-full" style={{ clipPath: 'polygon(0 0, 100% 0, 80% 100%, 0 100%)' }}>
                              <Image
                                src={milestone.tripleImage[0]}
                                alt={`${milestone.title} - Odesza`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="relative flex-1 h-full -ml-[10%]" style={{ clipPath: 'polygon(20% 0, 100% 0, 80% 100%, 0 100%)' }}>
                              <Image
                                src={milestone.tripleImage[1]}
                                alt={`${milestone.title} - ATV`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="relative flex-1 h-full -ml-[10%]" style={{ clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }}>
                              <Image
                                src={milestone.tripleImage[2]}
                                alt={`${milestone.title} - Enchantments`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          </div>
                        ) : milestone.image && milestone.image !== '/placeholder-memory.jpg' ? (
                          <Image
                            src={milestone.image}
                            alt={milestone.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            style={{ objectPosition: milestone.imagePosition || 'center center' }}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center text-white/30">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                      </div>

                      {/* Content - more compact */}
                      <div className="p-4">
                        <span className="text-white/40 text-xs font-medium tracking-wide">
                          {milestone.date}
                        </span>
                        <h3 className="text-lg md:text-xl font-serif text-white mt-1 mb-1 group-hover:text-white/90 transition-colors">
                          {milestone.title}
                        </h3>
                        <p className="text-white/50 leading-relaxed text-xs">
                          {milestone.description}
                        </p>
                        <div className="mt-3 flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors text-xs">
                          <span>View memories</span>
                          <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* End decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-white/40 italic font-serif">
            "And the adventure continues..."
          </p>
        </motion.div>
      </div>

      {/* Places Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-20 sm:mt-32 pt-12 sm:pt-16 border-t border-white/10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-white/50 text-xs sm:text-sm tracking-widest uppercase">Special Locations</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mt-3 sm:mt-4 mb-4 sm:mb-6">
            Places
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto text-sm sm:text-base">
            Destinations that hold special meaning in our journey.
          </p>
        </motion.div>

        {/* Places Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8">
          {places.map((place, index) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link href={place.link}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-sm rounded-xl md:rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                >
                  {/* Image */}
                  <div className="relative h-40 md:h-48 w-full bg-white/10 overflow-hidden">
                    {place.image && place.image !== '/placeholder-memory.jpg' ? (
                      <Image
                        src={place.image}
                        alt={place.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-white/30">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors" />
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6">
                    {/* Title */}
                    <h3 className="text-lg md:text-2xl font-serif text-white mb-1 md:mb-2 group-hover:text-white/90 transition-colors">
                      {place.title}
                    </h3>

                    {/* Description */}
                    <p className="text-white/50 leading-relaxed text-sm">
                      {place.description}
                    </p>

                    {/* View link */}
                    <div className="mt-4 flex items-center gap-2 text-white/40 group-hover:text-white/60 transition-colors text-sm">
                      <span>View memories</span>
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
