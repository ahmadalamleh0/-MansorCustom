import { gsap, mq } from '@/lib/gsap'

/**
 * Hero entrance. Call inside useGSAP (scoped to the hero) so everything it
 * creates, including the matchMedia branch, is reverted on unmount.
 * Restrained on purpose; the cinematic hero sequence replaces this once the
 * creative direction lands.
 */
export function heroIntro() {
  const mm = gsap.matchMedia()

  mm.add(mq.motionOk, () => {
    gsap
      .timeline({ defaults: { ease: 'expo.out', duration: 1.2 } })
      .from('[data-hero-line]', { yPercent: 110, stagger: 0.08 })
      .from('[data-hero-fade]', { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.9 }, '-=0.8')
  })

  return mm
}
