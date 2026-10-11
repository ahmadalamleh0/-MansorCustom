import { gsap, mq } from '@/lib/gsap'

/**
 * Client reviews entrance. Call inside useGSAP scoped to the section. The
 * heading rises in, then the cards rise in a short stagger; once only,
 * transform/opacity, expo.out. Reduced motion: final state.
 */
export function reviewsReveal() {
  const mm = gsap.matchMedia()

  mm.add(mq.motionOk, () => {
    gsap.from('[data-reviews-title]', {
      autoAlpha: 0,
      y: 22,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '[data-reviews-title]', start: 'top 85%', once: true },
    })

    gsap.from('[data-review]', {
      autoAlpha: 0,
      y: 28,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.reviews__track', start: 'top 85%', once: true },
    })
  })

  return mm
}
