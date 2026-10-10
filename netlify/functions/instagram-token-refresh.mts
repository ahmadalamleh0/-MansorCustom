import { currentTokens, refreshToken, store } from '../lib/instagram.mts'

/**
 * Scheduled weekly: extends the long-lived Instagram token (60-day lifetime)
 * and stores the new one in Netlify Blobs, so the Reels feed keeps working
 * without anyone re-pasting a token. If every candidate fails (revoked, or
 * left unrefreshed past 60 days), a new token must be generated in the Meta
 * App Dashboard and saved as INSTAGRAM_ACCESS_TOKEN.
 */
export default async () => {
  for (const token of await currentTokens()) {
    try {
      const next = await refreshToken(token)
      await store().setJSON('token', next)
      console.log('[instagram-token-refresh] refreshed; expires', next.expiresAt)
      return
    } catch (err) {
      console.error('[instagram-token-refresh] failed:', (err as Error).message)
    }
  }
  console.error('[instagram-token-refresh] no valid token. Generate a new one and set INSTAGRAM_ACCESS_TOKEN.')
}

export const config = { schedule: '@weekly' }
