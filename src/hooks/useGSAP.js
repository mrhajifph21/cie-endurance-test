import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * useGSAP — registers ScrollTrigger and provides a context cleanup
 * @param {Function} setup - GSAP setup function receives (gsap, ScrollTrigger)
 * @param {Array} deps - effect dependencies
 */
export function useGSAP(setup, deps = []) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const ctx = gsap.context(() => setup(gsap, ScrollTrigger))
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
