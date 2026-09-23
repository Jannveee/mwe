import { useEffect } from 'react'

/**
 * useScrollLock
 * ---------------------------------------------------------------------
 * Locks background scroll while `active` is true, restoring the
 * previous inline style on cleanup rather than assuming an empty
 * string, in case something else set `overflow` before this ran.
 * ---------------------------------------------------------------------
 */
export function useScrollLock(active) {
  useEffect(() => {
    if (!active) return undefined

    const { style } = document.body
    const previousOverflow = style.overflow
    const previousPaddingRight = style.paddingRight

    // Compensate for the scrollbar disappearing so page content
    // doesn't shift horizontally when the lock engages.
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      style.overflow = previousOverflow
      style.paddingRight = previousPaddingRight
    }
  }, [active])
}
