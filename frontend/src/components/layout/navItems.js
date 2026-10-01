/**
 * Navigation data — single source of truth for the primary nav.
 * Both the desktop nav and the mobile menu render from this list so
 * they can never drift out of sync.
 *
 * `href` values are same-page anchors (single-page site assumption —
 * see Phase 2 implementation notes). Section ids referenced here must
 * match the `id` prop passed to each <Section> on the page.
 */
export const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About Sumit', href: '#about' },
  { label: 'Ecosystem', href: '#ecosystem' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Connect', href: '#connect' },
]
