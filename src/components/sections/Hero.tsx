import { useState } from 'react'
import { ComingSoonModal } from '@/components/ui/ComingSoonModal'
import { Media } from '@/components/ui/Media'
import { site } from '@/data/site'

const BOOKING_PENDING = {
  label: 'Book Appointment',
  message: 'Online booking is being set up. Check back soon to reserve your appointment.',
  dismissLabel: 'Close',
}

/**
 * Full-viewport hero (DAS Tuning-inspired composition): vehicle media fills
 * the frame, and a centred headline, short line and single CTA sit low in it.
 *   [data-hero-media]    media layer (image / video)
 *   [data-hero-overlay]  legibility scrim; fades into the page background
 *   [data-hero-line]     masked headline parts, revealed by the intro timeline
 *   [data-hero-fade]     supporting line + CTA
 */
export function Hero() {
  const { hero } = site
  const [bookingOpen, setBookingOpen] = useState(false)

  return (
    <section id="top" aria-labelledby="hero-title" className="hero">
      <div data-hero-media className="absolute inset-0 -z-20">
        {/* PLACEHOLDER: hero vehicle video/photography pending from the client */}
        <Media priority />
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

        <p data-hero-fade className="hero__lede">
          {hero.lede}
        </p>

        <div data-hero-fade className="hero__actions">
          {hero.cta.bookingUrl ? (
            <a href={hero.cta.bookingUrl} className="hero__cta">
              {hero.cta.label}
            </a>
          ) : (
            <button type="button" aria-haspopup="dialog" onClick={() => setBookingOpen(true)} className="hero__cta">
              {hero.cta.label}
            </button>
          )}
        </div>
      </div>

      <ComingSoonModal content={bookingOpen ? BOOKING_PENDING : null} onClose={() => setBookingOpen(false)} />
    </section>
  )
}
