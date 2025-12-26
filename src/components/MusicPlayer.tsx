'use client'

import { useState, useRef, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface Song {
  title: string
  artist: string
  src: string
  cover: string
}

// All songs available
const allSongs: Record<string, Song> = {
  'work-out': {
    title: 'Work Out',
    artist: 'J. Cole',
    src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766715389/J._Cole_Work_Out_Lyrics_bohsbi.mp3',
    cover: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766715361/J_Cole_b6rahm.jpg'
  },
  'i-will-survive': {
    title: 'I Will Survive',
    artist: 'Gloria Gaynor',
    src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766715407/GLORIA_GAYNOR_I_will_survive_Spanish_version_fsyfwy.mp3',
    cover: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766715380/Gloria_Gaynor_I_will_survive_jm2w3j.jpg'
  },
  'sticky': {
    title: 'Sticky',
    artist: 'Drake',
    src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766715398/Drake_-_Sticky_eeoach.mp3',
    cover: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766715378/Drake_qyup4x.jpg'
  },
  'american-boy': {
    title: 'American Boy',
    artist: 'Estelle ft. Kanye West',
    src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766715400/Estelle_-_American_Boy_Feat._Kanye_West_Video_i8whlz.mp3',
    cover: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766715366/Kanye_West_pfgju7.jpg'
  },
  'a-moment-apart': {
    title: 'A Moment Apart',
    artist: 'ODESZA',
    src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766715405/ODESZA_-_A_Moment_Apart_h2hy5b.mp3',
    cover: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766715371/Odesza_s8qhej.jpg'
  },
  'i-play-you-listen': {
    title: 'IPlayYouListen',
    artist: 'ODESZA',
    src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766715402/ODESZA_-_IPlayYouListen_pnnmz7.mp3',
    cover: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766715368/odesza_iplayyoulisten_swezhg.jpg'
  },
  'innerbloom': {
    title: 'Innerbloom',
    artist: 'RÜFÜS DU SOL',
    src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766715414/R%C3%9CF%C3%9CS_DU_SOL_-_Innerbloom_qcbdrj.mp3',
    cover: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766715360/innerbloom_rufus_vvteym.jpg'
  },
  'think-im-in-love': {
    title: "Think I'm In Love With You",
    artist: 'Chris Stapleton',
    src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766715394/Chris_Stapleton_-_Think_I_m_In_Love_With_You_Official_Audio_krli8u.mp3',
    cover: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766715383/i_think_im_in_love_with_you_xwfl9d.jpg'
  },
  'tomorrows-dust': {
    title: "Tomorrow's Dust",
    artist: 'Tame Impala',
    src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766715415/Tame_Impala_-_Tomorrow_s_Dust_Official_Audio_m2buib.mp3',
    cover: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766715376/Tame_Impala_k4c5qp.jpg'
  },
  '15-step': {
    title: '15 Step',
    artist: 'Radiohead',
    src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766715391/Radiohead_-_15_Step_HQ_jcwvl3.mp3',
    cover: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766715373/radiohead_yr5crq.jpg'
  },
  'phenomenon': {
    title: 'Phenomenon',
    artist: 'Mt. Joy',
    src: 'https://res.cloudinary.com/dlp80acqf/video/upload/v1766715389/Mt._Joy_-_Phenomenon_Visualizer_h3nur5.mp3',
    cover: 'https://res.cloudinary.com/dlp80acqf/image/upload/v1766715364/Mt_Joy_tain57.jpg'
  }
}

// All songs in queue order (starts with A Moment Apart)
const allSongKeys = [
  'a-moment-apart',
  'tomorrows-dust',
  'innerbloom',
  'think-im-in-love',
  '15-step',
  'american-boy',
  'work-out',
  'i-will-survive',
  'sticky',
  'i-play-you-listen',
  'phenomenon',
]

// Global song list - same songs everywhere, never switches
const globalSongs: Song[] = allSongKeys.map(key => allSongs[key])

export default function MusicPlayer() {
  const pathname = usePathname()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [volume, setVolume] = useState(0.5)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [showSongList, setShowSongList] = useState(false)
  const [hasAutoPlayed, setHasAutoPlayed] = useState(false)

  const songs = globalSongs
  const currentSong = songs[currentSongIndex]

  // Autoplay on first load, continuing from intro if applicable
  useEffect(() => {
    if (!hasAutoPlayed && audioRef.current) {
      const audio = audioRef.current

      // Check if we're continuing from the intro montage
      const introAudioTime = sessionStorage.getItem('introAudioTime')

      const attemptPlay = async () => {
        try {
          // If we have a saved time from the intro, we need to wait for the audio to be ready
          if (introAudioTime) {
            const savedTime = parseFloat(introAudioTime)
            sessionStorage.removeItem('introAudioTime')

            // Wait for audio to be ready if needed
            if (audio.readyState < 3) {
              await new Promise<void>((resolve) => {
                const handleCanPlay = () => {
                  audio.removeEventListener('canplay', handleCanPlay)
                  resolve()
                }
                audio.addEventListener('canplay', handleCanPlay)
                // Fallback timeout
                setTimeout(resolve, 2000)
              })
            }

            // Set the time to continue from where intro left off
            audio.currentTime = savedTime
          }

          // Now attempt to play
          await audio.play()
          setIsPlaying(true)
          setHasAutoPlayed(true)
        } catch (err) {
          // Autoplay blocked by browser, user needs to click
          console.log('Autoplay blocked:', err)
          setHasAutoPlayed(true)
        }
      }

      attemptPlay()
    }
  }, [hasAutoPlayed])

  // Just close song list when page changes, don't reset song
  useEffect(() => {
    setShowSongList(false)
  }, [pathname])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  useEffect(() => {
    if (audioRef.current && currentSong) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, currentSongIndex, currentSong])

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime
      const dur = audioRef.current.duration
      setCurrentTime(current)
      setDuration(dur)
      setProgress((current / dur) * 100)
    }
  }

  const handleSongEnd = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1)
    } else {
      setCurrentSongIndex(0)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length)
  }

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length)
  }

  const selectSong = (index: number) => {
    setCurrentSongIndex(index)
    setIsPlaying(true)
    setShowSongList(false)
  }

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bounds = e.currentTarget.getBoundingClientRect()
      const percent = (e.clientX - bounds.left) / bounds.width
      audioRef.current.currentTime = percent * audioRef.current.duration
    }
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00'
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  if (!songs.length || !currentSong) {
    return null
  }

  return (
    <div className="fixed top-auto bottom-4 right-4 sm:top-4 sm:bottom-auto z-[9999]">
      {/* Song List Dropdown - appears above on mobile, below on desktop */}
      {showSongList && songs.length > 1 && (
        <div
          className="absolute right-0 sm:top-full sm:bottom-auto bottom-full sm:mt-2 mb-2 sm:mb-0"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '8px',
            minWidth: '280px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          }}>
          <div style={{
            color: 'rgba(255,255,255,0.5)',
            fontSize: '10px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            padding: '8px 12px 4px',
          }}>
            Songs on this page
          </div>
          {songs.map((song, index) => (
            <div
              key={index}
              onClick={() => selectSong(index)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 12px',
                borderRadius: '8px',
                cursor: 'pointer',
                backgroundColor: index === currentSongIndex ? 'rgba(255,255,255,0.1)' : 'transparent',
                transition: 'background-color 0.2s',
              }}
              onMouseEnter={(e) => {
                if (index !== currentSongIndex) {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'
                }
              }}
              onMouseLeave={(e) => {
                if (index !== currentSongIndex) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              <img
                src={song.cover}
                alt={song.title}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '4px',
                  objectFit: 'cover',
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{
                  color: index === currentSongIndex ? 'white' : 'rgba(255,255,255,0.9)',
                  fontSize: '13px',
                  fontWeight: index === currentSongIndex ? 600 : 400,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {song.title}
                </div>
                <div style={{
                  color: 'rgba(255,255,255,0.5)',
                  fontSize: '11px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>
                  {song.artist}
                </div>
              </div>
              {index === currentSongIndex && isPlaying && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2px',
                }}>
                  <div style={{ width: '3px', height: '12px', backgroundColor: 'white', borderRadius: '1px', animation: 'musicBar1 0.5s ease-in-out infinite' }} />
                  <div style={{ width: '3px', height: '16px', backgroundColor: 'white', borderRadius: '1px', animation: 'musicBar2 0.5s ease-in-out infinite 0.1s' }} />
                  <div style={{ width: '3px', height: '10px', backgroundColor: 'white', borderRadius: '1px', animation: 'musicBar3 0.5s ease-in-out infinite 0.2s' }} />
                </div>
              )}
            </div>
          ))}
          <style>{`
            @keyframes musicBar1 {
              0%, 100% { height: 12px; }
              50% { height: 6px; }
            }
            @keyframes musicBar2 {
              0%, 100% { height: 16px; }
              50% { height: 8px; }
            }
            @keyframes musicBar3 {
              0%, 100% { height: 10px; }
              50% { height: 14px; }
            }
          `}</style>
        </div>
      )}

      {/* Main Player */}
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        borderRadius: '12px',
        padding: '10px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
        minWidth: '200px'
      }}>
        <audio
          ref={audioRef}
          src={currentSong?.src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleSongEnd}
          onLoadedMetadata={handleTimeUpdate}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Album Cover - Clickable */}
          <div
            onClick={() => songs.length > 1 && setShowSongList(!showSongList)}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '6px',
              overflow: 'hidden',
              flexShrink: 0,
              cursor: songs.length > 1 ? 'pointer' : 'default',
              position: 'relative',
            }}
          >
            <img
              src={currentSong?.cover}
              alt={currentSong?.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            {songs.length > 1 && (
              <div style={{
                position: 'absolute',
                bottom: '1px',
                right: '1px',
                backgroundColor: 'rgba(0,0,0,0.7)',
                borderRadius: '2px',
                padding: '0px 3px',
                fontSize: '8px',
                color: 'white',
              }}>
                {currentSongIndex + 1}/{songs.length}
              </div>
            )}
          </div>

          {/* Song Info */}
          <div
            onClick={() => songs.length > 1 && setShowSongList(!showSongList)}
            style={{ flex: 1, minWidth: 0, cursor: songs.length > 1 ? 'pointer' : 'default' }}
          >
            <div style={{
              color: 'white',
              fontSize: '12px',
              fontWeight: 600,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {currentSong?.title}
            </div>
            <div style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '10px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {currentSong?.artist}
            </div>
          </div>

          {/* Controls */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2px'
          }}>
            <button
              onClick={prevSong}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.8
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
              </svg>
            </button>
            <button
              onClick={togglePlay}
              style={{
                background: 'white',
                border: 'none',
                borderRadius: '50%',
                width: '28px',
                height: '28px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {isPlaying ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="black">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="black">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
            <button
              onClick={nextSong}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                padding: '2px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 0.8
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div
          onClick={handleProgressClick}
          style={{
            width: '100%',
            height: '3px',
            backgroundColor: 'rgba(255,255,255,0.2)',
            borderRadius: '2px',
            marginTop: '8px',
            cursor: 'pointer',
          }}
        >
          <div style={{
            width: `${progress}%`,
            height: '100%',
            backgroundColor: 'white',
            borderRadius: '2px',
            transition: 'width 0.1s linear'
          }} />
        </div>

        {/* Time & Volume Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '4px'
        }}>
          <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="rgba(255,255,255,0.6)">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{
                width: '50px',
                height: '3px',
                cursor: 'pointer',
                accentColor: 'white'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
