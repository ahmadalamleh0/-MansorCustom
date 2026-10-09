import { Fragment } from 'react'
import { site } from '@/data/site'

/** Frame path length in user units; large so per-pixel rounding stays invisible */
const FRAME_LENGTH = 1000

type WordmarkProps = {
  /** Draw the hairline frame around the letters */
  framed?: boolean
  className?: string
}

/**
 * Temporary typographic wordmark (pending the client's logo). Letters are
 * individual elements so the intro can reveal them one by one:
 *   [data-wm-letter]  each glyph
 *   [data-wm-frame]   the frame <rect>; pathLength=FRAME_LENGTH, and it traces clockwise
 *                     from the top-left corner, like the reference
 */
export function Wordmark({ framed = false, className = '' }: WordmarkProps) {
  const words = site.name.toUpperCase().split(' ')

  return (
    <span role="img" aria-label={site.name} className={`wordmark ${className}`}>
      {words.map((word, w) => (
        <Fragment key={word}>
          {w > 0 && <span aria-hidden="true" className="wordmark__space" />}
          {[...word].map((char, i) => (
            <span key={i} aria-hidden="true" data-wm-letter className="wordmark__letter">
              {char}
            </span>
          ))}
        </Fragment>
      ))}
      {framed && (
        <svg aria-hidden="true" className="wordmark__frame">
          <rect data-wm-frame x="0" y="0" width="100%" height="100%" pathLength={FRAME_LENGTH} />
        </svg>
      )}
    </span>
  )
}
