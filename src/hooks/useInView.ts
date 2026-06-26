import { useEffect, useRef, useState } from 'react'

interface Options {
  /** trigger only once (default true) */
  once?: boolean
  /** 0–1 how much must be visible */
  threshold?: number
  /** rootMargin, e.g. shrink the viewport from the bottom */
  rootMargin?: string
}

/**
 * Observe an element and report when it scrolls into view.
 * Used to drive scroll-reveal / count-up / bar-grow animations.
 */
export function useInView<T extends HTMLElement = HTMLDivElement>({
  once = true,
  threshold = 0.15,
  rootMargin = '0px 0px -10% 0px',
}: Options = {}) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [once, threshold, rootMargin])

  return { ref, inView }
}
