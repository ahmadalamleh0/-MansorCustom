import { site } from '@/data/site'

/** Frame path length in user units; large so per-pixel rounding stays invisible */
const FRAME_LENGTH = 1000

type WordmarkProps = {
  /** Draw the hairline frame around the letters */
  framed?: boolean
  className?: string
}

/**
 * Typographic wordmark: the lines from `site.wordmark` (MANSOR / CUSTOMS),
 * stacked and centred, mirroring the client's logo structure. Temporary until
 * the client supplies their logo files. Letters are individual elements so
 * the intro can reveal them one by one:
 *   [data-wm-letter]  each glyph, in reading order
 *   [data-wm-frame]   the frame <rect>; pathLength=FRAME_LENGTH, and it traces
 *                     clockwise from the top-left corner
 */
export function Wordmark({ framed = false, className = '' }: WordmarkProps) {
  const lines = site.wordmark

  return (
    <span role="img" aria-label={lines.join(' ')} className={`wordmark ${className}`}>
      {lines.map((line) => (
        <span key={line} aria-hidden="true" className="wordmark__line">
          {[...line.toUpperCase()].map((char, i) => (
            <span key={i} data-wm-letter className="wordmark__letter">
              {char}
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
