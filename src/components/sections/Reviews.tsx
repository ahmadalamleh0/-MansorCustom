import { useRef } from 'react'
import { reviewsReveal } from '@/animations/reviewsReveal'
import { ChevronIcon } from '@/components/ui/icons'
import { reviews, type Review } from '@/data/reviews'
import { useScrollStrip } from '@/hooks/useScrollStrip'
import { useGSAP } from '@/lib/gsap'

const TITLE = ['Words From', 'Our Clients']

/**
 * "Words From Our Clients" (Wraptors Dubai quote-form reference for the card
 * material): glassy charcoal cards with a soft top highlight, hairline
 * border and rounded corners, in a native horizontal scroll-snap strip.
 * Phones: one card with the next peeking in; md: two; lg: three. Discreet
 * previous/next controls on pointer devices; never auto-advances.
 * Content: data/reviews.ts (demo placeholders until real reviews arrive).
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
        {review.demo && <span className="review-card__demo">Demo</span>}
      </div>
      <blockquote className="review-card__text">
        <p>{review.text}</p>
      </blockquote>
      <figcaption className="review-card__by">
        <span className="review-card__name">{review.name}</span>
        <span className="review-card__source">{review.source}</span>
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
