/**
 * Service catalogue — the single source for the Services section.
 *
 * PLACEHOLDER ENTRIES: the client hasn't approved the service names,
 * descriptions or media yet. Swap in the final data here; no component changes
 * are needed. Set `placeholder: false` once an entry is approved.
 */

export type ServiceMedia =
  | { type: 'image'; src: string; alt: string; width: number; height: number }
  | { type: 'video'; src: string; poster: string; mobileSrc?: string }

export type Service = {
  /** Stable id — reused later as the service page slug (/services/:slug) */
  slug: string
  title: string
  description?: string
  media?: ServiceMedia
  placeholder: boolean
}

const pending = 'Placeholder — final service details pending client approval.'

export const services: Service[] = [
  { slug: 'service-01', title: 'Service 01', description: pending, placeholder: true },
  { slug: 'service-02', title: 'Service 02', description: pending, placeholder: true },
  { slug: 'service-03', title: 'Service 03', description: pending, placeholder: true },
  { slug: 'service-04', title: 'Service 04', description: pending, placeholder: true },
  { slug: 'service-05', title: 'Service 05', description: pending, placeholder: true },
  { slug: 'service-06', title: 'Service 06', description: pending, placeholder: true },
]
