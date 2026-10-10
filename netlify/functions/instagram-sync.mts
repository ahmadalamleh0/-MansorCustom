import { syncReels } from '../lib/instagram.mts'

/**
 * Scheduled hourly: fetches the latest Reels into Netlify Blobs, so new
 * Reels reach the site without a redeploy, and extends the 60-day access
 * token once it is a week old so the connection never lapses.
 */
export default async () => {
  const { ok, cached, status } = await syncReels({ refresh: true })
  if (ok) console.log(`[instagram-sync] ${cached?.reels.length ?? 0} reels synced`)
  else console.error(`[instagram-sync] failed (${status.errorKind}): ${status.lastError}`)
}

export const config = { schedule: '@hourly' }
