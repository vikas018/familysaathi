'use client'

// The two CTAs here prefill the enquiry form's service dropdown. We dispatch a
// custom event that the Contact form listens for — no shared parent needed.

export function presetService(value: string) {
  window.dispatchEvent(new CustomEvent('fs:preset-service', { detail: value }))
}

export default function MoreBand() {
  return (
    <section className="section" id="more">
      <div className="wrap more-grid">
        <div className="more biz reveal">
          <span className="eyebrow">For Business</span>
          <h3>Drivers for dealers, workshops &amp; fleets</h3>
          <p>
            Vehicle pick &amp; drop, doorstep test drives, insurance-claim
            movement and corporate fleet drivers.
          </p>
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={() => presetService('For Business')}
          >
            Talk to our business team
          </a>
        </div>
        <div className="more join reveal">
          <span className="eyebrow">Drive with us</span>
          <h3>Become a driver partner</h3>
          <p>
            Earn on your own schedule. Zero investment, no car needed, daily
            payouts.
          </p>
          <div className="mstats">
            <div>
              <b className="tnum">₹30,000+</b>
              <span>Monthly potential*</span>
            </div>
            <div>
              <b className="tnum">0₹</b>
              <span>To join</span>
            </div>
          </div>
          <a
            href="#contact"
            className="btn btn-primary"
            onClick={() => presetService('Join as a driver')}
          >
            Apply to drive
          </a>
        </div>
      </div>
    </section>
  )
}
