'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/', isPage: true },
    { name: 'Adventures', href: '#adventures', isPage: false },
    { name: 'Our Story', href: '#timeline', isPage: false },
    { name: 'Side Adventures', href: '/side-adventures', isPage: true },
    { name: 'Love Notes', href: '#notes', isPage: false },
  ]

  const NavLink = ({ item, index, mobile = false }: { item: typeof navItems[0], index: number, mobile?: boolean }) => {
    const className = mobile
      ? `block transition-colors ${isScrolled ? 'text-[var(--cream)] hover:text-[var(--dusty-rose)]' : 'text-[var(--warm-gray)] hover:text-[var(--charcoal)]'}`
      : `${isScrolled ? 'text-[var(--cream)] hover:text-[var(--dusty-rose)]' : 'text-[var(--warm-gray)] hover:text-[var(--charcoal)]'} transition-colors relative group`

    const content = (
      <>
        {item.name}
        {!mobile && (
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[var(--dusty-rose)] transition-all duration-300 group-hover:w-full" />
        )}
      </>
    )

    if (item.isPage) {
      return (
        <Link href={item.href} onClick={() => mobile && setIsMobileMenuOpen(false)}>
          <motion.span
            className={className}
            initial={{ opacity: 0, y: mobile ? 0 : -20, x: mobile ? -20 : 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            {content}
          </motion.span>
        </Link>
      )
    }

    return (
      <motion.a
        href={item.href}
        className={className}
        initial={{ opacity: 0, y: mobile ? 0 : -20, x: mobile ? -20 : 0 }}
        animate={{ opacity: 1, y: 0, x: 0 }}
        transition={{ delay: index * 0.1 }}
        onClick={() => mobile && setIsMobileMenuOpen(false)}
      >
        {content}
      </motion.a>
    )
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-[#2d2d2d] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <motion.span
              className={`text-xl sm:text-2xl font-serif cursor-pointer transition-colors duration-300 ${isScrolled ? 'text-[var(--cream)]' : 'text-[var(--charcoal)]'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              L <span className="text-[var(--dusty-rose)]">&</span> L
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <NavLink key={item.name} item={item} index={index} />
            ))}
          </div>

          {/* Mobile Menu Button - larger touch target */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-3 -mr-2 transition-colors duration-300 ${isScrolled ? 'text-[var(--cream)]' : 'text-[var(--charcoal)]'}`}
            aria-label="Toggle menu"
          >
            <motion.div
              animate={isMobileMenuOpen ? 'open' : 'closed'}
              className="w-5 h-4 sm:w-6 sm:h-5 flex flex-col justify-between"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 },
                }}
                className={`w-full h-0.5 origin-left transition-colors duration-300 ${isScrolled ? 'bg-[var(--cream)]' : 'bg-[var(--charcoal)]'}`}
              />
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className={`w-full h-0.5 transition-colors duration-300 ${isScrolled ? 'bg-[var(--cream)]' : 'bg-[var(--charcoal)]'}`}
              />
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 },
                }}
                className={`w-full h-0.5 origin-left transition-colors duration-300 ${isScrolled ? 'bg-[var(--cream)]' : 'bg-[var(--charcoal)]'}`}
              />
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${isScrolled ? 'bg-[#2d2d2d] border-[var(--warm-gray)]/30' : 'glass border-[var(--rose)]/30'}`}
          >
            <div className="px-6 py-4 space-y-4">
              {navItems.map((item, index) => (
                <NavLink key={item.name} item={item} index={index} mobile />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
