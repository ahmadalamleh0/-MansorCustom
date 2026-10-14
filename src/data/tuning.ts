import engine560Jpg from '@/assets/images/tuning/sf90-engine-560.jpg'
import engine560Webp from '@/assets/images/tuning/sf90-engine-560.webp'
import engine960Jpg from '@/assets/images/tuning/sf90-engine-960.jpg'
import engine960Webp from '@/assets/images/tuning/sf90-engine-960.webp'
import flamesVideo from '@/assets/images/tuning/sf90-flames.mp4'
import flamesMobileVideo from '@/assets/images/tuning/sf90-flames-mobile.mp4'
import flamesPoster from '@/assets/images/tuning/sf90-flames-poster.jpg'
import porsche560Jpg from '@/assets/images/tuning/porsche-flame-560.jpg'
import porsche560Webp from '@/assets/images/tuning/porsche-flame-560.webp'
import porsche960Jpg from '@/assets/images/tuning/porsche-flame-960.jpg'
import porsche960Webp from '@/assets/images/tuning/porsche-flame-960.webp'
import type { MediaAsset } from './media'

export type TuningStill = {
  id: string
  alt: string
  width: number
  height: number
  jpg: string
  webp: string
  src: string
}

/**
 * Tuning / performance feature, between the Build Brief and Recent Work
 * (creative director, 2026-10-14). Mansor's own media: the SF90 flame clip
 * (Mansor Reels, cropped 4:5), the SF90 engine bay (cats and downpipes) and
 * the Porsche exhaust flame. The CTA opens the Build Brief with `service`
 * preselected (it must match a service title).
 */
export const tuning = {
  headline: ['Tuned to', 'be heard.'],
  copy: 'Exhausts, downpipes and tuning for cars that should sound the way they look.',
  cta: { label: 'Plan a Tuning Build', service: 'Tuning' },
  feature: {
    type: 'video',
    src: flamesVideo,
    mobileSrc: flamesMobileVideo,
    poster: flamesPoster,
  } satisfies MediaAsset,
  featureAlt: 'Black Ferrari SF90 Stradale firing flames from its exhaust inside a workshop',
  stills: [
    {
      id: 'sf90-engine',
      alt: 'Ferrari SF90 engine bay from above: the V8, catalytic converters and downpipes',
      width: 960,
      height: 720,
      jpg: `${engine560Jpg} 560w, ${engine960Jpg} 960w`,
      webp: `${engine560Webp} 560w, ${engine960Webp} 960w`,
      src: engine960Jpg,
    },
    {
      id: 'porsche-flame',
      alt: 'Matte grey Porsche from behind, a flame leaving the exhaust under its rear wing',
      width: 960,
      height: 1280,
      jpg: `${porsche560Jpg} 560w, ${porsche960Jpg} 960w`,
      webp: `${porsche560Webp} 560w, ${porsche960Webp} 960w`,
      src: porsche960Jpg,
    },
  ] as TuningStill[],
}
