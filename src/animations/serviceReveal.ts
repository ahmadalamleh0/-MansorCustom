import { gsap, mq } from '@/lib/gsap'

/**
 * Service page entrance, once on arrival. Restrained: the photo settles out
 * of the dark (fade + 1.04 → 1), the hairline draws, and the copy rises in a
 * short stagger. Transforms/opacity only. Reduced motion: final state.
 */
export function serviceReveal() {
  const mm = gsap.matchMedia()

  mm.add(mq.motionOk, () => {
    gsap
      .timeline({ defaults: { ease: 'expo.out' } })
      .from('[data-sp-media]', { autoAlpha: 0, scale: 1.04, duration: 1.6, ease: 'power3.out' })
      .from('[data-sp-text]', { autoAlpha: 0, y: 18, duration: 1, stagger: 0.07 }, 0.25)
      .from('[data-sp-rule]', { scaleX: 0, transformOrigin: 'left center', duration: 1 }, 0.4)
  })

  return mm
}
