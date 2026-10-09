import { heroIntro } from '@/animations/heroIntro'
import { gsap } from '@/lib/gsap'

/*
 * Opening sequence. Timings are taken frame by frame from the Urban reference
 * (30fps, 416×870). The reference's ~2.5s of initial black is page-load time,
 * so it's shortened to a deliberate hold here.
 *
 *   letters  opacity only, left to right, ~0.6s each       (ref 2.5–3.9s)
 *   frame    one clockwise stroke from the top-left corner,
 *            power2.inOut over 1.05s                       (ref 4.2–5.25s)
 *   lift     curtain rises, power2.inOut 1.1s, starting
 *            just before the stroke closes                  (ref 5.17–6.3s)
 *   mark     fades out with an accelerating curve          (ref 5.1–5.85s)
 *   header   fades in as the curtain clears the top        (ref ~6.2s)
 */
export const INTRO = {
  hold: 0.6,
  letterDuration: 0.7,
  letterStagger: 0.9, // total spread across all letters
  pauseBeforeFrame: 0.3,
  frameDuration: 1.05,
  liftOverlap: 0.08, // curtain starts this long before the frame closes
  liftDuration: 1.1,
  markFadeLead: 0.07, // mark starts fading slightly before the lift
  markFadeDuration: 0.75,
  heroAt: 0.55, // hero copy starts animating this far into the lift
  headerAt: 0.95,
} as const

type IntroTargets = {
  letters: Element[]
  frame: Element | null
  curtain: Element | null
  mark: Element | null
  header: Element | null
}

export function introTimeline(t: IntroTargets, onComplete: () => void) {
  const tl = gsap.timeline({ onComplete })

  tl.to(t.letters, {
    opacity: 1,
    duration: INTRO.letterDuration,
    ease: 'power1.inOut',
    stagger: { amount: INTRO.letterStagger },
  }, INTRO.hold)
    .to(t.frame, { strokeDashoffset: 0, duration: INTRO.frameDuration, ease: 'power2.inOut' }, `+=${INTRO.pauseBeforeFrame}`)
    .addLabel('lift', `-=${INTRO.liftOverlap}`)
    .to(t.curtain, { yPercent: -100, duration: INTRO.liftDuration, ease: 'power2.inOut' }, 'lift')
    .to(t.mark, { opacity: 0, duration: INTRO.markFadeDuration, ease: 'power2.in' }, `lift-=${INTRO.markFadeLead}`)
    .add(heroIntro(), `lift+=${INTRO.heroAt}`)
    .fromTo(t.header, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power1.out' }, `lift+=${INTRO.headerAt}`)

  return tl
}

/** Reduced motion: no movement. The framed mark shows, then everything cross-fades. */
export function introTimelineReduced(t: IntroTargets, onComplete: () => void) {
  return gsap
    .timeline({ onComplete })
    .set(t.letters, { opacity: 1 })
    .set(t.frame, { strokeDashoffset: 0 })
    .to([t.curtain, t.mark], { autoAlpha: 0, duration: 0.5, ease: 'none' }, 0.9)
    .fromTo(t.header, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'none' }, 0.9)
}
