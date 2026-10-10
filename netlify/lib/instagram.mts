import { createHmac, timingSafeEqual } from 'node:crypto'
import { getStore } from '@netlify/blobs'

/**
 * Instagram API with Instagram Login (official Meta API, graph.instagram.com).
 * Server-side only: tokens and the app secret never reach the browser.
 *
 * Netlify environment variables:
 *   INSTAGRAM_APP_ID          Instagram app ID (Meta App Dashboard › Instagram › API setup)
 *   INSTAGRAM_APP_SECRET      Instagram app secret (same page). Secret.
 *   INSTAGRAM_CONNECT_KEY     Long random string; guards the connect/status URLs. Secret.
 *   INSTAGRAM_USERNAME        Account allowed to connect (default: mansor.customs)
 *   INSTAGRAM_REDIRECT_URI    Optional; defaults to $URL/api/instagram-auth/callback.
 *                             Must exactly match a "Valid OAuth Redirect URI" in the app.
 *   INSTAGRAM_ACCESS_TOKEN    Optional manual seed (a long-lived token from the dashboard)
 *
 * Blobs store "instagram": token, reels (last good sync), sync (health).
 */

export const GRAPH = 'https://graph.instagram.com'
export const API_VERSION = 'v25.0'
export const SCOPE = 'instagram_business_basic' // read-only: profile + own media
export const REELS_COUNT = 3
/** Hourly sync + margin: older than this and the endpoint syncs on demand */
export const FRESH_FOR = 70 * 60 * 1000
/** Signed Instagram CDN URLs expire; never serve a last-good result older than this */
export const STALE_LIMIT = 6 * 60 * 60 * 1000
/** Refresh the 60-day token once it is a week old */
export const REFRESH_AFTER = 7 * 24 * 60 * 60 * 1000

export const store = () => getStore({ name: 'instagram', consistency: 'strong' })
export const env = (k: string) => process.env[k]?.trim() || undefined
export const expectedUsername = () => (env('INSTAGRAM_USERNAME') ?? 'mansor.customs').toLowerCase()

export type Reel = {
  id: string
  /** null when Meta withholds the file (licensed music / copyright): thumbnail + link only */
  video: string | null
  poster: string | null
  permalink: string
  caption: string | null
  timestamp: string
}

export type StoredToken = {
  token: string
  userId: string | null
  username: string | null
  refreshedAt: string
  expiresAt: string | null
  source: 'oauth' | 'refresh' | 'env'
}
export type CachedReels = { reels: Reel[]; fetchedAt: string; username: string | null }
export type SyncStatus = {
  lastAttempt: string
  lastSuccess: string | null
  lastError: string | null
  errorKind: 'auth' | 'api' | 'not_configured' | null
}

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
type GraphError = { error?: { message?: string; type?: string; code?: number }; error_message?: string; code?: number }

export class GraphApiError extends Error {
  readonly code: number | undefined
  readonly status: number
  constructor(message: string, code: number | undefined, status: number) {
    super(message)
    this.code = code
    this.status = status
  }
  /** OAuthException 190 (expired/revoked/invalid token) or 102 (session) */
  get isAuth() {
    return this.code === 190 || this.code === 102 || this.status === 401
  }
}

async function graph<T>(path: string, params: Record<string, string>): Promise<T> {
  const url = new URL(`${GRAPH}/${path}`)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
  const body = (await res.json().catch(() => ({}))) as T & GraphError
  if (!res.ok || body.error) {
    throw new GraphApiError(body.error?.message ?? body.error_message ?? `Graph API ${res.status}`, body.error?.code ?? body.code, res.status)
  }
  return body
}

// ── Tokens ──────────────────────────────────────────────────────────────

export const readToken = async () => (await store().get('token', { type: 'json' }).catch(() => null)) as StoredToken | null

