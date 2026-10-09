/**
 * Single GSAP entry point. Import gsap, ScrollTrigger and useGSAP from here so
 * plugins are registered exactly once. Register new plugins (SplitText, Flip,
 * etc.) in this file only.
 */
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

gsap.defaults({ ease: 'power3.out', duration: 0.9 })

/**
 * Shared gsap.matchMedia() conditions. Every animation module builds its
 * variants from these, so breakpoints and reduced-motion handling stay
 * consistent across sections.
 */
export const mq = {
  motionOk: '(prefers-reduced-motion: no-preference)',
  reduceMotion: '(prefers-reduced-motion: reduce)',
  mobile: '(max-width: 767px)',
  tablet: '(min-width: 768px) and (max-width: 1023px)',
  desktop: '(min-width: 1024px)',
} as const

export { gsap, ScrollTrigger, useGSAP }
