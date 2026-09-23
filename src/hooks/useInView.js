import { useEffect, useRef, useState } from 'react'

/**
 * useInView
 * ---------------------------------------------------------------------
 * Minimal IntersectionObserver hook used to drive subtle "reveal on
 * scroll" animations (timeline items, achievement cards). Returns a
 * ref to attach and a boolean that flips to true once the element has
 * entered the viewport.
 *
 * If the user has requested reduced motion, this returns `true`
 * immediately (no ref needed to observe) so content is simply visible
 * without any motion — never hidden waiting for an animation that
 * won't play.
 * ---------------------------------------------------------------------
 */
export function useInView(options = {}) {
  const ref = useRef(null)
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

  const [isInView, setIsInView] = useState(prefersReducedMotion)

  useEffect(() => {
    if (prefersReducedMotion) return undefined
    const node = ref.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2, ...options },
    )

    observer.observe(node)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [ref, isInView]
}
