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
