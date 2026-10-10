import { useEffect, useRef, useState } from 'react'
import type { Reel } from '@/data/reels'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'
import { ArrowIcon, PauseIcon, PlayIcon } from './icons'

type ReelCardProps = {
  reel: Reel
  index: number
  total: number
  /** Where the link goes when the Reel has no permalink of its own */
  reelsUrl: string
}

/**
 * A 9:16 Reel in our own inline player.
 *  - Thumbnail first. The video src is only attached once the card nears the
 *    viewport, so no Reel video downloads with the initial page load.
 *  - Muted, inline, looping; plays while ≥ 50% visible, pauses off screen.
 *  - Play/pause button (the user's choice wins over autoplay). Reduced
 *    motion: never autoplays, and nothing loads until the user presses play.
 *  - No file (Meta withholds Reels with licensed music) or a failed one (an
 *    expired Instagram CDN URL): the thumbnail stays, without a play
 *    button, and "View Reel" opens the original on Instagram.
 */
export function ReelCard({ reel, index, total, reelsUrl }: ReelCardProps) {
  const root = useRef<HTMLDivElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const reduceMotion = usePrefersReducedMotion()

  const [near, setNear] = useState(false)
  const [visible, setVisible] = useState(false)
  // 'auto' follows the motion preference; a press on the toggle overrides it
  const [choice, setChoice] = useState<'auto' | 'play' | 'pause'>('auto')
  const wantPlay = choice === 'play' || (choice === 'auto' && !reduceMotion)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)
  const playable = !!reel.video && !failed

  useEffect(() => {
    const el = root.current
    if (!el) return
    const nearObs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true)
          nearObs.disconnect()
        }
      },
      { rootMargin: '300px 0px' },
    )
    const visObs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.5 })
    nearObs.observe(el)
    visObs.observe(el)
    return () => {
      nearObs.disconnect()
      visObs.disconnect()
    }
  }, [])

  // Attach the video once it is near and wanted; keep it once it has loaded
  const attached = (near && wantPlay) || ready

  const shouldPlay = attached && visible && wantPlay && playable

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (shouldPlay) {
      v.play().catch((err: DOMException) => {
        // AbortError = interrupted by pause(); anything else = playback refused
        if (err.name !== 'AbortError') setChoice('pause')
      })
    } else v.pause()
  }, [shouldPlay, attached])

  const label = `Reel ${index + 1} of ${total}`
  const desc = (reel.caption ? `: ${truncate(reel.caption, 90)}` : '') + (reel.video ? '' : ' (plays on Instagram)')

  return (
    <div ref={root} role="group" aria-label={label + desc} className="reel" data-playing={playing || undefined} data-ready={(ready && playable) || undefined}>
      {reel.poster && !posterFailed && (
        <img src={reel.poster} alt="" loading="lazy" decoding="async" className="reel__poster" onError={() => setPosterFailed(true)} />
      )}

      {attached && playable && (
        <video
          ref={video}
          className="reel__video"
          src={reel.video ?? undefined}
          poster={posterFailed ? undefined : (reel.poster ?? undefined)}
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={() => setReady(true)}
          onPlaying={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => {
            setFailed(true)
            setPlaying(false)
          }}
        />
      )}

      <div className="reel__controls">
        {playable && (
          <button
            type="button"
            className="reel__toggle"
            aria-label={`${wantPlay ? 'Pause' : 'Play'} ${label}`}
            onClick={() => setChoice(wantPlay ? 'pause' : 'play')}
          >
            {wantPlay ? <PauseIcon className="size-3.5" /> : <PlayIcon className="size-3.5" />}
          </button>
        )}
        {reel.permalink ? (
          <a href={reel.permalink} target="_blank" rel="noopener noreferrer" className="reel__link">
            View Reel
            <ArrowIcon className="reel__link-icon" />
            <span className="sr-only">{` ${index + 1} on Instagram (opens in a new tab)`}</span>
          </a>
        ) : (
          <a href={reelsUrl} target="_blank" rel="noopener noreferrer" className="reel__link">
            View Reels
            <ArrowIcon className="reel__link-icon" />
            <span className="sr-only"> on Instagram (opens in a new tab)</span>
          </a>
        )}
      </div>
    </div>
  )
}

const truncate = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s)
