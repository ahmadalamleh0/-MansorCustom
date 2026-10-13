import { useRef } from 'react'
import { reviewsReveal } from '@/animations/reviewsReveal'
import { ChevronIcon } from '@/components/ui/icons'
import { reviews, type Review } from '@/data/reviews'
import { useScrollStrip } from '@/hooks/useScrollStrip'
import { useGSAP } from '@/lib/gsap'

const TITLE = ['Testimonials']

/**
 * "Testimonials" (Wraptors Dubai quote-form reference for the card
 * material): glassy charcoal cards with a soft top highlight, hairline
 * border and rounded corners, in a native horizontal scroll-snap strip.
 * Phones: one card with the next peeking in; md: two; lg: three. Discreet
 * previous/next controls on pointer devices; never auto-advances.
 * Content: data/reviews.ts (client-supplied, published on Mansor's site as
 * Google reviews).
 * Animation hooks: [data-reviews-title], [data-review].
 */
export function Reviews() {
  const scope = useRef<HTMLElement>(null)
  const { track, edge, step } = useScrollStrip<HTMLUListElement>('[data-review]')

  useGSAP(() => reviewsReveal(), { scope })

  return (
    <section ref={scope} id="reviews" aria-labelledby="reviews-title" className="reviews">
      <div className="container-site">
        <h2 id="reviews-title" data-reviews-title className="brand-headline reviews__title">
          {TITLE.map((part, i) => (
            <span key={part} className="reviews__title-line">
              {part}
              {i < TITLE.length - 1 && ' '}
            </span>
          ))}
        </h2>
      </div>

      <ul ref={track} id="reviews-track" className="reviews__track" tabIndex={0} aria-label="Client reviews, scroll horizontally">
        {reviews.map((review) => (
          <li key={review.id} data-review className="reviews__item">
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>

      <div className="projects__controls reviews__controls container-site">
        <span aria-hidden="true" className="projects__progress">
          <span className="projects__progress-bar" style={{ transform: `scaleX(${0.12 + edge.progress * 0.88})` }} />
        </span>
        <div className="projects__buttons">
          <button type="button" className="projects__btn" aria-controls="reviews-track" aria-label="Previous review" disabled={edge.start} onClick={() => step(-1)}>
            <ChevronIcon className="size-4 rotate-180" />
          </button>
          <button type="button" className="projects__btn" aria-controls="reviews-track" aria-label="Next review" disabled={edge.end} onClick={() => step(1)}>
            <ChevronIcon className="size-4" />
          </button>
        </div>
      </div>
    </section>
  )
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="review-card" data-demo={review.demo || undefined}>
      <div className="review-card__top">
        <Stars rating={review.rating} />
        {review.demo ? <span className="review-card__demo">Demo</span> : review.source === 'google' && <GoogleBadge />}
      </div>
      <blockquote className="review-card__text">
        <p>{review.text}</p>
      </blockquote>
      <figcaption className="review-card__by">
        <span className="review-card__name">{review.name}</span>
      </figcaption>
    </figure>
  )
}

function Stars({ rating }: { rating: number }) {
  return (
    <span className="review-card__stars" role="img" aria-label={`Rated ${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <svg key={n} viewBox="0 0 16 16" aria-hidden="true" className={n <= rating ? 'is-on' : undefined}>
          <path d="M8 1.2l1.95 4.1 4.45.55-3.27 3.08.84 4.42L8 11.2l-3.97 2.15.84-4.42L1.6 5.85l4.45-.55L8 1.2z" />
        </svg>
      ))}
    </span>
  )
}

/** Source badge: Google's own four-colour G, small, in a quiet glass pill.
 *  Says where the review was published; claims no verification. */
function GoogleBadge() {
  return (
    <span className="review-card__badge">
      <svg viewBox="0 0 48 48" aria-hidden="true" className="review-card__g">
        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
        <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
        <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      </svg>
      Google Review
    </span>
  )
}
