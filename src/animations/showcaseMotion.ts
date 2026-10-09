import { gsap, mq } from '@/lib/gsap'

/**
 * Showcase motion. Call inside useGSAP scoped to the section.
 *  - Logo row: a slow, linear marquee (constant motion → linear easing).
 *  - Image strip: drifts along its plane as the section scrolls through,
 *    tied to scroll (scrub) rather than autoplaying, so the depth reads as
 *    the visitor moves.
 * Reduced motion: both are static (the duplicate logo list is hidden in CSS).
 */
export function showcaseMotion() {
  const mm = gsap.matchMedia()

  mm.add(mq.motionOk, () => {
    gsap.to('[data-logo-track]', { xPercent: -50, duration: 38, ease: 'none', repeat: -1 })

    gsap.fromTo(
      '[data-banner-track]',
      { xPercent: 0 },
      {
        xPercent: -9,
        ease: 'none',
        scrollTrigger: { trigger: '.showcase__stage', start: 'top bottom', end: 'bottom top', scrub: 0.6 },
      },
    )
  })

  return mm
}
