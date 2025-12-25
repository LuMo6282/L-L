'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import Timeline from './Timeline'

// Hero background images with location info
const heroBackgrounds = [
  // Odesza (part of Another Summer Week)
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607138/FullSizeRender_tfo6p1.jpg', alt: 'Odesza concert', location: 'Odesza', subtitle: 'Seattle', link: '/memories/another-summer-week' },
  // Rise Festival
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766629743/ChatGPT_Image_Dec_24_2025_07_28_48_PM_wv47s7.png', alt: 'Rise Festival lanterns', location: 'Rise Festival', subtitle: 'Nevada Desert', link: '/memories/rise-festival' },
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766629931/ChatGPT_Image_Dec_24_2025_07_31_31_PM_pxsnso.png', alt: 'Rise Festival lanterns', location: 'Rise Festival', subtitle: 'Nevada Desert', link: '/memories/rise-festival' },
  // Roadtrip
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606618/IMG_0600_uo19td.jpg', alt: 'Roadtrip adventure', location: 'Road Trip', subtitle: 'Southwest USA', link: '/memories/road-trip' },
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606549/IMG_0615_h8wq3y.jpg', alt: 'Desert sunset', location: 'Road Trip', subtitle: 'Southwest USA', link: '/memories/road-trip' },
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606596/IMG_0280_l2aeb1.jpg', alt: 'Roadtrip scenery', location: 'Road Trip', subtitle: 'Southwest USA', link: '/memories/road-trip' },
  // Europe
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606815/IMG_0676_jyfnck.jpg', alt: 'Winding road through hills', location: 'Europe', subtitle: 'Swiss Alps', link: '/memories/europe' },
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606804/IMG_0745_yg1emd.jpg', alt: 'European scenery', location: 'Europe', subtitle: 'Swiss Alps', link: '/memories/europe' },
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606794/IMG_0739_t2yb6j.jpg', alt: 'European landscape', location: 'Europe', subtitle: 'Swiss Alps', link: '/memories/europe' },
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606772/IMG_0726_xnba7y.jpg', alt: 'Swiss Alps', location: 'Europe', subtitle: 'Swiss Alps', link: '/memories/europe' },
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606751/IMG_0757_k12rav.jpg', alt: 'Mountain goats', location: 'Europe', subtitle: 'Swiss Alps', link: '/memories/europe' },
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606750/IMG_0756_q3srgm.jpg', alt: 'Colorful buildings', location: 'Europe', subtitle: 'Swiss Alps', link: '/memories/europe' },
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606745/IMG_0754_w0bgis.jpg', alt: 'Swiss Alps panorama', location: 'Europe', subtitle: 'Swiss Alps', link: '/memories/europe' },
  // Alaska
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766630374/ChatGPT_Image_Dec_24_2025_07_39_25_PM_kvhxju.png', alt: 'Alaska snowy landscape', location: 'Alaska', subtitle: 'The Last Frontier', link: '/memories/alaska' },
  // Enchantments (part of Another Summer Week)
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766630696/ChatGPT_Image_Dec_24_2025_07_44_43_PM_wwnuup.png', alt: 'Alpine lake', location: 'Enchantments', subtitle: 'Washington', link: '/memories/another-summer-week' },
  // Sand Dunes
  { url: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766630509/ChatGPT_Image_Dec_24_2025_07_41_41_PM_dlns2d.png', alt: 'Sand dunes sunset', location: 'Sand Dunes', subtitle: 'Colorado', link: '/memories/sand-dunes' },
]

export default function HeroSlider() {
  const [currentBgIndex, setCurrentBgIndex] = useState(0)

  // Rotate background images every 8 seconds
  useEffect(() => {
    const bgTimer = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length)
    }, 8000)
    return () => clearInterval(bgTimer)
  }, [])

  const nextImage = () => {
    setCurrentBgIndex((prev) => (prev + 1) % heroBackgrounds.length)
  }

  const prevImage = () => {
    setCurrentBgIndex((prev) => (prev - 1 + heroBackgrounds.length) % heroBackgrounds.length)
  }

  return (
    <>
      {/* Hero Section with rotating background */}
      <section id="home" className="relative h-screen w-full overflow-hidden bg-[#0a0a0f]">
        {/* All images rendered, only current one visible - prevents black flash */}
        {heroBackgrounds.map((bg, index) => (
          <div
            key={index}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: index === currentBgIndex ? 1 : 0 }}
          >
            <Image
              src={bg.url}
              alt={bg.alt}
              fill
              className="object-cover"
              priority
              loading="eager"
            />
          </div>
        ))}

        {/* Shaded card panel on left side extending to bottom */}
        <div className="absolute top-0 bottom-0 left-0 w-[320px] md:w-[400px] lg:w-[450px] bg-gradient-to-r from-black/70 via-black/50 to-transparent z-[1]" />

        {/* Location Info - Left side, vertically centered */}
        <div className="absolute top-0 bottom-0 left-0 w-[320px] md:w-[400px] lg:w-[450px] flex items-center z-20">
          <div className="pl-6 md:pl-12 lg:pl-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroBackgrounds[currentBgIndex].location}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col gap-3"
              >
                {/* Subtitle */}
                <span className="text-white/60 text-xs md:text-sm tracking-[0.3em] uppercase font-light">
                  {heroBackgrounds[currentBgIndex].subtitle}
                </span>

                {/* Location Name */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-none">
                  {heroBackgrounds[currentBgIndex].location}
                </h1>

                {/* Explore Button */}
                <Link href={heroBackgrounds[currentBgIndex].link}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-2 inline-flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full hover:bg-white/20 hover:border-white/30 transition-all group cursor-pointer"
                  >
                    <span className="text-white text-sm font-medium">Explore memories</span>
                    <svg
                      className="w-4 h-4 text-white transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </motion.div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Left Arrow - outer edge */}
        <motion.button
          onClick={prevImage}
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.95 }}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-30 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </motion.button>

        {/* Right Arrow - outer edge */}
        <motion.button
          onClick={nextImage}
          whileHover={{ x: 3 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition-colors"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </motion.button>

        {/* Image Counter */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <span className="text-white/60 text-sm font-light tracking-wider">
            {currentBgIndex + 1} / {heroBackgrounds.length}
          </span>
        </div>
      </section>

      {/* Timeline Section Below */}
      <Timeline />
    </>
  )
}
