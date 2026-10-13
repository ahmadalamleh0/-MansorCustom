/**
 * The Journal (homepage preview). PLACEHOLDERS: no articles are published
 * yet. Titles are suggested topics drawn from Mansor's own services, shown
 * with a visible "Placeholder" tag and no dates, authors or links, so
 * nothing reads as a published story. Photography: the creative director
 * will supply it (`image: null` renders a neutral graphite panel).
 *
 * To publish: add the article URL as `href`, the photo as `image`, and set
 * `placeholder: false`.
 */
export type JournalEntry = {
  id: string
  category: string
  title: string
  image: { src: string; alt: string } | null
  href: string | null
  placeholder: boolean
}

export const journal: JournalEntry[] = [
  { id: 'wrap-finish', category: 'Wraps', title: 'Choosing a wrap finish: satin, gloss or colour-shift', image: null, href: null, placeholder: true },
  { id: 'ppf-ceramic', category: 'Protection', title: 'PPF and ceramic coating, explained', image: null, href: null, placeholder: true },
  { id: 'interior-build', category: 'Interiors', title: 'Inside a bespoke interior build', image: null, href: null, placeholder: true },
]
