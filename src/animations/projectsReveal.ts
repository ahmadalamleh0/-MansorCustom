import { gsap, mq } from '@/lib/gsap'

/**
 * Recent Work entrance. Call inside useGSAP scoped to the section. The
 * headline rises in (as "Beyond Factory." does), then the cards rise in a
 * short left-to-right stagger as the strip enters, once only
 * (transform/opacity, expo.out). Off-screen cards in the scroller are
 * included, so the strip is complete when swiped.
 * Reduced motion: final state.
 */
export function projectsReveal() {
  const mm = gsap.matchMedia()

  mm.add(mq.motionOk, () => {
    // Headline rises in exactly as "Beyond Factory." does
    gsap.from('[data-projects-title]', {
      autoAlpha: 0,
      y: 22,
      duration: 1.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: '[data-projects-title]', start: 'top 85%', once: true },
    })

    gsap.from('[data-project]', {
      autoAlpha: 0,
      y: 36,
      duration: 1.2,
      ease: 'expo.out',
      stagger: 0.07,
      scrollTrigger: { trigger: '.projects__track', start: 'top 85%', once: true },
    })
  })

  return mm
}
