import reelBmwPoster from '@/assets/reels/bmw-owners.jpg'
import reelBmw from '@/assets/reels/bmw-owners.mp4'
import reelLamboPoster from '@/assets/reels/camo-lamborghini.jpg'
import reelLambo from '@/assets/reels/camo-lamborghini.mp4'
import carDesktopOn1600 from '@/assets/images/philosophy/supercar-desktop-on-1600.jpg'
import carDesktopOn1600Webp from '@/assets/images/philosophy/supercar-desktop-on-1600.webp'
import carDesktopOn2016 from '@/assets/images/philosophy/supercar-desktop-on-2016.jpg'
import carDesktopOn2016Webp from '@/assets/images/philosophy/supercar-desktop-on-2016.webp'
import carDesktopOff1600 from '@/assets/images/philosophy/supercar-desktop-off-1600.jpg'
import carDesktopOff1600Webp from '@/assets/images/philosophy/supercar-desktop-off-1600.webp'
import carDesktopOff2016 from '@/assets/images/philosophy/supercar-desktop-off-2016.jpg'
import carDesktopOff2016Webp from '@/assets/images/philosophy/supercar-desktop-off-2016.webp'
import carMobileOn800 from '@/assets/images/philosophy/supercar-mobile-on-800.jpg'
import carMobileOn800Webp from '@/assets/images/philosophy/supercar-mobile-on-800.webp'
import carMobileOn1008 from '@/assets/images/philosophy/supercar-mobile-on-1008.jpg'
import carMobileOn1008Webp from '@/assets/images/philosophy/supercar-mobile-on-1008.webp'
import carMobileOff800 from '@/assets/images/philosophy/supercar-mobile-off-800.jpg'
import carMobileOff800Webp from '@/assets/images/philosophy/supercar-mobile-off-800.webp'
import carMobileOff1008 from '@/assets/images/philosophy/supercar-mobile-off-1008.jpg'
import carMobileOff1008Webp from '@/assets/images/philosophy/supercar-mobile-off-1008.webp'
import reelMercedesPoster from '@/assets/reels/red-mercedes.jpg'
import reelMercedes from '@/assets/reels/red-mercedes.mp4'
import heroShopfront from '@/assets/images/hero/shopfront-twilight.jpg'
import heroPoster from '@/assets/videos/hero-poster.jpg'
import heroMobile from '@/assets/videos/hero-mobile.mp4'
import heroR8Mobile from '@/assets/videos/hero-r8-mobile.mp4'
import heroR8 from '@/assets/videos/hero-r8.mp4'
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
  // copy, sentence case, two lines at every width (creative director,
  // 2026-10-15): "Experience your car's" / "full potential."
  hero: {
    // Fallback under the hero film (creative director, 2026-10-15): the
    // Mansor shopfront at twilight, lit sign with the Ferrari, Rolls-Royce and
    // G-Wagon out front (client-photos/hero/twilight-showcase.png).
    media: {
      type: 'image',
      src: heroShopfront,
      alt: 'The Mansor Customs shop at twilight, its sign lit, with a Ferrari, a Rolls-Royce and a Mercedes G-Class parked out front',
      width: 941,
      height: 1672,
      // Framing lives in CSS (.hero__media img): it changes with the screen's shape
    } as MediaAsset,
    // Client brand film, HQ master (client-photos/banner1-hq.mp4, 2026-10-13),
    // trimmed to its first 29.33s (704 frames: street open → white SF90 on the
    // street, which cuts back to the opening street shot on loop; drops the
    // closing third-party logo card). Desktop: the master's own 1080p stream,
    // copied without re-encoding (audio stripped, faststart). Phones: the
    // centre 608×1080 strip at full source detail (what object-cover shows on
    // a portrait screen anyway), CRF 19. Poster: the red SF90 profile at 7.4s,
    // lossless from the master. It shows under the intro curtain (so the
    // switch to playback is never seen) and permanently with reduced motion.
    // The hero film (creative director, 2026-10-15): the main hero media,
    // muted and looping from page load; `media` (the photo) is seen first and
    // is its fallback. Trial: the Audi R8 night film, recut
    // (client-photos/hero/audi-r8-night-film-recut.mp4, 11.5s): desktop 1080p,
    // phones the centre 608×1080 strip (CRF 24/25, no audio). The Mansor
    // studio film is still in assets/videos (hero-studio.mp4 /
    // hero-studio-mobile.mp4): import those here to switch back.
    video: { src: heroR8, mobileSrc: heroR8Mobile },
    film: {
      type: 'video',
      src: heroVideo,
      mobileSrc: heroMobile,
      poster: heroPoster,
    } as MediaAsset,
    headline: [['Experience your car’s'], ['full potential.']],
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
  // reference). Vehicle: the burgundy widebody supercar, "Beneath a Halo"
  // render (creative director, 2026-10-15; client-photos/philosophy/
  // burgundy-lamborghini-beneath-halo.png, the same render as the original
  // with its halo ring kept), cut exactly as the original: mobile = x 8, y 40,
  // 1008×1260; desktop = that cut centred in the original's extended 2016×1260
  // frame. The section's drawn arc sits on the photo's own ring.
  philosophy: {
    headline: ['Beyond', 'Factory.'],
    // Creative director, 2026-10-15: three short beats, quieter, then the
    // closing line at full strength
    copy: [
      'A different finish. A sharper stance.',
      'Every build starts with a different vision.',
    ],
    cta: {
      label: 'Start Your Build',
      // UNCONFIRMED: no enquiry/booking flow yet, so it opens the Coming Soon dialog
      url: null as string | null,
    },
    // Lights-off / lights-on pair. "On" is the original photo itself; "off" is
    // the same photo with the original's own lights-off lamp patches
    // (supercar-led-off-l/r, commit 79b7bcf) baked in. The "on" photo powers
    // on over the "off" one. Edges melt into the page black via a CSS mask.
    image: {
      alt: 'Burgundy widebody Lamborghini with a large carbon rear wing and bonnet scoop, seen from above and in front in a dark studio',
      width: { desktop: 1600, mobile: 800 },
      height: { desktop: 1000, mobile: 1000 },
      off: { desktop: { jpg: `${carDesktopOff1600} 1600w, ${carDesktopOff2016} 2016w`, webp: `${carDesktopOff1600Webp} 1600w, ${carDesktopOff2016Webp} 2016w`, src: carDesktopOff1600 }, mobile: { jpg: `${carMobileOff800} 800w, ${carMobileOff1008} 1008w`, webp: `${carMobileOff800Webp} 800w, ${carMobileOff1008Webp} 1008w`, src: carMobileOff800 } },
      on: { desktop: { jpg: `${carDesktopOn1600} 1600w, ${carDesktopOn2016} 2016w`, webp: `${carDesktopOn1600Webp} 1600w, ${carDesktopOn2016Webp} 2016w`, src: carDesktopOn1600 }, mobile: { jpg: `${carMobileOn800} 800w, ${carMobileOn1008} 1008w`, webp: `${carMobileOn800Webp} 800w, ${carMobileOn1008Webp} 1008w`, src: carMobileOn800 } },
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

  // Studio credit at the very end of the page (as on Wraptors): Rajdhani

  // label, DIABLO as Ethnocentric outlines (assets/brand/diablo-wordmark.svg)

  credit: { label: 'Powered by', brand: 'Diablo', url: 'https://thediablo.co/' },

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
