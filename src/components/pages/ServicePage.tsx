import { useEffect, useRef } from 'react'
import { serviceReveal } from '@/animations/serviceReveal'
import { Media } from '@/components/ui/Media'
import { ArrowIcon } from '@/components/ui/icons'
import type { ServicePage as Service } from '@/data/services'
import { useGSAP } from '@/lib/gsap'
import { handleLinkClick } from '@/lib/router'

const BACK_HREF = '/#editorial'

/**
 * Coming Soon page shared by every service (/services/:slug): the service's
 * own tile photo as a tall full-bleed panel, its name in the brand display
 * face, a hairline, COMING SOON, one line, and a way back to the services.
 * Swap in real service content per slug later (data/services.ts).
 */
export function ServicePage({ service }: { service: Service }) {
  const scope = useRef<HTMLElement>(null)

  useGSAP(() => serviceReveal(), { scope })

  useEffect(() => {
    const previous = document.title
    document.title = `${service.title} · Mansor Customs`
    return () => {
      document.title = previous
    }
  }, [service.title])

  return (
    <main id="main" ref={scope} className="service-page" aria-labelledby="service-title">
      <div data-sp-media className="service-page__media">
        <Media media={service.media} priority />
        <span aria-hidden="true" className="service-page__scrim" />
      </div>

      <div className="service-page__content container-site">
        <div className="service-page__copy">
          <h1 id="service-title" data-sp-text className="service-page__title">
            {service.title}
          </h1>
          <span aria-hidden="true" data-sp-rule className="service-page__rule" />
          <p data-sp-text className="service-page__status">
            Coming Soon
          </p>
          <p data-sp-text className="service-page__line">
            {service.line}
          </p>
          <a data-sp-text href={BACK_HREF} onClick={handleLinkClick} className="service-page__back">
            <ArrowIcon className="service-page__back-icon" />
            Back to Services
          </a>
        </div>
      </div>
    </main>
  )
}
