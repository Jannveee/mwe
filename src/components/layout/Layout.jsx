import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { IntakeProvider } from '../../features/intake/IntakeContext.jsx'
import ConnectModal from '../../features/intake/ConnectModal.jsx'

/**
 * Layout
 * ---------------------------------------------------------------------
 * Top-level page shell: skip link, Header, <main> landmark, Footer.
 * Real pages render their content as `children`, composed of <Section>
 * wrappers (see Section.jsx).
 *
 * <IntakeProvider> wraps everything so any descendant (header CTA,
 * ecosystem cards, pricing, footer) can open the "Connect With Sumit Sir"
 * modal via useIntake() without prop-drilling.
 * ---------------------------------------------------------------------
 */
function Layout({ children }) {
  return (
    <IntakeProvider>
      <a href="#main-content" className="ts-skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="ts-main">
        {children}
      </main>
      <Footer />
      <ConnectModal />
    </IntakeProvider>
  )
}

export default Layout
