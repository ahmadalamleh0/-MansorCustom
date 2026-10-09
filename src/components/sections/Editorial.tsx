import { useRef, useState } from 'react'
import { editorialReveal } from '@/animations/editorialReveal'
import { ComingSoonModal } from '@/components/ui/ComingSoonModal'
import { Media } from '@/components/ui/Media'
import { ArrowIcon } from '@/components/ui/icons'
import { editorial, type EditorialCard, type EditorialGroup } from '@/data/editorial'
import { useGSAP } from '@/lib/gsap'

/**
 * Services showcase after the hero: 4 service cards (offset collage) →
 * centred statement → 4 service cards. Each card is a client photo with a
 * centred title and arrow (Motorcarlease reference) that opens the Coming
 * Soon dialog until service pages exist. Content: data/editorial.ts.
 * Animation hooks: [data-editorial-card], [data-editorial-statement].
 */
export function Editorial() {
  const scope = useRef<HTMLElement>(null)
  const { upper, statement, lower } = editorial
  const [active, setActive] = useState<string | null>(null)

  useGSAP(() => editorialReveal(), { scope })

  return (
    <section ref={scope} id="editorial" aria-labelledby="editorial-title" className="pt-(--section-y)">
      <div className="container-site">
        <Collage group={upper} onOpen={setActive} />

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

        <Collage group={lower} onOpen={setActive} />
      </div>

      <ComingSoonModal
        content={
          active === null
            ? null
            : {
                label: active,
                message: 'This service page is being developed. Check back soon to explore it in detail.',
                dismissLabel: 'Close',
              }
        }
        onClose={() => setActive(null)}
      />
    </section>
  )
}

/** Renders *word* segments as <em>; everything else stays plain text. */
function withEmphasis(text: string) {
  return text.split(/\*(.+?)\*/).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))
}

type OpenService = (title: string) => void

function Collage({ group, onOpen }: { group: EditorialGroup; onOpen: OpenService }) {
  const [topLeft, topRight, bottomLeft, bottomRight] = group
  return (
    <div className="collage">
      <div className="collage__grid">
        <div className="collage__col">
          <Card card={topLeft} variant="lg" onOpen={onOpen} />
          <Card card={bottomLeft} variant="sm" onOpen={onOpen} />
        </div>
        <div className="collage__col">
          <Card card={topRight} variant="short" onOpen={onOpen} />
          <Card card={bottomRight} variant="lg" onOpen={onOpen} />
        </div>
      </div>
    </div>
  )
}

/** Photo + centred title with an arrow; the whole card is one button */
function Card({ card, variant, onOpen }: { card: EditorialCard; variant: 'lg' | 'short' | 'sm'; onOpen: OpenService }) {
  return (
    <figure data-editorial-card className={`collage__card collage__card--${variant} service-tile`}>
      <div className="service-tile__media">
        <Media media={card.media} />
      </div>
      <button type="button" aria-haspopup="dialog" onClick={() => onOpen(card.title)} className="service-tile__link">
        <span className="service-tile__title">
          {card.title}
          <ArrowIcon className="service-tile__arrow" />
        </span>
      </button>
    </figure>
  )
}
