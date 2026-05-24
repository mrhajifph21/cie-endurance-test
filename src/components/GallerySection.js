'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'

const photos = [
  { src: '/images/benerin jas.JPG',                        label: 'BENERIN JAS'  },
  { src: '/images/mendokuse.JPG',                          label: 'MENDOKUSE'    },
  { src: '/images/duduk model.JPG',                        label: 'DUDUK MODEL'  },
  { src: '/images/AADC (Ada Apa Dengan Controller).JPG',   label: 'AADC'         },
]

export default function GallerySection() {
  const sectionRef = useRef(null)
  const headerRef  = useRef(null)
  const trackRef   = useRef(null)
  const tweenRef   = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    let ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 88%', once: true }
        }
      )

      if (trackRef.current) {
        tweenRef.current = gsap.to(trackRef.current, {
          xPercent: -50,
          duration: 20,
          ease: 'none',
          repeat: -1,
        })

        trackRef.current.addEventListener('mouseenter', () => tweenRef.current?.pause())
        trackRef.current.addEventListener('mouseleave', () => tweenRef.current?.play())
      }

    }, sectionRef)

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} style={{ paddingTop: '60px', paddingBottom: '100px', overflow: 'hidden' }} id="gallery">

      <div ref={headerRef} style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', marginBottom: '40px', opacity: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
          <div style={{ width: '40px', height: '1px', background: '#c8a94a', flexShrink: 0 }} />
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#c8a94a', letterSpacing: '0.25em' }}>
            GALLERY / FIERCE EDITION
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(38px, 6vw, 80px)',
            lineHeight: '0.88', color: '#e8e0d0', letterSpacing: '0.04em',
          }}>
            SAYANG<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '2px #c8a94a' }}>KALAU DIBUANG</span>
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '8px' }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', color: 'rgba(154,144,128,0.5)', letterSpacing: '0.15em' }}>
              HOVER TO PAUSE
            </span>
            <div style={{ display: 'flex', gap: '3px' }}>
              {[0,1,2].map(i => (
                <div key={i} style={{ width: '16px', height: '2px', background: i === 0 ? '#c8a94a' : 'rgba(200,169,74,0.25)', borderRadius: '1px' }} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', marginBottom: '36px' }}>
        <svg width="100%" height="16" viewBox="0 0 1100 16" preserveAspectRatio="none">
          <path d="M 0 8 L 1100 8" stroke="#c8a94a" strokeWidth="2.5" strokeDasharray="14 8" strokeLinecap="round" fill="none" />
        </svg>
      </div>

      <div style={{ position: 'relative', width: '100%' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '120px', height: '100%', background: 'linear-gradient(90deg, #080c14 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '100%', background: 'linear-gradient(270deg, #080c14 0%, transparent 100%)', zIndex: 2, pointerEvents: 'none' }} />

        <div ref={trackRef} style={{ display: 'flex', width: 'max-content', cursor: 'crosshair' }}>
          <div style={{ display: 'flex', gap: '16px', paddingRight: '16px' }}>
            {photos.map((photo, i) => (
              <PhotoCard key={`set1-${i}`} photo={photo} />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', paddingRight: '16px' }}>
            {photos.map((photo, i) => (
              <PhotoCard key={`set2-${i}`} photo={photo} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '40px auto 0', padding: '0 24px' }}>
        <svg width="100%" height="16" viewBox="0 0 1100 16" preserveAspectRatio="none">
          <path d="M 0 8 L 1100 8" stroke="rgba(200,169,74,0.15)" strokeWidth="2" strokeDasharray="6 16" strokeLinecap="round" fill="none" />
        </svg>
      </div>
    </section>
  )
}

function PhotoCard({ photo }) {
  const cardRef = useRef(null)

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => gsap.to(cardRef.current, { scale: 1.04, y: -8, duration: 0.3, ease: 'power2.out' })}
      onMouseLeave={() => gsap.to(cardRef.current, { scale: 1, y: 0, duration: 0.4, ease: 'power2.out' })}
      style={{
        width: '200px',
        aspectRatio: '9/16',
        flexShrink: 0,
        borderRadius: '4px',
        overflow: 'hidden',
        border: '1px solid rgba(200,169,74,0.2)',
        position: 'relative',
        background: '#0d1421',
      }}
    >
      <Image
        src={photo.src}
        alt={photo.label}
        fill
        sizes="200px"
        style={{ objectFit: 'cover', objectPosition: 'center top' }}
      />

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
        backgroundImage: 'repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,0.006) 3px, rgba(255,255,255,0.006) 6px)',
      }} />

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
        padding: '32px 10px 10px',
        background: 'linear-gradient(0deg, rgba(8,12,20,0.88) 0%, transparent 100%)',
      }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '6px', color: 'rgba(200,169,74,0.7)', letterSpacing: '0.15em' }}>
          {photo.label}
        </div>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '5px', color: 'rgba(154,144,128,0.4)', letterSpacing: '0.1em', marginTop: '2px' }}>
          RHAJI FPH © 2026
        </div>
      </div>

      <div style={{
        position: 'absolute', top: '8px', right: '8px', zIndex: 2,
        width: '6px', height: '6px', borderRadius: '50%',
        border: '1px solid rgba(200,169,74,0.4)',
        background: 'rgba(200,169,74,0.1)',
      }} />
    </div>
  )
}
