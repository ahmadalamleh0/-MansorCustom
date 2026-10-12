import stage4 from '@/assets/logos/stage4-tuning.png'
import suntek from '@/assets/logos/suntek.svg'
import xpel from '@/assets/logos/xpel.svg'

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
  logo?: { src: string; prepared?: boolean; tall?: boolean }
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
    status: 'confirmed',
    relation: 'Stage 4 Tuning official dealer network',
    source: 'https://stage4tuning.com/dealers/brillsteel',
    // logo: official Brillsteel file pending (brillsteel.com unreachable)
  },

  // Pending client approval: mentioned on Mansor's website
  { name: 'Akrapovič', status: 'pending', relation: 'Mentioned on Mansor’s website' },
  { name: 'Eventuri', status: 'pending', relation: 'Mentioned on Mansor’s website' },
  { name: 'Wagner Tuning', status: 'pending', relation: 'Mentioned on Mansor’s website' },
  { name: 'XPEL', status: 'pending', relation: 'Mentioned on Mansor’s website', logo: { src: xpel } },
  { name: '3M', status: 'pending', relation: 'Mentioned on Mansor’s website' },
  { name: 'SunTek', status: 'pending', relation: 'Mentioned on Mansor’s website', logo: { src: suntek } },
]

export const shownBrands = brands.filter((b) => b.status === 'confirmed')
