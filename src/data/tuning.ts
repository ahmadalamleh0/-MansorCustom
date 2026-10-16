import blackSf90PosterJpg from '@/assets/images/projects/ferrari-sf90-poster.jpg'
import blackSf90PosterWebp from '@/assets/images/projects/ferrari-sf90-poster.webp'
import blackSf90Video from '@/assets/images/projects/ferrari-sf90.mp4'
import ferrariLogo from '@/assets/logos/makes/ferrari.svg'
import sfsExhaustPosterJpg from '@/assets/images/tuning/card-sf90-stradale-exhaust-poster.jpg'
import sfsExhaustPosterWebp from '@/assets/images/tuning/card-sf90-stradale-exhaust-poster.webp'
import sfsExhaustVideo from '@/assets/images/tuning/card-sf90-stradale-exhaust.mp4'
import sfs1560Jpg from '@/assets/images/projects/sf90-stradale-1-560.jpg'
import sfs1560Webp from '@/assets/images/projects/sf90-stradale-1-560.webp'
import sfs1960Jpg from '@/assets/images/projects/sf90-stradale-1-960.jpg'
import sfs1960Webp from '@/assets/images/projects/sf90-stradale-1-960.webp'
import sfs2560Jpg from '@/assets/images/projects/sf90-stradale-2-560.jpg'
import sfs2560Webp from '@/assets/images/projects/sf90-stradale-2-560.webp'
import sfs2960Jpg from '@/assets/images/projects/sf90-stradale-2-960.jpg'
import sfs2960Webp from '@/assets/images/projects/sf90-stradale-2-960.webp'
import huracanPosterJpg from '@/assets/images/tuning/card-huracan-dyno-poster.jpg'
import huracanPosterWebp from '@/assets/images/tuning/card-huracan-dyno-poster.webp'
import huracanVideo from '@/assets/images/tuning/card-huracan-dyno.mp4'
import sf90PosterJpg from '@/assets/images/tuning/card-sf90-dyno-poster.jpg'
import sf90PosterWebp from '@/assets/images/tuning/card-sf90-dyno-poster.webp'
import sf90Video from '@/assets/images/tuning/card-sf90-dyno.mp4'
import type { Project } from './projects'

const set = (pairs: [string, number][]) => pairs.map(([url, w]) => ({ url, w }))

/**
 * Tuning / performance, after Recent Work (creative director, 2026-10-14).
 * The gallery reuses the Recent Work collection cards (3:5) with Mansor's
 * own performance media, moving footage first: the black SF90 firing flames
 * in the workshop (moved here from Recent Work, 2026-10-14), the green
 * Huracán on the dyno (client-photos/tuning/huracan-green-dyno-flames.mp4,
 * 2–10s) and the pink SF90 on the dyno (sf90-pink-dyno-flames.mp4,
 * 2.5–16.5s), then the
 * SF90 Stradale (engine bay with the cats and
 * downpipes, then the car; moved here from Recent Work, 2026-10-14). No SVJ
 * footage has been supplied yet. The CTA opens the Build Brief with
 * `service` preselected (it must match a service title).
 */
export const tuning = {
  // Creative director, 2026-10-14
  headline: ['Tuned.'],
  copy: 'Exhausts, downpipes, and performance tuning.',
  cta: { label: 'Plan a Tuning Build', service: 'Tuning' },
  gallery: [
    {
      id: 'ferrari-sf90',
      make: 'Ferrari',
      model: 'SF90', // SF90 Stradale: identified from the rear (lights, high exhausts, diffuser)
      logo: ferrariLogo,
      video: blackSf90Video,
      image: {
        alt: 'Black Ferrari SF90 Stradale firing flames from its exhausts in a dark workshop',
        webp: set([[blackSf90PosterWebp, 576]]),
        jpg: set([[blackSf90PosterJpg, 576]]),
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
      id: 'ferrari-sf90-stradale',
      make: 'Ferrari',
      model: 'SF90 Stradale',
      logo: ferrariLogo,
      // Video first (2026-10-15: the blued titanium exhaust going on,
      // client-photos/tuning/sf90-stradale-exhaust-fit.mp4), then the photos
      image: {
        alt: 'Ferrari SF90 Stradale engine bay in the Mansor Customs workshop, a blued titanium exhaust being fitted',
        webp: set([[sfsExhaustPosterWebp, 576]]),
        jpg: set([[sfsExhaustPosterJpg, 576]]),
        video: sfsExhaustVideo,
      },
      gallery: [
        {
          alt: 'Grey Ferrari SF90 Stradale engine bay in the Mansor Customs workshop: twin-turbo V8 and hybrid battery pack',
          webp: set([[sfs1560Webp, 560], [sfs1960Webp, 841]]),
          jpg: set([[sfs1560Jpg, 560], [sfs1960Jpg, 841]]),
        },
        {
          alt: 'The grey Ferrari SF90 Stradale outside the shop, front three-quarter',
          webp: set([[sfs2560Webp, 560], [sfs2960Webp, 960]]),
          jpg: set([[sfs2560Jpg, 560], [sfs2960Jpg, 960]]),
        },
      ],
    },
  ] as Project[],
}
