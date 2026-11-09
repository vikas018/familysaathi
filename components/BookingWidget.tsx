'use client'

import { useState } from 'react'
import { waLink } from '@/lib/whatsapp'
import { config, BRAND } from '@/lib/config'

const OPTS: Record<'driver' | 'family', string[]> = {
  driver: [
    'Driver now (within ~30 min)',
    'Hourly / round trip',
    'Outstation / one-way (Delhi-NCR)',
    'Daily / monthly driver',
    'Wedding / night drop',
  ],
  family: [
    'Hospital visit / diagnostic test',
    'Medicine pickup & bill payments',
    'Banking / government errands',
    'Daily support for parents',
  ],
}

const CarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M5 17H3v-5l2-5h11l3 5h2v5h-2" />
    <circle cx="7" cy="17" r="2" />
    <circle cx="17" cy="17" r="2" />
  </svg>
)

const ShieldIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

export default function BookingWidget() {
  const [mode, setMode] = useState<'driver' | 'family'>('driver')
  const [selected, setSelected] = useState(OPTS.driver[0])

  function switchMode(m: 'driver' | 'family') {
    setMode(m)
    setSelected(OPTS[m][0])
  }

  const waHref = waLink(`Hi ${BRAND}, I need: ${selected}.`)

  return (
    <div className="widget" id="book">
      <h3>What do you need?</h3>
      <p className="ws">Pick one — we&apos;ll set it up on WhatsApp in seconds.</p>
      <div className="toggle">
        <button
          className={mode === 'driver' ? 'active' : ''}
          onClick={() => switchMode('driver')}
        >
          <CarIcon />
          Driver for my car
        </button>
        <button
          className={mode === 'family' ? 'active' : ''}
          onClick={() => switchMode('family')}
        >
          <ShieldIcon />
          Family help
        </button>
      </div>
      <div className="opts">
        {OPTS[mode].map((o) => (
          <div
            key={o}
            className={`opt${o === selected ? ' sel' : ''}`}
            onClick={() => setSelected(o)}
          >
            <span className="dot" />
            {o}
          </div>
        ))}
      </div>
      <div className="acts">
        <a
          className="btn btn-wa"
          href={waHref}
          target="_blank"
          rel="noopener"
        >
          💬 Book on WhatsApp
        </a>
        <a href={`tel:${config.phone}`} className="btn btn-ghost">
          📞 Call us
        </a>
      </div>
      <p className="tip">Free intro call available before you confirm.</p>
    </div>
  )
}
