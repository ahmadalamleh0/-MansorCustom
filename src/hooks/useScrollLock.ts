import { useLayoutEffect } from 'react'

let lockCount = 0

/** Locks page scroll while `locked` is true. Safe for nested overlays. */
export function useScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return
    const root = document.documentElement
    // Keep the layout from shifting when the scrollbar disappears (desktop)
    const scrollbar = window.innerWidth - root.clientWidth
    if (lockCount++ === 0) {
      root.style.paddingRight = scrollbar ? `${scrollbar}px` : ''
      root.classList.add('is-scroll-locked')
    }
    return () => {
      if (--lockCount === 0) {
        root.classList.remove('is-scroll-locked')
        root.style.paddingRight = ''
      }
    }
  }, [locked])
}
