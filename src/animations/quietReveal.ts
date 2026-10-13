import { gsap, mq } from '@/lib/gsap'

/**
 * Shared, restrained entrance for the quieter editorial sections (Journal,
 * FAQ): items rise in a short stagger once the list enters. Once only;
 * reduced motion shows the final state.
 */
export function quietReveal(items: string, trigger: string) {
  const mm = gsap.matchMedia()
  mm.add(mq.motionOk, () => {
    gsap.from(items, {
      autoAlpha: 0,
      y: 18,
      duration: 1,
      ease: 'expo.out',
      stagger: 0.07,
      scrollTrigger: { trigger, start: 'top 85%', once: true },
    })
  })
  return mm
}
