/**
 * Central site content and business details.
 *
 * Anything set to `null` is UNCONFIRMED. The UI shows an honest "to be
 * confirmed" state for those values; it never shows invented details. Replace
 * a `null` with the verified value and the UI picks it up automatically.
 */

export type NavItem = { label: string; href: `#${string}` }

export type SocialLink = { platform: string; url: string | null }

export const site = {
  name: 'Mansour Customs',

  // Logo lockup, one entry per stacked line. The spelling "Mansor" was
  // confirmed by the creative director on 2026-10-09. TODO: align `name`,
  // the hero heading, footer and index.html once the site-wide spelling
  // change is approved.
  wordmark: ['Mansor', 'Customs'],

  // PLACEHOLDER copy — final hero copy comes with the creative direction.
  hero: {
    eyebrow: 'Vehicle wrapping & customization',
    heading: 'Mansour Customs',
    lede: 'Temporary supporting copy. The final hero message will be supplied with the creative direction.',
    cta: { label: 'View services', href: '#services' },
  },

  nav: [
    { label: 'Home', href: '#top' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ] as NavItem[],

  footerNav: [
    { label: 'Home', href: '#top' },
    { label: 'Services', href: '#services' },
  ] as NavItem[],

  // UNCONFIRMED — supply verified details from the client.
  contact: {
    email: null as string | null,
    phone: null as string | null,
    location: null as string | null,
  },

  // UNCONFIRMED — add verified profile URLs only.
  socials: [
    { platform: 'Instagram', url: null },
  ] as SocialLink[],
}
