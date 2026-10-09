import { useRef } from 'react'
import { showcaseMotion } from '@/animations/showcaseMotion'
import { banner, type BrandLogo } from '@/data/banner'
import { useGSAP } from '@/lib/gsap'

/**
 * Brand banner directly after the hero: a monochrome, slowly scrolling row
 * of product-brand logos with faded edges. (The angled image panels that
 * used to follow it were removed at the creative director's request.)
 * Animation hook: [data-logo-track] (marquee).
 */
export function Showcase() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(() => showcaseMotion(), { scope })

  return (
    <section ref={scope} id="showcase" aria-label="Brands" className="showcase">
      <div className="showcase__logos">
        <div data-logo-track className="showcase__logo-track">
          <LogoList logos={banner.logos} />
          {/* Duplicate for a seamless marquee loop; hidden from assistive tech */}
          <LogoList logos={banner.logos} duplicate />
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
