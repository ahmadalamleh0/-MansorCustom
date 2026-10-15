import logoWebp from '@/assets/brand/mansor-logo-white.webp'

/** The official logo file (BrandLogo's), 899×181 */
const W = 899
const H = 181
/** Its artwork bounds: the lockup is exactly this box, so it centres on the letters */
const BOX = { x0: 6, y0: 5, x1: 894, y1: 175 }

/** Each glyph's box in the logo file, measured from its alpha (two rows: MANSOR, CUSTOMS) */
const LETTERS: [number, number, number, number][] = [
  ...[[6, 167], [183, 322], [335, 462], [485, 603], [621, 759], [778, 894]].map(([a, b]) => [a, 5, b, 103] as [number, number, number, number]),
  ...[[183, 218], [272, 306], [357, 387], [439, 471], [520, 561], [615, 658], [713, 742]].map(([a, b]) => [a, 136, b, 175] as [number, number, number, number]),
]
/** 1px of room round each glyph so its anti-aliased edge is never clipped */
const PAD = 1

/** The same WebP the header's <picture> loads, so it's already cached */
const BG = `url("${logoWebp}")`
const pct = (n: number) => `${n * 100}%`

/**
 * The header's official logo (the same image file as BrandLogo), cut into one
 * window per letter so the intro can reveal it letter by letter:
 *   [data-wm-letter]  each glyph, in reading order (MANSOR, then CUSTOMS)
 * Every window shows its glyph from the one logo image, so proportions,
 * weights and spacing are exactly the header's.
 */
export function LogoWordmark({ className = '' }: { className?: string }) {
  const bw = BOX.x1 - BOX.x0
  const bh = BOX.y1 - BOX.y0

  return (
    <span role="img" aria-label="Mansor Customs" className={`logo-wordmark ${className}`} style={{ aspectRatio: `${bw} / ${bh}` }}>
      {LETTERS.map(([x0, y0, x1, y1], i) => {
        const [a, b, c, d] = [x0 - PAD, y0 - PAD, x1 + PAD, y1 + PAD]
        const w = c - a
        const h = d - b
        return (
          <span
            key={i}
            data-wm-letter
            aria-hidden="true"
            className="logo-wordmark__letter"
            style={{
              left: pct((a - BOX.x0) / bw),
              top: pct((b - BOX.y0) / bh),
              width: pct(w / bw),
              height: pct(h / bh),
              backgroundImage: BG,
              backgroundSize: `${pct(W / w)} ${pct(H / h)}`,
              backgroundPosition: `${pct(a / (W - w))} ${pct(b / (H - h))}`,
            }}
          />
        )
      })}
    </span>
  )
}
