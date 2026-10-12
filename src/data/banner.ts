import threeM from '@/assets/logos/3m.svg'
import akrapovic from '@/assets/logos/akrapovic.png'
import brillsteel from '@/assets/logos/brillsteel-motorsport.png'
import pureppf from '@/assets/logos/pureppf.png'
import stage4 from '@/assets/logos/stage4-tuning.png'
import suntek from '@/assets/logos/suntek.svg'
import xpel from '@/assets/logos/xpel-official.png'

/**
 * Brand banner below the hero: brands genuinely associated with Mansor
 * Customs. Only `status: 'confirmed'` brands are shown.
 *
 *   confirmed: independently confirmed by the creative director (2026-10-11)
 *   pending:   publicly mentioned on Mansor's own website; awaiting client
 *              approval. Never shown, and never captioned as a partner.
 *
 * `logo`: an OFFICIAL logo file from the brand (SVG preferred), rendered
 * monochrome. Until one is supplied, the brand's name is set in plain
 * tracked type: a name, not an imitation logo. `prepared: true` means the
 * file is already a light monochrome variant and must not be filtered.
 */

export type Brand = {
  name: string
  status: 'confirmed' | 'pending'
  /** How Mansor is associated with the brand, and where that's documented */
  relation: string
  source?: string
  /** `tall`: a two-line lockup, set a little taller so its small line stays legible */
  /** `color`: keep the logo's own colours at full strength (not dimmed to the strip's grey) */
  /** `stacked`: an emblem-over-name lockup (~2:1), set taller again */
  logo?: { src: string; prepared?: boolean; tall?: boolean; stacked?: boolean; color?: boolean }
}

export const brands: Brand[] = [
  {
    name: 'Stage 4 Tuning',
    status: 'confirmed',
    relation: 'Stage 4 Tuning official dealer network',
    source: 'https://stage4tuning.com/dealers',
    // Official logo, supplied by the creative director (2026-10-12): Stage 4's
    // own share image, cut to white on transparency. Already light: no filter.
    logo: { src: stage4, prepared: true, tall: true },
  },
  {
    name: 'Brillsteel Motorsport',
    // Removed from the strip at the creative director's request (2026-10-12)
    status: 'pending',
    relation: 'Stage 4 Tuning official dealer network',
    source: 'https://stage4tuning.com/dealers/brillsteel',
    // Official logo, supplied by the creative director (2026-10-12), cut onto
    // transparency. Its red and white are kept, as asked: not filtered.
    logo: { src: brillsteel, prepared: true, stacked: true, color: true },
  },

  {
    name: 'Akrapovič',
    status: 'confirmed',
    relation: 'Approved by the creative director, who supplied the logo (2026-10-12)',
    // Official logo, reversed for dark: red emblem kept, black lettering to white
    logo: { src: akrapovic, prepared: true, color: true },
  },

  {
    name: 'XPEL',
    status: 'confirmed',
    relation: 'Approved by the creative director, who supplied the logo (2026-10-12)',
    // Official logo, reversed to white for the dark strip
    logo: { src: xpel, prepared: true },
  },

  {
    name: '3M',
    status: 'confirmed',
    relation: 'Approved by the creative director, who supplied a logo (2026-10-12)',
    // The supplied file was a watermarked clip-art copy; this is the same
    // official mark as a clean vector (Simple Icons, CC0), in 3M red
    logo: { src: threeM, prepared: true, color: true },
  },

  {
    name: 'PurePPF',
    status: 'confirmed',
    relation: 'Approved by the creative director, who supplied the logo (2026-10-12)',
    // The supplied file was a 126px thumbnail of PurePPF's own logo; this is
    // the same file at full size from their official site (pureprotectionfilm.com),
    // light version, ghost tagline removed. Already light: no filter.
    logo: { src: pureppf, prepared: true },
  },

  // Pending client approval: mentioned on Mansor's website

  { name: 'Eventuri', status: 'pending', relation: 'Mentioned on Mansor’s website' },
  { name: 'Wagner Tuning', status: 'pending', relation: 'Mentioned on Mansor’s website' },
  { name: 'SunTek', status: 'pending', relation: 'Mentioned on Mansor’s website', logo: { src: suntek } },
]

export const shownBrands = brands.filter((b) => b.status === 'confirmed')
