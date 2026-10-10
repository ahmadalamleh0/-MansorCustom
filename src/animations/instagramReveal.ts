import { gsap, mq } from '@/lib/gsap'

/**
 * Instagram showcase entrance. Call inside useGSAP scoped to the section.
 *  - Profile: the avatar settles in (slight scale + fade), then the handle,
 *    meta and buttons rise in a short stagger.
 *  - Panels: each photo unmasks upward (clip-path) with a small stagger.
 * Once only, ease-out (entering), transforms/opacity/clip-path only.
 * Reduced motion: final state, no movement.
 */
export function instagramReveal() {
  const mm = gsap.matchMedia()

  mm.add(mq.motionOk, () => {
    const profile = gsap.timeline({
      defaults: { ease: 'expo.out', duration: 1 },
      scrollTrigger: { trigger: '[data-ig-profile]', start: 'top 82%', once: true },
    })
    profile
      .from('.instagram__avatar', { autoAlpha: 0, scale: 0.94 })
      .from('.instagram__handle, .instagram__meta, .instagram__actions', { autoAlpha: 0, y: 14, stagger: 0.07, duration: 0.9 }, '-=0.75')

    gsap.fromTo(
      '[data-ig-panel]',
      { clipPath: 'inset(100% 0% 0% 0% round 0.625rem)' },
      {
        clipPath: 'inset(0% 0% 0% 0% round 0.625rem)',
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.09,
        scrollTrigger: { trigger: '.instagram__gallery', start: 'top 85%', once: true },
      },
    )
  })

  return mm
}
