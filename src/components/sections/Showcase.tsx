import { useRef } from 'react'
import { showcaseMotion } from '@/animations/showcaseMotion'
import { Media } from '@/components/ui/Media'
import { banner, type BrandLogo } from '@/data/banner'
import { useGSAP } from '@/lib/gsap'

/**
 * Showcase banner, directly after the hero (IR Customs reference): a
 * monochrome brand-logo row, then a full-bleed strip of tall image panels on
 * one plane receding in perspective, with both sides fading into the dark.
 * Animation hooks: [data-logo-track] (marquee), [data-banner-track]
 * (scroll-linked drift along the plane).
 */
export function Showcase() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(() => showcaseMotion(), { scope })

  return (
    <section ref={scope} id="showcase" aria-label="Featured builds" className="showcase">
      <div className="showcase__logos">
        <div data-logo-track className="showcase__logo-track">
          <LogoList logos={banner.logos} />
          {/* Duplicate for a seamless marquee loop; hidden from assistive tech */}
          <LogoList logos={banner.logos} duplicate />
        </div>
      </div>

      <div className="showcase__stage">
        <div className="showcase__plane">
          <div data-banner-track className="showcase__track">
            {banner.panels.map((panel, i) => (
              <figure key={panel.id} className="showcase__panel">
                <Media
                  media={panel.media}
                  fallback={
                    <span aria-hidden="true" className="showcase__panel-index">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  }
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LogoList({ logos, duplicate = false }: { logos: BrandLogo[]; duplicate?: boolean }) {
  return (
    <ul
      className="showcase__logo-list"
      aria-label={duplicate ? undefined : 'Product brands'}
      aria-hidden={duplicate || undefined}
      data-duplicate={duplicate || undefined}
    >
      {logos.map((logo) => (
        <li key={logo.name}>
          <img
            src={logo.src}
            alt={duplicate ? '' : logo.name}
            loading="lazy"
            decoding="async"
            className={`showcase__logo ${logo.prepared ? '' : 'showcase__logo--filter'}`}
          />
        </li>
      ))}
    </ul>
  )
}
