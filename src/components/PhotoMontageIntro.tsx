'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

// Washington photos (top-left)
const washingtonPhotos = [
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0338_lhpnz0.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2655_uxluav.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2458_nfmuim.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1653_uuup28.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1631_ytbzgo.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1534_ob4zca.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0714_f9gk9y.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/Parties_ggopam.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7293_pevntj.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_3994_mwpxwq.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_3403_nvb3zy.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2543_c6w4tp.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2183_cldeyi.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0664_i5sgs4.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0650_dgq0cm.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7332_uyamie.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7234_sme5yq.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_5701_aciwcw.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2233_jxpmku.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2051_qw3pfs.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1824_zgfni4.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1261_tvza3c.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_1085_yhyj3z.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0617_kfixf4.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_8827_ano7nq.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_0611_ayccui.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_7987_nwm0qi.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_5622_ov19b1.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2525_dhknjr.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/IMG_2237_pifvk1.jpg',
]

// Formals photos (top-right) - TOLO, Prom, Telluride, Graduation
const formalsPhotos = [
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607008/IMG_0521_f0fys3.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607006/IMG_0348_g8rdkt.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606999/IMG_0475_emzphe.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606995/IMG_1445_uu1dl8.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606991/IMG_0347_ummbqd.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607012/PROM_2024_0266_tichei.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607003/IMG_2932_ba3ea0.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607001/IMG_2777_ltlnsu.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606996/IMG_3051_esaznd.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606986/IMG_4113_jcwy1t.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606993/IMG_0415_im2buc.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606988/IMG_8837_wixh8s.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606978/IMG_0442_zvatti.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606964/IMG_0449_kcu8pg.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608102/IMG_4813_qflidx.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608116/IMG_7308_rvsxip.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608115/IMG_3501_lcak1g.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608108/IMG_3322_kw5pup.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608104/IMG_3223_welyh1.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608099/IMG_4821_vfrmi4.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608097/IMG_3317_c4mpti.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608095/IMG_7296_aqmtla.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766608092/IMG_4814_jwoavy.jpg',
]

// Road Trip photos only (bottom-left)
const roadtripPhotos = [
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606824/IMG_0436_q5n9wu.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606820/IMG_0517_fln8ph.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606819/IMG_0513_ucd3lp.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606622/IMG_0080_eosu4y.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606620/IMG_0039_eof0li.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606618/IMG_0600_uo19td.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606617/IMG_0602_aesyp8.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606615/IMG_0549_oyl6je.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606613/IMG_0533_jzriqq.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606612/IMG_0454_dzn2fh.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606606/IMG_0402_ox3fpb.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606602/IMG_0353_yzotik.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606599/IMG_0341_t2cc48.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606597/IMG_0339_mjbctw.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606595/IMG_0273_cvtvya.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606593/IMG_0263_mzd6v4.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606592/IMG_0258_w4tzeb.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606590/IMG_0242_mpzjoc.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606589/IMG_0241_uefsh5.jpg',
]

// Europe photos (bottom-right)
const europePhotos = [
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606752/IMG_0758_qxmo30.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606813/IMG_0593_yv4scf.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606820/IMG_0751_grmnlr.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606816/IMG_0677_tsonp3.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606815/IMG_0676_jyfnck.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606812/IMG_0750_ddmgzq.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606810/IMG_0749_y625az.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606808/IMG_0748_prqclt.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606807/IMG_0747_g23ruq.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606805/IMG_0746_ccgkmp.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606767/IMG_0926_jbtiey.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606765/IMG_0925_q2n3vx.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606762/IMG_0920_l016vj.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606759/IMG_0903_j8cbem.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606758/IMG_0880_bmwg5p.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606804/IMG_0745_yg1emd.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606802/IMG_0744_kzm3yz.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606800/IMG_0743_twebym.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606799/IMG_0742_rxosk7.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606797/IMG_0741_yyj56e.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606795/IMG_0740_u4qy4r.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606794/IMG_0739_t2yb6j.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606792/IMG_0738_zcr3bg.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606791/IMG_0737_scyfjw.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606787/IMG_0735_ere2g9.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606786/IMG_0734_vj2cbg.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606784/IMG_0733_a2at7k.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606782/IMG_0732_cmibms.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606781/IMG_0731_jfuaik.jpg',
  'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606779/IMG_0730_dutyth.jpg',
]

