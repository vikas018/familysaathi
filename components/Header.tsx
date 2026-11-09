'use client'

import { useEffect, useState } from 'react'

const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#drivers', label: 'Our Drivers' },
  { href: '#trust', label: 'Safety' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  // Restore a previously chosen theme (small enhancement over the static site).
  useEffect(() => {
    const saved = localStorage.getItem('fs-theme')
    if (saved) document.documentElement.setAttribute('data-theme', saved)
  }, [])

  function toggleTheme() {
    const root = document.documentElement
    let cur = root.getAttribute('data-theme')
    if (!cur) {
      cur = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
    }
    const next = cur === 'dark' ? 'light' : 'dark'
    root.setAttribute('data-theme', next)
    localStorage.setItem('fs-theme', next)
  }

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a href="#home" className="brand">
          <span className="logo">FS</span>
          <span>
            FamilySaathi<small>Meerut</small>
          </span>
        </a>
        <nav className="nav-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle light/dark theme"
          >
            ◐
          </button>
          <a href="#book" className="btn btn-primary desk btn-sm">
            Book Now
          </a>
          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            ☰
          </button>
        </div>
      </div>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
            {l.label}
          </a>
        ))}
        <a
          href="#book"
          className="btn btn-primary"
          onClick={() => setMenuOpen(false)}
        >
          Book Now
        </a>
      </div>
    </header>
  )
}
