import { gsap, mq } from '@/lib/gsap'

/**
 * Build Brief entrance (once, as the section enters): kicker, heading, lede
 * and the sheet rise in a short stagger. Reduced motion: final state.
 */
export function buildDeskReveal() {
  const mm = gsap.matchMedia()
  mm.add(mq.motionOk, () => {
    gsap.from('[data-bd-reveal]', {
      autoAlpha: 0,
      y: 22,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.07,
      scrollTrigger: { trigger: '.build-brief__grid', start: 'top 80%', once: true },
    })
  })
  return mm
}
