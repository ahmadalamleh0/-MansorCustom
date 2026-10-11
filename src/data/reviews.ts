/**
 * Client reviews for "Words From Our Clients".
 *
 * DEMO PLACEHOLDERS ONLY. No authentic Mansor Customs reviews could be
 * verified (2026-10-11): Google and Facebook reviews sit behind logins, and
 * BBB loads its reviews client-side; that profile also shows an F rating and
 * 12 complaints, so selectively quoting it would mislead. Every entry below
 * is marked `demo: true` and renders a visible "Demo" tag.
 *
 * To go live: replace with real reviews the client supplies or approves
 * (exact wording, the reviewer's name as published, the real rating, and
 * where it was posted), and set `demo: false`.
 */

export type Review = {
  id: string
  name: string
  /** 1–5 */
  rating: number
  text: string
  /** Where it was published, e.g. "Google review" */
  source: string
  demo: boolean
}

export const reviews: Review[] = [
  {
    id: 'demo-1',
    name: 'Client name',
    rating: 5,
    text: 'Demo review. A verified client review appears here in the client’s own words, describing their build and their experience with the Mansor team.',
    source: 'Placeholder',
    demo: true,
  },
  {
    id: 'demo-2',
    name: 'Client name',
    rating: 5,
    text: 'Demo review. Replace with a real review, for example from Google, quoted exactly as published, with the reviewer’s name and rating.',
    source: 'Placeholder',
    demo: true,
  },
  {
    id: 'demo-3',
    name: 'Client name',
    rating: 5,
    text: 'Demo review. This card shows how a longer testimonial wraps: a few sentences about the wrap, the finish, the communication and the hand-over of the finished car.',
    source: 'Placeholder',
    demo: true,
  },
  {
    id: 'demo-4',
    name: 'Client name',
    rating: 5,
    text: 'Demo review. Short reviews sit comfortably too.',
    source: 'Placeholder',
    demo: true,
  },
]
