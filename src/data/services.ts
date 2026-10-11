import { editorial, type EditorialCard } from './editorial'

/**
 * Service pages (/services/:slug), one per service tile. Built from the
 * tiles in data/editorial.ts, so each page reuses its tile's photo and name;
 * the slug is the tile's id. Add page-specific content here when the real
 * service pages are written.
 */

export type ServicePage = EditorialCard & {
  slug: string
  /** The one line under COMING SOON */
  line: string
}

const DEFAULT_LINE = 'We are preparing this page with the same care we give every build.'

export const services: ServicePage[] = [...editorial.upper, ...editorial.lower].map((card) => ({
  ...card,
  slug: card.id,
  line: DEFAULT_LINE,
}))

export const servicePath = (slug: string) => `/services/${slug}`

export const findService = (slug: string) => services.find((s) => s.slug === slug)