// Cover photos for each section (these are what we freeze on at the end of each montage)
const COVER_PHOTOS = {
  washington: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766607544/IMG_0617_kfixf4.jpg',
  formals: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606999/IMG_0475_emzphe.jpg',
  roadtrip: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606596/IMG_0280_l2aeb1.jpg',
  europe: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766606794/IMG_0739_t2yb6j.jpg',
}

// A Moment Apart MP3 from Cloudinary
const SONG_URL = 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766715405/ODESZA_-_A_Moment_Apart_h2hy5b.mp3'

// 312 BPM = 312 beats per minute = 5.2 beats per second
// Exact beat interval in seconds (not rounded!)
const BEAT_INTERVAL_SEC = 60 / 312 // ~0.192307692 seconds

// Schedule based on audio time (in seconds)
// Each montage runs for 4 seconds
const SCHEDULE = {
  blackEnd: 1.75,           // Black screen ends at 1.75s
  montage1End: 5.75,        // Washington ends at 5.75s (1.75 + 4)
  montage2End: 9.75,        // Formals ends at 9.75s (5.75 + 4)
  montage3End: 13.75,       // Roadtrip ends at 13.75s (9.75 + 4)
  montage4End: 17.75,       // Europe ends at 17.75s (13.75 + 4)
  frozenEnd: 19.25,         // All frozen until 19.25s (17.75 + 1.5)
}

interface PhotoMontageIntroProps {
  onComplete: () => void
}

