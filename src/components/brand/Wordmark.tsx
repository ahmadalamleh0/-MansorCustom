import { site } from '@/data/site'

type WordmarkProps = {
  className?: string
}

/**
 * Typographic wordmark: the lines from `site.wordmark`, stacked to mirror the
 * client's logo structure. MANSOR is the primary line; CUSTOMS sits beneath
 * at a smaller size, letter-spaced to span exactly MANSOR's width.
 * Temporary until the client supplies their logo files. Letters are individual elements so
 * the intro can reveal them one by one:
 *   [data-wm-letter]  each glyph, in reading order
 * No frame or symbol: the identity is the stacked type itself.
 */
export function Wordmark({ className = '' }: WordmarkProps) {
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
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}
