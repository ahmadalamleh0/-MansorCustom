import type { ReactNode } from 'react'
import { site } from '@/data/site'
import { handleAnchorClick } from '@/lib/scroll'

const YEAR = new Date().getFullYear()

/** Honest stand-in for business details the client hasn't confirmed yet */
function Pending({ children = 'To be confirmed' }: { children?: ReactNode }) {
  return (
    <span data-placeholder className="text-faint">
      {children}
    </span>
  )
}

function Column({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="eyebrow">{title}</h2>
      <div className="mt-5 text-sm">{children}</div>
    </div>
  )
}

export function Footer() {
  const { contact, socials } = site
  const liveSocials = socials.filter((s) => s.url)
  const hasContact = contact.email || contact.phone || contact.location

  return (
    <footer id="contact" className="border-t border-line bg-surface">
      <div className="container-site grid gap-12 py-16 sm:py-20 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <a
            href="#top"
            onClick={handleAnchorClick}
            className="text-sm font-semibold tracking-[0.2em] text-paper uppercase"
          >
            {site.name}
          </a>
        </div>

        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 md:col-span-7">
          <Column title="Navigate">
            <ul className="space-y-3">
              {site.footerNav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={handleAnchorClick}
                    className="text-muted transition-colors hover:text-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </Column>

          <Column title="Contact">
            {hasContact ? (
              <ul className="space-y-3 text-muted">
                {contact.email && (
                  <li>
                    <a href={`mailto:${contact.email}`} className="transition-colors hover:text-paper">
                      {contact.email}
                    </a>
                  </li>
                )}
                {contact.phone && (
                  <li>
                    <a href={`tel:${contact.phone.replace(/[^\d+]/g, '')}`} className="transition-colors hover:text-paper">
                      {contact.phone}
                    </a>
                  </li>
                )}
                {contact.location && <li>{contact.location}</li>}
              </ul>
            ) : (
              <Pending>Contact details to be confirmed</Pending>
            )}
          </Column>

          <Column title="Social">
            {liveSocials.length ? (
              <ul className="space-y-3">
                {liveSocials.map((s) => (
                  <li key={s.platform}>
                    <a
                      href={s.url ?? undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted transition-colors hover:text-paper"
                    >
                      {s.platform}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <Pending>Social links to be confirmed</Pending>
            )}
          </Column>
        </div>
      </div>

      <div className="container-site flex flex-col gap-2 border-t border-line py-6 text-xs text-faint sm:flex-row sm:justify-between">
        <p>
          © {YEAR} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
