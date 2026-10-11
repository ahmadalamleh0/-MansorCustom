import { useCallback, useEffect, useRef, useState } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * State and stepping for a native horizontal scroll-snap strip (Recent Work,
 * client reviews): whether it's at either end, how far along it is, and a
 * step() that scrolls by one item (`itemSelector`) plus the gap.
 */
export function useScrollStrip<T extends HTMLElement>(itemSelector: string) {
  const track = useRef<T>(null)
  const reduceMotion = usePrefersReducedMotion()
  const [edge, setEdge] = useState({ start: true, end: false, progress: 0 })

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft >= max - 2, progress: max > 0 ? el.scrollLeft / max : 1 })
  }, [])

  useEffect(() => {
    const el = track.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      ro.disconnect()
    }
  }, [measure])

  const step = (dir: 1 | -1) => {
    const el = track.current
    const item = el?.querySelector<HTMLElement>(itemSelector)
    if (!el || !item) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (item.offsetWidth + gap), behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return { track, edge, step }
}
