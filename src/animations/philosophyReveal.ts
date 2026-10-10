import { gsap, mq } from '@/lib/gsap'

/**
 * "Beyond Factory." entrance. Call inside useGSAP scoped to the section.
 * Restrained, once only, ease-out: the eyebrow and headline rise in, the car
 * emerges from the dark (fade + slight settle), the arc draws outward from
 * its top tick, then the copy and CTA follow.
 * Reduced motion: final state, no movement.
 */
export function philosophyReveal() {
  const mm = gsap.matchMedia()

  mm.add(mq.motionOk, () => {
    const [eyebrow, headline, ...rest] = gsap.utils.toArray<HTMLElement>('[data-ph-text]')

    gsap
      .timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: '.philosophy__inner', start: 'top 78%', once: true },
      })
      .from([eyebrow, headline], { autoAlpha: 0, y: 22, duration: 1.1, stagger: 0.08 })
      .from('[data-ph-visual]', { autoAlpha: 0, scale: 1.05, duration: 1.8, ease: 'power3.out' }, 0.2)
      .from('[data-ph-tick]', { autoAlpha: 0, duration: 0.6, stagger: 0.06 }, 0.55)
      .fromTo('[data-ph-arc]', { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0.5)
      .from(rest, { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08 }, 0.9)
  })

  return mm
}
