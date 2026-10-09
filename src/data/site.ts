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

  // Hero copy (DAS Tuning-inspired composition). The headline is approved
  // copy. Rows break on desktop; parts within a row stack on phones:
  //   phones: "Experience Your" / "Car's" / "Full Potential"
  //   md+:    "Experience Your" / "Car's Full Potential"
  hero: {
    headline: [['Experience Your'], ['Car’s', 'Full Potential']],
    // Service categories supplied by the creative director (2026-10-09).
    // Two rows so phones wrap into two balanced lines; one line on md+.
    services: [
      ['PPF', 'Wraps', 'Tuning', 'Performance'],
      ['Starlight', 'Ambient Lighting', 'Screens'],
    ],
    cta: {
      label: 'Book Appointment',
      // UNCONFIRMED: no booking method yet, so the CTA opens a Coming Soon
      // dialog. Swap in the real booking URL or flow here.
      bookingUrl: null as string | null,
    },
  },

  nav: [
    { label: 'Home', href: '#top' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' },
  ] as NavItem[],

  // Footer service directory (creative director, 2026-10-09). Two balanced
  // columns; each opens the Coming Soon dialog until service pages exist.
  footerServices: [
    ['Wraps', 'PPF', 'Ceramic Coating', 'Upholstery', 'Wheels'],
    ['Interior Upgrades', 'Ambient Lighting', 'Screens', 'Tuning', 'Body Kits'],
  ],

  copyright: '© Mansor Customs',

  // UNCONFIRMED: no verified address. The map section shows a placeholder
  // until `location` and the Google Maps env vars are set (see LocationMap).
  location: null as { label: string; lat: number; lng: number } | null,

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
