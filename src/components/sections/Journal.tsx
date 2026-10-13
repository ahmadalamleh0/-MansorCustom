import { useRef } from 'react'
import { quietReveal } from '@/animations/quietReveal'
import { journal } from '@/data/journal'
import { useGSAP } from '@/lib/gsap'

/**
 * The Journal: three editorial cards (image, category, title). Desktop: three
 * across; phones: a swipeable strip with the next card peeking in. A quieter
 * break after the cinematic sections. Content: data/journal.ts (placeholders).
 */
export function Journal() {
  const scope = useRef<HTMLElement>(null)
  useGSAP(() => quietReveal('[data-journal-reveal]', '.journal__track'), { scope })

  return (
    <section ref={scope} id="journal" aria-labelledby="journal-title" className="journal">
      <div className="container-site">
        <h2 id="journal-title" data-journal-reveal className="brand-headline quiet-title">
          The Journal
        </h2>
      </div>

      <ul className="journal__track" aria-label="Journal articles">
        {journal.map((entry) => (
          <li key={entry.id} data-journal-reveal className="journal__item">
            <article className="journal-card">
              <div className="journal-card__media">
                {entry.image ? <img src={entry.image.src} alt={entry.image.alt} loading="lazy" decoding="async" /> : <span aria-hidden="true" className="journal-card__placeholder" />}
              </div>
              <div className="journal-card__meta">
                <span className="journal-card__category">{entry.category}</span>
                {entry.placeholder && <span className="journal-card__tag">Placeholder</span>}
              </div>
              <h3 className="journal-card__title">{entry.href ? <a href={entry.href}>{entry.title}</a> : entry.title}</h3>
            </article>
          </li>
        ))}
      </ul>
    </section>
  )
}
