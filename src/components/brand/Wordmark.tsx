import { site } from '@/data/site'

/** Frame path length in user units; large so per-pixel rounding stays invisible */
const FRAME_LENGTH = 1000

/*
 * Michroma's own "A" has its crossbar at 23-33% of the cap height, which
 * leaves a large triangular counter: the letter reads as a triangle (the
 * Urban look). This is the same glyph, built from the font's own outline and
 * leg angles in font units (2048 UPM, cap 1536, advance 2176), with the bar
 * raised to 39-49% at the original 160-unit thickness, so it reads as an A.
 */
const A_PATH =
  'M64 1536 L960 0 L1216 0 L2112 1536 L1888 1536 L1547.1 936 L628.9 936 L288 1536 Z M719.8 776 L1456.2 776 L1088 128 Z'

function LetterA() {
  return (
    <svg aria-hidden="true" viewBox="0 0 2176 1536" className="wordmark__glyph">
      <path d={A_PATH} fillRule="evenodd" fill="currentColor" />
    </svg>
  )
}

type WordmarkProps = {
  /** Draw the hairline frame around the letters */
  framed?: boolean
  className?: string
}

/**
 * Typographic wordmark: the lines from `site.wordmark`, stacked to mirror the
 * client's logo structure. MANSOR is the primary line; CUSTOMS sits beneath
 * at a smaller size, letter-spaced to span exactly MANSOR's width.
 * Temporary until the client supplies their logo files. Letters are individual elements so
 * the intro can reveal them one by one:
 *   [data-wm-letter]  each glyph, in reading order
 *   [data-wm-frame]   the frame <rect>; pathLength=FRAME_LENGTH, and it traces
 *                     clockwise from the top-left corner
 */
export function Wordmark({ framed = false, className = '' }: WordmarkProps) {
  const lines = site.wordmark

  return (
    <span role="img" aria-label={lines.join(' ')} className={`wordmark ${className}`}>
      {lines.map((line, i) => (
        <span
          key={line}
          aria-hidden="true"
          className={`wordmark__line ${i === 0 ? 'wordmark__line--primary' : 'wordmark__line--secondary'}`}
        >
          {[...line.toUpperCase()].map((char, j) => (
            <span key={j} data-wm-letter className="wordmark__letter">
              {char === 'A' ? <LetterA /> : char}
            </span>
          ))}
        </span>
      ))}
      {framed && (
        <svg aria-hidden="true" className="wordmark__frame">
          <rect data-wm-frame x="0" y="0" width="100%" height="100%" pathLength={FRAME_LENGTH} />
        </svg>
      )}
    </span>
  )
}
