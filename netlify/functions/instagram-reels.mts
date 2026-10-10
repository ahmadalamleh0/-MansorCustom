import { FRESH_FOR, STALE_LIMIT, store, syncReels, type CachedReels } from '../lib/instagram.mts'

/**
 * GET /api/instagram-reels → the latest three @mansor.customs Reels.
 *
 *   { status: 'ok' | 'stale', reels, fetchedAt }
 *   { status: 'not_configured' | 'unauthorized' | 'unavailable', reels: [] }
 *
 * Serves the last hourly sync from Netlify Blobs (no Graph API call per
 * visitor). If that is missing or older than ~70 min (first deploy, missed
 * schedule) it syncs on demand. A failed sync falls back to the last good
 * result for up to 6 h, because Instagram's signed CDN video URLs expire;
 * the browser keeps the thumbnail if one has expired anyway.
 *
 * Always HTTP 200: "no Reels yet" is an expected state the page handles
 * quietly, not a console error. The reason is in `status` and the logs.
 * Netlify's CDN caches it for 5 minutes, so a new Reel shows within about
 * an hour of posting, with no redeploy.
 */
export default async (req: Request) => {
  if (req.method !== 'GET') return json({ status: 'method_not_allowed', reels: [] }, 405, 'no-store')

  const cached = (await store().get('reels', { type: 'json' }).catch(() => null)) as CachedReels | null
  const age = cached ? Date.now() - Date.parse(cached.fetchedAt) : Infinity
  if (cached && age < FRESH_FOR) return ok('ok', cached)

  const result = await syncReels({ refresh: true })
  if (result.ok && result.cached) return ok('ok', result.cached)

  if (cached && age < STALE_LIMIT && cached.reels.length) return ok('stale', cached, 'public, s-maxage=120')

  const status = result.status.errorKind === 'not_configured' ? 'not_configured' : result.status.errorKind === 'auth' ? 'unauthorized' : 'unavailable'
  return json({ status, reels: [] }, 200, 'public, s-maxage=60')
}

function ok(status: 'ok' | 'stale', c: CachedReels, cdn = 'public, durable, s-maxage=300, stale-while-revalidate=600') {
  return json({ status, reels: c.reels, fetchedAt: c.fetchedAt }, 200, cdn)
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
