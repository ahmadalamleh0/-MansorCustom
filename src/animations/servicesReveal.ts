import { gsap, mq, ScrollTrigger } from '@/lib/gsap'

/**
 * Staggered card reveal as the grid scrolls into view. Call inside useGSAP
 * scoped to the Services section. With reduced motion, cards render in their
 * final state.
 */
export function servicesReveal() {
  const mm = gsap.matchMedia()

  mm.add(mq.motionOk, () => {
    gsap.set('[data-service-card]', { autoAlpha: 0, y: 48 })
    ScrollTrigger.batch('[data-service-card]', {
      start: 'top 88%',
      once: true,
      onEnter: (cards) =>
        gsap.to(cards, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1, ease: 'expo.out', overwrite: true }),
    })
  })

  return mm
}
