'use client'

import { useState, useEffect } from 'react'

export default function PasswordGate({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [password, setPassword] = useState('')
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const unlocked = sessionStorage.getItem('unlocked')
    if (unlocked === 'true') {
      setIsUnlocked(true)
    }
    setIsChecking(false)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password.toLowerCase() === 'scrapbook') {
      sessionStorage.setItem('unlocked', 'true')
      setIsUnlocked(true)
    } else {
      setPassword('')
    }
  }

  if (isChecking) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: 'white'
      }} />
    )
  }

  if (isUnlocked) {
    return <>{children}</>
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px'
      }}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          autoFocus
          style={{
            padding: '12px 16px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            outline: 'none',
            width: '200px',
            textAlign: 'center'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '10px 24px',
            fontSize: '14px',
            backgroundColor: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          enter
        </button>
      </form>
    </div>
  )
}
