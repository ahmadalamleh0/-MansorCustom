import { gsap } from '@/lib/gsap'

/**
 * Hero copy entrance, nested into the opening intro timeline as the curtain
 * lifts. Targets are queried from the document because the intro's GSAP
 * context is scoped to the overlay. Restrained on purpose: the hero's own
 * cinematic direction comes next.
 */
export function heroIntro() {
  const lines = document.querySelectorAll('[data-hero-line]')
  const fades = document.querySelectorAll('[data-hero-fade]')

  return gsap
    .timeline({ defaults: { ease: 'expo.out', duration: 1.2 } })
    .from(lines, { yPercent: 110, stagger: 0.08 })
    .from(fades, { autoAlpha: 0, y: 16, stagger: 0.08, duration: 0.9 }, '-=0.8')
}
