import audiLogo from '@/assets/logos/makes/audi.svg'
import bmwLogo from '@/assets/logos/makes/bmw.svg'
import mclarenLogo from '@/assets/logos/makes/mclaren.svg'
import porscheLogo from '@/assets/logos/makes/porsche.svg'
import m3PosterJpg from '@/assets/images/projects/bmw-m3-poster.jpg'
import m3PosterWebp from '@/assets/images/projects/bmw-m3-poster.webp'
import m3Video from '@/assets/images/projects/bmw-m3.mp4'
import r8Jpg from '@/assets/images/projects/audi-r8-960.jpg'
import r8Webp from '@/assets/images/projects/audi-r8-960.webp'
import xm560Jpg from '@/assets/images/projects/bmw-xm-560.jpg'
import xm560Webp from '@/assets/images/projects/bmw-xm-560.webp'
import xm960Jpg from '@/assets/images/projects/bmw-xm-960.jpg'
import xm960Webp from '@/assets/images/projects/bmw-xm-960.webp'
import mcl560Jpg from '@/assets/images/projects/mclaren-720s-560.jpg'
import mcl560Webp from '@/assets/images/projects/mclaren-720s-560.webp'
import mcl960Jpg from '@/assets/images/projects/mclaren-720s-960.jpg'
import mcl960Webp from '@/assets/images/projects/mclaren-720s-960.webp'
import sClassPosterJpg from '@/assets/images/projects/mercedes-s-class-poster.jpg'
import sClassPosterWebp from '@/assets/images/projects/mercedes-s-class-poster.webp'
import sClassVideo from '@/assets/images/projects/mercedes-s-class.mp4'
import gJpg from '@/assets/images/projects/mercedes-g-class-960.jpg'
import gWebp from '@/assets/images/projects/mercedes-g-class-960.webp'
import p911560Jpg from '@/assets/images/projects/porsche-911-560.jpg'
import p911560Webp from '@/assets/images/projects/porsche-911-560.webp'
import p911960Jpg from '@/assets/images/projects/porsche-911-960.jpg'
import p911960Webp from '@/assets/images/projects/porsche-911-960.webp'
import rr560Jpg from '@/assets/images/projects/range-rover-560.jpg'
import rr560Webp from '@/assets/images/projects/range-rover-560.webp'
import rr960Jpg from '@/assets/images/projects/range-rover-960.jpg'
import rr960Webp from '@/assets/images/projects/range-rover-960.webp'

/**
 * Selected Projects: Mansor builds for the VOIR-style collection gallery.
 * Add a vehicle by appending an entry (3:5 portrait crops, car framed in
 * the lower two-thirds). `image: null` renders a placeholder card for a
 * project whose photography hasn't arrived yet.
 *
 * Model names are only what the photo itself confirms; anything marked
 * `confirm` needs the creative director's check before launch.
 */

type Source = { url: string; w: number }
export type Project = {
  id: string
  make: string
  /** Shown vertically along the card's right edge */
  model: string
  /** Monochrome maker mark (SVG, drawn as a mask in the text colour). null → tracked wordmark of `make` */
  logo: string | null
  /** The still (for a video card, its poster: shown first, and instead of the video with reduced motion) */
  image: { alt: string; webp: Source[]; jpg: Source[]; position?: string } | null
  /** Optional 3:5 muted loop (H.264, no audio): plays inline while the card is on screen */
  video?: string
  /** Model name not yet confirmed by Mansor */
  confirm?: string
}

const set = (pairs: [string, number][]) => pairs.map(([url, w]) => ({ url, w }))

export const projects: Project[] = [
  {
    id: 'mercedes-s-class',
    make: 'Mercedes-Benz',
    model: 'S-Class',
    logo: null, // no open-licence mark available; supply the official monochrome logo to swap in
    video: sClassVideo,
    image: {
      alt: 'Silver Mercedes-Benz S-Class at night, doors open, turquoise interior with ambient lighting',
      webp: set([[sClassPosterWebp, 576]]),
      jpg: set([[sClassPosterJpg, 576]]),
    },
  },
  {
    id: 'mclaren-720s',
    make: 'McLaren',
    model: '720S',
    logo: mclarenLogo,
    confirm: '720S vs 750S: the two share this front; confirm with Mansor',
    image: {
      alt: 'McLaren in a colour-shift wrap, doors up, in the Mansor Customs studio',
      webp: set([[mcl560Webp, 560], [mcl960Webp, 960]]),
      jpg: set([[mcl560Jpg, 560], [mcl960Jpg, 960]]),
    },
  },
  {
    id: 'bmw-m3',
    make: 'BMW',
    model: 'M3', // confirmed by the creative director, 2026-10-10
    logo: bmwLogo,
    video: m3Video,
    image: {
      alt: 'Satin black BMW M3 with carbon aero outside the Mansor Customs shop',
      webp: set([[m3PosterWebp, 576]]),
      jpg: set([[m3PosterJpg, 576]]),
    },
  },
  {
    id: 'bmw-xm',
    make: 'BMW',
    model: 'XM',
    logo: bmwLogo,
    image: {
      alt: 'Black BMW XM with red accents outside the Mansor Customs shop',
      webp: set([[xm560Webp, 560], [xm960Webp, 960]]),
      jpg: set([[xm560Jpg, 560], [xm960Jpg, 960]]),
    },
  },
  {
    id: 'range-rover',
    make: 'Range Rover',
    model: 'Range Rover',
    logo: null, // no open-licence mark available; supply the official monochrome logo to swap in
    image: {
      alt: 'Black Range Rover on monoblock wheels',
      webp: set([[rr560Webp, 560], [rr960Webp, 960]]),
      jpg: set([[rr560Jpg, 560], [rr960Jpg, 960]]),
    },
  },
  {
    id: 'audi-r8',
    make: 'Audi',
    model: 'R8',
    logo: audiLogo,
    image: {
      alt: 'Audi R8 in a silver and blue split wrap',
      webp: set([[r8Webp, 512]]),
      jpg: set([[r8Jpg, 512]]),
    },
  },
  {
    id: 'porsche-911',
    make: 'Porsche',
    model: '911',
    logo: porscheLogo,
    image: {
      alt: 'Rear of a Porsche 911 with its wing raised and the light bar lit',
      webp: set([[p911560Webp, 560], [p911960Webp, 960]]),
      jpg: set([[p911560Jpg, 560], [p911960Jpg, 960]]),
    },
  },
  {
    id: 'mercedes-g-class',
    make: 'Mercedes-Benz',
    model: 'G-Class',
    logo: null, // no open-licence mark available; supply the official monochrome logo to swap in
    image: {
      alt: 'Mercedes-Benz G-Class interior trimmed in turquoise with diamond-quilted seats',
      webp: set([[gWebp, 941]]),
      jpg: set([[gJpg, 941]]),
    },
  },
]
