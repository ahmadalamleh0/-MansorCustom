import { Fragment, useRef, useState } from 'react'
import { philosophyReveal } from '@/animations/philosophyReveal'
import headlightOffL from '@/assets/images/philosophy/supercar-led-off-l.webp'
import headlightOffR from '@/assets/images/philosophy/supercar-led-off-r.webp'
import { ComingSoonModal } from '@/components/ui/ComingSoonModal'
import { site } from '@/data/site'
import { useGSAP } from '@/lib/gsap'

/** The three LED bars per headlight, top to bottom (startup sequence order) */
const LED_ROWS = [1, 2, 3] as const

const BUILD_PENDING = {
  label: 'Start Your Build',
  message: 'Build consultations are being set up. Check back soon to start your project with Mansor Customs.',
  dismissLabel: 'Close',
}

/**
 * "Beyond Factory." brand storytelling (Alain Class reference): a wide
 * Michroma headline over one dramatic vehicle, framed by a thin arc
 * with three ticks, then a short line and one editorial CTA.
 * Animation hooks: [data-ph-text], [data-ph-visual], [data-ph-arc], [data-ph-tick].
 */
export function Philosophy() {
  const scope = useRef<HTMLElement>(null)
  const { headline, copy, cta, image } = site.philosophy
  const [open, setOpen] = useState(false)

  useGSAP(() => philosophyReveal(), { scope })

  return (
    <section ref={scope} id="philosophy" aria-labelledby="philosophy-title" className="philosophy">
      <div className="container-site philosophy__inner">
        <h2 id="philosophy-title" data-ph-text className="brand-headline philosophy__headline">
          {headline.map((word, i) => (
            <span key={word} className="brand-headline__word">
              {word}
              {i < headline.length - 1 && ' '}
            </span>
          ))}
        </h2>

        <div className="philosophy__stage">
          <div data-ph-visual className="philosophy__visual">
            <picture className="philosophy__photo">
              <source media="(max-width: 767px)" type="image/webp" srcSet={image.mobile.webp} />
              <source media="(max-width: 767px)" srcSet={image.mobile.jpg} />
              <source type="image/webp" srcSet={image.desktop.webp} sizes="(min-width: 1200px) 72rem, 100vw" />
              <img
                src={image.desktop.src}
                srcSet={image.desktop.jpg}
                sizes="(min-width: 1200px) 72rem, 100vw"
                alt={image.alt}
                width={image.desktop.width}
                height={image.desktop.height}
                loading="lazy"
                decoding="async"
              />
            </picture>

            {/* Headlight startup. The photo is the "on" state (its LED running
                lights are lit). Aligned retouch patches of the same lamps, with
                the white emission removed, are the "off" state, split into three
                bands per lamp (projector, LED upright, lower LED bar) so they
                wake in sequence. A dim layer
                lets the car "wake"; bloom, halo and spill sit on top (screen
                blend). Positions per crop live in CSS. */}
            <div aria-hidden="true" className="philosophy__lights">
              <span data-ph-dim className="philosophy__dim" />
              {LED_ROWS.map((row) => (
                <Fragment key={row}>
                  <img data-ph-led-off data-row={row} src={headlightOffL} alt="" className={`philosophy__led philosophy__led--l philosophy__led--row${row}`} />
                  <img data-ph-led-off data-row={row} src={headlightOffR} alt="" className={`philosophy__led philosophy__led--r philosophy__led--row${row}`} />
                </Fragment>
              ))}
              <span data-ph-spill className="philosophy__spill philosophy__spill--front" />
              <span data-ph-spill className="philosophy__spill philosophy__spill--l" />
              <span data-ph-spill className="philosophy__spill philosophy__spill--r" />
              <span data-ph-halo className="philosophy__halo philosophy__halo--l" />
              <span data-ph-halo className="philosophy__halo philosophy__halo--r" />
              <span data-ph-bloom className="philosophy__bloom philosophy__bloom--l" />
              <span data-ph-bloom className="philosophy__bloom philosophy__bloom--r" />
            </div>
          </div>

          {/* Arc drawn outward from the top, like the intro's signature rules */}
          <svg viewBox="0 0 100 100" aria-hidden="true" className="philosophy__arc">
            <path data-ph-arc d="M50 .5A49.5 49.5 0 0 0 15 85" pathLength={1000} />
            <path data-ph-arc d="M50 .5A49.5 49.5 0 0 1 85 85" pathLength={1000} />
            <path data-ph-tick d="M50 2.5V8" />
            <path data-ph-tick d="M2 50h5.5" />
            <path data-ph-tick d="M98 50h-5.5" />
          </svg>
        </div>

        <p data-ph-text className="philosophy__copy">
          {copy.map((line, i) => (
            <span key={line} className="philosophy__line">
              {line}
              {i < copy.length - 1 && ' '}
            </span>
          ))}
        </p>

        <div data-ph-text className="philosophy__actions">
          {cta.url ? (
            <a href={cta.url} className="cta-line">
              {cta.label}
            </a>
          ) : (
            <button type="button" aria-haspopup="dialog" onClick={() => setOpen(true)} className="cta-line">
              {cta.label}
            </button>
          )}
        </div>
      </div>

      <ComingSoonModal content={open ? BUILD_PENDING : null} onClose={() => setOpen(false)} />
    </section>
  )
}
