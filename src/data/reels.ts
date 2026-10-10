/**
 * One Instagram Reel as the showcase renders it. Same shape as the
 * /api/instagram-reels response (netlify/lib/instagram.mts › Reel).
 */
export type Reel = {
  id: string
  /** 9:16 MP4 (Instagram's signed CDN URL, which expires); null when Meta
   *  withholds the file (licensed music / copyright): thumbnail + link only */
  video: string | null
  /** Thumbnail shown before the video loads, and if it fails */
  poster: string | null
  /** The original Reel on Instagram; null for a supplied clip without one
   *  (the card then links to the account's Reels tab) */
  permalink: string | null
  caption?: string | null
}

// https URLs, or same-origin paths (not protocol-relative //host)
const isUrl = (v: unknown): v is string => typeof v === 'string' && /^(https:\/\/|\/(?!\/))/.test(v)
const urlOrNull = (v: unknown) => (isUrl(v) ? v : null)

/** Accepts only well-formed reels from the API (defensive: never trust the wire). */
export function parseReels(value: unknown): Reel[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((r) => !!r && typeof r.id === 'string' && isUrl(r.permalink) && (isUrl(r.video) || isUrl(r.poster)))
    .map((r) => ({
      id: r.id,
      video: urlOrNull(r.video),
      poster: urlOrNull(r.poster),
      permalink: r.permalink,
      caption: typeof r.caption === 'string' ? r.caption : null,
    }))
}
