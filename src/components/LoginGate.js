'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export default function LoginGate({ onUnlock }) {
  const tagRef = useRef(null)
  const stringRef = useRef(null)
  const containerRef = useRef(null)
  const bgRef = useRef(null)
  const cutRef = useRef(null)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const isUnlocking = useRef(false)

  useEffect(() => {
    let ctx = gsap.context(() => {
      if (tagRef.current) {
        gsap.fromTo(tagRef.current,
          { y: -300, rotation: -15, opacity: 0 },
          { y: 0, rotation: 0, opacity: 1, duration: 1.2, ease: 'elastic.out(1, 0.5)', delay: 0.3 }
        )
      }
    }, containerRef)

    const handleMouseMove = (e) => {
      if (isUnlocking.current) return
      const { innerWidth, innerHeight } = window
      const xFactor = (e.clientX / innerWidth - 0.5) * 12
      const yFactor = (e.clientY / innerHeight - 0.5) * 4

      if (tagRef.current) {
        gsap.to(tagRef.current, {
          rotation: xFactor,
          y: yFactor * 3,
          duration: 1.2,
          ease: 'power2.out',
          overwrite: true,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const usernameGuess = email.includes('@') ? email.split('@')[0] : email

      const response = await fetch('https://dummyjson.com/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: usernameGuess,
          password: password,
          expiresInMins: 30,
        }),
      })

      if (!response.ok) {
        throw new Error('INVALID CREDENTIALS — ACCESS DENIED')
      }

      const data = await response.json()

      if (typeof window !== 'undefined') {
        localStorage.setItem('jayc_token', data.accessToken)
        localStorage.setItem('jayc_user', JSON.stringify(data))
      }

      isUnlocking.current = true
      playSuccessAnimation(data)

    } catch (err) {
      setLoading(false)
      setError(err.message || 'Connection failed. Check your credentials.')

      if (tagRef.current) {
        gsap.to(tagRef.current, {
          x: [-10, 10, -8, 8, -4, 4, 0],
          duration: 0.5,
          ease: 'power2.inOut',
        })
      }
    }
  }

  const playSuccessAnimation = (data) => {
    const tl = gsap.timeline()

    tl.to(stringRef.current, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 0.15,
      ease: 'power4.in',
    })

    if (cutRef.current) {
      tl.to(cutRef.current, { opacity: 1, duration: 0.1 }, '<')
    }

    tl.to(tagRef.current, {
      y: '110vh',
      rotation: gsap.utils.random(-25, 25),
      opacity: 0,
      duration: 1.0,
      ease: 'power3.in',
    }, '+=0.05')

    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.3')

    tl.call(() => onUnlock(data))
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-start pt-8"
      style={{
        background: 'radial-gradient(ellipse at center, rgba(13,20,33,0.6) 0%, rgba(8,12,20,0.85) 100%)',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div
        ref={bgRef}
        className="absolute inset-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,255,255,0.018) 2px, rgba(255,255,255,0.018) 4px),
            repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 4px)
          `,
          backgroundColor: '#080c14',
        }}
      />

      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 40%, rgba(0,0,0,0.7) 100%)'
      }} />

      <div
        ref={stringRef}
        className="relative z-10"
        style={{ width: '2px', height: '60px', background: 'linear-gradient(180deg, #c8a94a 0%, #9a7a30 100%)', transformOrigin: 'top center' }}
      />

      <div ref={cutRef} className="absolute top-16 z-10 text-yellow-400 text-xs font-mono opacity-0 pointer-events-none">
        ✂ CUT
      </div>

      <div
        ref={tagRef}
        className="relative z-10 price-tag"
        style={{ transformOrigin: 'top center' }}
      >
        <div className="flex justify-center mb-0">
          <div style={{
            width: '20px', height: '20px',
            borderRadius: '50%',
            border: '2.5px solid #c8a94a',
            background: '#080c14',
            boxShadow: '0 0 8px rgba(200,169,74,0.4)',
          }} />
        </div>

        <div
          className="relative flex flex-col"
          style={{
            width: '320px',
            background: 'linear-gradient(160deg, #f5f0e8 0%, #e8dfc8 40%, #d4c8a8 100%)',
            padding: '32px 28px 36px',
            borderRadius: '4px 4px 4px 48px',
            boxShadow: '4px 8px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.6)',
            clipPath: 'polygon(0 0, 100% 0, 100% 88%, 88% 100%, 0 100%)',
          }}
        >
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: 0, right: 0,
              top: `${12 + i * 14}%`,
              height: '1px',
              background: 'rgba(0,0,0,0.06)',
            }} />
          ))}

          <div className="flex items-center gap-3 mb-4">
            <div style={{
              width: '36px', height: '36px',
              background: '#0d1421',
              borderRadius: '2px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '14px', color: '#c8a94a', fontFamily: 'Space Mono, monospace',
              fontWeight: '700',
            }}>JC</div>
            <div>
              <div style={{ fontSize: '9px', color: '#666', fontFamily: 'Space Mono, monospace', letterSpacing: '0.15em' }}>CRETIVOX STUDIO</div>
              <div style={{ fontSize: '9px', color: '#666', fontFamily: 'Space Mono, monospace', letterSpacing: '0.1em' }}>INTERN COLLECTION</div>
            </div>
          </div>

          <div style={{ height: '1px', background: 'rgba(0,0,0,0.15)', marginBottom: '16px' }} />

          <div style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '28px',
            lineHeight: '1',
            color: '#0d1421',
            letterSpacing: '0.06em',
            marginBottom: '4px',
          }}>RHAJI FPH</div>
          <div style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '18px',
            color: '#b85c38',
            letterSpacing: '0.1em',
            marginBottom: '12px',
          }}>JAYC EDITION</div>

          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            color: '#555',
            letterSpacing: '0.08em',
            marginBottom: '4px',
          }}>100% FULL STACK</div>
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '10px',
            color: '#555',
            letterSpacing: '0.08em',
            marginBottom: '18px',
          }}>HEAVYWEIGHT NEXT.JS</div>

          <div className="flex gap-px mb-10" style={{ height: '36px' }}>
            {[3,1,2,1,3,2,1,2,3,1,2,1,3,1,2,3,1,2,1,3,2,1,2,1,3].map((w, i) => (
              <div key={i} style={{
                width: `${w * 1.2}px`,
                height: '100%',
                background: i % 3 === 0 ? '#0d1421' : i % 2 === 0 ? '#333' : '#0d1421',
                opacity: i % 4 === 0 ? 1 : 0.7,
              }} />
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="USERNAME / EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded"
              style={{
                background: 'rgba(13,20,33,0.08)',
                border: '1px solid rgba(13,20,33,0.3)',
                color: '#0d1421',
                fontFamily: 'Space Mono, monospace',
                fontSize: '14px',
                letterSpacing: '0.05em',
                padding: '10px 12px',
              }}
              required
            />

            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="PASSWORD"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded"
                style={{
                  background: 'rgba(13,20,33,0.08)',
                  border: '1px solid rgba(13,20,33,0.3)',
                  color: '#0d1421',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '14px',
                  letterSpacing: '0.05em',
                  padding: '10px 48px 10px 12px',
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2"
                style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: '10px',
                  color: '#444',
                  background: 'rgba(255,255,255,0.4)',
                  border: '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '2px',
                  cursor: 'pointer',
                  padding: '4px 6px',
                  letterSpacing: '0.05em',
                  fontWeight: 'bold',
                }}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>

            {error && (
              <div style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '10px',
                color: '#b85c38',
                letterSpacing: '0.05em',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
                ⚠ {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                background: loading ? 'rgba(13,20,33,0.5)' : '#0d1421',
                color: '#c8a94a',
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '16px',
                letterSpacing: '0.2em',
                padding: '12px 0',
                border: 'none',
                borderRadius: '2px',
                cursor: loading ? 'wait' : 'crosshair',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '6px',
              }}
            >
              {loading ? (
                <>
                  <span style={{
                    display: 'inline-block',
                    width: '12px', height: '12px',
                    border: '2px solid rgba(200,169,74,0.3)',
                    borderTopColor: '#c8a94a',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                  }} />
                  AUTHENTICATING...
                </>
              ) : '🔓 UNLOCK COLLECTION'}
            </button>
          </form>

          <div style={{
            marginTop: '16px',
            padding: '10px',
            border: '1px dashed rgba(0,0,0,0.25)',
            borderRadius: '4px',
            textAlign: 'center',
            fontFamily: 'Space Mono, monospace',
            fontSize: '12px',
            color: '#444',
            letterSpacing: '0.05em',
            background: 'rgba(255,255,255,0.3)'
          }}>
            <div style={{ fontWeight: 'bold', marginBottom: '4px', color: '#0d1421', fontSize: '10px' }}>[ TEST CREDENTIALS ]</div>
            <div>USER: <span style={{ color: '#b85c38', fontWeight: 'bold' }}>emilys</span></div>
            <div>PASS: <span style={{ color: '#b85c38', fontWeight: 'bold' }}>emilyspass</span></div>
          </div>

          <div style={{
            position: 'absolute',
            bottom: 0, right: 0,
            width: '60px', height: '60px',
            background: 'linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%)',
          }} />
        </div>

        <div style={{
          position: 'absolute',
          bottom: '-10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '10px', height: '10px',
          background: '#c8a94a',
          borderRadius: '50%',
          opacity: 0.5,
        }} />
      </div>

      <div className="absolute bottom-8 left-21 right-20 flex justify-center">
        <span style={{
          fontFamily: 'Space Mono, monospace',
          fontSize: '10px',
          color: 'rgba(200,169,74,0.4)',
          letterSpacing: '0.2em',
        }}>
          RAW DENIM / DIGITAL STREETWEAR
        </span>
      </div>
    </div>
  )
}
