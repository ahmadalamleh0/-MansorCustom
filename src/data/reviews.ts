/**
 * Client reviews for "Words From Our Clients".
 *
 * Supplied by the creative director (2026-10-11) from Mansor Customs' own
 * website, where each is published as a Google review. Transcribed
 * verbatim. Not independently checked against the live Google listing
 * (not readable from here), so the card labels the source ("Google Review")
 * without claiming verification or a live feed.
 *
 * `demo: true` renders a "Demo" tag instead of the source badge, for any
 * placeholder content in future.
 */

export type Review = {
  id: string
  name: string
  /** 1–5 */
  rating: number
  text: string
  /** Where it was published */
  source: 'google' | 'other'
  demo: boolean
}

export const reviews: Review[] = [
  {
    id: 'michael-s',
    name: 'Michael S.',
    rating: 5,
    text: 'Got my car wrapped in Satin Black and it looks incredibly phenomenal. Highly professional crew in the Tri-State area. Will be coming back for an exhaust tune!',
    source: 'google',
    demo: false,
  },
  {
    id: 'james-d',
    name: 'James D.',
    rating: 5,
    text: 'Outstanding service! The PPF they applied to my GT3 is absolutely flawless. The edges are tucked perfectly and you can’t even tell it’s there. Mansor is top tier.',
    source: 'google',
    demo: false,
  },
  {
    id: 'david-r',
    name: 'David R.',
    rating: 5,
    text: 'Best customization shop around! The team communicated with me throughout the entire process. The custom interior work they did is unmatched!',
    source: 'google',
    demo: false,
  },
  {
    id: 'sarah-l',
    name: 'Sarah L.',
    rating: 5,
    text: 'Incredible attention to detail. I brought in my daily driver for a ceramic coating and it truly looks better than when it drove off the dealer lot.',
    source: 'google',
    demo: false,
  },
  {
    id: 'william-k',
    name: 'William K.',
    rating: 5,
    text: 'The starlight headliner installation was beyond my expectations. Mansor Customs transformed the interior of my Rolls-Royce into a true masterpiece!',
    source: 'google',
    demo: false,
  },
  {
    id: 'anthony-p',
    name: 'Anthony P.',
    rating: 5,
    text: 'Brought my McLaren in for a full body color change wrap. Their precision and care for high-end exotics are the best in the business. Very satisfied with the result.',
    source: 'google',
    demo: false,
  },
  {
    id: 'chris-n',
    name: 'Chris N.',
    rating: 5,
    text: 'Superior service from start to finish. The team is extremely knowledgeable about performance tuning, and my car feels completely alive now. Excellent work!',
    source: 'google',
    demo: false,
  },
  {
    id: 'jonathan-v',
    name: 'Jonathan V.',
    rating: 5,
    text: 'Mansor Customs is the only place I trust with my Ferrari. Their paint protection process is meticulous and completely invisible. Worth every penny.',
    source: 'google',
    demo: false,
  },
]
