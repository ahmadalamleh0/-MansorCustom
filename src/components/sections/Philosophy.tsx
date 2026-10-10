import { useRef, useState } from 'react'
import { philosophyReveal } from '@/animations/philosophyReveal'
import { ComingSoonModal } from '@/components/ui/ComingSoonModal'
import { site } from '@/data/site'
import { useGSAP } from '@/lib/gsap'

const BUILD_PENDING = {
  label: 'Start Your Build',
  message: 'Build consultations are being set up. Check back soon to start your project with Mansor Customs.',
  dismissLabel: 'Close',
}

/**
 * "Beyond Factory." brand storytelling (Alain Class reference): eyebrow and
 * a wide Michroma headline over one front-on vehicle, framed by a thin arc
 * with three ticks, then a short line and one editorial CTA.
 * Animation hooks: [data-ph-text], [data-ph-visual], [data-ph-arc], [data-ph-tick].
 */
export function Philosophy() {
  const scope = useRef<HTMLElement>(null)
  const { eyebrow, headline, copy, cta, image } = site.philosophy
  const [open, setOpen] = useState(false)

  useGSAP(() => philosophyReveal(), { scope })

  return (
    <section ref={scope} id="philosophy" aria-labelledby="philosophy-title" className="philosophy">
      <div className="container-site philosophy__inner">
        <p data-ph-text className="philosophy__eyebrow">
          {eyebrow}
        </p>
        <h2 id="philosophy-title" data-ph-text className="philosophy__headline">
          {headline.map((word, i) => (
            <span key={word} className="philosophy__word">
              {word}
              {i < headline.length - 1 && ' '}
            </span>
          ))}
        </h2>

        <div className="philosophy__stage">
          <picture data-ph-visual className="philosophy__visual">
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
          {copy}
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
