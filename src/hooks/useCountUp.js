import { useEffect, useRef, useState } from 'react'
import { useInView } from './useInView.js'

/**
 * Animates a number counting up from 0 to `target` once the element
 * scrolls into view. Parses leading digits from strings like "50+",
 * "100%", "3+" and preserves the suffix.
 */
export function useCountUp(rawValue, duration = 1400) {
  const [ref, isInView] = useInView()
  const [display, setDisplay] = useState('0')
  const hasRun = useRef(false)

  useEffect(() => {
    if (!isInView || hasRun.current) return
    hasRun.current = true

    const match = String(rawValue).match(/^(\d+(?:\.\d+)?)(.*)$/)
    if (!match) {
      setDisplay(rawValue)
      return
    }
    const target = parseFloat(match[1])
    const suffix = match[2] || ''
    const start = performance.now()

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      const current = Math.round(target * eased)
      setDisplay(`${current}${suffix}`)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [isInView, rawValue, duration])

  return [ref, display]
}