import { useEffect, useState } from 'react'
import { parseReels, type Reel } from '@/data/reels'
import { site } from '@/data/site'

export type ReelsState =
  | { status: 'loading'; reels: [] }
  | { status: 'ready'; reels: Reel[] }
  | { status: 'unavailable'; reels: [] }

const ENDPOINT = '/api/instagram-reels'
const COUNT = 3

/**
 * Reels for the showcase: the live feed from the Netlify function when the
 * Instagram API is connected (synced hourly), otherwise the supplied clips
 * in site.instagram.reels, else 'unavailable'. A small cached JSON call;
 * videos load later, per card.
 */
export function useInstagramReels(): ReelsState {
  const [state, setState] = useState<ReelsState>({ status: 'loading', reels: [] })

  useEffect(() => {
    const ctrl = new AbortController()
    const fallback = () => {
      const supplied = site.instagram.reels.slice(0, COUNT)
      setState(supplied.length ? { status: 'ready', reels: supplied } : { status: 'unavailable', reels: [] })
    }

    fetch(ENDPOINT, { headers: { Accept: 'application/json' }, signal: ctrl.signal })
      .then(async (res) => {
        // The Vite dev server answers unknown routes with index.html
        if (!res.headers.get('content-type')?.includes('application/json')) throw new Error('No Reels API')
        const reels = parseReels((await res.json())?.reels).slice(0, COUNT)
        if (reels.length) setState({ status: 'ready', reels })
        else fallback()
      })
      .catch(() => {
        if (!ctrl.signal.aborted) fallback()
      })

    return () => ctrl.abort()
  }, [])

  return state
}
