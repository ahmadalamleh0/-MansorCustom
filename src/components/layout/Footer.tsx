import { Wordmark } from '@/components/brand/Wordmark'
import { servicePath } from '@/data/services'
import { site } from '@/data/site'
import { handleLinkClick } from '@/lib/router'

/**
 * Footer (after the MANSORY reference): centred wordmark, a hairline, two
 * balanced centred columns of services, verified social links (only when a
 * URL exists), a short hairline and the copyright line. Services link to
 * their service pages (/services/:slug).
 */
export function Footer() {
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
                <li key={service.label}>
                  <a href={servicePath(service.slug)} onClick={handleLinkClick} className="footer__link">
                    {service.label}
                  </a>
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
    </footer>
  )
}