export default function PhotoMontageIntro({ onComplete }: PhotoMontageIntroProps) {
  const [isReady, setIsReady] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const animationRef = useRef<number | null>(null)
  const hasCompletedRef = useRef(false)

  // Shuffle photos once on mount (using refs to avoid re-shuffling)
  const shuffledWashington = useRef([...washingtonPhotos].sort(() => Math.random() - 0.5))
  const shuffledFormals = useRef([...formalsPhotos].sort(() => Math.random() - 0.5))
  const shuffledRoadtrip = useRef([...roadtripPhotos].sort(() => Math.random() - 0.5))
  const shuffledEurope = useRef([...europePhotos].sort(() => Math.random() - 0.5))

  // Refs for direct DOM manipulation (avoids React state lag)
  const photoIndexRefs = useRef({ q1: -1, q2: -1, q3: -1, q4: -1 })
  const quadrantRefs = useRef<{
    q1: HTMLDivElement | null
    q2: HTMLDivElement | null
    q3: HTMLDivElement | null
    q4: HTMLDivElement | null
  }>({ q1: null, q2: null, q3: null, q4: null })

  // Complete the intro
  const completeIntro = useCallback(() => {
    if (hasCompletedRef.current) return
    hasCompletedRef.current = true

    // Save current audio time for MusicPlayer to continue
    if (audioRef.current) {
      sessionStorage.setItem('introAudioTime', audioRef.current.currentTime.toString())
    }

    // Cancel animation loop
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }

    onComplete()
  }, [onComplete])

  // Update photo display using direct DOM manipulation (no React re-render)
  const updatePhotoDisplay = useCallback((
    quadrantRef: HTMLDivElement | null,
    newIndex: number,
    prevIndex: number,
    photoArray: string[]
  ) => {
    if (!quadrantRef || newIndex === prevIndex) return

    const images = quadrantRef.querySelectorAll('img[data-photo-index]')
    images.forEach((img, idx) => {
      const imgEl = img as HTMLImageElement
      if (idx === newIndex) {
        imgEl.style.opacity = '1'
        imgEl.style.zIndex = '1'
      } else {
        imgEl.style.opacity = '0'
        imgEl.style.zIndex = '0'
      }
    })
  }, [])

  // Main animation loop - synced to audio.currentTime
  const animate = useCallback(() => {
    const audio = audioRef.current
    if (!audio || audio.paused) {
      animationRef.current = requestAnimationFrame(animate)
      return
    }

    const t = audio.currentTime

    // Check if we're done
    if (t >= SCHEDULE.frozenEnd) {
      completeIntro()
      return
    }

    // Determine which phase we're in and update photos accordingly
    // Each quadrant appears sequentially and then freezes

    // Quadrant 1 (Washington) - visible from blackEnd to end, animates until montage1End
    if (t >= SCHEDULE.blackEnd) {
      const q1Ref = quadrantRefs.current.q1
      if (q1Ref) {
        q1Ref.style.display = 'block'

        if (t < SCHEDULE.montage1End) {
          // Animating
          const phaseTime = t - SCHEDULE.blackEnd
          const beatIndex = Math.floor(phaseTime / BEAT_INTERVAL_SEC)
          const photoIndex = beatIndex % shuffledWashington.current.length

          if (photoIndex !== photoIndexRefs.current.q1) {
            updatePhotoDisplay(q1Ref, photoIndex, photoIndexRefs.current.q1, shuffledWashington.current)
            photoIndexRefs.current.q1 = photoIndex
          }
        } else {
          // Frozen - show cover photo
          const coverImg = q1Ref.querySelector('img[data-cover]') as HTMLImageElement
          if (coverImg) coverImg.style.opacity = '1'
        }
      }
    }

    // Quadrant 2 (Formals) - visible from montage1End to end, animates until montage2End
    if (t >= SCHEDULE.montage1End) {
      const q2Ref = quadrantRefs.current.q2
      if (q2Ref) {
        q2Ref.style.display = 'block'

        if (t < SCHEDULE.montage2End) {
          // Animating
          const phaseTime = t - SCHEDULE.montage1End
          const beatIndex = Math.floor(phaseTime / BEAT_INTERVAL_SEC)
          const photoIndex = beatIndex % shuffledFormals.current.length

          if (photoIndex !== photoIndexRefs.current.q2) {
            updatePhotoDisplay(q2Ref, photoIndex, photoIndexRefs.current.q2, shuffledFormals.current)
            photoIndexRefs.current.q2 = photoIndex
          }
        } else {
          // Frozen
          const coverImg = q2Ref.querySelector('img[data-cover]') as HTMLImageElement
          if (coverImg) coverImg.style.opacity = '1'
        }
      }
    }

    // Quadrant 3 (Roadtrip) - visible from montage2End to end, animates until montage3End
    if (t >= SCHEDULE.montage2End) {
      const q3Ref = quadrantRefs.current.q3
      if (q3Ref) {
        q3Ref.style.display = 'block'

        if (t < SCHEDULE.montage3End) {
          // Animating
          const phaseTime = t - SCHEDULE.montage2End
          const beatIndex = Math.floor(phaseTime / BEAT_INTERVAL_SEC)
          const photoIndex = beatIndex % shuffledRoadtrip.current.length

          if (photoIndex !== photoIndexRefs.current.q3) {
            updatePhotoDisplay(q3Ref, photoIndex, photoIndexRefs.current.q3, shuffledRoadtrip.current)
            photoIndexRefs.current.q3 = photoIndex
          }
        } else {
          // Frozen
          const coverImg = q3Ref.querySelector('img[data-cover]') as HTMLImageElement
          if (coverImg) coverImg.style.opacity = '1'
        }
      }
    }

    // Quadrant 4 (Europe) - visible from montage3End to end, animates until montage4End
    if (t >= SCHEDULE.montage3End) {
      const q4Ref = quadrantRefs.current.q4
      if (q4Ref) {
        q4Ref.style.display = 'block'

        if (t < SCHEDULE.montage4End) {
          // Animating
          const phaseTime = t - SCHEDULE.montage3End
          const beatIndex = Math.floor(phaseTime / BEAT_INTERVAL_SEC)
          const photoIndex = beatIndex % shuffledEurope.current.length

          if (photoIndex !== photoIndexRefs.current.q4) {
            updatePhotoDisplay(q4Ref, photoIndex, photoIndexRefs.current.q4, shuffledEurope.current)
            photoIndexRefs.current.q4 = photoIndex
          }
        } else {
          // Frozen
          const coverImg = q4Ref.querySelector('img[data-cover]') as HTMLImageElement
          if (coverImg) coverImg.style.opacity = '1'
        }
      }
    }

    // Continue animation loop
    animationRef.current = requestAnimationFrame(animate)
  }, [completeIntro, updatePhotoDisplay])

  // Unified preload: audio first, then images
  useEffect(() => {
    let isMounted = true
    const audio = audioRef.current
    if (!audio) return

    const preload = async () => {
      // Step 1: Wait for audio to be fully ready (canplaythrough)
      audio.volume = 0.7

      if (audio.readyState < 4) {
        await new Promise<void>((resolve) => {
          const handleReady = () => {
            audio.removeEventListener('canplaythrough', handleReady)
            resolve()
          }
          audio.addEventListener('canplaythrough', handleReady)
          // Fallback timeout
          setTimeout(resolve, 3000)
        })
      }

      if (!isMounted) return

      // Step 2: Preload images (first 15 from each quadrant)
      const imagesToPreload = [
        ...shuffledWashington.current.slice(0, 15),
        ...shuffledFormals.current.slice(0, 15),
        ...shuffledRoadtrip.current.slice(0, 15),
        ...shuffledEurope.current.slice(0, 15),
        COVER_PHOTOS.washington,
        COVER_PHOTOS.formals,
        COVER_PHOTOS.roadtrip,
        COVER_PHOTOS.europe,
      ]

      await Promise.all(
        imagesToPreload.map(src =>
          new Promise<void>((resolve) => {
            const img = new Image()
            img.onload = () => resolve()
            img.onerror = () => resolve()
            img.src = src
          })
        )
      )

      if (!isMounted) return
      setIsReady(true)
    }

    preload()

    return () => {
      isMounted = false
    }
  }, [])

  // Start playing when ready
  useEffect(() => {
    if (!isReady) return

    const audio = audioRef.current
    if (!audio) return

    const startPlayback = async () => {
      try {
        // Reset audio
        audio.pause()
        audio.currentTime = 0

        // Play
        await audio.play()
        setIsPlaying(true)

        // Start animation loop
        animationRef.current = requestAnimationFrame(animate)
      } catch (err) {
        console.error('Failed to play audio:', err)
        // Start anyway without audio
        setIsPlaying(true)
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    startPlayback()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isReady, animate])

  // Handle tab visibility - pause audio when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      const audio = audioRef.current
      if (!audio) return

      if (document.hidden) {
        audio.pause()
      } else if (isPlaying && !hasCompletedRef.current) {
        audio.play().catch(() => {})
      }
    }

    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [isPlaying])

  const handleSkip = () => {
    if (audioRef.current) {
      sessionStorage.setItem('introAudioTime', audioRef.current.currentTime.toString())
      audioRef.current.pause()
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
    onComplete()
  }

  // Quadrant style helper
  const quadrantStyle = (position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'): React.CSSProperties => ({
    position: 'absolute',
    width: '50vw',
    height: '50vh',
    overflow: 'hidden',
    backgroundColor: 'black',
    display: 'none', // Will be shown by animation loop
    ...(position === 'top-left' && { top: 0, left: 0 }),
    ...(position === 'top-right' && { top: 0, right: 0 }),
    ...(position === 'bottom-left' && { bottom: 0, left: 0 }),
    ...(position === 'bottom-right' && { bottom: 0, right: 0 }),
  })

  const imageStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center center',
    opacity: 0,
    zIndex: 0,
  }

  const coverImageStyle: React.CSSProperties = {
    ...imageStyle,
    zIndex: 2,
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        zIndex: 99999,
        overflow: 'hidden',
      }}
    >
      {/* Audio */}
      <audio ref={audioRef} src={SONG_URL} preload="auto" />

      {/* Quadrant 1: Washington (top-left) */}
      <div ref={(el) => { quadrantRefs.current.q1 = el }} style={quadrantStyle('top-left')}>
        <img data-cover src={COVER_PHOTOS.washington} alt="" style={coverImageStyle} />
        {shuffledWashington.current.map((src, index) => (
          <img key={src} data-photo-index={index} src={src} alt="" style={imageStyle} />
        ))}
      </div>

      {/* Quadrant 2: Formals (top-right) */}
      <div ref={(el) => { quadrantRefs.current.q2 = el }} style={quadrantStyle('top-right')}>
        <img data-cover src={COVER_PHOTOS.formals} alt="" style={coverImageStyle} />
        {shuffledFormals.current.map((src, index) => (
          <img key={src} data-photo-index={index} src={src} alt="" style={imageStyle} />
        ))}
      </div>

      {/* Quadrant 3: Roadtrip (bottom-left) */}
      <div ref={(el) => { quadrantRefs.current.q3 = el }} style={quadrantStyle('bottom-left')}>
        <img data-cover src={COVER_PHOTOS.roadtrip} alt="" style={coverImageStyle} />
        {shuffledRoadtrip.current.map((src, index) => (
          <img key={src} data-photo-index={index} src={src} alt="" style={imageStyle} />
        ))}
      </div>

      {/* Quadrant 4: Europe (bottom-right) */}
      <div ref={(el) => { quadrantRefs.current.q4 = el }} style={quadrantStyle('bottom-right')}>
        <img data-cover src={COVER_PHOTOS.europe} alt="" style={coverImageStyle} />
        {shuffledEurope.current.map((src, index) => (
          <img key={src} data-photo-index={index} src={src} alt="" style={imageStyle} />
        ))}
      </div>

      {/* Skip button */}
      <button
        onClick={handleSkip}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '8px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          color: 'rgba(255, 255, 255, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          transition: 'all 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'
          e.currentTarget.style.color = 'white'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)'
          e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)'
        }}
      >
        Skip
      </button>
    </div>
  )
}
