import { gsap, mq } from '@/lib/gsap'

/**
 * "Beyond Factory." entrance. Call inside useGSAP scoped to the section.
 * Restrained, once only, ease-out: the headline rises in, the car
 * emerges from the dark (fade + slight settle), the arc draws outward from
 * its top tick, then the copy and CTA follow. Once the car is mostly
 * visible the headlights ignite: the real LED lights fade in from the
 * retouched "off" patches (fast ease-out, like LEDs reaching full output),
 * the bloom flares and settles to its resting glow, the spill rises softly.
 * Reduced motion: final state (lights on), no movement.
 */
export function philosophyReveal() {
  const mm = gsap.matchMedia()

  mm.add(mq.motionOk, () => {
    const [headline, ...rest] = gsap.utils.toArray<HTMLElement>('[data-ph-text]')

    // Lights off until the ignition plays (reverted by matchMedia on cleanup)
    gsap.set('[data-ph-led-off]', { opacity: 1 })
    gsap.set('[data-ph-bloom]', { opacity: 0, scale: 0.85 })
    gsap.set('[data-ph-spill]', { opacity: 0 })

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
      // Ignition
      .to('[data-ph-led-off]', { opacity: 0, duration: 0.55, ease: 'power3.out' }, 1.25)
      .to('[data-ph-bloom]', { opacity: 1, scale: 1.06, duration: 0.32, ease: 'power2.out' }, 1.25)
      .to('[data-ph-bloom]', { opacity: 0.6, scale: 1, duration: 0.9, ease: 'power2.inOut' }, 1.57)
      .to('[data-ph-spill]', { opacity: 1, duration: 1.3, ease: 'power2.out' }, 1.3)
  })

  return mm
}
