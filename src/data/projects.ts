import bmwLogo from '@/assets/logos/makes/bmw.svg'
import ferrariLogo from '@/assets/logos/makes/ferrari.svg'
import mclarenLogo from '@/assets/logos/makes/mclaren.svg'
import porscheLogo from '@/assets/logos/makes/porsche.svg'
import m3PosterJpg from '@/assets/images/projects/bmw-m3-poster.jpg'
import m3PosterWebp from '@/assets/images/projects/bmw-m3-poster.webp'
import m3Video from '@/assets/images/projects/bmw-m3.mp4'
import xm560Jpg from '@/assets/images/projects/bmw-xm-560.jpg'
import xm560Webp from '@/assets/images/projects/bmw-xm-560.webp'
import xm960Jpg from '@/assets/images/projects/bmw-xm-960.jpg'
import xm960Webp from '@/assets/images/projects/bmw-xm-960.webp'
import sf90PosterJpg from '@/assets/images/projects/ferrari-sf90-poster.jpg'
import sf90PosterWebp from '@/assets/images/projects/ferrari-sf90-poster.webp'
import sf90Video from '@/assets/images/projects/ferrari-sf90.mp4'
import gi1560Jpg from '@/assets/images/projects/g-class-interior-1-560.jpg'
import gi1560Webp from '@/assets/images/projects/g-class-interior-1-560.webp'
import gi1960Jpg from '@/assets/images/projects/g-class-interior-1-960.jpg'
import gi1960Webp from '@/assets/images/projects/g-class-interior-1-960.webp'
import gi2560Jpg from '@/assets/images/projects/g-class-interior-2-560.jpg'
import gi2560Webp from '@/assets/images/projects/g-class-interior-2-560.webp'
import gi2960Jpg from '@/assets/images/projects/g-class-interior-2-960.jpg'
import gi2960Webp from '@/assets/images/projects/g-class-interior-2-960.webp'
import gi3560Jpg from '@/assets/images/projects/g-class-interior-3-560.jpg'
import gi3560Webp from '@/assets/images/projects/g-class-interior-3-560.webp'
import gi3960Jpg from '@/assets/images/projects/g-class-interior-3-960.jpg'
import gi3960Webp from '@/assets/images/projects/g-class-interior-3-960.webp'
import mc1560Jpg from '@/assets/images/projects/mclaren-1-560.jpg'
import mc1560Webp from '@/assets/images/projects/mclaren-1-560.webp'
import mc1960Jpg from '@/assets/images/projects/mclaren-1-960.jpg'
import mc1960Webp from '@/assets/images/projects/mclaren-1-960.webp'
import mc2560Jpg from '@/assets/images/projects/mclaren-2-560.jpg'
import mc2560Webp from '@/assets/images/projects/mclaren-2-560.webp'
import mc2960Jpg from '@/assets/images/projects/mclaren-2-960.jpg'
import mc2960Webp from '@/assets/images/projects/mclaren-2-960.webp'
import mc3560Jpg from '@/assets/images/projects/mclaren-3-560.jpg'
import mc3560Webp from '@/assets/images/projects/mclaren-3-560.webp'
import mc3960Jpg from '@/assets/images/projects/mclaren-3-960.jpg'
import mc3960Webp from '@/assets/images/projects/mclaren-3-960.webp'
import mc4560Jpg from '@/assets/images/projects/mclaren-4-560.jpg'
import mc4560Webp from '@/assets/images/projects/mclaren-4-560.webp'
import mc4960Jpg from '@/assets/images/projects/mclaren-4-960.jpg'
import mc4960Webp from '@/assets/images/projects/mclaren-4-960.webp'
import sClassPosterJpg from '@/assets/images/projects/mercedes-s-class-poster.jpg'
import sClassPosterWebp from '@/assets/images/projects/mercedes-s-class-poster.webp'
import sClassVideo from '@/assets/images/projects/mercedes-s-class.mp4'
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
export type Photo = { alt: string; webp: Source[]; jpg: Source[]; position?: string }
export type Project = {
  id: string
  make: string
  /** Shown vertically along the card's right edge */
  model: string
  /** Monochrome maker mark (SVG, drawn as a mask in the text colour). null → tracked wordmark of `make` */
  logo: string | null
  /** The still (for a video card, its poster: shown first, and instead of the video with reduced motion) */
  image: Photo | null
  /** Optional 3:5 muted loop (H.264, no audio): plays inline while the card is on screen */
  video?: string
  /** More photos after `image`, in order; the card shows dots and steps through them on tap */
  gallery?: Photo[]
  /** Model name not yet confirmed by Mansor */
  confirm?: string
}

const set = (pairs: [string, number][]) => pairs.map(([url, w]) => ({ url, w }))

export const projects: Project[] = [
  {
    id: 'mclaren-720s',
    make: 'McLaren',
    model: '720S',
    logo: mclarenLogo,
    confirm: '720S vs 750S: the two share this front; confirm with Mansor',
    image: {
      alt: 'Colour-shift McLaren, door up, close on the front wing',
      webp: set([[mc1560Webp, 560], [mc1960Webp, 576]]),
      jpg: set([[mc1560Jpg, 560], [mc1960Jpg, 576]]),
    },
    gallery: [
      {
        alt: 'The McLaren, doors up, under the hex lights in the Mansor Customs studio',
        webp: set([[mc2560Webp, 560], [mc2960Webp, 960]]),
        jpg: set([[mc2560Jpg, 560], [mc2960Jpg, 960]]),
      },
      {
        alt: 'Colour-shift McLaren at night, front three-quarter',
        webp: set([[mc3560Webp, 560], [mc3960Webp, 960]]),
        jpg: set([[mc3560Jpg, 560], [mc3960Jpg, 960]]),
      },
      {
        alt: 'The McLaren outside the Mansor Customs shop',
        webp: set([[mc4560Webp, 560], [mc4960Webp, 960]]),
        jpg: set([[mc4560Jpg, 560], [mc4960Jpg, 960]]),
      },
    ],
  },
  {
    id: 'ferrari-sf90',
    make: 'Ferrari',
    model: 'SF90', // SF90 Stradale: identified from the rear (lights, high exhausts, diffuser)
    logo: ferrariLogo,
    video: sf90Video,
    image: {
      alt: 'Black Ferrari SF90 Stradale firing flames from its exhausts in a dark workshop',
      webp: set([[sf90PosterWebp, 576]]),
      jpg: set([[sf90PosterJpg, 576]]),
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
      alt: 'Mercedes-Benz G-Class interior in orange quilted leather, AMG steering wheel',
      webp: set([[gi1560Webp, 560], [gi1960Webp, 960]]),
      jpg: set([[gi1560Jpg, 560], [gi1960Jpg, 960]]),
    },
    gallery: [
      {
        alt: 'The G-Class rear cabin: orange leather, suede headliner and rear-seat screens',
        webp: set([[gi2560Webp, 560], [gi2960Webp, 960]]),
        jpg: set([[gi2560Jpg, 560], [gi2960Jpg, 960]]),
      },
      {
        alt: 'The G-Class back row in diamond-quilted orange leather',
        webp: set([[gi3560Webp, 560], [gi3960Webp, 960]]),
        jpg: set([[gi3560Jpg, 560], [gi3960Jpg, 960]]),
      },
    ],
  },
]
