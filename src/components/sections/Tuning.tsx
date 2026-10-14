import { useRef } from 'react'
import { tuningReveal } from '@/animations/tuningReveal'
import { Media } from '@/components/ui/Media'
import { RevGauge } from '@/components/ui/RevGauge'
import { tuning } from '@/data/tuning'
import { openBuildBrief } from '@/lib/buildBrief'
import { useGSAP } from '@/lib/gsap'

/**
 * Tuning / performance: one flame video leads (4:5, left on lg), the heading,
 * line and CTA beside it, and two stills (engine bay, exhaust flame) under
 * them. A thin-line rev gauge sits above the heading on phones and beside
 * it from 640px; it revs from idle to the redline and settles as the
 * section enters. The CTA opens the Build Brief with Tuning chosen.
 * Animation hooks: [data-tn-reveal], [data-rg-*].
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

        <div className="tuning__head">
          <RevGauge className="tuning__gauge" />
          <h2 id="tuning-title" data-tn-reveal className="tuning__title">
            {headline.map((line) => (
              <span key={line} className="tuning__line">
                {line}
              </span>
            ))}
          </h2>
        </div>

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
