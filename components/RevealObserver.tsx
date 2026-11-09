'use client'

import { useEffect } from 'react'

// Adds the `.in` class to `.reveal` elements as they scroll into view —
// the reveal-on-scroll animation from the original static site.
export default function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'))
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!('IntersectionObserver' in window) || reduce) {
      els.forEach((el) => el.classList.add('in'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}
