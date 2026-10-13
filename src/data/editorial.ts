import bespokeInteriors from '@/assets/images/services/bespoke-interiors.jpg'
import bodyKits from '@/assets/images/services/body-kits.jpg'
import protectionFinish from '@/assets/images/services/protection-finish.jpg'
import starlight from '@/assets/images/services/starlight.jpg'
import steeringWheels from '@/assets/images/services/steering-wheels.jpg'
import tuning from '@/assets/images/services/tuning.jpg'
import wheelsSuspension from '@/assets/images/services/wheels-suspension.jpg'
import wraps from '@/assets/images/services/wraps.jpg'
import type { MediaAsset } from './media'

/**
 * Services showcase directly after the hero:
 *   4 service cards → statement → 4 service cards
 * Slot order within each group: top-left, top-right, bottom-left, bottom-right.
 *
 * Photos are the client's own, supplied one by one (2026-10-09). A card
 * without `media` shows a neutral placeholder until its photo arrives.
 * Use `position` to set the crop focal point (CSS object-position).
 */

export type EditorialCard = { id: string; title: string; media?: MediaAsset }

export type EditorialGroup = [EditorialCard, EditorialCard, EditorialCard, EditorialCard]

export const editorial = {
  upper: [
    {
      id: 'wraps',
      title: 'Wraps',
      media: {
        type: 'image',
        src: wraps,
        alt: 'Rear of a BMW M3 in an icy blue satin wrap, with a swan-neck wing and BBS mesh wheels, by an old garage',
        width: 1086,
        height: 1448,
        position: '55% 62%', // wing, tail-light and wheel; pavement below for the title
      },
    },
    {
      id: 'bespoke-interiors',
      title: 'Bespoke Interiors',
      media: {
        type: 'image',
        src: bespokeInteriors,
        alt: 'Mercedes G-Class interior fully trimmed in turquoise with diamond-quilted seats',
        width: 941,
        height: 1672,
        position: '50% 55%', // steering wheel and dash above, quilted seat below
      },
    },
    {
      id: 'tuning',
      title: 'Tuning',
      media: {
        type: 'image',
        src: tuning,
        alt: 'Ferrari SF90 engine bay: twin-turbo V8 with red cam covers, wrapped turbos and the hybrid battery pack',
        width: 1122,
        height: 1402,
        position: '50% 52%', // the V8, turbos and battery pack
      },
    },
    {
      id: 'starlight',
      title: 'Starlight',
      media: {
        type: 'image',
        src: starlight,
        alt: 'Luxury car interior with a starlight headliner and ambient lighting',
        width: 640,
        height: 853,
        position: '50% 30%',
      },
    },
  ] satisfies EditorialGroup,

  // Approved copy (2026-10-09). Headline: one sentence per line.
  // Body: wrap a word in *asterisks* to italicise it.
  statement: {
    headline: ['The Mansor Standard.'],
    body: 'Built upon our passion for everything *Automotive*, Mansor is a full service boutique designed to provide the best experience available for your automotive needs.',
  },

  lower: [
    {
      id: 'protection-finish',
      title: 'Protection & Finish',
      media: {
        type: 'image',
        src: protectionFinish,
        alt: 'Two-tone silver and blue Audi R8 in profile',
        width: 640,
        height: 853,
        position: '50% 100%', // car above the title, which sits on the asphalt
      },
    },
    {
      id: 'body-kits',
      title: 'Body Kits',
      media: {
        type: 'image',
        src: bodyKits,
        alt: 'Black BMW XM with a widebody kit and red-accented wheels outside the Mansor Customs shop',
        width: 1000,
        height: 1333,
        position: '50% 85%', // keeps the shop sign and the whole car in frame
      },
    },
    {
      id: 'wheels-suspension',
      title: 'Wheels & Suspension',
      media: {
        type: 'image',
        src: wheelsSuspension,
        alt: 'Black SUV in profile on polished multi-spoke wheels',
        width: 1200,
        height: 1200,
        position: '43% 62%',
      },
    },
    {
      id: 'performance-steering',
      title: 'Performance Steerings',
      media: {
        type: 'image',
        src: steeringWheels,
        alt: 'Carbon-fibre BMW M steering wheel with Alcantara grips, LED shift lights and red paddles',
        width: 1000,
        height: 1250,
        position: '50% 45%',
      },
    },
  ] satisfies EditorialGroup,
}
