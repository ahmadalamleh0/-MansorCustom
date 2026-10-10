import { useEffect, useState } from 'react'
import { parseReels, type Reel } from '@/data/reels'
import { site } from '@/data/site'

export type ReelsState =
  | { status: 'loading'; reels: [] }
  | { status: 'ready'; source: 'instagram' | 'client'; reels: Reel[] }
  | { status: 'unavailable'; reels: [] }

const ENDPOINT = '/api/instagram-reels'
const COUNT = 3

/**
 * Latest Reels: the live feed from the Netlify function first, then any
 * client-supplied Reels in site.instagram.reels, else 'unavailable'.
 * The function is a small cached JSON call; videos load later, per card.
 */
export function useInstagramReels(): ReelsState {
  const [state, setState] = useState<ReelsState>({ status: 'loading', reels: [] })

  useEffect(() => {
    const ctrl = new AbortController()
    const fallback = () => {
      const local = site.instagram.reels.slice(0, COUNT)
      setState(local.length ? { status: 'ready', source: 'client', reels: local } : { status: 'unavailable', reels: [] })
    }

    fetch(ENDPOINT, { headers: { Accept: 'application/json' }, signal: ctrl.signal })
      .then(async (res) => {
        // The Vite dev server answers unknown routes with index.html
        if (!res.headers.get('content-type')?.includes('application/json')) throw new Error('No Reels API')
        const reels = parseReels((await res.json())?.reels).slice(0, COUNT)
        if (reels.length) setState({ status: 'ready', source: 'instagram', reels })
        else fallback()
      })
      .catch(() => {
        if (!ctrl.signal.aborted) fallback()
      })

    return () => ctrl.abort()
  }, [])

  return state
}
