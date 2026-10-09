import { heroIntro } from '@/animations/heroIntro'
import { gsap } from '@/lib/gsap'

/*
 * Opening sequence. Timings are taken frame by frame from the Urban reference
 * (30fps, 416×870). The reference's ~2.5s of initial black is page-load time,
 * so it's shortened to a deliberate hold here.
 *
 *   rules    Mansor signature (not from the reference): a 1px rule above
 *            and below the lockup draw outward from their centres
 *   letters  opacity only, left to right, ~0.6s each       (ref 2.5–3.9s)
 *   hold     a brief still beat on the finished lockup (the frame trace
 *            was removed at the creative director's request)
 *   lift     curtain rises, power2.inOut 1.1s               (ref 5.17–6.3s)
 *   mark     fades out with an accelerating curve          (ref 5.1–5.85s)
 *   header   fades in as the curtain clears the top        (ref ~6.2s)
 */
export const INTRO = {
  rulesAt: 0.35,
  rulesDuration: 1.0,
  rulesStagger: 0.12, // bottom rule follows the top one
  hold: 1.3, // letters begin as the rules settle
  letterDuration: 0.7,
  letterStagger: 0.9, // total spread across all letters
  holdBeforeLift: 0.75, // still beat on the finished lockup before the curtain rises
  liftDuration: 1.1,
  markFadeLead: 0.07, // mark starts fading slightly before the lift
  markFadeDuration: 0.75,
  heroAt: 0.55, // hero copy starts animating this far into the lift
  headerAt: 0.95,
} as const

type IntroTargets = {
  rules: Element[]
  letters: Element[]
  curtain: Element | null
  mark: Element | null
  header: Element | null
}

export function introTimeline(t: IntroTargets, onComplete: () => void) {
  const tl = gsap.timeline({ onComplete })

  // Signature rules draw outward from their centres, top then bottom
  tl.fromTo(t.rules,
    { opacity: 0, clipPath: 'inset(0 50% 0 50%)' },
    { opacity: 1, clipPath: 'inset(0 0% 0 0%)', duration: INTRO.rulesDuration, ease: 'expo.out', stagger: INTRO.rulesStagger },
    INTRO.rulesAt)

  tl.to(t.letters, {
    opacity: 1,
    duration: INTRO.letterDuration,
    ease: 'power1.inOut',
    stagger: { amount: INTRO.letterStagger },
  }, INTRO.hold)
    .addLabel('lift', `+=${INTRO.holdBeforeLift}`)
    .to(t.curtain, { yPercent: -100, duration: INTRO.liftDuration, ease: 'power2.inOut' }, 'lift')
    .to(t.mark, { opacity: 0, duration: INTRO.markFadeDuration, ease: 'power2.in' }, `lift-=${INTRO.markFadeLead}`)
    .add(heroIntro(), `lift+=${INTRO.heroAt}`)
    .fromTo(t.header, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'power1.out' }, `lift+=${INTRO.headerAt}`)

  return tl
}

/** Reduced motion: no movement. The lockup shows, then everything cross-fades. */
export function introTimelineReduced(t: IntroTargets, onComplete: () => void) {
  return gsap
    .timeline({ onComplete })
    .set(t.rules, { opacity: 1 })
    .set(t.letters, { opacity: 1 })
    .to([t.curtain, t.mark], { autoAlpha: 0, duration: 0.5, ease: 'none' }, 0.9)
    .fromTo(t.header, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5, ease: 'none' }, 0.9)
}
