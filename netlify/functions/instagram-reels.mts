import { currentTokens, fetchLatestReels, GraphApiError, store, type CachedReels } from '../lib/instagram.mts'

/**
 * GET /api/instagram-reels → the latest three @mansor.customs Reels.
 *
 *   { status: 'ok' | 'stale', reels, fetchedAt }
 *   { status: 'not_configured' | 'unauthorized' | 'unavailable', reels: [] }
 *
 * Always HTTP 200 (except wrong method): "no Reels yet" is an expected state
 * the page handles quietly, not a browser console error. The reason is in
 * `status` and the function log.
 *
 * Netlify's CDN caches successful responses for 15 minutes (new Reels appear
 * after that), serving stale while revalidating. Instagram CDN video URLs
 * are signed and expire, so a last good result is only reused for 6 hours
 * when the API fails; the browser falls back to the thumbnail if a URL has
 * expired anyway.
 */

const LAST_GOOD_MAX_AGE = 6 * 60 * 60 * 1000

export default async (req: Request) => {
  if (req.method !== 'GET') return json({ status: 'method_not_allowed', reels: [] }, 405, 'no-store')

  const tokens = await currentTokens()
  if (tokens.length === 0) return json({ status: 'not_configured', reels: [] }, 200, 'public, s-maxage=300')

  let lastError: unknown
  for (const token of tokens) {
    try {
      const reels = await fetchLatestReels(token)
      const payload: CachedReels = { reels, fetchedAt: new Date().toISOString() }
      await store().setJSON('reels', payload).catch(() => {})
      return json({ status: 'ok', ...payload }, 200, 'public, durable, s-maxage=900, stale-while-revalidate=3600')
    } catch (err) {
      lastError = err
      // Expired/revoked token: try the next candidate (env seed after the stored one)
      if (!(err instanceof GraphApiError && err.isAuth)) break
    }
  }

  const authFailed = lastError instanceof GraphApiError && lastError.isAuth
  console.error('[instagram-reels]', authFailed ? 'auth failed' : 'fetch failed', (lastError as Error)?.message)

  const cached = (await store().get('reels', { type: 'json' }).catch(() => null)) as CachedReels | null
  if (cached && Date.now() - Date.parse(cached.fetchedAt) < LAST_GOOD_MAX_AGE && cached.reels.length) {
    return json({ status: 'stale', ...cached }, 200, 'public, s-maxage=120')
  }
  return json({ status: authFailed ? 'unauthorized' : 'unavailable', reels: [] }, 200, 'public, s-maxage=60')
}

function json(body: unknown, status: number, cdnCache: string) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Netlify-CDN-Cache-Control': cdnCache,
    },
  })
}

export const config = { path: '/api/instagram-reels' }
