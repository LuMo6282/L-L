'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import PhotoMontageIntro from './PhotoMontageIntro'

// Memory page slugs in order for the auto-scroll tour
const MEMORY_PAGES = [
  'seattle',
  'mexico',
  'formal',
  'whistler',
  'graduation',
  'another-summer-week',
  'colorado',
  'sand-dunes',
  'rise-festival',
  'alaska',
  'road-trip',
  'whidbey',
  'europe',
]

// Scroll speed in pixels per second (slow enough to see all images)
const SCROLL_SPEED = 200 // pixels per second

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [isChecking, setIsChecking] = useState(true)
  const [showIntro, setShowIntro] = useState(false)
  const [showReplayButton, setShowReplayButton] = useState(false)
  const [isAutoScrolling, setIsAutoScrolling] = useState(false)
  const [currentTourIndex, setCurrentTourIndex] = useState(-1)
  const scrollAnimationRef = useRef<number | null>(null)
  const pageTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const isNavigatingRef = useRef(false)

  useEffect(() => {
    const unlocked = sessionStorage.getItem('unlocked')
    if (unlocked === 'true') {
      setIsUnlocked(true)
      setShowReplayButton(true)
    }
    setIsChecking(false)
  }, [])

  // Hide replay button on scroll
  useEffect(() => {
    if (!showReplayButton) return

    let scrollTimeout: NodeJS.Timeout
    const handleScroll = () => {
      const replayBtn = document.getElementById('replay-montage-btn')
      if (replayBtn) {
        replayBtn.style.opacity = '0'
        replayBtn.style.pointerEvents = 'none'
      }
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        if (replayBtn) {
          replayBtn.style.opacity = '1'
          replayBtn.style.pointerEvents = 'auto'
        }
      }, 1000)
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(scrollTimeout)
    }
  }, [showReplayButton])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.toLowerCase() === 'scrapbook') {
      sessionStorage.setItem('unlocked', 'true')
      setShowIntro(true)
    } else {
      setPassword('')
    }
  }

  // Stop auto-scroll tour
  const stopAutoScroll = useCallback(() => {
    setIsAutoScrolling(false)
    setCurrentTourIndex(-1)
    if (scrollAnimationRef.current) {
      cancelAnimationFrame(scrollAnimationRef.current)
      scrollAnimationRef.current = null
    }
    if (pageTimeoutRef.current) {
      clearTimeout(pageTimeoutRef.current)
      pageTimeoutRef.current = null
    }
  }, [])

  // Move to next page in the tour
  const goToNextTourPage = useCallback(() => {
    // Prevent duplicate navigation calls
    if (isNavigatingRef.current) return
    isNavigatingRef.current = true

    // Calculate next index without side effects in the setter
    const nextIndex = currentTourIndex + 1

    if (nextIndex >= MEMORY_PAGES.length) {
      // Tour complete, go back to home
      stopAutoScroll()
      // Use setTimeout to defer navigation outside of React's render cycle
      setTimeout(() => {
        router.push('/')
        isNavigatingRef.current = false
      }, 0)
      return
    }

    // Update state first, then navigate
    setCurrentTourIndex(nextIndex)
    // Use setTimeout to defer navigation outside of React's render cycle
    setTimeout(() => {
      router.push(`/memories/${MEMORY_PAGES[nextIndex]}`)
      // Reset navigation flag after a short delay to allow for page transition
      setTimeout(() => {
        isNavigatingRef.current = false
      }, 500)
    }, 0)
  }, [currentTourIndex, router, stopAutoScroll])

  // Auto-scroll effect - scrolls the page at a constant speed
  useEffect(() => {
    if (!isAutoScrolling || currentTourIndex < 0) return

    // First, scroll to top immediately when page changes
    window.scrollTo(0, 0)

    // Wait for page to fully load and render
    const startDelay = setTimeout(() => {
      // Find the footer element to know when to stop scrolling
      const footer = document.querySelector('footer')
      const footerTop = footer ? footer.getBoundingClientRect().top + window.scrollY : null

      // Target scroll position: either footer top or full page height
      const maxScrollTarget = footerTop
        ? footerTop - window.innerHeight // Stop when footer top reaches bottom of viewport
        : document.documentElement.scrollHeight - window.innerHeight

      if (maxScrollTarget <= 0) {
        // No scrolling needed, just wait a moment and go to next page
        pageTimeoutRef.current = setTimeout(goToNextTourPage, 2000)
        return
      }

      // Calculate how long it should take based on scroll speed
      const scrollDuration = (maxScrollTarget / SCROLL_SPEED) * 1000 // in ms
      const startTime = performance.now()

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / scrollDuration, 1)

        // Linear scrolling for consistent speed
        const targetScroll = maxScrollTarget * progress
        window.scrollTo({ top: targetScroll, behavior: 'instant' })

        if (progress < 1) {
          scrollAnimationRef.current = requestAnimationFrame(animateScroll)
        } else {
          // Reached footer, move to next page immediately
          goToNextTourPage()
        }
      }

      scrollAnimationRef.current = requestAnimationFrame(animateScroll)
    }, 1000) // Wait for page to load

    return () => {
      clearTimeout(startDelay)
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current)
      }
      if (pageTimeoutRef.current) {
        clearTimeout(pageTimeoutRef.current)
      }
    }
  }, [isAutoScrolling, currentTourIndex, goToNextTourPage, pathname])

  // Disable user scrolling during auto-scroll tour (but allow programmatic scrolling)
  useEffect(() => {
    if (!isAutoScrolling) return

    // Prevent user from scrolling via wheel/touch, but allow programmatic scrolling
    const preventScroll = (e: WheelEvent | TouchEvent) => {
      e.preventDefault()
      e.stopPropagation()
      return false
    }

    const preventKeyScroll = (e: KeyboardEvent) => {
      // Prevent arrow keys, space, page up/down from scrolling
      const scrollKeys = ['ArrowUp', 'ArrowDown', 'Space', 'PageUp', 'PageDown', 'Home', 'End']
      if (scrollKeys.includes(e.code)) {
        e.preventDefault()
      }
    }

    window.addEventListener('wheel', preventScroll, { passive: false })
    window.addEventListener('touchmove', preventScroll, { passive: false })
    window.addEventListener('keydown', preventKeyScroll)

    return () => {
      window.removeEventListener('wheel', preventScroll)
      window.removeEventListener('touchmove', preventScroll)
      window.removeEventListener('keydown', preventKeyScroll)
    }
  }, [isAutoScrolling])

  const handleIntroComplete = () => {
    setShowIntro(false)
    setIsUnlocked(true)
    setShowReplayButton(true)
    // Start the auto-scroll tour
    setIsAutoScrolling(true)
    setCurrentTourIndex(0)
    router.push(`/memories/${MEMORY_PAGES[0]}`)
  }

  const handleReplayMontage = () => {
    stopAutoScroll()
    setShowIntro(true)
  }

  if (isChecking) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'white'
      }} />
    )
  }

  // Show intro montage
  if (showIntro) {
    return <PhotoMontageIntro onComplete={handleIntroComplete} />
  }

  if (isUnlocked) {
    return (
      <>
        {/* Replay Montage Button - only show when not auto-scrolling */}
        {showReplayButton && !isAutoScrolling && (
          <button
            id="replay-montage-btn"
            onClick={handleReplayMontage}
            style={{
              position: 'fixed',
              top: '20px',
              left: '20px',
              padding: '8px 12px',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
              color: 'rgba(255, 255, 255, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '11px',
              letterSpacing: '0.5px',
              zIndex: 9998,
              transition: 'all 0.3s ease',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)'
              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'
            }}
          >
            Replay Intro
          </button>
        )}

        {/* Auto-scroll tour indicator */}
        {isAutoScrolling && currentTourIndex >= 0 && (
          <div
            style={{
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '10px 16px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px',
              zIndex: 9998,
            }}
          >
            {/* Progress dots */}
            <div style={{ display: 'flex', gap: '4px' }}>
              {MEMORY_PAGES.map((_, index) => (
                <div
                  key={index}
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: index === currentTourIndex
                      ? 'white'
                      : index < currentTourIndex
                        ? 'rgba(255, 255, 255, 0.5)'
                        : 'rgba(255, 255, 255, 0.2)',
                    transition: 'background-color 0.3s',
                  }}
                />
              ))}
            </div>

            {/* Stop button */}
            <button
              onClick={stopAutoScroll}
              style={{
                padding: '4px 10px',
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                color: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '10px',
                letterSpacing: '0.5px',
                textTransform: 'uppercase',
              }}
            >
              Stop Tour
            </button>
          </div>
        )}

        {children}
      </>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#f0f0f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Times New Roman, serif'
    }}>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          style={{
            padding: '4px',
            fontSize: '13px',
            border: '2px inset #999',
            backgroundColor: 'white',
            width: '140px',
            marginRight: '4px'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '3px 8px',
            fontSize: '12px',
            backgroundColor: '#ddd',
            color: 'black',
            border: '2px outset #ccc',
            cursor: 'pointer',
            fontFamily: 'Times New Roman, serif'
          }}
        >
          OK
        </button>
      </form>
    </div>
  )
}
