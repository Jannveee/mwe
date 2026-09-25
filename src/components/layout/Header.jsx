import { useEffect, useRef, useState } from 'react'
import { NAV_ITEMS } from './navItems.js'
import ConnectButton from '../ui/ConnectButton.jsx'
import { useIntake } from '../../features/intake/IntakeContext.jsx'

/**
 * Header
 * ---------------------------------------------------------------------
 * Sticky site header: logo/wordmark, desktop nav, mobile hamburger
 * menu, and the primary "Connect With Sumit Sir" CTA.
 *
 * Accessibility notes:
 * - Uses <header>/<nav> landmarks with aria-label.
 * - Mobile toggle button uses aria-expanded + aria-controls.
 * - Mobile menu is a same-page disclosure (not a modal), so no focus
 *   trap is used here — Escape closes it and returns focus to the
 *   toggle button, which is the correct pattern for a disclosure menu.
 * - Active nav link is tracked via IntersectionObserver and exposed
 *   with aria-current="page" for screen readers, not just color.
 * ---------------------------------------------------------------------
 */
function Header() {
  const { openIntake } = useIntake()
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('#home')
  const [scrolled, setScrolled] = useState(false)
  const toggleButtonRef = useRef(null)
  const menuId = 'primary-mobile-nav'

  // Detect scroll to apply compact elevated glass styling
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 15)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on Escape, return focus to the toggle button.
  useEffect(() => {
    if (!menuOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleButtonRef.current?.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menuOpen])

  // Track which section is currently in view to drive the active nav state
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.replace('#', ''))
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean)

    if (sections.length === 0) return undefined

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) {
          setActiveHref(`#${visible.target.id}`)
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  function handleNavLinkClick() {
    setMenuOpen(false)
  }

  return (
    <header className={`ts-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="ts-header-inner ts-container">
        <a href="#home" className="ts-logo" aria-label="TeamSumit — home">
          <img
            src="/teamsumit-logo.png"
            alt="TeamSumit"
            className="ts-logo-img"
            width="34"
            height="34"
          />
          <span className="ts-logo-text">
            TeamSumit<span className="ts-logo-dot">.</span>
          </span>
        </a>

        {/* Desktop navigation */}
        <nav className="ts-nav ts-nav--desktop" aria-label="Primary">
          <div className="ts-nav-capsule">
            <ul className="ts-nav-list">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="ts-nav-link"
                    aria-current={activeHref === item.href ? 'page' : undefined}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="ts-header-actions">
          <div className="ts-header-cta">
            <ConnectButton size="sm" source="header">
              Connect With Sumit Sir
            </ConnectButton>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="ts-nav-toggle"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
            ref={toggleButtonRef}
          >
            <span className="ts-nav-toggle-bar" aria-hidden="true" />
            <span className="ts-nav-toggle-bar" aria-hidden="true" />
            <span className="ts-nav-toggle-bar" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      <nav
        id={menuId}
        className={`ts-nav--mobile ${menuOpen ? 'ts-nav--mobile-open' : ''}`}
        aria-label="Mobile"
        hidden={!menuOpen}
      >
        <ul className="ts-nav-list ts-nav-list--mobile">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="ts-nav-link ts-nav-link--mobile"
                aria-current={activeHref === item.href ? 'page' : undefined}
                onClick={handleNavLinkClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ts-nav-mobile-cta">
          <ConnectButton
            source="header"
            onClick={() => {
              handleNavLinkClick()
              openIntake('header')
            }}
          />
        </div>
      </nav>
    </header>
  )
}

export default Header
