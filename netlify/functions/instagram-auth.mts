import {
  createState,
  exchangeCode,
  expectedUsername,
  env,
  fetchProfile,
  keyMatches,
  readToken,
  redirectUri,
  SCOPE,
  store,
  syncReels,
  verifyState,
  type CachedReels,
  type StoredToken,
  type SyncStatus,
} from '../lib/instagram.mts'

/**
 * One-time Instagram connection for the site owner (Instagram Business Login).
 *
 *   /api/instagram-auth/start?key=…   → Instagram's own login + consent screen
 *                                       (read-only scope: instagram_business_basic)
 *   /api/instagram-auth/callback      ← Instagram redirects back with ?code&state
 *   /api/instagram-auth/status?key=…  → connection health as JSON (never the token)
 *
 * The key (INSTAGRAM_CONNECT_KEY) keeps strangers from starting the flow; the
 * signed state blocks forged callbacks; and only the INSTAGRAM_USERNAME
 * account (default mansor.customs) is accepted, so no other account can take
 * over the feed. The long-lived token is stored in Netlify Blobs only.
 */
export default async (req: Request) => {
  const url = new URL(req.url)
  const action = url.pathname.split('/').pop()

  if (action === 'start') return start(req, url)
  if (action === 'callback') return callback(req, url)
  if (action === 'status') return status(url)
  return page(404, 'Not found', 'Unknown Instagram connection route.')
}

function start(req: Request, url: URL) {
  if (!keyMatches(url.searchParams.get('key'))) return page(401, 'Not authorised', 'This connection link is missing a valid key.')
  const appId = env('INSTAGRAM_APP_ID')
  if (!appId || !env('INSTAGRAM_APP_SECRET')) {
    return page(503, 'Not configured', 'INSTAGRAM_APP_ID and INSTAGRAM_APP_SECRET must be set in Netlify first.')
  }

  const authorize = new URL('https://www.instagram.com/oauth/authorize')
  authorize.search = new URLSearchParams({
    client_id: appId,
    redirect_uri: redirectUri(req),
    response_type: 'code',
    scope: SCOPE,
    state: createState(),
    force_reauth: 'true', // log in deliberately, as the business account
  }).toString()
  return new Response(null, { status: 302, headers: { Location: authorize.toString(), 'Cache-Control': 'no-store' } })
}

async function callback(req: Request, url: URL) {
  const denied = url.searchParams.get('error')
  if (denied) return page(400, 'Connection cancelled', `Instagram returned: ${escape(url.searchParams.get('error_description') ?? denied)}`)
  if (!verifyState(url.searchParams.get('state'))) {
    return page(400, 'Link expired', 'This connection attempt is invalid or older than 15 minutes. Start again from the connection link.')
  }
  const code = url.searchParams.get('code')
  if (!code) return page(400, 'Missing code', 'Instagram did not return an authorisation code.')

  try {
    const { token, userId, expiresAt } = await exchangeCode(code, redirectUri(req))
    const profile = await fetchProfile(token)
    const username = profile.username?.toLowerCase()
    if (username !== expectedUsername()) {
      // Never store a token for the wrong account
      return page(403, 'Wrong account', `You signed in as @${escape(profile.username ?? 'unknown')}. Sign in as @${escape(expectedUsername())} and try again.`)
    }

    const stored: StoredToken = {
      token,
      userId: profile.user_id ?? userId,
      username: profile.username,
      refreshedAt: new Date().toISOString(),
      expiresAt,
      source: 'oauth',
    }
    await store().setJSON('token', stored)
    const sync = await syncReels()
    const n = sync.cached?.reels.length ?? 0
    return page(
      200,
      'Instagram connected',
      sync.ok
        ? `@${escape(profile.username)} is connected. ${n} Reel${n === 1 ? '' : 's'} synced; the site now updates every hour.`
        : `@${escape(profile.username)} is connected, but the first sync failed (${escape(sync.status.lastError ?? 'unknown')}). It retries hourly.`,
    )
  } catch (err) {
    console.error('[instagram-auth] callback failed:', (err as Error).message)
    return page(502, 'Connection failed', `Instagram rejected the connection: ${escape((err as Error).message)}`)
  }
}

async function status(url: URL) {
  if (!keyMatches(url.searchParams.get('key'))) return page(401, 'Not authorised', 'Missing a valid key.')
  const s = store()
  const [token, reels, sync] = await Promise.all([
    readToken(),
    s.get('reels', { type: 'json' }).catch(() => null) as Promise<CachedReels | null>,
    s.get('sync', { type: 'json' }).catch(() => null) as Promise<SyncStatus | null>,
  ])
  const body = {
    connected: !!token,
    username: token?.username ?? null,
    tokenSource: token?.source ?? (env('INSTAGRAM_ACCESS_TOKEN') ? 'env (not yet used)' : null),
    tokenRefreshedAt: token?.refreshedAt ?? null,
    tokenExpiresAt: token?.expiresAt ?? null,
    reels: reels?.reels.length ?? 0,
    reelsFetchedAt: reels?.fetchedAt ?? null,
    sync,
  }
  return new Response(JSON.stringify(body, null, 2), {
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  })
}

function page(code: number, title: string, message: string) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title} · Mansor Customs</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0b0b0c;color:#f2f1ee;font:16px/1.6 system-ui,sans-serif;padding:24px}main{max-width:32rem}h1{font-weight:500;font-size:1.5rem;margin:0 0 .5rem}p{color:#9b9a97;margin:0}</style></head>
<body><main><h1>${title}</h1><p>${message}</p></main></body></html>`
  return new Response(html, { status: code, headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' } })
}

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

export const config = { path: ['/api/instagram-auth/start', '/api/instagram-auth/callback', '/api/instagram-auth/status'] }
