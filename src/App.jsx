import Layout from './components/layout/Layout.jsx'
import Section from './components/layout/Section.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Ecosystem from './components/sections/Ecosystem.jsx'
import PricingSection from './components/sections/PricingSection.jsx'
import ConnectButton from './components/ui/ConnectButton.jsx'

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

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
          <ConnectButton size="lg" className="ts-btn--inverted" />
        </div>

        {/* 3 Pillar Summary Cards inside statement block matching reference */}
        <div className="ts-statement-thumbnails">
          <div className="ts-statement-thumb">
            <h3 className="ts-statement-thumb-title">SuPrazo Technologies</h3>
            <p className="ts-statement-thumb-desc">
              AI-First hybrid IT, custom LLM systems, and high-performance SaaS engineering.
            </p>
          </div>
          <div className="ts-statement-thumb">
            <h3 className="ts-statement-thumb-title">CodeElevate Academy</h3>
            <p className="ts-statement-thumb-desc">
              Industry-calibrated coding cohorts, AI/ML sprints, and placement mastery.
            </p>
          </div>
          <div className="ts-statement-thumb">
            <h3 className="ts-statement-thumb-title">SuPrathon Community</h3>
            <p className="ts-statement-thumb-desc">
              High-velocity national hackathons, campus innovation, and student builder networks.
            </p>
          </div>
        </div>
      </Section>
    </Layout>
  )
}

export default App
