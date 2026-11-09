import Header from '@/components/Header'
import BookingWidget from '@/components/BookingWidget'
import Drivers from '@/components/Drivers'
import FaqSection from '@/components/Faq'
import Contact from '@/components/Contact'
import MoreBand from '@/components/MoreBand'
import RevealObserver from '@/components/RevealObserver'
import { getDrivers, getFaqs } from '@/lib/data'
import { waLink } from '@/lib/whatsapp'
import { config } from '@/lib/config'

// Drivers & FAQs come from the database at request time (seed fallback until a
// DB is configured), so new content appears without a redeploy.
export const dynamic = 'force-dynamic'

export default async function Home() {
  const [drivers, faqs] = await Promise.all([getDrivers(), getFaqs()])
  const tel = `tel:${config.phone}`

  return (
    <>
      <Header />

      {/* ===================== HERO ===================== */}
      <section className="hero" id="home">
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">★ Meerut&apos;s trusted driver service</span>
            <h1>
              Get a <span className="hl">verified driver</span> for your own car.
            </h1>
            <p className="lede">
              Trained, background-verified drivers — in 30 minutes or scheduled
              ahead. Hourly, outstation to Delhi-NCR, weddings or daily. And
              trusted help for your family too.
            </p>
            <div className="hero-trust">
              <span className="t">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Police &amp; Aadhaar verified
              </span>
              <span className="t">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Talk before booking
              </span>
              <span className="t">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Fair, upfront pricing
              </span>
            </div>
          </div>
          <BookingWidget />
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section className="stats">
        <div className="wrap">
          <div className="stat-grid">
            <div className="stat">
              <b className="tnum">30 min</b>
              <span>Driver at your door*</span>
            </div>
            <div className="stat">
              <b>5-point</b>
              <span>Verified saathis</span>
            </div>
            <div className="stat">
              <b>Delhi-NCR</b>
              <span>Outstation ready</span>
            </div>
            <div className="stat">
              <b className="tnum">24×7</b>
              <span>Support line</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BENEFITS ===================== */}
      <section className="section" id="why">
        <div className="wrap benefits">
          <div className="benefit reveal">
            <div className="bk ib-blue">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div>
              <h4>Verified &amp; trained</h4>
              <p>Police, Aadhaar &amp; licence checked — re-verified every 6 months.</p>
            </div>
          </div>
          <div className="benefit reveal">
            <div className="bk ib-teal">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <div>
              <h4>Talk before booking</h4>
              <p>Know your saathi with a quick intro call — trust comes first.</p>
            </div>
          </div>
          <div className="benefit reveal">
            <div className="bk ib-orange">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <div>
              <h4>On time, upfront price</h4>
              <p>Simple packages, no surprises. Confirmed before every trip.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section className="section" id="services" style={{ background: 'var(--surface-2)' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Our services</span>
            <h2>What we help with</h2>
            <p>
              Whatever the trip — a verified saathi for your car, or trusted help
              for your family.
            </p>
          </div>
          <div className="grid g4">
            <div className="card reveal">
              <div className="icon-badge ib-blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 17H3v-5l2-5h11l3 5h2v5h-2" />
                  <circle cx="7" cy="17" r="2" />
                  <circle cx="17" cy="17" r="2" />
                </svg>
              </div>
              <h3>Hire a Driver</h3>
              <p>By the hour or round trip — shopping, errands, doctor visits, night drops.</p>
            </div>
            <div className="card reveal">
              <div className="icon-badge ib-teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M4 12h16M14 6l6 6-6 6" />
                </svg>
              </div>
              <h3>Outstation &amp; One-way</h3>
              <p>Delhi-NCR airports, hospitals &amp; offices — one-way or round trip in your car.</p>
            </div>
            <div className="card reveal">
              <div className="icon-badge ib-orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </div>
              <h3>Daily &amp; Monthly</h3>
              <p>The same trusted driver for your office commute, family use or weddings.</p>
            </div>
            <div className="card reveal">
              <div className="icon-badge ib-blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <h3>Family &amp; Errands</h3>
              <p>Help for parents — hospital visits, medicines, banking &amp; companionship.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TALK BEFORE BOOKING ===================== */}
      <section className="section" id="talk">
        <div className="wrap">
          <div className="feature reveal">
            <div className="feature-grid">
              <div>
                <span className="eyebrow">Our promise</span>
                <h2>Talk Before Booking</h2>
                <p>
                  You&apos;d never hand your car keys — or your parents&apos; care
                  — to a stranger. So meet your saathi first.
                </p>
                <a href="#drivers" className="btn btn-primary" style={{ marginTop: 20 }}>
                  Meet our drivers
                </a>
              </div>
              <div className="steps">
                <div className="s">
                  <span className="n">1</span>
                  <div>View profile, photo &amp; experience</div>
                </div>
                <div className="s">
                  <span className="n">2</span>
                  <div>Check all 5 verification badges</div>
                </div>
                <div className="s">
                  <span className="n">3</span>
                  <div>Read reviews from Meerut families</div>
                </div>
                <div className="s">
                  <span className="n">4</span>
                  <div>Schedule a short call, then book</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== PRICING ===================== */}
      <section className="section" id="pricing" style={{ background: 'var(--surface-2)' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Simple pricing</span>
            <h2>Hourly packages, shown up front</h2>
            <p>Book a block of hours for in-city driving. Longer blocks cost less per hour.</p>
          </div>
          <div className="price-grid">
            <div className="price reveal">
              <h3>4 Hours</h3>
              <div className="amt">
                <span>₹</span>499
              </div>
              <div className="per">≈ ₹125/hr · up to 40 km</div>
              <a href="#book" className="btn btn-ghost btn-block">
                Book 4 hours
              </a>
            </div>
            <div className="price popular reveal">
              <div className="tag">MOST POPULAR</div>
              <h3>8 Hours · Half Day</h3>
              <div className="amt">
                <span>₹</span>899
              </div>
              <div className="per">≈ ₹112/hr · up to 80 km</div>
              <a href="#book" className="btn btn-primary btn-block">
                Book 8 hours
              </a>
            </div>
            <div className="price reveal">
              <h3>12 Hours · Full Day</h3>
              <div className="amt">
                <span>₹</span>1,199
              </div>
              <div className="per">≈ ₹100/hr · up to 120 km</div>
              <a href="#book" className="btn btn-ghost btn-block">
                Book 12 hours
              </a>
            </div>
          </div>
          <p className="price-note">
            💡 <b>Indicative launch pricing</b> for Meerut. Night, outstation &amp;
            one-way have clear add-ons — your exact fare is{' '}
            <b>confirmed before you book.</b>
          </p>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="section" id="how">
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">How it works</span>
            <h2>Book in 4 easy steps</h2>
            <p>No app to install, no payment upfront.</p>
          </div>
          <div className="flow">
            <div className="step reveal">
              <div className="num tnum">1</div>
              <h4>Tell us your need</h4>
              <p>Driver or family help, by form, call or WhatsApp.</p>
            </div>
            <div className="step reveal">
              <div className="num tnum">2</div>
              <h4>Meet your saathi</h4>
              <p>See the profile &amp; have a quick intro call.</p>
            </div>
            <div className="step reveal">
              <div className="num tnum">3</div>
              <h4>Confirm booking</h4>
              <p>Lock in your date, time &amp; price.</p>
            </div>
            <div className="step reveal">
              <div className="num tnum">4</div>
              <h4>Relax — we&apos;re there</h4>
              <p>Your verified saathi arrives on time.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TRUST & SAFETY ===================== */}
      <section className="section" id="trust" style={{ background: 'var(--surface-2)' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Trust &amp; Safety</span>
            <h2>Big-city safety, in Meerut</h2>
            <p>A stranger driving your car is a big deal. We protect every trip.</p>
          </div>
          <div className="vbar reveal">
            {['Aadhaar', 'Driving Licence', 'Police Verified', 'Address', 'Emergency Contact'].map(
              (v) => (
                <span className="vpill" key={v}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  {v}
                </span>
              ),
            )}
          </div>
          <div className="safety3">
            <div className="card reveal">
              <div className="icon-badge ib-blue">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M21 2v6h-6" />
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                  <path d="M3 22v-6h6" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                </svg>
              </div>
              <h3>Re-verified every 6 months</h3>
              <p>Checks are refreshed, not one-time.</p>
            </div>
            <div className="card reveal">
              <div className="icon-badge ib-teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <rect x="4" y="11" width="16" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </div>
              <h3>OTP-verified trip start</h3>
              <p>The trip starts only after you share an OTP.</p>
            </div>
            <div className="card reveal">
              <div className="icon-badge ib-orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M12 2l2.4 7.4H22l-6 4.3 2.3 7.3L12 16.9 5.7 21l2.3-7.3-6-4.3h7.6z" />
                </svg>
              </div>
              <h3>Rated after every trip</h3>
              <p>Low-rated drivers are removed from the platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== DRIVERS (client: search + filter) ===================== */}
      <Drivers drivers={drivers} />

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="section" id="stories" style={{ background: 'var(--surface-2)' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <span className="eyebrow">Family stories</span>
            <h2>Trusted across Meerut</h2>
          </div>
          <div className="grid g3">
            <div className="tcard reveal">
              <span className="stars">★★★★★</span>
              <p className="quote">
                &quot;I live in Bengaluru and my parents are in Meerut.
                FamilySaathi takes my father for dialysis every week. I finally
                sleep peacefully.&quot;
              </p>
              <div className="tperson">
                <div
                  className="avatar"
                  style={{ background: 'linear-gradient(135deg,#1E3A8A,#1d4ed8)' }}
                >
                  AS
                </div>
                <div>
                  <b>Anjali Sharma</b>
                  <span>Daughter · Bengaluru</span>
                </div>
              </div>
            </div>
            <div className="tcard reveal">
              <span className="stars">★★★★★</span>
              <p className="quote">
                &quot;Booked a driver for an early flight from Delhi airport. On
                time, careful on the expressway, price exactly as quoted.
                Brilliant.&quot;
              </p>
              <div className="tperson">
                <div
                  className="avatar"
                  style={{ background: 'linear-gradient(135deg,#14B8A6,#0f766e)' }}
                >
                  RM
                </div>
                <div>
                  <b>Rakesh Mittal</b>
                  <span>Outstation to Delhi</span>
                </div>
              </div>
            </div>
            <div className="tcard reveal">
              <span className="stars">★★★★★</span>
              <p className="quote">
                &quot;Three drivers for my daughter&apos;s wedding, all three
                days. Punctual, polite, spotless cars. The intro call gave us
                confidence.&quot;
              </p>
              <div className="tperson">
                <div
                  className="avatar"
                  style={{ background: 'linear-gradient(135deg,#F97316,#ea6a0c)' }}
                >
                  PV
                </div>
                <div>
                  <b>Praveen Verma</b>
                  <span>Wedding booking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== MORE: BUSINESS + JOIN (client) ===================== */}
      <MoreBand />

      {/* ===================== FAQ (client: accordion) ===================== */}
      <FaqSection faqs={faqs} />

      {/* ===================== CONTACT (client: form) ===================== */}
      <Contact />

      {/* ===================== FOOTER ===================== */}
      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <a href="#home" className="brand">
                <span className="logo">FS</span>
                <span>FamilySaathi</span>
              </a>
              <p className="desc">
                Verified drivers for your car &amp; trusted family help in Meerut
                and the Delhi-NCR corridor.
              </p>
            </div>
            <div>
              <h5>Services</h5>
              <div className="fl">
                <a href="#services">Hire a driver</a>
                <a href="#services">Outstation Delhi-NCR</a>
                <a href="#services">Daily / monthly</a>
                <a href="#services">Family &amp; errands</a>
              </div>
            </div>
            <div>
              <h5>Company</h5>
              <div className="fl">
                <a href="#trust">Trust &amp; Safety</a>
                <a href="#pricing">Pricing</a>
                <a href="#more">For Business</a>
                <a href="#more">Join as Driver</a>
                <a href="#faq">FAQ</a>
              </div>
            </div>
            <div>
              <h5>Reach us</h5>
              <div className="fl">
                <a href={tel}>📞 {config.phone}</a>
                <a href={waLink()} target="_blank" rel="noopener">
                  💬 WhatsApp
                </a>
                <a href={`mailto:${config.email}`}>✉ {config.email}</a>
                <a href="#contact">📍 Meerut, UP</a>
              </div>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 FamilySaathi. All rights reserved.</span>
            <span>Meerut, India</span>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp + sticky mobile book bar */}
      <a
        href={waLink()}
        target="_blank"
        rel="noopener"
        className="wa-float"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 0 1 8.413 3.488 11.82 11.82 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.513 5.26l-.999 3.648 3.735-.979zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.496.099-.198.05-.372-.025-.521-.074-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
        </svg>
      </a>

      <div className="sticky-book">
        <a href={waLink()} target="_blank" rel="noopener" className="btn btn-wa">
          💬 WhatsApp
        </a>
        <a href="#book" className="btn btn-primary">
          Book Now
        </a>
      </div>

      <RevealObserver />
    </>
  )
}
