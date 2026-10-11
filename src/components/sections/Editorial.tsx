import { useRef } from 'react'
import { editorialReveal } from '@/animations/editorialReveal'
import { Media } from '@/components/ui/Media'
import { ChevronIcon } from '@/components/ui/icons'
import { editorial, type EditorialCard, type EditorialGroup } from '@/data/editorial'
import { servicePath } from '@/data/services'
import { useGSAP } from '@/lib/gsap'
import { handleLinkClick } from '@/lib/router'

/**
 * Services showcase after the hero: 4 service cards (offset collage) →
 * centred statement → 4 service cards. Each card is a client photo with a
 * centred title and chevron (Motorcarlease reference) linking to the
 * service's page (/services/:id). Content: data/editorial.ts.
 * Animation hooks: [data-editorial-card], [data-editorial-statement].
 */
export function Editorial() {
  const scope = useRef<HTMLElement>(null)
  const { upper, statement, lower } = editorial

  useGSAP(() => editorialReveal(), { scope })

  return (
    <section ref={scope} id="editorial" aria-labelledby="editorial-title" className="pt-(--section-y)">
      <div className="container-site">
        <Collage group={upper} />

        <div data-editorial-statement className="statement">
          <h2 id="editorial-title" className="statement__headline">
            {statement.headline.map((sentence) => (
              <span key={sentence} className="statement__line">
                {sentence}
              </span>
            ))}
          </h2>
          <p className="statement__body">{withEmphasis(statement.body)}</p>
        </div>

        <Collage group={lower} />
      </div>
    </section>
  )
}

/** Renders *word* segments as <em>; everything else stays plain text. */
function withEmphasis(text: string) {
  return text.split(/\*(.+?)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))
}

function Collage({ group }: { group: EditorialGroup }) {
  const [topLeft, topRight, bottomLeft, bottomRight] = group
  return (
    <div className="collage">
      <div className="collage__grid">
        <div className="collage__col">
          <Card card={topLeft} />
          <Card card={bottomLeft} />
        </div>
        <div className="collage__col">
          <Card card={topRight} />
          <Card card={bottomRight} />
        </div>
      </div>
    </div>
  )
}

/** Photo + centred title with a small chevron; the whole card is one link */
function Card({ card }: { card: EditorialCard }) {
  return (
    <figure data-editorial-card className="collage__card service-tile">
      <div className="service-tile__media">
        <Media media={card.media} />
      </div>
      <a href={servicePath(card.id)} onClick={handleLinkClick} className="service-tile__link">
        <span className="service-tile__title">
          {card.title}
          <ChevronIcon className="service-tile__chevron" />
        </span>
      </a>
    </figure>
  )
}
