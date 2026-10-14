import { useRef } from 'react'
import { tuningReveal } from '@/animations/tuningReveal'
import { Media } from '@/components/ui/Media'
import { tuning } from '@/data/tuning'
import { openBuildBrief } from '@/lib/buildBrief'
import { useGSAP } from '@/lib/gsap'

/** Tach scale: 41 ticks, a major every fifth, the last eight are the redline */
const TICKS = Array.from({ length: 41 }, (_, i) => (i >= 33 ? 'red' : i % 5 === 0 ? 'major' : 'minor'))

/**
 * Tuning / performance: one flame video leads (4:5, left on lg), the heading,
 * line and CTA beside it, and two stills (engine bay, exhaust flame) under
 * them. A tachometer scale sits over the heading and sweeps to the redline
 * once as the section enters. The CTA opens the Build Brief with Tuning
 * chosen. Animation hooks: [data-tn-reveal], [data-tn-tick].
 */
export function Tuning() {
  const scope = useRef<HTMLElement>(null)
  const { headline, copy, cta, feature, featureAlt, stills } = tuning

  useGSAP(() => tuningReveal(), { scope })

  return (
    <section ref={scope} id="tuning" aria-labelledby="tuning-title" className="tuning">
      <div className="container-site tuning__grid">
        <figure data-tn-reveal className="tuning__feature">
          <Media media={feature} />
          <figcaption className="sr-only">{featureAlt}</figcaption>
        </figure>

        <div aria-hidden="true" className="tuning__tach">
          {TICKS.map((kind, i) => (
            <span key={i} data-tn-tick className={`tuning__tick tuning__tick--${kind}`} />
          ))}
        </div>

        <h2 id="tuning-title" data-tn-reveal className="tuning__title">
          {headline.map((line) => (
            <span key={line} className="tuning__line">
              {line}
            </span>
          ))}
        </h2>

        <p data-tn-reveal className="tuning__copy">
          {copy}
        </p>

        <div data-tn-reveal className="tuning__actions">
          <button type="button" className="cta-line" onClick={() => openBuildBrief(cta.service)}>
            {cta.label}
          </button>
        </div>

        <div className="tuning__stills">
          {stills.map((still) => (
            <figure key={still.id} data-tn-reveal className={`tuning__still tuning__still--${still.id}`}>
              <picture>
                <source type="image/webp" srcSet={still.webp} sizes="(min-width: 1024px) 30vw, 60vw" />
                <img
                  src={still.src}
                  srcSet={still.jpg}
                  sizes="(min-width: 1024px) 30vw, 60vw"
                  alt={still.alt}
                  width={still.width}
                  height={still.height}
                  loading="lazy"
                  decoding="async"
                />
              </picture>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
