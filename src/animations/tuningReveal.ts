import { gsap, mq } from '@/lib/gsap'

/**
 * Tuning entrance (once, as the section enters): the media and text rise in,
 * and the tach scale revs: its ticks light left to right up to the redline,
 * then fall back to their resting levels (set in CSS). Reduced motion: the
 * resting state, no movement.
 */
export function tuningReveal() {
  const mm = gsap.matchMedia()
  mm.add(mq.motionOk, () => {
    const ticks = gsap.utils.toArray<HTMLElement>('[data-tn-tick]')
    const tl = gsap.timeline({
      scrollTrigger: { trigger: '.tuning__grid', start: 'top 75%', once: true },
    })
    tl.from('[data-tn-reveal]', { autoAlpha: 0, y: 24, duration: 1.1, ease: 'expo.out', stagger: 0.07 })
      // The rev: a quick sweep that accelerates into the redline…
      .fromTo(
        ticks,
        { opacity: 0.08 },
        { opacity: 1, duration: 0.08, ease: 'none', stagger: { each: 0.016, ease: 'power2.in' } },
        0.25,
      )
      // …then the needle drops back and the scale settles
      .to(ticks, { opacity: 0.08, duration: 0.35, ease: 'power2.out', stagger: { each: 0.006, from: 'end' } }, '>-0.02')
      .to(
        ticks,
        {
          opacity: (_: number, el: HTMLElement) => parseFloat(getComputedStyle(el).getPropertyValue('--rest')) || 0.3,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'opacity',
        },
        '>-0.1',
      )
  })
  return mm
}
