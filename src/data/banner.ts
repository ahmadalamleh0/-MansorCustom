import ceramicPro from '@/assets/logos/ceramic-pro.png'
import gtechniq from '@/assets/logos/gtechniq.png'
import hexis from '@/assets/logos/hexis-mono.svg'
import stek from '@/assets/logos/stek.svg'
import suntek from '@/assets/logos/suntek.svg'
import xpel from '@/assets/logos/xpel.svg'

/**
 * Brand banner below the hero: a scrolling row of product-brand logos.
 *
 * Logos: supplied in /Banner and rendered monochrome. `prepared: true` means
 * the file is already a monochrome variant (HEXIS: box light, letters cut
 * out) and must not be filtered. NOTE: these are product brands only. No
 * certification or partnership is confirmed, so don't caption them as such.
 */

export type BrandLogo = { name: string; src: string; prepared?: boolean }

export const banner = {
  logos: [
    { name: 'XPEL', src: xpel },
    { name: 'STEK', src: stek },
    { name: 'SunTek', src: suntek },
    { name: 'HEXIS', src: hexis, prepared: true },
    { name: 'Gtechniq', src: gtechniq },
    { name: 'Ceramic Pro', src: ceramicPro },
  ] satisfies BrandLogo[],
}
