import reelBmwPoster from '@/assets/reels/bmw-owners.jpg'
import reelBmw from '@/assets/reels/bmw-owners.mp4'
import reelLamboPoster from '@/assets/reels/camo-lamborghini.jpg'
import reelLambo from '@/assets/reels/camo-lamborghini.mp4'
import reelMercedesPoster from '@/assets/reels/red-mercedes.jpg'
import reelMercedes from '@/assets/reels/red-mercedes.mp4'
import philosophy1600 from '@/assets/images/philosophy/beyond-factory-1600.jpg'
import philosophy1600Webp from '@/assets/images/philosophy/beyond-factory-1600.webp'
import philosophy2400 from '@/assets/images/philosophy/beyond-factory-2400.jpg'
import philosophy2400Webp from '@/assets/images/philosophy/beyond-factory-2400.webp'
import philosophyMobile from '@/assets/images/philosophy/beyond-factory-mobile.jpg'
import philosophyMobileWebp from '@/assets/images/philosophy/beyond-factory-mobile.webp'
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
  // reference). To swap the vehicle, replace the three crops in
  // src/assets/images/philosophy/ (desktop 2.2:1 band, mobile 4:3 centred
  // on the car, car roughly centred and front-on so the arc frames it).
  philosophy: {
    headline: ['Beyond', 'Factory.'],
    // Two deliberate lines (creative director, 2026-10-10)
    copy: ['Some cars are built to stand out.', 'We take them a step further.'],
    cta: {
      label: 'Start Your Build',
      // UNCONFIRMED: no enquiry/booking flow yet, so it opens the Coming Soon dialog
      url: null as string | null,
    },
    image: {
      alt: 'Black Ferrari, front-on, under a single studio light',
      desktop: { jpg: `${philosophy1600} 1600w, ${philosophy2400} 2400w`, webp: `${philosophy1600Webp} 1600w, ${philosophy2400Webp} 2400w`, src: philosophy1600, width: 1600, height: 727 },
      mobile: { jpg: philosophyMobile, webp: philosophyMobileWebp, width: 1200, height: 900 },
    },
  },

  // Footer service directory (creative director, 2026-10-09). Two balanced
  // columns; each opens the Coming Soon dialog until service pages exist.
  footerServices: [
    ['Wraps', 'PPF', 'Ceramic Coating', 'Bespoke Interiors', 'Wheels'],
    ['Interior Upgrades', 'Ambient Lighting', 'Screens', 'Tuning', 'Body Kits'],
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
