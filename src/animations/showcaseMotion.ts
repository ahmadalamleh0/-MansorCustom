import { gsap, mq } from '@/lib/gsap'

/**
 * Brand banner motion. Call inside useGSAP scoped to the section.
 * Logo row: a slow, linear marquee (constant motion → linear easing).
 * Reduced motion: static (the duplicate logo list is hidden in CSS).
 */
export function showcaseMotion() {
  const mm = gsap.matchMedia()

  mm.add(mq.motionOk, () => {
    gsap.to('[data-logo-track]', { xPercent: -50, duration: 38, ease: 'none', repeat: -1 })
  })

  return mm
}
