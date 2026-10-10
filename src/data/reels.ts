/**
 * One Instagram Reel as the showcase renders it. Same shape as the
 * /api/instagram-reels response (netlify/lib/instagram.mts › Reel).
 */
export type Reel = {
  id: string
  /** 9:16 MP4: Instagram CDN media_url (signed, expires) or a client-supplied file */
  video: string
  /** Thumbnail shown before the video loads, and if it fails */
  poster: string
  /** The original Reel on Instagram */
  permalink: string
  caption?: string | null
}

const isUrl = (v: unknown): v is string => typeof v === 'string' && /^(https:\/\/|\/)/.test(v)

/** Accepts only well-formed reels from the API (defensive: never trust the wire). */
export function parseReels(value: unknown): Reel[] {
  if (!Array.isArray(value)) return []
  return value
    .filter((r): r is Reel => !!r && typeof r.id === 'string' && isUrl(r.video) && isUrl(r.poster) && isUrl(r.permalink))
    .map(({ id, video, poster, permalink, caption }) => ({ id, video, poster, permalink, caption: typeof caption === 'string' ? caption : null }))
}
