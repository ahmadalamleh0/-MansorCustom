import { gsap, mq } from '@/lib/gsap'

/** When the headlights ignite (s after the section enters) */
const IGNITION = 0.9

/**
 * "Beyond Factory." entrance. Call inside useGSAP scoped to the section.
 * The car is stationary at its final size and position from the start: no
 * zoom, no translate. The headline rises in, the arc draws outward from its
 * top tick, the copy and CTA follow, and the headlights power on:
 *   1. ignition: one hard strike, the lit photo snaps to full (expo.out),
 *      so the real light on the bodywork and floor arrives with it
 *   2. burst: the lamp bloom overshoots white-hot, the halo throws wide and
 *      a soft wash of light crosses the front of the car
 *   3. settle: all of it eases down to the resting glow (~1.5s)
 * Once only. Reduced motion: final state (lights on), no movement.
 */
export function philosophyReveal() {
  const mm = gsap.matchMedia()

  mm.add(mq.motionOk, () => {
    const [headline, ...rest] = gsap.utils.toArray<HTMLElement>('[data-ph-text]')
    const T = IGNITION

    // Lights off until the ignition plays (reverted by matchMedia on cleanup)
    gsap.set('[data-ph-on]', { opacity: 0 })
    gsap.set('[data-ph-bloom]', { opacity: 0, scale: 0.8 })
    gsap.set('[data-ph-halo]', { opacity: 0, scale: 0.85 })
    gsap.set('[data-ph-flash]', { opacity: 0, scale: 0.7 })

    gsap
      .timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: '.philosophy__inner', start: 'top 78%', once: true },
      })
      .from(headline, { autoAlpha: 0, y: 22, duration: 1.1 })
      .from('[data-ph-tick]', { autoAlpha: 0, duration: 0.6, stagger: 0.06 }, 0.35)
      .fromTo('[data-ph-arc]', { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0.3)
      .from(rest, { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08 }, 0.7)

      // 1. Ignition: one hard, immediate strike (no flicker). The lit photo
      //    snaps in, so the real light on the bodywork and floor arrives with it
      .to('[data-ph-on]', { opacity: 1, duration: 0.16, ease: 'expo.out' }, T)

      // 2. Burst: the lamps overshoot white-hot, the halo throws wide, and a
      //    soft wash of light crosses the front of the car
      .to('[data-ph-bloom]', { opacity: 1, scale: 1.4, duration: 0.14, ease: 'expo.out' }, T)
      .to('[data-ph-halo]', { opacity: 1, scale: 1.3, duration: 0.2, ease: 'expo.out' }, T + 0.02)
      .to('[data-ph-flash]', { opacity: 0.55, scale: 1, duration: 0.18, ease: 'expo.out' }, T + 0.02)

      // 3. Settle: everything eases down to its resting glow
      .to('[data-ph-bloom]', { opacity: 0.4, scale: 1, duration: 1.4, ease: 'power3.out' }, T + 0.18)
      .to('[data-ph-halo]', { opacity: 0.55, scale: 1, duration: 1.6, ease: 'power3.out' }, T + 0.22)
      .to('[data-ph-flash]', { opacity: 0, scale: 1.15, duration: 1.3, ease: 'power2.out' }, T + 0.22)
  })

  return mm
}
