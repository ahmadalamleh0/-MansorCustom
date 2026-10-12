import reelBmwPoster from '@/assets/reels/bmw-owners.jpg'
import reelBmw from '@/assets/reels/bmw-owners.mp4'
import reelLamboPoster from '@/assets/reels/camo-lamborghini.jpg'
import reelLambo from '@/assets/reels/camo-lamborghini.mp4'
import reelMercedesPoster from '@/assets/reels/red-mercedes.jpg'
import reelMercedes from '@/assets/reels/red-mercedes.mp4'
import philosophy1600 from '@/assets/images/philosophy/supercar-desktop-1600.jpg'
import philosophy1600Webp from '@/assets/images/philosophy/supercar-desktop-1600.webp'
import philosophy2016 from '@/assets/images/philosophy/supercar-desktop-2016.jpg'
import philosophy2016Webp from '@/assets/images/philosophy/supercar-desktop-2016.webp'
import philosophyMobile800 from '@/assets/images/philosophy/supercar-mobile-800.jpg'
import philosophyMobile800Webp from '@/assets/images/philosophy/supercar-mobile-800.webp'
import philosophyMobile1008 from '@/assets/images/philosophy/supercar-mobile-1008.jpg'
import philosophyMobile1008Webp from '@/assets/images/philosophy/supercar-mobile-1008.webp'
import heroPoster from '@/assets/videos/hero-poster.jpg'
import heroMobile from '@/assets/videos/hero-mobile.mp4'
import heroVideo from '@/assets/videos/hero.mp4'
import type { MediaAsset } from './media'
import type { Reel } from './reels'

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
    // Client brand film (2026-10-09). Desktop: original 1080p stream (audio
    // stripped, faststart). Phones: 854px encode (~half the size). Poster: the
    // sharp red SF90 profile at 7.4s. It shows under the intro curtain (so the
    // switch to playback is never seen) and permanently with reduced motion.
    media: {
      type: 'video',
      src: heroVideo,
      mobileSrc: heroMobile,
      poster: heroPoster,
    } as MediaAsset,
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
    { label: 'Services', href: '#editorial' },
    { label: 'Contact', href: '#contact' },
  ] as NavItem[],

  // Instagram showcase (Venuum reference). Links verified 2026-10-10:
  // the profile returns 200; ig.me/m/<handle> 302-redirects to Instagram's
  // message handler (opens the DM in the app on phones).
  // followers / verified: UNCONFIRMED. Instagram doesn't expose them
  // publicly, so they stay null (hidden) until confirmed.
  instagram: {
    handle: 'mansor.customs',
    profileUrl: 'https://www.instagram.com/mansor.customs/',
    messageUrl: 'https://ig.me/m/mansor.customs',
    followers: null as string | null,
    verified: null as boolean | null,
    reelsUrl: 'https://www.instagram.com/mansor.customs/reels/',
    // Three Mansor Reels supplied by the creative director (2026-10-10;
    // originals in "Mansor Reels/", web copies: 540×960, muted, H.264). No
    // individual permalinks yet, so each card links to the Reels tab; add a
    // reel's URL as `permalink` to link it directly. Once the Instagram API
    // is connected (docs/INSTAGRAM.md), its live feed replaces these.
    reels: [
      { id: 'bmw-owners', video: reelBmw, poster: reelBmwPoster, permalink: null, caption: 'Bergen County BMW owners: paint protection at Mansor Customs' },
      { id: 'red-mercedes', video: reelMercedes, poster: reelMercedesPoster, permalink: null, caption: 'Red Mercedes delivery in the Mansor Customs studio' },
      { id: 'camo-lamborghini', video: reelLambo, poster: reelLamboPoster, permalink: null, caption: 'Camo-wrapped Lamborghini outside Mansor Customs' },
    ] as Reel[],
  },

  // Brand storytelling section (creative director, 2026-10-10; Alain Class
  // reference). Vehicle: the burgundy widebody supercar (creative director,
  // 2026-10-12 neon-halo render; original in
  // client-photos/philosophy/burgundy-lamborghini-neon-halo.png). Its own baked-in halo
  // ring was retouched out so the section's animated arc replaces it at the
  // same geometry. Crops: desktop 1.6:1, mobile 4:5, whole car wing-to-splitter.
  philosophy: {
    headline: ['Beyond', 'Factory.'],
    // Two sentences (creative director, 2026-10-12): the premise softer, the
    // promise at full strength. The \u00a0 escape keeps the dash off a line start.
    copy: [
      'Every car leaves the factory a certain way.',
      'At Mansor, we work on what comes after\u00a0— from a new wrap or body kit to the wheels, interior, and performance.',
    ],
    cta: {
      label: 'Start Your Build',
      // UNCONFIRMED: no enquiry/booking flow yet, so it opens the Coming Soon dialog
      url: null as string | null,
    },
    image: {
      alt: 'Burgundy Lamborghini with a carbon rear wing, seen from above and in front under a halo of light',
      desktop: { jpg: `${philosophy1600} 1600w, ${philosophy2016} 2016w`, webp: `${philosophy1600Webp} 1600w, ${philosophy2016Webp} 2016w`, src: philosophy1600, width: 1600, height: 1000 },
      mobile: { jpg: `${philosophyMobile800} 800w, ${philosophyMobile1008} 1008w`, webp: `${philosophyMobile800Webp} 800w, ${philosophyMobile1008Webp} 1008w`, width: 800, height: 1000 },
    },
  },

  // Footer service directory (creative director, 2026-10-09). Two balanced
  // columns. Each label links to the closest service page (slug = the
  // service tile's id). Interior Upgrades and Screens → Bespoke Interiors,
  // Ambient Lighting → Starlight, until they get pages of their own.
  footerServices: [
    [
      { label: 'Wraps', slug: 'wraps' },
      { label: 'PPF', slug: 'protection-finish' },
      { label: 'Ceramic Coating', slug: 'protection-finish' },
      { label: 'Bespoke Interiors', slug: 'bespoke-interiors' },
      { label: 'Wheels', slug: 'wheels-suspension' },
    ],
    [
      { label: 'Interior Upgrades', slug: 'bespoke-interiors' },
      { label: 'Ambient Lighting', slug: 'starlight' },
      { label: 'Screens', slug: 'bespoke-interiors' },
      { label: 'Tuning', slug: 'tuning' },
      { label: 'Body Kits', slug: 'body-kits' },
    ],
  ],

  copyright: '© Mansor Customs',

  // Shop location (address supplied by the creative director, 2026-10-09).
  // Coordinates verified 2026-10-09 with two independent geocoders:
  //   US Census Bureau: 19 SADDLE RIVER AVE, SOUTH HACKENSACK, NJ 07606
  //     (40.863874, -74.100056; interpolated along the street)
  //   OpenStreetMap: house #19 as a mapped building (40.864118, -74.100951)
  // The marker uses the OSM building point (house-level). Official records
  // list the municipality as South Hackensack 07606. "Garfield, NJ 07026" is
  // the address the business uses, confirmed correct by the creative
  // director on 2026-10-09.
  location: {
    name: 'Mansor Customs',
    address: '19 Saddle River Ave, Garfield, NJ 07026',
    lat: 40.864118,
    lng: -74.100951,
  } as { name: string; address: string; lat: number; lng: number } | null,

  footerNav: [
    { label: 'Home', href: '#top' },
    { label: 'Services', href: '#editorial' },
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
