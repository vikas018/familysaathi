'use client'

import { useMemo, useState } from 'react'
import type { Driver } from '@/lib/types'
import { waLink } from '@/lib/whatsapp'
import { BRAND } from '@/lib/config'

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'driver', label: 'Drivers' },
  { key: 'outstation', label: 'Outstation' },
  { key: 'wedding', label: 'Weddings' },
  { key: 'senior', label: 'Senior Care' },
]

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export default function Drivers({ drivers }: { drivers: Driver[] }) {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const list = useMemo(() => {
    const q = search.toLowerCase().trim()
    return drivers.filter((d) => {
      const okF = filter === 'all' || d.tags.includes(filter)
      const okS =
        q === '' ||
        `${d.name} ${d.spec} ${d.languages}`.toLowerCase().includes(q)
      return okF && okS
    })
  }, [drivers, filter, search])

  return (
    <section className="section" id="drivers">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Meet our team</span>
          <h2>Verified saathis, ready to help</h2>
          <p>Search, filter, and talk to them before you book.</p>
        </div>

        <div className="search-field reveal">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or specialization…"
            aria-label="Search drivers"
          />
        </div>

        <div className="chips reveal">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              className={`chip${filter === f.key ? ' active' : ''}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid g3">
          {list.length === 0 ? (
            <div className="no-results">
              No saathis match. Try another term or{' '}
              <a href="#contact" style={{ color: 'var(--blue)', fontWeight: 700 }}>
                contact us
              </a>
              .
            </div>
          ) : (
            list.map((d) => {
              const talk = waLink(
                `Hi ${BRAND}, I'd like a quick call with ${d.name} (${d.spec}) before booking.`,
              )
              const book = waLink(
                `Hi ${BRAND}, I'd like to book ${d.name} (${d.spec}).`,
              )
              return (
                <article className="profile" key={d.name}>
                  <div className="profile-top">
                    <div className="avatar" style={{ background: d.gradient }}>
                      {d.initials}
                    </div>
                    <div>
                      <h3>{d.name}</h3>
                      <div className="exp">{d.experience}</div>
                      <div className="rating-row">
                        <span className="stars">★★★★★</span>{' '}
                        <span className="tnum">{d.rating}</span>{' '}
                        <span className="count tnum">· {d.trips} trips</span>
                      </div>
                    </div>
                  </div>
                  <div className="profile-body">
                    <span className="spec">★ {d.spec}</span>
                    <div className="pbadges">
                      {d.badges.map((b) => (
                        <span className="pbadge" key={b}>
                          <CheckIcon /> {b}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="profile-foot">
                    <a
                      className="btn btn-ghost btn-sm"
                      target="_blank"
                      rel="noopener"
                      href={talk}
                    >
                      Talk First
                    </a>
                    <a
                      className="btn btn-primary btn-sm"
                      target="_blank"
                      rel="noopener"
                      href={book}
                    >
                      Book
                    </a>
                  </div>
                </article>
              )
            })
          )}
        </div>
      </div>
    </section>
  )
}
