import { gsap, mq } from '@/lib/gsap'

/**
 * Build Brief entrance (once, as the section enters): status pill, heading, lede
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
      scrollTrigger: { trigger: '.build-brief__panel', start: 'top 80%', once: true },
    })
  })
  return mm
}

/** Restrained step change: the new step's fields settle in (0.32s). */
export function stepIn(sheet: HTMLElement | null) {
  const el = sheet?.querySelector('[data-bd-step]')
  if (!el || !window.matchMedia(mq.motionOk).matches) return
  gsap.fromTo(el, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.32, ease: 'power3.out', clearProps: 'transform,opacity' })
}
