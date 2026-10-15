import { useEffect, useRef, useState } from 'react'
import { introTimeline, introTimelineReduced } from '@/animations/intro'
import { Wordmark } from '@/components/brand/Wordmark'
import { useScrollLock } from '@/hooks/useScrollLock'
import { gsap, mq, useGSAP } from '@/lib/gsap'

const FONT_WAIT_MS = 1200

/**
 * Opening intro: black screen → signature rules → letter-by-letter stacked
 * wordmark → a brief hold → black curtain lifts to reveal the hero,
 * which is already rendered underneath. One GSAP timeline drives the whole sequence, including the hero
 * copy and header entrance. It never waits on hero media. The overlay unmounts
 * when the timeline completes, and a CSS failsafe clears it if script stalls.
 */
export function Intro({ onComplete }: { onComplete: () => void }) {
  const root = useRef<HTMLDivElement>(null)
  const [fontReady, setFontReady] = useState(false)
  useScrollLock(true)

  // Start at the top of the page and wait (briefly) for the brand font so
  // glyphs never swap mid-reveal. The timeline hold covers this wait.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
    let alive = true
    Promise.race([
      // Brand face for the wordmark, plus the hero headline face it reveals into
      Promise.all([document.fonts.load('1em Michroma'), document.fonts.load('1em "Bruno Ace SC"')]),
      new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS)),
    ]).finally(() => alive && setFontReady(true))
    return () => {
      alive = false
    }
  }, [])

  useGSAP(
    () => {
      if (!fontReady || !root.current) return
      const q = gsap.utils.selector(root)
      const targets = {
        rules: q('[data-intro-rule]'),
        letters: q('[data-wm-letter]'),
        curtain: root.current.querySelector('[data-intro-curtain]'),
        mark: root.current.querySelector('[data-intro-mark]'),
        header: document.querySelector('[data-site-header]'),
      }
      // Snap the lockup, then each rule, to whole device pixels: 1px strokes
      // on a fractional position anti-alias into soft grey 2px lines.
      const dpr = window.devicePixelRatio || 1
      const snap = (el: Element | null) => {
        if (!el) return
        const top = el.getBoundingClientRect().top
        gsap.set(el, { y: Math.round(top * dpr) / dpr - top })
      }
      snap(root.current.querySelector('.intro__lockup'))
      targets.rules.forEach(snap)

      const finish = () => {
        document.documentElement.classList.remove('intro-active')
        onComplete()
      }

      const mm = gsap.matchMedia()
      mm.add(mq.motionOk, () => {
        introTimeline(targets, finish)
      })
      mm.add(mq.reduceMotion, () => {
        introTimelineReduced(targets, finish)
      })
    },
    { scope: root, dependencies: [fontReady] },
  )

  return (
    <div ref={root} className="intro" aria-hidden="true">
      <div data-intro-curtain className="intro__curtain" />
      <div data-intro-mark className="intro__mark">
        {/* Same font-size as the wordmark, so the rules' em sizing tracks it */}
        <div className="intro__lockup wordmark--intro">
          <span data-intro-rule className="intro__rule intro__rule--top" />
          <Wordmark className="wordmark--intro" />
          <span data-intro-rule className="intro__rule intro__rule--bottom" />
        </div>
      </div>
    </div>
  )
}
