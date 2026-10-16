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
 * "Beyond Factory." brand storytelling (Alain Class reference): a wide
 * Michroma headline over one dramatic vehicle, then a short line and one
 * editorial CTA.
 * Animation hooks: [data-ph-text], [data-ph-on],
 * [data-ph-bloom], [data-ph-halo]. The car itself never moves.
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
            <CarPicture set={image.off} alt={image.alt} />
            {/* The same render with its headlights on: revealed over the dark
                one by the ignition, so the light on the body and floor is real */}
            <CarPicture set={image.on} alt="" on />
            <div aria-hidden="true" className="philosophy__lights">
              <span data-ph-halo className="philosophy__halo philosophy__halo--l" />
              <span data-ph-halo className="philosophy__halo philosophy__halo--r" />
              <span data-ph-bloom className="philosophy__bloom philosophy__bloom--l" />
              <span data-ph-bloom className="philosophy__bloom philosophy__bloom--r" />
            </div>
          </div>
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

type CarSet = { desktop: { jpg: string; webp: string; src: string }; mobile: { jpg: string; webp: string; src: string } }

function CarPicture({ set, alt, on = false }: { set: CarSet; alt: string; on?: boolean }) {
  const { width, height } = site.philosophy.image
  return (
    <picture className={on ? 'philosophy__photo philosophy__photo--on' : 'philosophy__photo'} data-ph-on={on || undefined} aria-hidden={on || undefined}>
      <source media="(max-width: 767px)" type="image/webp" srcSet={set.mobile.webp} sizes="100vw" />
      <source media="(max-width: 767px)" srcSet={set.mobile.jpg} sizes="100vw" />
      <source type="image/webp" srcSet={set.desktop.webp} sizes="(min-width: 1200px) 72rem, 100vw" />
      <img
        src={set.desktop.src}
        srcSet={set.desktop.jpg}
        sizes="(min-width: 1200px) 72rem, 100vw"
        alt={alt}
        width={width.desktop}
        height={height.desktop}
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}