/** Stored token first (kept fresh by the sync), then the optional env seed. */
export async function tokenCandidates(): Promise<StoredToken[]> {
  const stored = await readToken()
  const seed = env('INSTAGRAM_ACCESS_TOKEN')
  const list: StoredToken[] = stored ? [stored] : []
  if (seed && seed !== stored?.token) {
    list.push({ token: seed, userId: null, username: null, refreshedAt: new Date(0).toISOString(), expiresAt: null, source: 'env' })
  }
  return list
}

/** Extends a long-lived token by 60 days (it must be ≥ 24 h old and unexpired). */
export async function refreshToken(current: StoredToken): Promise<StoredToken> {
  const res = await graph<{ access_token: string; expires_in?: number }>('refresh_access_token', {
    grant_type: 'ig_refresh_token',
    access_token: current.token,
  })
  const now = Date.now()
  return {
    ...current,
    token: res.access_token,
    refreshedAt: new Date(now).toISOString(),
    expiresAt: res.expires_in ? new Date(now + res.expires_in * 1000).toISOString() : null,
    source: 'refresh',
  }
}

export async function fetchProfile(token: string) {
  return graph<{ user_id?: string; id?: string; username: string; account_type?: string }>(`${API_VERSION}/me`, {
    fields: 'user_id,username,account_type',
    access_token: token,
  })
}

// ── Reels ───────────────────────────────────────────────────────────────

const BASE_FIELDS = 'id,media_type,media_url,thumbnail_url,permalink,caption,timestamp'

/**
 * Latest Reels, newest first (the API's order). Reels whose file Meta
 * withholds (licensed music / copyright) are kept with video: null so the
 * section still shows the account's actual latest three. media_product_type
 * is requested; if the API rejects the field, every VIDEO counts as a Reel
 * (Instagram publishes feed videos as Reels).
 */
export async function fetchLatestReels(token: string, count = REELS_COUNT): Promise<Reel[]> {
  let data: { data: GraphMedia[] }
  try {
    data = await graph(`${API_VERSION}/me/media`, { fields: `${BASE_FIELDS},media_product_type`, limit: '30', access_token: token })
  } catch (err) {
    if (err instanceof GraphApiError && err.code === 100 && !err.isAuth) {
      data = await graph(`${API_VERSION}/me/media`, { fields: BASE_FIELDS, limit: '30', access_token: token })
    } else throw err
  }

  return (data.data ?? [])
    .filter((m) => m.media_type === 'VIDEO' && (!m.media_product_type || m.media_product_type === 'REELS'))
    .filter((m) => m.permalink && (m.media_url || m.thumbnail_url))
    .slice(0, count)
    .map((m) => ({
      id: m.id,
      video: m.media_url ?? null,
      poster: m.thumbnail_url ?? null,
      permalink: m.permalink!,
      caption: m.caption?.trim() || null,
      timestamp: m.timestamp ?? '',
    }))
}

/**
 * One sync pass (hourly schedule, on-demand fallback, and right after
 * connecting): refresh the token when due, fetch the latest Reels, store
 * them and the health record. Never throws.
 */
