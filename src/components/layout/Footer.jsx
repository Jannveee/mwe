/**
 * Footer — Recreated based on Dark/Black Editorial Reference
 * ---------------------------------------------------------------------
 * Clean, dark obsidian footer matching the 4-column reference layout:
 * [1] Brand & Bio & Social icons
 * [2] NAVIGATE links
 * [3] VENTURES links
 * [4] CONTACT info with gold icons
 * + Bottom copyright & credits bar
 * ---------------------------------------------------------------------
 */
function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="ts-footer">
      <div className="ts-container">
        <div className="ts-footer-grid">
          {/* Column 1: Brand, Bio & Socials */}
          <div className="ts-footer-col ts-footer-col--brand">
            <div className="ts-footer-brand-title">
              TeamSumit<span className="ts-footer-brand-dot">.</span>
            </div>
            <p className="ts-footer-bio">
              Building SuPrazo Technologies, CodeElevate, and Team Sumit. A 21-year-old founder from Nagpur with a world record and a long way to go.
            </p>
            <div className="ts-footer-social-row" aria-label="Social links">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ts-footer-icon-btn"
                aria-label="Instagram"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="ts-footer-icon-btn"
                aria-label="LinkedIn"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://wa.me/919665658240"
                target="_blank"
                rel="noopener noreferrer"
                className="ts-footer-icon-btn"
                aria-label="WhatsApp"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
              <a
                href="mailto:sumitwaghmare645@gmail.com"
                className="ts-footer-icon-btn"
                aria-label="Email"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigate */}
          <div className="ts-footer-col">
            <h4 className="ts-footer-col-title">NAVIGATE</h4>
            <ul className="ts-footer-link-list">
              <li><a href="#about" className="ts-footer-link">About</a></li>
              <li><a href="#ecosystem" className="ts-footer-link">Services</a></li>
              <li><a href="#achievements" className="ts-footer-link">Achievements</a></li>
              <li><a href="#about" className="ts-footer-link">Gallery</a></li>
              <li><a href="#achievements" className="ts-footer-link">Testimonials</a></li>
              <li><a href="#connect" className="ts-footer-link">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3: Ventures */}
          <div className="ts-footer-col">
            <h4 className="ts-footer-col-title">VENTURES</h4>
            <ul className="ts-footer-link-list">
              <li><a href="#ecosystem" className="ts-footer-link">SuPrazo Technologies</a></li>
              <li><a href="#ecosystem" className="ts-footer-link">CodeElevate</a></li>
              <li><a href="#about" className="ts-footer-link">Team Sumit</a></li>
              <li><a href="#ecosystem" className="ts-footer-link">Sam AI (Upcoming)</a></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="ts-footer-col">
            <h4 className="ts-footer-col-title">CONTACT</h4>
            <div className="ts-footer-contact-list">
              <a href="tel:+919665658240" className="ts-footer-contact-item">
                <span className="ts-footer-contact-icon" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span>+91 9665658240</span>
              </a>

              <a href="mailto:sumitwaghmare645@gmail.com" className="ts-footer-contact-item">
                <span className="ts-footer-contact-icon" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </span>
                <span>sumitwaghmare645@gmail.com</span>
              </a>

              <div className="ts-footer-contact-item">
                <span className="ts-footer-contact-icon" aria-hidden="true">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <span>Nagpur, Maharashtra, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & credits bar */}
        <div className="ts-footer-bottom-bar">
          <div className="ts-footer-copyright">
            &copy; {year} Sumit Waghmare. All rights reserved.
          </div>
          <div className="ts-footer-credits">
            Built by <span className="ts-footer-author">Team Sumit</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
