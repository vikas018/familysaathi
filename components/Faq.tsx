'use client'

import { useState } from 'react'
import type { Faq } from '@/lib/types'

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="section" id="faq" style={{ background: 'var(--surface-2)' }}>
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Questions</span>
          <h2>Frequently asked</h2>
        </div>
        <div className="faq-wrap">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <div className={`faq${isOpen ? ' open' : ''}`} key={f.question}>
                <button
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span>{f.question}</span>
                  <span className="ic">+</span>
                </button>
                <div
                  className="ans"
                  style={{ maxHeight: isOpen ? '400px' : '0' }}
                >
                  <p>{f.answer}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
