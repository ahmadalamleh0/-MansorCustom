import { useState } from 'react'
import { Wordmark } from '@/components/brand/Wordmark'
import { ComingSoonModal } from '@/components/ui/ComingSoonModal'
import { site } from '@/data/site'

/**
 * Footer (after the MANSORY reference): centred wordmark, a hairline, two
 * balanced centred columns of services, verified social links (only when a
 * URL exists), a short hairline and the copyright line. Services open the
 * Coming Soon dialog until their pages exist.
 */
export function Footer() {
  const [active, setActive] = useState<string | null>(null)
  const socials = site.socials.filter((s) => s.url)

  return (
    <footer className="footer">
      <div className="container-site footer__inner">
        <Wordmark className="wordmark--footer" />

        <hr className="footer__rule" />

        <nav aria-label="Services" className="footer__services">
          {site.footerServices.map((column, c) => (
            <ul key={c} className="footer__column">
              {column.map((service) => (
                <li key={service}>
                  <button
                    type="button"
                    aria-haspopup="dialog"
                    onClick={() => setActive(service)}
                    className="footer__link"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          ))}
        </nav>

        {socials.length > 0 && (
          <ul aria-label="Social" className="footer__socials">
            {socials.map((s) => (
              <li key={s.platform}>
                <a href={s.url ?? undefined} target="_blank" rel="noopener noreferrer" className="footer__social">
                  {s.platform}
                </a>
              </li>
            ))}
          </ul>
        )}

        <hr className="footer__rule footer__rule--short" />
        <p className="footer__copyright">{site.copyright}</p>
      </div>

      <ComingSoonModal
        content={
          active === null
            ? null
            : {
                label: active,
                message: 'This service page is being developed. Check back soon to explore it in detail.',
                dismissLabel: 'Close',
              }
        }
        onClose={() => setActive(null)}
      />
    </footer>
  )
}
