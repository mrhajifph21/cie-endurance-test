'use client'

import { useState, useEffect } from 'react'
import LoginGate from '@/components/LoginGate'
import MainContent from '@/components/MainContent'

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [userData, setUserData] = useState(null)
  const [checking, setChecking] = useState(true)

  useEffect(() => {
    try {
      const token = localStorage.getItem('jayc_token')
      const user = localStorage.getItem('jayc_user')
      if (token && user) {
        setUserData(JSON.parse(user))
        setIsUnlocked(true)
      }
    } catch (e) {}
    setChecking(false)
  }, [])

  const handleUnlock = (data) => {
    setUserData(data)
    setTimeout(() => setIsUnlocked(true), 1200)
  }

  const handleLogout = () => {
    localStorage.removeItem('jayc_token')
    localStorage.removeItem('jayc_user')
    setIsUnlocked(false)
    setUserData(null)
  }

  if (checking) {
    return (
      <div style={{
        position: 'fixed', inset: 0,
        background: '#080c14',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: '1px', height: '48px',
          background: 'linear-gradient(180deg, transparent, #c8a94a, transparent)',
          animation: 'pulse 1s ease-in-out infinite',
        }} />
      </div>
    )
  }

  return (
    <main className="relative min-h-screen">
      {!isUnlocked && <LoginGate onUnlock={handleUnlock} />}
      {isUnlocked && <MainContent userData={userData} onLogout={handleLogout} />}
    </main>
  )
}
