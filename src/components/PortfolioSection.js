'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const projects = [
  {
    id: '01',
    category: 'IT PROJECT',
    name: 'TUNIFY',
    tagline: 'Music streaming, reimagined.',
    description:
      'Aplikasi streaming musik full-stack dengan logic recommendation engine, real-time playlist sync, dan UI yang terinspirasi dari vinyl culture. Dibangun dengan Next.js, Node.js, dan PostgreSQL.',
    skills: ['NEXT.JS', 'NODE.JS', 'POSTGRESQL', 'WEBSOCKET', 'TAILWIND'],
    accent: '#c8a94a',
    icon: '♫',
    status: 'PRODUCTION',
    year: '2024',
  },
  {
    id: '02',
    category: 'CREATIVE PROJECT',
    name: 'REPUBLIK KOMEDI PUTAR',
    tagline: 'Media. Teater. Absurdisme.',
    description:
      'Pengalaman sebagai Produser Media & Teater UI — mengelola konten kreatif, produksi pertunjukan, dan storytelling kolaboratif di lingkungan kampus. Dari stage ke screen.',
    skills: ['MEDIA PRODUCTION', 'TEATER UI', 'CREATIVE DIRECTION', 'STORYTELLING'],
    accent: '#b85c38',
    icon: '◎',
    status: 'ONGOING',
    year: '2022–NOW',
  },
  {
    id: '03',
    category: 'PERSONA',
    name: 'JAYC',
    tagline: 'R&B / Hip-Hop / DJ Culture.',
    description:
      'Alias di skena musik Jakarta. Sebagai DJ JayC, menjelajahi estetika R&B dan hip-hop melalui mixing, curating set, dan membangun identitas sonic yang distinct dari dua dunia — kampus dan panggung.',
    skills: ['R&B', 'HIP-HOP', 'DJ SET', 'SOUND CURATION', 'JAKARTA SCENE'],
    accent: '#7d9cc6',
    icon: '◈',
    status: 'ACTIVE',
    year: '2021–NOW',
  },
]

