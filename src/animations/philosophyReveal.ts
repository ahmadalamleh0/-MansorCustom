import { gsap, mq } from '@/lib/gsap'

/** When the headlight startup begins (s into the reveal): the car is mostly out of the dark */
const IGNITION = 1.3

/**
 * "Beyond Factory." entrance. Call inside useGSAP scoped to the section.
 * Restrained, once only, ease-out: the headline rises in, the car emerges
 * from the dark (fade + slight settle), the arc draws outward from its top
 * tick, then the copy and CTA follow.
 *
 * Then the car powers on, as a startup sequence:
 *   1. power pulse: the LEDs flash briefly at half output and drop back
 *   2. wake: the three LED bars of each lamp switch on top to bottom
 *      (sharp power4.out, 80ms apart), as the real lights fade in from the
 *      retouched "off" patches
 *   3. full power: the white core bloom flares and settles bright, the halo
 *      opens, the veil over the car lifts (the car "wakes")
 *   4. spill rises onto the bodywork, bumper and grille, and stays
 * Reduced motion: final state (lights on), no movement.
 */
export function philosophyReveal() {
  const mm = gsap.matchMedia()

  mm.add(mq.motionOk, () => {
    const [headline, ...rest] = gsap.utils.toArray<HTMLElement>('[data-ph-text]')
    const T = IGNITION

    // Car dark until the startup plays (reverted by matchMedia on cleanup)
    gsap.set('[data-ph-led-off]', { opacity: 1 })
    gsap.set('[data-ph-bloom]', { opacity: 0, scale: 0.8 })
    gsap.set('[data-ph-halo]', { opacity: 0, scale: 0.85 })
    gsap.set('[data-ph-spill]', { opacity: 0 })
    gsap.set('[data-ph-dim]', { opacity: 0.24 })

    gsap
      .timeline({
        defaults: { ease: 'expo.out' },
        scrollTrigger: { trigger: '.philosophy__inner', start: 'top 78%', once: true },
      })
      .from(headline, { autoAlpha: 0, y: 22, duration: 1.1 })
      .from('[data-ph-visual]', { autoAlpha: 0, scale: 1.05, duration: 1.8, ease: 'power3.out' }, 0.2)
      .from('[data-ph-tick]', { autoAlpha: 0, duration: 0.6, stagger: 0.06 }, 0.55)
      .fromTo('[data-ph-arc]', { strokeDashoffset: 1000 }, { strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut' }, 0.5)
      .from(rest, { autoAlpha: 0, y: 16, duration: 1, stagger: 0.08 }, 0.9)

      // 1. Power pulse
      .to('[data-ph-led-off]', { opacity: 0.5, duration: 0.05, ease: 'none' }, T)
      .to('[data-ph-bloom]', { opacity: 0.4, scale: 0.9, duration: 0.05, ease: 'none' }, T)
      .to('[data-ph-led-off]', { opacity: 1, duration: 0.1, ease: 'power2.in' }, T + 0.05)
      .to('[data-ph-bloom]', { opacity: 0, scale: 0.8, duration: 0.1, ease: 'power2.in' }, T + 0.05)

      // 2. Sequential wake, top bar to bottom bar
      .to('[data-ph-led-off][data-row="1"]', { opacity: 0, duration: 0.14, ease: 'power4.out' }, T + 0.28)
      .to('[data-ph-led-off][data-row="2"]', { opacity: 0, duration: 0.14, ease: 'power4.out' }, T + 0.36)
      .to('[data-ph-led-off][data-row="3"]', { opacity: 0, duration: 0.14, ease: 'power4.out' }, T + 0.44)

      // 3. Full power
      .to('[data-ph-bloom]', { opacity: 1, scale: 1.12, duration: 0.22, ease: 'power3.out' }, T + 0.3)
      .to('[data-ph-bloom]', { opacity: 0.85, scale: 1, duration: 0.7, ease: 'power2.inOut' }, T + 0.56)
      .to('[data-ph-halo]', { opacity: 1, scale: 1.05, duration: 0.3, ease: 'power3.out' }, T + 0.36)
      .to('[data-ph-halo]', { opacity: 0.8, scale: 1, duration: 0.8, ease: 'power2.inOut' }, T + 0.66)
      .to('[data-ph-dim]', { opacity: 0, duration: 0.7, ease: 'power2.out' }, T + 0.38)

      // 4. Spill onto the car, and it stays
      .to('[data-ph-spill]', { opacity: 1, duration: 0.9, ease: 'power2.out' }, T + 0.42)
  })

  return mm
}
