'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import PortfolioSection from './PortfolioSection'
import FooterSection from './FooterSection'
import GallerySection from './GallerySection'
import Image from 'next/image'

export default function MainContent({ userData, onLogout }) {
  const mainRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const timer = setTimeout(() => {
      gsap.fromTo(mainRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: 'power2.out' }
      )
    }, 50)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div ref={mainRef} style={{ opacity: 0 }} className="relative min-h-screen">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 py-4"
        style={{ background: 'linear-gradient(180deg, rgba(8,12,20,0.96) 0%, transparent 100%)', backdropFilter: 'blur(2px)' }}
      >
        <div style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '20px', color: '#c8a94a', letterSpacing: '0.12em' }}>
          JAYC
        </div>

        <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          <div style={{
            border: '1.5px dashed rgba(255,255,255,0.28)',
            padding: '4px 16px', borderRadius: '2px',
          }}>
        <Image
          src="/images/Logo Cretivox - Black.png"
          alt="Cretivox"
          width={110}
          height={30}
          style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.9 }}
        />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-8">
            {['ABOUT','PORTFOLIO','CONTACT'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`}
                style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: '#9a9080', letterSpacing: '0.2em', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = '#c8a94a'}
                onMouseLeave={e => e.currentTarget.style.color = '#9a9080'}
              >{item}</a>
            ))}
          </div>

          {userData && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                background: 'rgba(200,169,74,0.1)', border: '1px solid rgba(200,169,74,0.2)',
                borderRadius: '3px', padding: '4px 10px',
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#4a6741', boxShadow: '0 0 5px #4a6741' }} />
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', color: '#c8a94a', letterSpacing: '0.12em' }}>
                  UNLOCKED
                </span>
              </div>
              <button
                onClick={onLogout}
                style={{
                  fontFamily: 'Space Mono, monospace', fontSize: '7px',
                  color: 'rgba(154,144,128,0.5)', letterSpacing: '0.12em',
                  background: 'none', border: 'none', cursor: 'crosshair',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#b85c38'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(154,144,128,0.5)'}
              >
                LOCK
              </button>
            </div>
          )}
        </div>
      </nav>

      <HeroSection />
      <AboutSection />
      <PortfolioSection />
      <GallerySection />
      <FooterSection />

      {/* Ambient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div style={{ position: 'absolute', top: '20%', left: '-10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(200,169,74,0.04) 0%, transparent 70%)', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '30%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(184,92,56,0.04) 0%, transparent 70%)', filter: 'blur(50px)' }} />
      </div>
    </div>
  )
}
