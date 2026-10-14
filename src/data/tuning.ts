import ferrariLogo from '@/assets/logos/makes/ferrari.svg'
import huracanPosterJpg from '@/assets/images/tuning/card-huracan-dyno-poster.jpg'
import huracanPosterWebp from '@/assets/images/tuning/card-huracan-dyno-poster.webp'
import huracanVideo from '@/assets/images/tuning/card-huracan-dyno.mp4'
import porsche560Jpg from '@/assets/images/tuning/card-porsche-flame-560.jpg'
import porsche560Webp from '@/assets/images/tuning/card-porsche-flame-560.webp'
import porsche901Jpg from '@/assets/images/tuning/card-porsche-flame-901.jpg'
import porsche901Webp from '@/assets/images/tuning/card-porsche-flame-901.webp'
import sf90PosterJpg from '@/assets/images/tuning/card-sf90-dyno-poster.jpg'
import sf90PosterWebp from '@/assets/images/tuning/card-sf90-dyno-poster.webp'
import sf90Video from '@/assets/images/tuning/card-sf90-dyno.mp4'
import engine560Jpg from '@/assets/images/tuning/card-sf90-engine-560.jpg'
import engine560Webp from '@/assets/images/tuning/card-sf90-engine-560.webp'
import engine841Jpg from '@/assets/images/tuning/card-sf90-engine-841.jpg'
import engine841Webp from '@/assets/images/tuning/card-sf90-engine-841.webp'
import type { Project } from './projects'

const set = (pairs: [string, number][]) => pairs.map(([url, w]) => ({ url, w }))

/**
 * Tuning / performance, after Recent Work (creative director, 2026-10-14).
 * The gallery reuses the Recent Work collection cards (3:5) with Mansor's
 * own performance media, moving footage first: the pink SF90 on the dyno
 * (client-photos/tuning/sf90-pink-dyno-flames.mp4, 2.5–16.5s) and the green
 * Huracán on the dyno (huracan-green-dyno-flames.mp4, 2–10s), then the
 * Porsche exhaust flame and the SF90 engine bay (cats and downpipes). No SVJ
 * footage has been supplied yet. The CTA opens the Build Brief with
 * `service` preselected (it must match a service title).
 */
export const tuning = {
  headline: ['Tuned to', 'be heard.'],
  copy: 'Exhausts, downpipes and tuning for cars that should sound the way they look.',
  cta: { label: 'Plan a Tuning Build', service: 'Tuning' },
  gallery: [
    {
      id: 'tuning-sf90-dyno',
      make: 'Ferrari',
      model: 'SF90',
      logo: ferrariLogo,
      video: sf90Video,
      image: {
        alt: 'Pink Ferrari SF90 Stradale on a dyno, firing long flames from its exhaust',
        webp: set([[sf90PosterWebp, 576]]),
        jpg: set([[sf90PosterJpg, 576]]),
      },
    },
    {
      id: 'tuning-huracan-dyno',
      make: 'Lamborghini',
      model: 'Huracán',
      logo: null,
      confirm: 'Huracán variant (Tecnica / EVO): confirm with Mansor',
      video: huracanVideo,
      image: {
        alt: 'Green Lamborghini Huracán on a dyno, flames streaming from its exhaust',
        webp: set([[huracanPosterWebp, 576]]),
        jpg: set([[huracanPosterJpg, 576]]),
      },
    },
    {
      id: 'tuning-porsche-flame',
      make: 'Porsche',
      model: '911',
      logo: null,
      confirm: 'Likely a 992 GT3 RS (light bar, swan-neck wing): confirm with Mansor',
      image: {
        alt: 'Matte grey Porsche 911 from behind, a flame leaving the exhaust under its rear wing',
        webp: set([[porsche560Webp, 560], [porsche901Webp, 901]]),
        jpg: set([[porsche560Jpg, 560], [porsche901Jpg, 901]]),
      },
    },
    {
      id: 'tuning-sf90-engine',
      make: 'Ferrari',
      model: 'SF90',
      logo: ferrariLogo,
      image: {
        alt: 'Ferrari SF90 engine bay from above: the V8, catalytic converters and downpipes',
        webp: set([[engine560Webp, 560], [engine841Webp, 841]]),
        jpg: set([[engine560Jpg, 560], [engine841Jpg, 841]]),
      },
    },
  ] as Project[],
}
