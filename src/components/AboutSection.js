'use client'

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function AboutSection() {
  const sectionRef     = useRef(null)
  const sliderRef      = useRef(null)
  const leftFabricRef  = useRef(null)
  const rightFabricRef = useRef(null)
  const teethRef       = useRef(null)
  const contentRef     = useRef(null)
  const statsRef       = useRef(null)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsMobile(window.innerWidth < 1024)
      const handleResize = () => setIsMobile(window.innerWidth < 1024)
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      const slider      = sliderRef.current
      const leftFabric  = leftFabricRef.current
      const rightFabric = rightFabricRef.current
      const teeth       = teethRef.current
      const content     = contentRef.current

      gsap.set(slider,      { top: '-140px' })
      gsap.set(leftFabric,  { x: 0 })
      gsap.set(rightFabric, { x: 0 })
      gsap.set(teeth,       { clipPath: 'inset(0% 0 0 0)' })
      gsap.set(content,     { opacity: 0 })
      gsap.set('.about-line', { opacity: 0, y: 12 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=250%',
        pin: true,
        pinSpacing: true,
        scrub: 1.0,
        onUpdate: (self) => {
          const p  = self.progress
          const vh = window.innerHeight
          const vw = window.innerWidth

          const moveP   = Math.min(p / 0.75, 1)
          const sliderY = -140 + moveP * (vh + 80 + 140)

          if (slider) gsap.set(slider, { top: sliderY })

          const openPx = moveP * (vw * (isMobile ? 0.6 : 0.5))
          if (leftFabric)  gsap.set(leftFabric,  { x: -openPx })
          if (rightFabric) gsap.set(rightFabric, { x:  openPx })

          const tipY     = sliderY + 104
          const splitPct = Math.max(0, Math.min(100, (tipY / vh) * 100))
          if (teeth) gsap.set(teeth, { clipPath: `inset(${splitPct}% 0 0 0)` })

          const contentOpacity = Math.min(1, Math.max(0, (p - 0.08) / 0.4))
          if (content) gsap.set(content, { opacity: contentOpacity })

          if (p > 0.18) {
            gsap.to('.about-line', {
              opacity: 1, y: 0,
              stagger: 0.06, duration: 0.4, ease: 'power2.out',
              overwrite: 'auto',
            })
          }
        },
        onLeave: () => {
          document.querySelectorAll('.stat-number').forEach((el) => {
            const target = parseInt(el.dataset.target)
            const suffix = el.dataset.suffix || ''
            if (el.dataset.done) return
            el.dataset.done = '1'
            const obj = { val: 0 }
            gsap.to(obj, {
              val: target, duration: 1.8, ease: 'power2.out',
              onUpdate: () => { el.textContent = Math.round(obj.val) + suffix },
            })
          })
          document.querySelectorAll('.skill-bar-fill').forEach((bar) => {
            if (bar.dataset.done) return
            bar.dataset.done = '1'
            gsap.fromTo(bar,
              { scaleX: 0, transformOrigin: 'left center' },
              { scaleX: 1, duration: 1.2, ease: 'power3.out' }
            )
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  const skills = [
    { name: 'NEXT.JS / REACT',    level: 85, color: '#c8a94a' },
    { name: 'TAILWIND CSS',       level: 90, color: '#7d9cc6' },
    { name: 'NODE.JS / EXPRESS',  level: 78, color: '#b85c38' },
    { name: 'GSAP / ANIMATION',   level: 72, color: '#4a6741' },
    { name: 'CREATIVE DIRECTION', level: 88, color: '#c8a94a' },
  ]

  const ROWS = 64

  const toothW  = isMobile ? 8  : 12
  const toothH  = isMobile ? 7  : 9
  const gapW    = isMobile ? 4  : 6
  const trackW  = isMobile ? 20 : 32
  const sliderW = isMobile ? 42 : 56
  const sliderH = isMobile ? 54 : 72
  const arrowW  = isMobile ? 9  : 12
  const arrowH  = isMobile ? 12 : 16
  const eyeW    = isMobile ? 22 : 28
  const eyeH    = isMobile ? 14 : 18

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
    >
      {/* ── CONTENT ── */}
      <div
        ref={contentRef}
        className="pt-20 pb-20 lg:pt-32 lg:pb-32 px-4 sm:px-6"
        style={{ position: 'absolute', inset: 0, zIndex: 10, overflowY: 'auto' }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          <div className="about-line flex items-center gap-3 mb-6 lg:mb-10">
            <div style={{ width: '40px', height: '1px', background: '#c8a94a', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '9px', color: '#c8a94a', letterSpacing: '0.25em' }}>
              ABOUT / IDENTITY
            </span>
          </div>

          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-16 items-start">

            {/* Left */}
            <div className="w-full">
              <h2 className="about-line" style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(42px, 12vw, 78px)', lineHeight: '0.88',
                color: '#e8e0d0', letterSpacing: '0.04em', marginBottom: '20px',
              }}>
                THE<br /><span style={{ color: '#c8a94a' }}>RIPPED</span><br />IDENTITY
              </h2>

              <p className="about-line" style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '18px',
                fontWeight: '500', lineHeight: '1.5', color: 'rgba(232,224,208,0.9)',
                letterSpacing: '0.02em', marginBottom: '16px',
              }}>
                Mahasiswa IT yang menerjemahkan baris kode menjadi pengalaman interaktif dan engaging.
              </p>

              <p className="about-line" style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '16px',
                lineHeight: '1.6', color: 'rgba(154,144,128,0.9)',
                letterSpacing: '0.02em', marginBottom: '24px',
              }}>
                Merancang sistem yang scalable dan aplikasi yang intuitif di jam kerja. Mengeksplorasi produksi media,
                visual bercerita, dan setlist yang memacu adrenalin di waktu luang. Menggabungkan ketelitian seorang
                engineer dengan insting seorang creator.
              </p>

              <div className="about-line" style={{ borderLeft: '3px solid #c8a94a', paddingLeft: '16px', marginBottom: '24px' }}>
                <p style={{
                  fontFamily: 'Barlow Condensed, sans-serif', fontSize: '20px',
                  fontWeight: '700', fontStyle: 'italic', color: '#c8a94a',
                  letterSpacing: '0.04em', lineHeight: '1.3',
                }}>
                  &quot;Code is the fabric,<br />creativity is the cut.&quot;
                </p>
              </div>

              <div className="about-line flex flex-wrap gap-2">
                {['CCIT FTUI','FULL STACK','NEXT.JS','CREATIVOX','DJ JAYC','BEKASI'].map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'Space Mono, monospace', fontSize: '8px',
                    letterSpacing: '0.12em', color: '#9a9080',
                    border: '1px solid rgba(154,144,128,0.25)', padding: '4px 10px', borderRadius: '2px',
                  }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Right */}
            <div ref={statsRef} className="w-full mt-4 lg:mt-0">
              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-8 lg:mb-10">
                {[
                  { label: 'PROJECTS',  value: 12, suffix: '+' },
                  { label: 'SEMESTERS', value: 4,  suffix: ''  },
                  { label: 'GIGS',      value: 30, suffix: '+' },
                ].map(stat => (
                  <div key={stat.label} style={{
                    background: 'rgba(200,169,74,0.05)', border: '1px solid rgba(200,169,74,0.18)',
                    borderRadius: '4px', padding: '16px 4px', textAlign: 'center',
                  }}>
                    <div
                      className="stat-number"
                      data-target={stat.value}
                      data-suffix={stat.suffix}
                      style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: 'clamp(28px, 6vw, 40px)', color: '#c8a94a', lineHeight: '1' }}
                    >
                      0{stat.suffix}
                    </div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '6px', color: '#9a9080', letterSpacing: '0.1em', marginTop: '6px' }}>
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', color: 'rgba(200,169,74,0.5)', letterSpacing: '0.2em', marginBottom: '4px' }}>
                  TECHNICAL PROFICIENCY
                </div>
                {skills.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-1.5">
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: '#9a9080', letterSpacing: '0.1em' }}>{skill.name}</span>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: '8px', color: skill.color, fontWeight: '700' }}>{skill.level}%</span>
                    </div>
                    <div style={{ height: '3px', background: 'rgba(255,255,255,0.07)', borderRadius: '2px', overflow: 'hidden' }}>
                      <div className="skill-bar-fill" style={{
                        height: '100%', width: `${skill.level}%`,
                        background: `linear-gradient(90deg, ${skill.color}, ${skill.color}88)`, borderRadius: '2px',
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '28px', padding: '16px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(200,169,74,0.12)', borderRadius: '4px' }}>
                <div style={{ fontFamily: 'Space Mono, monospace', fontSize: '7px', color: 'rgba(200,169,74,0.5)', letterSpacing: '0.18em', marginBottom: '8px' }}>
                  EDUCATION
                </div>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '16px', fontWeight: '700', color: '#e8e0d0', letterSpacing: '0.05em' }}>
                  CCIT FTUI
                </div>
                <div style={{ fontFamily: 'Barlow Condensed, sans-serif', fontSize: '13px', color: '#9a9080', letterSpacing: '0.04em' }}>
                  Computer Science & Information Technology<br />Universitas Indonesia · Semester 4
                </div>
              </div>

              <div className="h-20 lg:h-0" />
            </div>
          </div>
        </div>
      </div>

      {/* ── LEFT FABRIC ── */}
      <div ref={leftFabricRef} style={{
        position: 'absolute', top: 0, bottom: 0, left: 0, width: '50%',
        zIndex: 20, pointerEvents: 'none',
        background: `
          repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,255,255,0.022) 2px, rgba(255,255,255,0.022) 4px),
          repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.014) 2px, rgba(255,255,255,0.014) 4px),
          linear-gradient(180deg, #0e1522 0%, #0a1019 100%)
        `,
        boxShadow: 'inset -12px 0 30px rgba(0,0,0,0.5)',
      }} />

      {/* ── RIGHT FABRIC ── */}
      <div ref={rightFabricRef} style={{
        position: 'absolute', top: 0, bottom: 0, right: 0, width: '50%',
        zIndex: 20, pointerEvents: 'none',
        background: `
          repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(255,255,255,0.022) 2px, rgba(255,255,255,0.022) 4px),
          repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.014) 2px, rgba(255,255,255,0.014) 4px),
          linear-gradient(180deg, #0e1522 0%, #0a1019 100%)
        `,
        boxShadow: 'inset 12px 0 30px rgba(0,0,0,0.5)',
      }} />

      {/* ── TEETH ── */}
      <div ref={teethRef} style={{
        position: 'absolute', top: 0, bottom: 0,
        left: '50%', transform: 'translateX(-50%)',
        width: `${trackW}px`,
        zIndex: 25, pointerEvents: 'none',
        display: 'flex', flexDirection: 'column',
      }}>
        {Array.from({ length: ROWS }).map((_, i) => (
          <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1px 0' }}>
            <div style={{
              width: `${toothW}px`, height: `${toothH}px`,
              background: i % 2 === 0
                ? 'linear-gradient(135deg, #d4a830 0%, #9a7018 100%)'
                : 'linear-gradient(135deg, #c09828 0%, #806010 100%)',
              borderRadius: '2px 4px 4px 2px',
              boxShadow: '1px 1px 3px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,100,0.35)',
            }} />
            <div style={{
              width: `${gapW}px`, height: '100%',
              background: 'linear-gradient(180deg, #1a2030, #0d1421)',
              borderLeft: '1px solid rgba(200,169,74,0.18)',
              borderRight: '1px solid rgba(200,169,74,0.18)',
            }} />
            <div style={{
              width: `${toothW}px`, height: `${toothH}px`,
              background: i % 2 === 0
                ? 'linear-gradient(225deg, #d4a830 0%, #9a7018 100%)'
                : 'linear-gradient(225deg, #c09828 0%, #806010 100%)',
              borderRadius: '4px 2px 2px 4px',
              boxShadow: '-1px 1px 3px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,220,100,0.35)',
            }} />
          </div>
        ))}
      </div>

      {/* ── CENTER SHADOW ── */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0,
        left: `calc(50% - ${trackW}px)`, width: `${trackW * 2}px`,
        zIndex: 18, pointerEvents: 'none',
        background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.6) 38%, rgba(0,0,0,0.6) 62%, transparent)',
      }} />

      {/* ── SLIDER ── */}
      <div ref={sliderRef} style={{
        position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        zIndex: 35, pointerEvents: 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        width: `${sliderW + 4}px`,
      }}>
        {/* Loop string */}
        <div style={{
          width: '18px', height: '13px',
          border: '3px solid #c8a030', borderBottom: 'none',
          borderRadius: '9px 9px 0 0', marginBottom: '-2px', zIndex: 1,
          boxShadow: '0 -2px 4px rgba(0,0,0,0.5)',
        }} />

        {/* Body */}
        <div style={{
          width: `${sliderW}px`, height: `${sliderH}px`,
          position: 'relative',
          background: 'linear-gradient(170deg, #f0d060 0%, #d4a830 25%, #b08020 65%, #8a6010 100%)',
          borderRadius: '7px 7px 12px 12px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.85), 0 2px 6px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,240,160,0.55), inset 0 -2px 0 rgba(0,0,0,0.35), inset 3px 0 6px rgba(255,220,80,0.15), inset -3px 0 6px rgba(0,0,0,0.25)',
          border: '1px solid rgba(255,210,60,0.35)',
        }}>
          {/* Ridges */}
          {[8, 18, 28, 38, 48].map(top => (
            <div key={top} style={{
              position: 'absolute', top, left: '6px', right: '6px', height: '2px',
              background: 'linear-gradient(90deg, rgba(0,0,0,0.35), rgba(255,220,80,0.12), rgba(0,0,0,0.35))',
              borderRadius: '1px',
            }} />
          ))}
          {/* Eye */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${eyeW}px`, height: `${eyeH}px`,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, #0d1421 55%, #162030 100%)',
            border: '1.5px solid rgba(200,169,74,0.7)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9)',
          }} />
          {/* Arrow */}
          <div style={{
            position: 'absolute', bottom: `-${arrowH - 2}px`, left: '50%', transform: 'translateX(-50%)',
            width: 0, height: 0,
            borderLeft: `${arrowW}px solid transparent`,
            borderRight: `${arrowW}px solid transparent`,
            borderTop: `${arrowH}px solid #8a6010`,
            filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.7))',
          }} />
        </div>

        {/* Tail */}
        <div style={{
          marginTop: '16px', width: '28px', height: '50px',
          background: 'linear-gradient(180deg, rgba(200,169,74,0.1) 0%, transparent 100%)',
          borderLeft: '2px solid rgba(200,169,74,0.3)',
          borderRight: '2px solid rgba(200,169,74,0.3)',
        }} />
      </div>
    </section>
  )
}
