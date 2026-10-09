import ceramicPro from '@/assets/logos/ceramic-pro.png'
import gtechniq from '@/assets/logos/gtechniq.png'
import hexis from '@/assets/logos/hexis-mono.svg'
import stek from '@/assets/logos/stek.svg'
import suntek from '@/assets/logos/suntek.svg'
import xpel from '@/assets/logos/xpel.svg'
import type { MediaAsset } from './media'

/**
 * Showcase banner below the hero: a row of product-brand logos above an
 * angled strip of vehicle images (after the IR Customs reference).
 *
 * Logos: supplied in /Banner and rendered monochrome. `prepared: true` means
 * the file is already a monochrome variant (HEXIS: box light, letters cut
 * out) and must not be filtered. NOTE: these are product brands only. No
 * certification or partnership is confirmed, so don't caption them as such.
 *
 * Panels: PLACEHOLDERS until the client supplies vehicle photography. Add
 * `media` per panel (portrait crops work best, about 3:4).
 */

export type BrandLogo = { name: string; src: string; prepared?: boolean }
export type BannerPanel = { id: string; media?: MediaAsset }

export const banner = {
  logos: [
    { name: 'XPEL', src: xpel },
    { name: 'STEK', src: stek },
    { name: 'SunTek', src: suntek },
    { name: 'HEXIS', src: hexis, prepared: true },
    { name: 'Gtechniq', src: gtechniq },
    { name: 'Ceramic Pro', src: ceramicPro },
  ] satisfies BrandLogo[],

  panels: Array.from({ length: 9 }, (_, i): BannerPanel => ({ id: `panel-${i + 1}` })),
}
