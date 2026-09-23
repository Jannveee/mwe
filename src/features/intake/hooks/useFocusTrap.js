import { useEffect } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * useFocusTrap
 * ---------------------------------------------------------------------
 * Traps Tab/Shift+Tab focus cycling within `containerRef` while
 * `active` is true, moves focus into the container on activation, and
 * restores focus to whatever had it beforehand (the element that
 * triggered the modal) on deactivation/unmount.
 *
 * Deliberately dependency-free (no third-party focus-trap lib) since
 * the behavior needed here is small and well-defined.
 * ---------------------------------------------------------------------
 */
export function useFocusTrap(containerRef, active) {
  useEffect(() => {
    if (!active) return undefined

    const container = containerRef.current
    if (!container) return undefined

    const previouslyFocused = document.activeElement

    function getFocusable() {
      return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null,
      )
    }

    // Move focus into the dialog. Prefer an explicit [data-autofocus]
    // element (e.g. the close button) if present, else the first
    // focusable element, else the container itself.
    const autofocusTarget = container.querySelector('[data-autofocus]')
    const focusable = getFocusable()
    const initialTarget = autofocusTarget || focusable[0] || container
    initialTarget?.focus()

    function handleKeyDown(event) {
      if (event.key !== 'Tab') return

      const elements = getFocusable()
      if (elements.length === 0) {
        event.preventDefault()
        return
      }

      const first = elements[0]
      const last = elements[elements.length - 1]
      const isShift = event.shiftKey

      if (isShift && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!isShift && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      } else if (!container.contains(document.activeElement)) {
        // Focus somehow escaped the container (e.g. programmatic
        // focus elsewhere) — pull it back in.
        event.preventDefault()
        first.focus()
      }
    }

    container.addEventListener('keydown', handleKeyDown)

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus()
      }
    }
  }, [containerRef, active])
}
