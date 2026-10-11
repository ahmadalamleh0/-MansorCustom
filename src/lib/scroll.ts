import type { MouseEvent } from 'react'
import { navigate } from './router'

/**
 * In-page navigation. All anchor links go through this one function, so a
 * smooth-scroll library (Lenis / ScrollSmoother) can be swapped in here later
 * without touching any component.
 */
export function scrollToHash(hash: string) {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const behavior: ScrollBehavior = reduce ? 'auto' : 'smooth'

  if (hash === '#top') {
    window.scrollTo({ top: 0, behavior })
  } else {
    const target = document.querySelector<HTMLElement>(hash)
    if (!target) return
    target.scrollIntoView({ behavior, block: 'start' })
  }
  history.replaceState(null, '', hash === '#top' ? location.pathname : hash)
}

/** onClick handler for `<a href="#…">` links. */
export function handleAnchorClick(event: MouseEvent<HTMLAnchorElement>) {
  const hash = event.currentTarget.hash
  if (!hash || event.metaKey || event.ctrlKey || event.shiftKey) return
  event.preventDefault()
  // From a service page, homepage section links go home first (App then scrolls)
  if (location.pathname !== '/') navigate(hash === '#top' ? '/' : `/${hash}`)
  else scrollToHash(hash)
}
