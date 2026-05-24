'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function FooterSection() {
  const footerRef = useRef(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const ctx = gsap.context(() => {
      gsap.fromTo('.footer-content',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 85%',
            once: true,
          }
        }
      )
    }, footerRef)

    return () => ctx.revert()
  }, [])

  const socials = [
    { label: 'GITHUB', href: 'https://github.com/mrhajifph21', icon: '⌥', isExternal: true },
    { label: 'LINKEDIN', href: 'https://www.linkedin.com/in/muhammad-rhaji-firdaus-pramana-harianto-6562951a6/', icon: '◈', isExternal: true },
    { label: 'INSTAGRAM', href: 'https://www.instagram.com/mrhajifph_/', icon: '◎', isExternal: true },
    { label: 'EMAIL', href: 'mailto:mrhajifirdausph@gmail.com', icon: '◉', isExternal: false },
  ]

  return (
    <footer ref={footerRef} className="relative py-20 px-6 border-t" style={{ borderColor: 'rgba(200,169,74,0.15)' }}>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(200,169,74,0.04) 0%, transparent 70%)',
      }} />

      <div className="max-w-6xl mx-auto">
        <div className="footer-content text-center mb-12">
          <div style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '9px',
            color: '#c8a94a',
            letterSpacing: '0.25em',
            marginBottom: '12px',
          }}>
            LET'S BUILD SOMETHING
          </div>
          <h2 style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(42px, 8vw, 96px)',
            lineHeight: '0.9',
            color: '#e8e0d0',
            letterSpacing: '0.04em',
          }}>
            GET IN<br />
            <span style={{
              color: 'transparent',
              WebkitTextStroke: '2px #c8a94a',
            }}>
              TOUCH
            </span>
          </h2>
        </div>

        <div className="footer-content text-center mb-10">
          <a
            href="mailto:mrhajifirdausph@gmail.com"
            style={{
              fontFamily: 'Space Mono, monospace',
              fontSize: 'clamp(12px, 2vw, 18px)',
              color: '#c8a94a',
              letterSpacing: '0.1em',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(200,169,74,0.4)',
              paddingBottom: '2px',
              transition: 'color 0.2s',
            }}
          >
            MASUK CREATVIOX AAMIIN🤲
          </a>
        </div>

        <div className="footer-content flex justify-center gap-6 mb-16 flex-wrap">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target={s.isExternal ? "_blank" : "_self"}
              rel={s.isExternal ? "noopener noreferrer" : ""}
              style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: '8px',
                color: '#9a9080',
                letterSpacing: '0.15em',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#c8a94a' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#9a9080' }}
            >
              <span>{s.icon}</span>
              {s.label}
            </a>
          ))}
        </div>

        <div className="footer-content flex flex-col sm:flex-row justify-between items-center gap-4" style={{
          borderTop: '1px dashed rgba(200,169,74,0.15)',
          paddingTop: '20px',
        }}>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '7px',
            color: 'rgba(154,144,128,0.4)',
            letterSpacing: '0.15em',
          }}>
            © 2026 RHAJI FPH — JAYC EDITION
          </span>

          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '7px',
            color: 'rgba(154,144,128,0.4)',
            letterSpacing: '0.1em',
          }}>
            BUILT WITH NEXT.JS + TAILWIND + GSAP
          </span>

          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: '7px',
            color: 'rgba(154,144,128,0.4)',
            letterSpacing: '0.15em',
          }}>
            RAW DENIM / DIGITAL STREETWEAR
          </span>
        </div>
      </div>
    </footer>
  )
}