export default function PortfolioSection() {
  const sectionRef = useRef(null)
  const stitchPathRef = useRef(null)
  const stitchWrapRef = useRef(null)
  const headerRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {

      gsap.set(headerRef.current, { opacity: 0, y: 50 })
      gsap.set('.portfolio-card', { opacity: 0, y: 120, rotateX: 8 })

      gsap.to(headerRef.current,
        {
          y: 0, opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 88%',
            once: true,
          }
        }
      )

      const path = stitchPathRef.current
      if (path) {
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: stitchWrapRef.current,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1.0,
          }
        })
      }

      gsap.to('.portfolio-card',
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.0,
          ease: 'power3.out',
          stagger: 0.18,
          scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 85%',
            once: true,
          }
        }
      )

      gsap.to('.card-border-shimmer', {
        backgroundPosition: '200% center',
        duration: 3,
        ease: 'none',
        repeat: -1,
        stagger: 0.8,
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative" id="portfolio"
      style={{ paddingTop: '80px', paddingBottom: '100px' }}>

      <div ref={headerRef} style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div style={{ width: '40px', height: '1px', background: '#c8a94a', flexShrink: 0 }} />
          <span style={{
            fontFamily: 'Space Mono, monospace', fontSize: '9px',
            color: '#c8a94a', letterSpacing: '0.25em',
          }}>
            PORTFOLIO / THE STITCHES
          </span>
        </div>

        <h2 style={{
          fontFamily: 'Bebas Neue, sans-serif',
          fontSize: 'clamp(42px, 7vw, 90px)',
          lineHeight: '0.88',
          color: '#e8e0d0',
          letterSpacing: '0.04em',
          marginBottom: '40px',
        }}>
          STITCHED<br />
          <span style={{ color: 'transparent', WebkitTextStroke: '2px #c8a94a' }}>WORKS</span>
        </h2>
      </div>

      <div ref={stitchWrapRef}
        style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', marginBottom: '48px' }}>
        <svg width="100%" height="20" viewBox="0 0 1100 20" preserveAspectRatio="none">
          <path
            ref={stitchPathRef}
            d="M 0 10 L 1100 10"
            stroke="#c8a94a"
            strokeWidth="3"
            strokeDasharray="18 10"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 0 10 L 1100 10"
            stroke="rgba(200,169,74,0.12)"
            strokeWidth="1"
            strokeDasharray="4 24"
            fill="none"
          />
        </svg>
      </div>

      <div className="portfolio-grid"
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          perspective: '1000px',
        }}>
        {projects.map((project) => (
          <div
            key={project.id}
            className="portfolio-card"
            style={{
              background: 'linear-gradient(160deg, #1a2640 0%, #0d1421 100%)',
              border: `1px solid ${project.accent}30`,
              borderRadius: '4px',
              overflow: 'hidden',
              cursor: 'crosshair',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              gsap.to(e.currentTarget, {
                y: -8, scale: 1.02,
                boxShadow: `0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px ${project.accent}55`,
                duration: 0.3, ease: 'power2.out',
              })
            }}
            onMouseLeave={(e) => {
              gsap.to(e.currentTarget, {
                y: 0, scale: 1,
                boxShadow: 'none',
                duration: 0.4, ease: 'power2.out',
              })
            }}
          >
            <div style={{
              position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
              backgroundImage: `repeating-linear-gradient(-45deg, transparent, transparent 3px, rgba(255,255,255,0.008) 3px, rgba(255,255,255,0.008) 6px)`,
            }} />

            <div className="card-border-shimmer" style={{
              height: '3px',
              background: `linear-gradient(90deg, ${project.accent}00, ${project.accent}, ${project.accent}cc, ${project.accent}00)`,
              backgroundSize: '200% auto',
              position: 'relative', zIndex: 1,
            }} />

            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '10px 18px 8px',
              borderBottom: `1px dashed ${project.accent}20`,
              position: 'relative', zIndex: 1,
            }}>
              <span style={{
                fontFamily: 'Space Mono, monospace', fontSize: '7px',
                color: project.accent, letterSpacing: '0.15em',
              }}>{project.category}</span>
              <span style={{
                fontFamily: 'Space Mono, monospace', fontSize: '7px',
                color: 'rgba(154,144,128,0.5)', letterSpacing: '0.1em',
              }}>{project.year}</span>
            </div>

            <div style={{ padding: '18px', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                <span style={{
                  fontFamily: 'Space Mono, monospace', fontSize: '9px',
                  color: 'rgba(154,144,128,0.4)', letterSpacing: '0.1em',
                }}>#{project.id}</span>
                <span style={{ fontSize: '28px', color: `${project.accent}35`, lineHeight: 1 }}>{project.icon}</span>
              </div>

              <h3 style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: 'clamp(22px, 3vw, 32px)',
                color: '#e8e0d0', letterSpacing: '0.06em',
                lineHeight: '1', marginBottom: '6px',
              }}>{project.name}</h3>

              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '13px',
                fontStyle: 'italic', color: project.accent,
                letterSpacing: '0.06em', marginBottom: '12px',
              }}>{project.tagline}</p>

              <p style={{
                fontFamily: 'Barlow Condensed, sans-serif', fontSize: '13px',
                lineHeight: '1.6', color: 'rgba(154,144,128,0.85)',
                letterSpacing: '0.02em', marginBottom: '16px',
              }}>{project.description}</p>

              <div style={{ borderTop: `1px dashed ${project.accent}20`, paddingTop: '12px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
                  {project.skills.map((s) => (
                    <span key={s} style={{
                      fontFamily: 'Space Mono, monospace', fontSize: '6px',
                      color: 'rgba(154,144,128,0.65)',
                      border: `1px solid ${project.accent}22`,
                      padding: '2px 7px', borderRadius: '2px',
                      background: `${project.accent}08`,
                    }}>{s}</span>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                  <div style={{
                    width: '5px', height: '5px', borderRadius: '50%',
                    background: project.accent,
                    boxShadow: `0 0 6px ${project.accent}`,
                  }} />
                  <span style={{
                    fontFamily: 'Space Mono, monospace', fontSize: '7px',
                    color: project.accent, letterSpacing: '0.12em',
                  }}>{project.status}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
