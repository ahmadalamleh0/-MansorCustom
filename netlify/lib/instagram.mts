import { getStore } from '@netlify/blobs'

/**
 * Instagram API with Instagram Login (official Meta Graph API, graph.instagram.com).
 * Server-side only: the access token never reaches the browser.
 *
 * Required from Mansor Customs (see DESIGN.md › Instagram Reels):
 *   - @mansor.customs as an Instagram Professional account (Business or Creator)
 *   - a Meta app (Business type) with the Instagram product, permission
 *     `instagram_business_basic`, and the account added/authorised in the app
 *   - a long-lived access token (60 days) stored in Netlify as INSTAGRAM_ACCESS_TOKEN
 *
 * The scheduled refresh function keeps the token alive and stores the current
 * one in Netlify Blobs, so the env var only seeds it.
 */

export const GRAPH = 'https://graph.instagram.com'
export const API_VERSION = 'v25.0'
export const store = () => getStore({ name: 'instagram', consistency: 'strong' })

export type Reel = {
  id: string
  video: string
  poster: string
  permalink: string
  caption: string | null
  timestamp: string
}

export type StoredToken = { token: string; refreshedAt: string; expiresAt: string | null }
export type CachedReels = { reels: Reel[]; fetchedAt: string }

type GraphMedia = {
  id: string
  media_type?: string
  media_product_type?: string
  media_url?: string
  thumbnail_url?: string
  permalink?: string
  caption?: string
  timestamp?: string
}
type GraphError = { error?: { message?: string; type?: string; code?: number } }

export class GraphApiError extends Error {
  readonly code: number | undefined
  constructor(message: string, code: number | undefined) {
    super(message)
    this.code = code
  }
  /** OAuthException 190: token expired, revoked or invalid */
  get isAuth() {
    return this.code === 190 || this.code === 102
  }
}

async function graph<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${GRAPH}/${path}`)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
  const body = (await res.json().catch(() => ({}))) as T & GraphError
  if (!res.ok || body.error) {
    throw new GraphApiError(body.error?.message ?? `Graph API ${res.status}`, body.error?.code)
  }
  return body
}

/** Current token: the refreshed one in Blobs, else the env seed. */
export async function currentTokens(): Promise<string[]> {
  const stored = (await store().get('token', { type: 'json' }).catch(() => null)) as StoredToken | null
  const seed = process.env.INSTAGRAM_ACCESS_TOKEN
  return [...new Set([stored?.token, seed].filter((t): t is string => !!t))]
}

const BASE_FIELDS = 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp'

/**
 * Latest `count` Reels. Copyright-flagged media has no media_url and is
 * skipped. media_product_type is requested where the API supports it;
 * otherwise every VIDEO is treated as a Reel (Instagram publishes feed
 * videos as Reels).
 */
export async function fetchLatestReels(token: string, count = 3): Promise<Reel[]> {
  let data: { data: GraphMedia[] }
  try {
    data = await graph(`${API_VERSION}/me/media`, { fields: `${BASE_FIELDS},media_product_type`, limit: '30', access_token: token })
  } catch (err) {
    if (err instanceof GraphApiError && err.code === 100) {
      data = await graph(`${API_VERSION}/me/media`, { fields: BASE_FIELDS, limit: '30', access_token: token })
    } else throw err
  }

  return data.data
    .filter((m) => m.media_type === 'VIDEO' && (!m.media_product_type || m.media_product_type === 'REELS'))
    .filter((m) => m.media_url && m.thumbnail_url && m.permalink)
    .slice(0, count)
    .map((m) => ({
      id: m.id,
      video: m.media_url!,
      poster: m.thumbnail_url!,
      permalink: m.permalink!,
      caption: m.caption?.trim() || null,
      timestamp: m.timestamp ?? '',
    }))
}

/** Extends a long-lived token by 60 days (token must be ≥24 h old and unexpired). */
export async function refreshToken(token: string): Promise<StoredToken> {
  const res = await graph<{ access_token: string; expires_in?: number }>('refresh_access_token', {
    grant_type: 'ig_refresh_token',
    access_token: token,
  })
  const now = Date.now()
  return {
    token: res.access_token,
    refreshedAt: new Date(now).toISOString(),
    expiresAt: res.expires_in ? new Date(now + res.expires_in * 1000).toISOString() : null,
  }
}