export async function syncReels(opts: { refresh?: boolean } = {}): Promise<{ ok: boolean; cached: CachedReels | null; status: SyncStatus }> {
  const s = store()
  const prev = ((await s.get('sync', { type: 'json' }).catch(() => null)) as SyncStatus | null) ?? null
  const status: SyncStatus = { lastAttempt: new Date().toISOString(), lastSuccess: prev?.lastSuccess ?? null, lastError: null, errorKind: null }

  const candidates = await tokenCandidates()
  if (candidates.length === 0) {
    status.errorKind = 'not_configured'
    status.lastError = 'No Instagram account connected'
    await s.setJSON('sync', status)
    return { ok: false, cached: null, status }
  }

  let lastError: unknown
  for (let candidate of candidates) {
    try {
      if (opts.refresh && Date.now() - Date.parse(candidate.refreshedAt) > REFRESH_AFTER) {
        try {
          candidate = await refreshToken(candidate)
          await s.setJSON('token', candidate)
        } catch (err) {
          // Not fatal while the current token still works; the fetch below decides
          console.error('[instagram] token refresh failed:', (err as Error).message)
        }
      }
      const reels = await fetchLatestReels(candidate.token)
      const cached: CachedReels = { reels, fetchedAt: new Date().toISOString(), username: candidate.username }
      await s.setJSON('reels', cached)
      // A working env seed becomes the stored token, so the schedule keeps it refreshed
      if (candidate.source === 'env') await s.setJSON('token', candidate)
      status.lastSuccess = cached.fetchedAt
      await s.setJSON('sync', status)
      return { ok: true, cached, status }
    } catch (err) {
      lastError = err
      if (!(err instanceof GraphApiError && err.isAuth)) break // API down: no point trying another token
    }
  }

  const auth = lastError instanceof GraphApiError && lastError.isAuth
  status.errorKind = auth ? 'auth' : 'api'
  status.lastError = (lastError as Error)?.message?.slice(0, 300) ?? 'Unknown error'
  console.error('[instagram] sync failed:', status.errorKind, status.lastError)
  await s.setJSON('sync', status)
  return { ok: false, cached: null, status }
}

// ── Connect-flow helpers ────────────────────────────────────────────────

/** Constant-time comparison for the connect key */
export function keyMatches(given: string | null) {
  const expected = env('INSTAGRAM_CONNECT_KEY')
  if (!expected || !given) return false
  const a = Buffer.from(given)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

const stateSecret = () => `${env('INSTAGRAM_APP_SECRET')}:${env('INSTAGRAM_CONNECT_KEY')}`
const sign = (v: string) => createHmac('sha256', stateSecret()).update(v).digest('base64url')

/** Signed, expiring OAuth state (CSRF protection; no server session needed) */
export function createState() {
  const issued = Date.now().toString(36)
  return `${issued}.${sign(issued)}`
}

export function verifyState(state: string | null, maxAgeMs = 15 * 60 * 1000) {
  if (!state) return false
  const [issued, mac] = state.split('.')
  if (!issued || !mac) return false
  const expected = Buffer.from(sign(issued))
  const given = Buffer.from(mac)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return false
  const age = Date.now() - parseInt(issued, 36)
  return age >= 0 && age <= maxAgeMs
}

export function redirectUri(req: Request) {
  return env('INSTAGRAM_REDIRECT_URI') ?? `${env('URL') ?? new URL(req.url).origin}/api/instagram-auth/callback`
}

/** Authorization code → short-lived token → long-lived (60-day) token */
export async function exchangeCode(code: string, redirect: string): Promise<{ token: string; userId: string | null; expiresAt: string | null }> {
  const res = await fetch('https://api.instagram.com/oauth/access_token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: env('INSTAGRAM_APP_ID') ?? '',
      client_secret: env('INSTAGRAM_APP_SECRET') ?? '',
      grant_type: 'authorization_code',
      redirect_uri: redirect,
      code: code.replace(/#_$/, ''),
    }),
    signal: AbortSignal.timeout(8000),
  })
  type ShortLived = { access_token?: string; user_id?: string | number; permissions?: string | string[] }
  const body = (await res.json().catch(() => ({}))) as ShortLived & { data?: ShortLived[] } & GraphError
  // Documented shape is { data: [{ access_token, user_id, permissions }] }; the flat shape is also seen
  const short = body.data?.[0] ?? body
  if (!res.ok || !short.access_token) {
    throw new GraphApiError(body.error_message ?? body.error?.message ?? `Code exchange failed (${res.status})`, body.error?.code ?? body.code, res.status)
  }

  const long = await graph<{ access_token: string; expires_in?: number }>('access_token', {
    grant_type: 'ig_exchange_token',
    client_secret: env('INSTAGRAM_APP_SECRET') ?? '',
    access_token: short.access_token,
  })
  return {
    token: long.access_token,
    userId: short.user_id != null ? String(short.user_id) : null,
    expiresAt: long.expires_in ? new Date(Date.now() + long.expires_in * 1000).toISOString() : null,
  }
}
