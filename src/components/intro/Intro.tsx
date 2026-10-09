import { useEffect, useRef, useState } from 'react'
import { introTimeline, introTimelineReduced } from '@/animations/intro'
import { FilmCut } from '@/components/brand/FilmCut'
import { Wordmark } from '@/components/brand/Wordmark'
import { useScrollLock } from '@/hooks/useScrollLock'
import { gsap, mq, useGSAP } from '@/lib/gsap'

const FONT_WAIT_MS = 1200

/**
 * Opening intro: black screen → Film Cut signature → letter-by-letter
 * wordmark → hairline frame trace → black curtain lifts to reveal the hero,
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
      document.fonts.load('1em Michroma'),
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
        filmA: root.current.querySelector('[data-film-line="a"]'),
        filmB: root.current.querySelector('[data-film-line="b"]'),
        letters: q('[data-wm-letter]'),
        frame: root.current.querySelector('[data-wm-frame]'),
        curtain: root.current.querySelector('[data-intro-curtain]'),
        mark: root.current.querySelector('[data-intro-mark]'),
        header: document.querySelector('[data-site-header]'),
      }
      // Snap the Film Cut to whole device pixels: 1px strokes on a fractional
      // position anti-alias into soft grey 2px lines.
      const cut = root.current.querySelector<HTMLElement>('.film-cut')
      if (cut) {
        const dpr = window.devicePixelRatio || 1
        const top = cut.getBoundingClientRect().top
        gsap.set(cut, { y: Math.round(top * dpr) / dpr - top })
      }

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
        {/* Same font-size as the wordmark, so the Film Cut's em sizing tracks it */}
        <div className="intro__lockup wordmark--intro">
          <FilmCut />
          <Wordmark framed className="wordmark--intro" />
        </div>
      </div>
    </div>
  )
}
