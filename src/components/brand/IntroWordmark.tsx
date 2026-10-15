import { site } from '@/data/site'

/**
 * Intro wordmark, typeset to match the official logo's letterforms (wide
 * geometric grotesque) a little lighter, for the cinematic opening: Archivo at
 * its widest (125%), MANSOR at weight 500 (the logo reads like 600), CUSTOMS
 * smaller and widely tracked beneath. Letters are separate elements so the
 * intro can reveal them one by one:
 *   [data-wm-letter]  each glyph, in reading order
 */
export function IntroWordmark({ className = '' }: { className?: string }) {
  const lines = site.wordmark

  return (
    <span role="img" aria-label={lines.join(' ')} className={`intro-wordmark ${className}`}>
      {lines.map((line, i) => (
        <span key={line} aria-hidden="true" className={`intro-wordmark__line intro-wordmark__line--${i === 0 ? 'primary' : 'secondary'}`}>
          {[...line.toUpperCase()].map((char, j) => (
            <span key={j} data-wm-letter className="intro-wordmark__letter">
              {char}
            </span>
          ))}
        </span>
      ))}
    </span>
  )
}
