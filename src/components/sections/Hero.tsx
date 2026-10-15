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
 * the frame; the centred headline sits in its upper part, below the nav,
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
