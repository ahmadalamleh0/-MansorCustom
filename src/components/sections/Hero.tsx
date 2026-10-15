import { useEffect, useRef, useState } from 'react'
import { ComingSoonModal } from '@/components/ui/ComingSoonModal'
import { Media } from '@/components/ui/Media'
import { site } from '@/data/site'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

const BOOKING_PENDING = {
  label: 'Book Appointment',
  message: 'Online booking is being set up. Check back soon to reserve your appointment.',
  dismissLabel: 'Close',
}

/**
 * Full-viewport hero (DAS Tuning-inspired composition): the film fills the
 * frame (the shopfront photo underneath is its fallback); the centred headline sits in its upper part, below the nav,
 * and the service categories and a single CTA stay low in it.
 *   [data-hero-media]    media layer (image / video)
 *   [data-hero-overlay]  legibility scrim; fades into the page background
 *   [data-hero-line]     masked headline parts, revealed by the intro timeline
 *   [data-hero-fade]     service categories + CTA
 */
export function Hero() {
  const { hero } = site
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <section id="top" aria-labelledby="hero-title" className="hero">
      <div data-hero-media className="hero__media absolute inset-0 -z-20">
        <Media media={hero.media} priority />
        {hero.video && <HeroFilm {...hero.video} />}
      </div>
      <div data-hero-overlay aria-hidden="true" className="hero__scrim" />

      <div data-hero-content className="hero__content container-site">
        <h1 id="hero-title" className="hero__headline">
          {hero.headline.map((row, r) => (
            <span key={r} className="hero__row">
              {row.map((part) => (
                <span key={part} className="hero__mask">
                  <span data-hero-line className="block">
                    {part}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p data-hero-fade className="hero__services">
          {hero.services.map((row, r) => (
            <span key={r} className="hero__services-row">
              {r > 0 && <span aria-hidden="true" className="hero__dot hero__dot--join" />}
              {row.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span aria-hidden="true" className="hero__dot" />}
                  {item}
                  {/* Separator for screen readers, which ignore the visual dots */}
                  {(i < row.length - 1 || r < hero.services.length - 1) && <span className="sr-only">, </span>}
                </span>
              ))}
            </span>
          ))}
        </p>

        <div data-hero-fade className="hero__actions">
          {hero.cta.bookingUrl ? (
            <a href={hero.cta.bookingUrl} className="cta-line">
              {hero.cta.label}
            </a>
          ) : (
            <button type="button" aria-haspopup="dialog" onClick={() => setBookingOpen(true)} className="cta-line">
              {hero.cta.label}
            </button>
          )}
        </div>
      </div>

      <ComingSoonModal content={bookingOpen ? BOOKING_PENDING : null} onClose={() => setBookingOpen(false)} />
    </section>
  )
}

/** How long the photo holds once the hero is revealed, before the film takes over */
const PHOTO_BEAT_MS = 1000

/**
 * The hero film: the main hero media. The photo is always the first thing
 * seen; the film loads and starts muted and inline from page load (behind the
 * intro) so it is ready, then fades in from its first frame PHOTO_BEAT_MS
 * after the hero is revealed (intro gone), or the moment it is actually
 * playing if that is later. The photo stays when the film can't play
 * (autoplay blocked, e.g. iOS Low Power Mode, or reduced motion). Phones get
 * the lighter portrait cut, chosen in code. Pauses while the hero is off screen.
 */
function HeroFilm({ src, mobileSrc }: { src: string; mobileSrc?: string }) {
  const ref = useRef<HTMLVideoElement>(null)
  const reduceMotion = usePrefersReducedMotion()
  const [playing, setPlaying] = useState(false)
  const [due, setDue] = useState(false)
  const shown = playing && due

  // The photo's beat starts when the hero is revealed (the intro curtain gone)
  useEffect(() => {
    if (reduceMotion) return
    const root = document.documentElement
    let timer = 0
    const start = () => {
      if (root.classList.contains('intro-active') || timer) return
      timer = window.setTimeout(() => setDue(true), PHOTO_BEAT_MS)
    }
    const mo = new MutationObserver(start)
    mo.observe(root, { attributes: true, attributeFilter: ['class'] })
    start()
    return () => {
      mo.disconnect()
      window.clearTimeout(timer)
    }
  }, [reduceMotion])

  // Take over from the film's first frame
  useEffect(() => {
    if (shown && ref.current) ref.current.currentTime = 0
  }, [shown])

  useEffect(() => {
    const v = ref.current
    if (!v || reduceMotion) return
    // iOS only autoplays inline video that is muted as an attribute, not just
    // a property (React sets only the property), so set both before playing
    v.muted = true
    v.setAttribute('muted', '')
    v.src = mobileSrc && window.matchMedia('(max-width: 767px)').matches ? mobileSrc : src
    const play = () => v.play().catch(() => {})
    play()
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : v.pause()), { threshold: 0.1 })
    io.observe(v)
    // Some browsers refuse autoplay until the first interaction: try again then
    const retry = () => v.paused && play()
    window.addEventListener('touchstart', retry, { once: true, passive: true })
    window.addEventListener('pointerdown', retry, { once: true })
    return () => {
      io.disconnect()
      window.removeEventListener('touchstart', retry)
      window.removeEventListener('pointerdown', retry)
    }
  }, [src, mobileSrc, reduceMotion])

  if (reduceMotion) return null
  return (
    <video
      ref={ref}
      className="hero__film absolute inset-0 h-full w-full object-cover"
      data-shown={shown || undefined}
      muted
      autoPlay
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
      onPlaying={() => setPlaying(true)}
    />
  )
}
