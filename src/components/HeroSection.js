'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

export default function HeroSection() {
  const heroRef = useRef(null)
  const nameRef = useRef(null)
  const subRef = useRef(null)
  const [photoSrc, setPhotoSrc] = useState('depan')

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(nameRef.current,
          { y: 80, opacity: 0, skewY: 3 },
          { y: 0, opacity: 1, skewY: 0, duration: 1.0 }
        )
        .fromTo(subRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 }, '-=0.5'
        )
        .fromTo('.hero-accent-line',
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: 1, duration: 0.8, stagger: 0.1 }, '-=0.4'
        )
        .fromTo('.zipper-cta',
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }, '-=0.3'
        )
      }, heroRef)
      return () => ctx.revert()
    }, 150)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouse = (e) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 20
      const y = (e.clientY / innerHeight - 0.5) * 12
      if (nameRef.current) {
        gsap.to(nameRef.current, { x: x * 0.6, y: y * 0.4, duration: 1.5, ease: 'power2.out', overwrite: true })
      }
      if (subRef.current) {
        gsap.to(subRef.current, { x: x * 0.3, y: y * 0.2, duration: 1.5, ease: 'power2.out', overwrite: true })
      }
    }
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [])

  const handlePhotoMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const relX = (e.clientX - rect.left) / rect.width
    if (relX < 0.33) setPhotoSrc('kiri')
    else if (relX > 0.67) setPhotoSrc('kanan')
    else setPhotoSrc('depan')
  }

  const photoFile = {
    depan: '/images/DJ JAYC!!!!.JPG',
    kiri:  '/images/jam mahal euy.JPG',
    kanan: '/images/nyender.JPG',
  }

  const photoLabel = { depan: 'SISI DEPAN', kiri: 'SISI KIRI', kanan: 'SISI KANAN' }

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ paddingTop: '80px' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(200,169,74,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(200,169,74,0.05) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[0,1,2].map(i => (
          <div key={i} className="hero-accent-line absolute" style={{
            height: '1px',
            background: `rgba(200,169,74,${0.08 - i * 0.02})`,
            width: '140%', left: '-20%',
            top: `${20 + i * 30}%`,
            transform: `rotate(-${2 + i}deg)`,
          }} />
        ))}
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 max-w-6xl w-full">

        <div className="flex-1 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 mb-6">
            <div style={{ width: '24px', height: '1px', background: '#c8a94a' }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#c8a94a', letterSpacing: '0.25em' }}>
              21 MAY 2006 — BEKASI, ID
            </span>
            <div style={{ width: '24px', height: '1px', background: '#c8a94a' }} />
          </div>

          <div ref={nameRef} className="mb-4">
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(52px, 10vw, 110px)', lineHeight: '0.9', color: '#e8e0d0', letterSpacing: '0.04em' }}>
              MUHAMMAD
            </h1>
            <h1 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(52px, 10vw, 110px)', lineHeight: '0.9', color: '#c8a94a', letterSpacing: '0.04em' }}>
              RHAJI FPH
            </h1>
          </div>

          <div ref={subRef}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(18px, 3vw, 28px)', fontWeight: '700', color: '#e8e0d0', letterSpacing: '0.15em' }}>
                FULL STACK DEV
              </span>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#b85c38' }} />
              <span style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: 'clamp(18px, 3vw, 28px)', fontWeight: '700', color: '#b85c38', letterSpacing: '0.15em' }}>
                CREATIVE
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mt-4 justify-center lg:justify-start">
              {['CCIT FTUI', 'SEMESTER AKHIR', 'R&B/HIP-HOP', 'DJ JAYC'].map(tag => (
                <span key={tag} style={{
                  fontFamily: 'Space Mono, monospace', fontSize: '8px', letterSpacing: '0.12em',
                  color: '#9a9080', border: '1px solid rgba(154,144,128,0.3)', padding: '3px 8px', borderRadius: '2px',
                }}>{tag}</span>
              ))}
            </div>
          </div>

          <div className="zipper-cta mt-10 flex items-center gap-4 justify-center lg:justify-start">
            <div className="zipper-bounce">
              <svg width="32" height="40" viewBox="0 0 32 40" fill="none">
                <rect x="8" y="0" width="16" height="10" rx="2" fill="#c8a94a" />
                <rect x="12" y="4" width="8" height="4" rx="1" fill="#0d1421" />
                <path d="M4 10 L16 28 L28 10" stroke="#c8a94a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M8 22 L16 36 L24 22" stroke="rgba(200,169,74,0.4)" strokeWidth="2" fill="none" strokeLinecap="round" />
              </svg>
            </div>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'rgba(200,169,74,0.6)', letterSpacing: '0.15em' }}>
              SCROLL TO UNZIP
            </span>
          </div>
        </div>

        <div className="flex-shrink-0">
          <div className="flex justify-between mb-2 px-2">
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', color: 'rgba(200,169,74,0.4)', letterSpacing: '0.1em' }}>◀ LEFT</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', color: 'rgba(200,169,74,0.6)', letterSpacing: '0.1em' }}>CENTER ●</span>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', color: 'rgba(200,169,74,0.4)', letterSpacing: '0.1em' }}>RIGHT ▶</span>
          </div>

          <div
            onMouseMove={handlePhotoMouseMove}
            onMouseLeave={() => setPhotoSrc('depan')}
            style={{
              width: 'clamp(220px, 28vw, 300px)',
              aspectRatio: '9/16',
              borderRadius: '4px',
              cursor: 'crosshair',
              border: '1px solid rgba(200,169,74,0.25)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {(['depan','kiri','kanan']).map(key => (
              <div
                key={key}
                style={{
                  position: 'absolute', inset: 0,
                  opacity: photoSrc === key ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                }}
              >
                <Image
                  src={photoFile[key]}
                  alt={photoLabel[key]}
                  fill
                  style={{ objectFit: 'cover', objectPosition: 'center top' }}
                  priority={key === 'depan'}
                />
              </div>
            ))}

            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'linear-gradient(180deg, transparent 60%, rgba(8,12,20,0.7) 100%)',
              zIndex: 1,
            }} />

            <div style={{
              position: 'absolute', bottom: '10px', left: '10px', zIndex: 2,
              fontFamily: 'Space Mono, monospace', fontSize: '7px',
              color: 'rgba(200,169,74,0.8)', letterSpacing: '0.15em',
            }}>
              {photoLabel[photoSrc]}
            </div>

            {[{top:'8px',left:'8px'},{top:'8px',right:'8px'},{bottom:'8px',left:'8px'},{bottom:'8px',right:'8px'}].map((pos,i) => (
              <div key={i} style={{
                position: 'absolute', ...pos, zIndex: 2,
                width: '8px', height: '8px', borderRadius: '50%',
                border: '1px solid rgba(200,169,74,0.5)',
                background: 'rgba(200,169,74,0.15)',
              }} />
            ))}

            <div style={{ position: 'absolute', top: 0, left: '33.33%', width: '1px', height: '100%', background: 'rgba(200,169,74,0.08)', pointerEvents: 'none', zIndex: 2 }} />
            <div style={{ position: 'absolute', top: 0, left: '66.66%', width: '1px', height: '100%', background: 'rgba(200,169,74,0.08)', pointerEvents: 'none', zIndex: 2 }} />
          </div>

          <div className="mt-2 text-center" style={{ fontFamily: 'Space Mono, monospace', fontSize: '10px', color: 'rgba(154,144,128,0.5)', letterSpacing: '0.1em' }}>
            HOVER TO SWITCH PERSPECTIVES
          </div>
        </div>
      </div>
    </section>
  )
}
