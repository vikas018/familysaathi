'use client'

import { useEffect, useRef, useState } from 'react'
import { waLink } from '@/lib/whatsapp'
import { config, BRAND, phoneIsPlaceholder } from '@/lib/config'

type Errors = { name?: boolean; phone?: boolean; service?: boolean }

const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M4 4h16v16H4z" />
    <path d="m22 6-10 7L2 6" />
  </svg>
)

export default function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [service, setService] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  // Business / Join CTAs prefill the service dropdown via a custom event.
  useEffect(() => {
    function onPreset(e: Event) {
      const val = (e as CustomEvent<string>).detail
      setService(val)
    }
    window.addEventListener('fs:preset-service', onPreset)
    return () => window.removeEventListener('fs:preset-service', onPreset)
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const digits = phone.replace(/\D/g, '')
    const errs: Errors = {}
    if (!name.trim()) errs.name = true
    if (digits.length < 10) errs.phone = true
    if (!service) errs.service = true
    setErrors(errs)
    if (Object.keys(errs).length) return

    const payload = { name: name.trim(), phone: digits, service, message: message.trim() }

    // Save the lead to our database (best-effort — WhatsApp is still primary).
    try {
      await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
    } catch {
      /* ignore — we still open WhatsApp below */
    }

    const text =
      `New enquiry via ${BRAND}:\n\nName: ${payload.name}\nPhone: ${payload.phone}` +
      `\nNeed: ${service}${message.trim() ? `\nDetails: ${message.trim()}` : ''}`
    window.open(waLink(text), '_blank', 'noopener')
    setSent(true)
  }

  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="eyebrow">Get in touch</span>
          <h2>Book or ask us anything</h2>
          <p>We&apos;ll reply fast — usually the same day.</p>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal">
            <div className="ci">
              <div className="ik">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <h4>Call us</h4>
                <p>
                  {config.phone}
                  {phoneIsPlaceholder && (
                    <span style={{ opacity: 0.7 }}> (placeholder)</span>
                  )}
                </p>
              </div>
            </div>
            <div className="ci">
              <div className="ik">
                <MailIcon />
              </div>
              <div>
                <h4>Email</h4>
                <p>{config.email}</p>
              </div>
            </div>
            <div className="ci">
              <div className="ik">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h4>Service area</h4>
                <p>Meerut &amp; Delhi-NCR corridor</p>
              </div>
            </div>
            <div className="hero-trust" style={{ marginTop: 4 }}>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener"
                className="btn btn-wa btn-sm"
              >
                💬 WhatsApp us
              </a>
              <a href={`tel:${config.phone}`} className="btn btn-blue btn-sm">
                📞 Call now
              </a>
            </div>
          </div>

          <div className="form reveal">
            {!sent ? (
              <form ref={formRef} onSubmit={handleSubmit} noValidate>
                <h3>Quick enquiry</h3>
                <p className="sub">Goes to our team — and straight to WhatsApp.</p>
                <div className={`field${errors.name ? ' invalid' : ''}`}>
                  <label htmlFor="f-name">Full name *</label>
                  <input
                    id="f-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anjali Sharma"
                  />
                  <div className="err">Please enter your name.</div>
                </div>
                <div className={`field${errors.phone ? ' invalid' : ''}`}>
                  <label htmlFor="f-phone">Phone number *</label>
                  <input
                    id="f-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile"
                  />
                  <div className="err">Enter a valid 10-digit number.</div>
                </div>
                <div className={`field${errors.service ? ' invalid' : ''}`}>
                  <label htmlFor="f-service">What do you need? *</label>
                  <select
                    id="f-service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                  >
                    <option value="">Select…</option>
                    <optgroup label="Driver for my car">
                      <option>Hourly / Round-trip</option>
                      <option>Outstation / One-way (Delhi-NCR)</option>
                      <option>Daily / Monthly driver</option>
                      <option>Wedding / Night drop</option>
                    </optgroup>
                    <optgroup label="Family help">
                      <option>Assisted travel &amp; errands</option>
                      <option>Family support for seniors</option>
                    </optgroup>
                    <optgroup label="Other">
                      <option>For Business</option>
                      <option>Join as a driver</option>
                      <option>Not sure — need guidance</option>
                    </optgroup>
                  </select>
                  <div className="err">Please choose an option.</div>
                </div>
                <div className="field">
                  <label htmlFor="f-msg">Tell us more</label>
                  <textarea
                    id="f-msg"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. Driver for airport drop Saturday 6am"
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Send enquiry
                </button>
                <p className="form-note">
                  By submitting, you agree to be contacted. No spam, ever.
                </p>
              </form>
            ) : (
              <div className="form-success show">
                <div className="ok">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </div>
                <h3>Enquiry received — opening WhatsApp…</h3>
                <p className="sub" style={{ marginTop: 8 }}>
                  We&apos;ve logged your request. If WhatsApp didn&apos;t open,
                  call {config.phone}.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
