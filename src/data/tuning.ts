import engine560Jpg from '@/assets/images/tuning/sf90-engine-560.jpg'
import engine560Webp from '@/assets/images/tuning/sf90-engine-560.webp'
import engine960Jpg from '@/assets/images/tuning/sf90-engine-960.jpg'
import engine960Webp from '@/assets/images/tuning/sf90-engine-960.webp'
import dynoVideo from '@/assets/images/tuning/sf90-dyno.mp4'
import dynoMobileVideo from '@/assets/images/tuning/sf90-dyno-mobile.mp4'
import dynoPoster from '@/assets/images/tuning/sf90-dyno-poster.jpg'
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
 * Tuning / performance feature, after Recent Work (creative director,
 * 2026-10-14). Mansor's own media: the pink SF90 on the dyno firing flames
 * leads (client-photos/tuning/sf90-pink-dyno-flames.mp4, 2.5–16.5s, cropped
 * 4:5); below it the SF90 engine bay (cats and downpipes), the black SF90
 * flame clip (Mansor Reels; also a Recent Work card, so here it is a small
 * tile) and the Porsche exhaust flame. The CTA opens the Build Brief with
 * `service` preselected (it must match a service title).
 */
export const tuning = {
  headline: ['Tuned to', 'be heard.'],
  copy: 'Exhausts, downpipes and tuning for cars that should sound the way they look.',
  cta: { label: 'Plan a Tuning Build', service: 'Tuning' },
  feature: {
    type: 'video',
    src: dynoVideo,
    mobileSrc: dynoMobileVideo,
    poster: dynoPoster,
  } satisfies MediaAsset,
  featureAlt: 'Pink Ferrari SF90 Stradale on a dyno, firing long flames from its exhaust',
  clip: {
    media: { type: 'video', src: flamesMobileVideo, poster: flamesPoster } satisfies MediaAsset,
    alt: 'Black Ferrari SF90 Stradale firing flames from its exhaust inside a workshop',
  },
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
