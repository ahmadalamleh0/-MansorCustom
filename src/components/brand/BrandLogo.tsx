import logoPng from '@/assets/brand/mansor-logo-white.png'
import logoWebp from '@/assets/brand/mansor-logo-white.webp'

/**
 * The official Mansor Customs logo (MANSOR over tracked CUSTOMS), white on
 * transparent, extracted from the client's logo file
 * (client-photos/brand/mansor-logo-official.jpg). Used in the header and
 * footer; the intro keeps its typeset, letter-by-letter Wordmark.
 */
export function BrandLogo({ className = '' }: { className?: string }) {
  return (
    <picture className={`brand-logo ${className}`}>
      <source type="image/webp" srcSet={logoWebp} />
      <img src={logoPng} alt="Mansor Customs" width={899} height={181} decoding="async" />
    </picture>
  )
}
