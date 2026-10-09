import type { MediaAsset } from './media'

/**
 * Editorial section after the hero: 4 images → statement → 4 images.
 *
 * PLACEHOLDERS: the images are empty slots and the copy is temporary. Add a
 * `media` entry per card, e.g.
 *   media: { type: 'image', src: '/images/editorial/01.jpg', alt: '…', width: 1200, height: 1200 }
 * Slot order within each group: top-left, top-right, bottom-left, bottom-right.
 */

export type EditorialCard = { id: string; media?: MediaAsset }

export type EditorialGroup = [EditorialCard, EditorialCard, EditorialCard, EditorialCard]

const slots = (prefix: string): EditorialGroup => [
  { id: `${prefix}-1` },
  { id: `${prefix}-2` },
  { id: `${prefix}-3` },
  { id: `${prefix}-4` },
]

export const editorial = {
  upper: slots('upper'),
  // Approved copy (2026-10-09). Headline: one sentence per line.
  // Body: wrap a word in *asterisks* to italicise it.
  statement: {
    headline: ['Crafted With Precision.', 'Without Compromise.'],
    body: 'Built upon our passion for everything *Automotive*, Mansor is a full service boutique designed to provide the best experience available for your automotive needs.',
  },
  lower: slots('lower'),
}
