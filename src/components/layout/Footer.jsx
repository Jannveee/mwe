import { NAV_ITEMS } from './navItems.js'
import { DESTINATION_EMAIL } from '../../features/intake/utils/mailto.js'

/**
 * Footer — Architectural Editorial
 * ---------------------------------------------------------------------
 * Monumental footer with giant display wordmark, clean capsule navigation,
 * and high-contrast bottom utility bar (inspired by Oréa Studio reference).
 * ---------------------------------------------------------------------
 */
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="ts-footer">
      <div className="ts-container">
        {/* Top summary & navigation pills */}
        <div className="ts-footer-top">
          <div className="ts-footer-statement">
            <div className="ts-footer-brand-lockup">
              <img
                src="/teamsumit-logo.png"
                alt="TeamSumit"
                className="ts-footer-logo-img"
                width="40"
                height="40"
              />
              <span className="ts-footer-brand-title">TeamSumit.</span>
            </div>
            <p className="ts-footer-desc">
              Architecting the next era of technology, education, and venture with care, craft, and clarity.
            </p>
            <a href={`mailto:${DESTINATION_EMAIL}`} className="ts-footer-email-link">
              Inquiries: {DESTINATION_EMAIL} &rarr;
            </a>
          </div>

          <nav className="ts-footer-nav-group" aria-label="Footer Navigation">
            {NAV_ITEMS.map((item) => (
              <a key={item.href} href={item.href} className="ts-footer-pill-link">
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Giant Display Wordmark */}
        <div className="ts-footer-giant-wordmark" aria-label="TeamSumit">
          TeamSumit
        </div>

        {/* Bottom Bar */}
        <div className="ts-footer-bottom-bar">
          <div>&copy; {year} TeamSumit &bull; All Rights Reserved.</div>
          <div className="ts-footer-socials">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ts-footer-social-item"
            >
              LINKEDIN ↗
            </a>
            <span aria-hidden="true">&bull;</span>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ts-footer-social-item"
            >
              X (TWITTER) ↗
            </a>
            <span aria-hidden="true">&bull;</span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="ts-footer-social-item"
            >
              GITHUB ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
