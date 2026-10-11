import { useSyncExternalStore, type MouseEvent } from 'react'

/**
 * Minimal client-side routing on the History API (no router dependency):
 *   /                  → homepage
 *   /services/:slug    → service page
 * App stays mounted across navigations, so the homepage intro never replays.
 * Netlify serves index.html for /services/* (netlify.toml), so direct links
 * and refreshes work; Vite's dev and preview servers already do.
 */

const NAV_EVENT = 'app:navigate'

function subscribe(onChange: () => void) {
  window.addEventListener('popstate', onChange)
  window.addEventListener(NAV_EVENT, onChange)
  return () => {
    window.removeEventListener('popstate', onChange)
    window.removeEventListener(NAV_EVENT, onChange)
  }
}

/** Current pathname, re-rendering on navigation and back/forward */
export function usePathname() {
  return useSyncExternalStore(subscribe, () => location.pathname, () => '/')
}

export type Route = { name: 'home' } | { name: 'service'; slug: string }

export function matchRoute(pathname: string): Route {
  const service = pathname.match(/^\/services\/([a-z0-9-]+)\/?$/)
  return service ? { name: 'service', slug: service[1] } : { name: 'home' }
}

/** Go to an in-app URL ("/services/wraps", "/#editorial"). */
export function navigate(to: string) {
  const url = new URL(to, location.origin)
  if (url.pathname + url.hash === location.pathname + location.hash) return
  history.pushState(null, '', url.pathname + url.hash)
  window.dispatchEvent(new Event(NAV_EVENT))
}

/** onClick for in-app <a href="/…"> links: client-side navigation, but
 *  modified clicks (new tab, etc.) keep the browser's default. */
export function handleLinkClick(event: MouseEvent<HTMLAnchorElement>) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  event.preventDefault()
  navigate(event.currentTarget.getAttribute('href') ?? '/')
}
