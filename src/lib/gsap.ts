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

// Web fonts (font-display: swap) can land after triggers are measured and
// change section heights. Re-measure once they're in, or a trigger near the
// end of the page can sit past the maximum scroll and never fire.
// `loadingdone` fires for every load, whenever it starts (`fonts.ready` can
// resolve before a lazily used face is even requested).
if (typeof document !== 'undefined' && document.fonts) {
  document.fonts.addEventListener('loadingdone', () => ScrollTrigger.refresh())
}

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
