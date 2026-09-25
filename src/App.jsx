import Layout from './components/layout/Layout.jsx'
import Section from './components/layout/Section.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Ecosystem from './components/sections/Ecosystem.jsx'
import PricingSection from './components/sections/PricingSection.jsx'

/**
 * App
 * ---------------------------------------------------------------------
 * TeamSumit homepage:
 * - Hero (#home)
 * - About / Achievements (#about, #achievements)
 * - Ecosystem (#ecosystem, #services, #suprathon)
 * - Pricing & Engagement Models (#pricing)
 * - Connect (#connect)
 * ---------------------------------------------------------------------
 */
function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Ecosystem />
      <PricingSection />
      <Section id="connect" ariaLabel="Connect With Sumit Sir" className="ts-statement-section">
        <p className="ts-eyebrow">Initiate Collaboration</p>
        <h2 className="ts-section-title">Let&apos;s Build Something Exceptional.</h2>
        <p className="ts-section-subtitle">
          Whether you are inviting Sumit Sir for a university keynote, accelerating your startup MVP,
          or commissioning custom enterprise AI architecture with SuPrazo Technologies.
        </p>
      </Section>
    </Layout>
  )
}

export default App
