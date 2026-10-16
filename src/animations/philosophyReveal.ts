import { gsap, mq } from '@/lib/gsap'

/** When the headlights ignite (s after the section enters) */
const IGNITION = 0.9

/**
 * "Beyond Factory." entrance. Call inside useGSAP scoped to the section.
 * The car is stationary at its final size and position from the start: no
 * zoom, no translate. The headline rises in, the copy and CTA follow, and
 * the headlights power on:
 *   1. power pulse: the lit photo flashes in at half strength and drops back
 *   2. ignition: it snaps to full (power4.out), so the real light on the
 *      bodywork and floor arrives with it
 *   3. a white bloom flares at the lamps and settles; the halo opens
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

    gsap
      .timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: '.philosophy__inner', start: 'top 78%', once: true },
      })
      .from(headline, { autoAlpha: 0, y: 22, duration: 1.1 })
      .from(rest, { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08 }, 0.7)

      // 1. Power pulse
      .to('[data-ph-on]', { opacity: 0.5, duration: 0.05, ease: 'none' }, T)
      .to('[data-ph-bloom]', { opacity: 0.35, scale: 0.9, duration: 0.05, ease: 'none' }, T)
      .to('[data-ph-on]', { opacity: 0.04, duration: 0.12, ease: 'power2.in' }, T + 0.05)
      .to('[data-ph-bloom]', { opacity: 0, scale: 0.8, duration: 0.12, ease: 'power2.in' }, T + 0.05)

      // 2. Ignition
      .to('[data-ph-on]', { opacity: 1, duration: 0.22, ease: 'power4.out' }, T + 0.32)

      // 3. Flare and settle
      .to('[data-ph-bloom]', { opacity: 1, scale: 1.12, duration: 0.22, ease: 'power3.out' }, T + 0.32)
      .to('[data-ph-bloom]', { opacity: 0.4, scale: 1, duration: 0.9, ease: 'power2.inOut' }, T + 0.56)
      .to('[data-ph-halo]', { opacity: 0.9, scale: 1.05, duration: 0.3, ease: 'power3.out' }, T + 0.38)
      .to('[data-ph-halo]', { opacity: 0.55, scale: 1, duration: 0.9, ease: 'power2.inOut' }, T + 0.7)
  })

  return mm
}
