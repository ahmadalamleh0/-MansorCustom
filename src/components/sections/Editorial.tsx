import { useRef } from 'react'
import { editorialReveal } from '@/animations/editorialReveal'
import { Media } from '@/components/ui/Media'
import { editorial, type EditorialCard, type EditorialGroup } from '@/data/editorial'
import { useGSAP } from '@/lib/gsap'

/**
 * Editorial interlude after the hero: offset image collage → centred
 * statement → second collage. Content comes from data/editorial.ts.
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
            {statement.headline}
          </h2>
          <p className="statement__body">{statement.body}</p>
        </div>

        <Collage group={lower} />
      </div>
    </section>
  )
}

function Collage({ group }: { group: EditorialGroup }) {
  const [topLeft, topRight, bottomLeft, bottomRight] = group
  return (
    <div className="collage">
      <div className="collage__grid">
        <div className="collage__col">
          <Card card={topLeft} variant="lg" />
          <Card card={bottomLeft} variant="sm" />
        </div>
        <div className="collage__col">
          <Card card={topRight} variant="short" />
          <Card card={bottomRight} variant="lg" />
        </div>
      </div>
    </div>
  )
}

function Card({ card, variant }: { card: EditorialCard; variant: 'lg' | 'short' | 'sm' }) {
  return (
    <figure data-editorial-card className={`collage__card collage__card--${variant}`}>
      <Media media={card.media} />
    </figure>
  )
}
