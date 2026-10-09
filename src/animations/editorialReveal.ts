import { gsap, mq, ScrollTrigger } from '@/lib/gsap'

/**
 * Quiet entrance for the editorial section: cards and statement rise in
 * slightly as they enter the viewport. Call inside useGSAP scoped to the
 * section. With reduced motion, everything renders in its final state.
 */
export function editorialReveal() {
  const mm = gsap.matchMedia()

  mm.add(mq.motionOk, () => {
    const targets = '[data-editorial-card], [data-editorial-statement]'
    gsap.set(targets, { autoAlpha: 0, y: 32 })
    ScrollTrigger.batch(targets, {
      start: 'top 90%',
      once: true,
      onEnter: (els) =>
        gsap.to(els, { autoAlpha: 1, y: 0, duration: 1.1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
    })
  })

  return mm
}
