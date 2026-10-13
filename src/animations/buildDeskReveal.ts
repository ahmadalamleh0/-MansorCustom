import { gsap, mq } from '@/lib/gsap'

/**
 * Build desk entrance (once, as the section enters): heading, lede and the
 * glass panel rise in a short stagger. Reduced motion: final state.
 */
export function buildDeskReveal() {
  const mm = gsap.matchMedia()
  mm.add(mq.motionOk, () => {
    gsap.from('[data-bd-reveal]', {
      autoAlpha: 0,
      y: 24,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.08,
      scrollTrigger: { trigger: '.build-desk__grid', start: 'top 80%', once: true },
    })
  })
  return mm
}

/** Restrained step transition: the new step's fields settle in (200ms-ish). */
export function stepIn(panel: HTMLElement | null) {
  const el = panel?.querySelector('[data-bd-step]')
  if (!el || !window.matchMedia(mq.motionOk).matches) return
  gsap.fromTo(el, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.32, ease: 'power3.out', clearProps: 'transform,opacity,visibility' })
}
