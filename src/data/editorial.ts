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
  // PLACEHOLDER copy — generic on purpose; replace with approved client copy.
  statement: {
    headline: 'Crafted with precision, finished without compromise',
    body: 'Temporary supporting copy. A short editorial paragraph about the studio’s approach will sit here once the final messaging is approved.',
  },
  lower: slots('lower'),
}
