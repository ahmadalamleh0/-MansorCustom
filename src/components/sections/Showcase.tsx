import { useRef } from 'react'
import { showcaseMotion } from '@/animations/showcaseMotion'
import { shownBrands, type Brand } from '@/data/banner'
import { useGSAP } from '@/lib/gsap'

/**
 * Brand banner directly after the hero: a monochrome, slowly scrolling row
 * of the brands Mansor is confirmed to work with (data/banner.ts), with
 * faded edges. Few brands are confirmed so far, so the set repeats enough
 * times to fill the row; assistive tech hears it once.
 * Animation hook: [data-logo-track] (marquee).
 */

/** Copies of the brand set per list, so one list is wider than any screen */
const REPEAT = Math.max(1, Math.ceil(12 / Math.max(1, shownBrands.length)))
export function Showcase() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(() => showcaseMotion(), { scope })

  return (
    <section ref={scope} id="showcase" aria-label="Brands" className="showcase">
      <div className="showcase__logos">
        <div data-logo-track className="showcase__logo-track">
          <LogoList brands={shownBrands} />
          {/* Duplicate for a seamless marquee loop; hidden from assistive tech */}
          <LogoList brands={shownBrands} duplicate />
        </div>
      </div>

    </section>
  )
}

function LogoList({ brands, duplicate = false }: { brands: Brand[]; duplicate?: boolean }) {
  const items = Array.from({ length: REPEAT }, (_, copy) => brands.map((brand) => ({ brand, copy }))).flat()
  return (
    <ul
      className="showcase__logo-list"
      aria-label={duplicate ? undefined : 'Brands we work with'}
      aria-hidden={duplicate || undefined}
      data-duplicate={duplicate || undefined}
    >
      {items.map(({ brand, copy }) => {
        // Repeats inside a list are visual only
        const hidden = duplicate || copy > 0
        return (
          <li key={`${brand.name}-${copy}`} aria-hidden={copy > 0 && !duplicate ? true : undefined} data-repeat={copy > 0 || undefined}>
            {brand.logo ? (
              <img
                src={brand.logo.src}
                alt={hidden ? '' : brand.name}
                loading="lazy"
                decoding="async"
                className={`showcase__logo ${brand.logo.prepared ? '' : 'showcase__logo--filter'} ${brand.logo.tall ? 'showcase__logo--tall' : ''} ${brand.logo.color ? 'showcase__logo--color' : ''} ${brand.logo.stacked ? 'showcase__logo--stacked' : ''}`}
              />
            ) : (
              <span className="showcase__name">{brand.name}</span>
            )}
          </li>
        )
      })}
    </ul>
  )
}
