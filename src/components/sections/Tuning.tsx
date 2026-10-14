import { useRef } from 'react'
import { tuningReveal } from '@/animations/tuningReveal'
import { CollectionStrip, type VideoPlayback } from '@/components/ui/Collection'
import { RevGauge } from '@/components/ui/RevGauge'
import { tuning } from '@/data/tuning'
import { openBuildBrief } from '@/lib/buildBrief'
import { useGSAP } from '@/lib/gsap'

/**
 * Footage-led, so loops start sooner than in Recent Work: attached a little
 * before a card scrolls in, playing once a quarter of it shows.
 */
const PLAYBACK: VideoPlayback = { nearMargin: '200px', playThreshold: 0.25 }

/**
 * Tuning / performance ("Redline."): the heading and line on the left, the
 * rev gauge on the right, then the gallery in the shared collection strip
 * (as Recent Work, with this section's own cards and video playback) and
 * the CTA under the cards. The gauge revs from idle to
 * the redline as the section enters, then keeps blipping softly while in
 * view. The CTA opens the Build Brief with Tuning chosen.
 * Animation hooks: [data-tn-reveal], [data-project], [data-rg-*].
 */
export function Tuning() {
  const scope = useRef<HTMLElement>(null)
  const { headline, copy, cta, gallery } = tuning

  useGSAP(() => tuningReveal(), { scope })

  return (
    <section ref={scope} id="tuning" aria-labelledby="tuning-title" className="tuning">
      <div className="container-site tuning__grid">
        <div className="tuning__head">
          <h2 id="tuning-title" data-tn-reveal className="tuning__title">
            {headline.map((line, i) => (
              <span key={line} className="tuning__line">
                {line}
                {i < headline.length - 1 && ' '}
              </span>
            ))}
          </h2>
          <p data-tn-reveal className="tuning__copy">
            {copy}
          </p>
          <RevGauge className="tuning__gauge" />
        </div>
      </div>

      <div className="tuning__gallery">
        <CollectionStrip id="tuning-track" label="Tuning work, scroll horizontally" noun="build" items={gallery} playback={PLAYBACK} />
      </div>

      <div className="container-site tuning__actions">
        <button type="button" className="cta-line" onClick={() => openBuildBrief(cta.service)}>
          {cta.label}
        </button>
      </div>
    </section>
  )
}
