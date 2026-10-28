
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="public-shell">
      {/* Navigation */}
      <header className="public-header">
        <Link
          href="/"
          className="brand"
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <span className="brand-mark" aria-hidden="true" />
          <span>Home-Care Central</span>
        </Link>

        <nav className="public-nav" aria-label="Main navigation">
          <a href="#how-it-works">How It Works</a>
          <Link href="/apply">Careers</Link>
          <Link href="/login" className="secondary-btn">
            Sign in
          </Link>
        </nav>
      </header>

      <div className="public-content">
        {/* Hero */}
        <section className="hero-section">
          <div className="hero-copy">
            <span className="eyebrow">
              YOUR NEXT OPPORTUNITY STARTS HERE
            </span>

            <h1>
              Make a difference.
              <br />
              <span style={{ color: 'var(--primary)' }}>
                Build your future.
              </span>
            </h1>

            <p>
              Join a team that values compassionate care, dedication,
              and the people who make a difference every day.
              Explore opportunities and take the next step in your career.
            </p>

            <div className="hero-actions">
              <Link href="/apply" className="primary-btn">
                Apply to join our team →
              </Link>

              <Link href="/login" className="secondary-btn">
                Team sign in
              </Link>
            </div>

            <div className="stats-grid">
              <div className="stat-box">
                <strong>01</strong>
                <span>Submit your application</span>
              </div>

              <div className="stat-box">
                <strong>02</strong>
                <span>Meet our hiring team</span>
              </div>

              <div className="stat-box">
                <strong>03</strong>
                <span>Start your journey</span>
              </div>
            </div>
          </div>

          {/* Recruitment information */}
          <aside className="hero-card">
            <div
              aria-hidden="true"
              style={{
                width: '64px',
                height: '64px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '18px',
                background: 'var(--primary-soft)',
                color: 'var(--primary)',
                fontSize: '32px',
                marginBottom: '24px',
              }}
            >
              ♡
            </div>

            <span className="mini-title">CAREERS AT HOME-CARE CENTRAL</span>

            <h2>Grow with a team that cares.</h2>

            <p style={{ color: 'var(--muted)', marginBottom: '22px' }}>
              We welcome motivated applicants who want to contribute
              to quality home-care services.
            </p>

            <ul>
              <li>Simple online application</li>
              <li>Clear recruitment stages</li>
              <li>Application review by our HR team</li>
              <li>Dedicated team portal after hiring</li>
            </ul>

            <Link
              href="/apply"
              className="primary-btn inline-btn"
              style={{ alignSelf: 'flex-start' }}
            >
              Explore opportunities
            </Link>
          </aside>
        </section>

        {/* Recruitment process */}
        <section className="page-section" id="how-it-works">
          <div className="section-heading">
            <p className="mini-title">THE APPLICATION PROCESS</p>
            <h2>Your journey starts here.</h2>
            <p style={{ color: 'var(--muted)', marginTop: '12px' }}>
              Three simple steps to begin your application.
            </p>
          </div>

          <div className="steps-grid">
            <article className="step-card">
              <span className="step-number">01</span>
              <h3>Apply online</h3>
              <p>
                Complete the public application form with your contact
                details, experience, and professional information.
              </p>
            </article>

            <article className="step-card">
              <span className="step-number">02</span>
              <h3>Application review</h3>
              <p>
                Our HR team reviews your application and updates its
                progress through the recruitment stages.
              </p>
            </article>

            <article className="step-card">
              <span className="step-number">03</span>
              <h3>Join the team</h3>
              <p>
                If hired, you receive caregiver portal access to begin
                using the team platform.
              </p>
            </article>
          </div>
        </section>

        {/* Call to action */}
        <section className="public-cta">
          <div>
            <p className="mini-title">READY TO GET STARTED?</p>
            <h2>Your next career opportunity could start today.</h2>
          </div>

          <Link href="/apply" className="primary-btn">
            Start your application →
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="public-footer">
        <span className="footer-brand">Home-Care Central</span>
        <span>Recruitment and team portal</span>
        <Link href="/login">Team sign in</Link>
      </footer>
    </main>
  );
}
