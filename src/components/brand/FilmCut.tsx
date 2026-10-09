/**
 * "The Film Cut": the Mansour Customs signature detail. Two hairline strokes,
 * slightly offset like the cut edge of overlapping vinyl film layers.
 * Sized in em, so it scales with the font-size of whatever wordmark it
 * accompanies. Animation hooks: [data-film-line="a"] (top, near-white) and
 * [data-film-line="b"] (bottom, silver).
 */
export function FilmCut({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`film-cut ${className}`}>
      <span data-film-line="a" className="film-cut__line film-cut__line--a" />
      <span data-film-line="b" className="film-cut__line film-cut__line--b" />
    </span>
  )
}
