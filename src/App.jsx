import { useInView } from './hooks/useInView.js'
import Layout from './components/layout/Layout.jsx'
import Section from './components/layout/Section.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Ecosystem from './components/sections/Ecosystem.jsx'
import PricingSection from './components/sections/PricingSection.jsx'
import SocialSection from './components/sections/SocialSection.jsx'

function ConnectSection() {
  const [ref, inView] = useInView()
  return (
    <Section id="connect" ariaLabel="Connect With Sumit Sir" className="ts-statement-section">
      <div ref={ref}>
        <p className={`ts-eyebrow anim-fade ${inView ? 'is-visible' : ''}`}>Initiate Collaboration</p>
        <h2 className={`ts-section-title anim-fade-up anim-delay-1 ${inView ? 'is-visible' : ''}`}>
          Let&apos;s Build Something Exceptional.
        </h2>
        <p className={`ts-section-subtitle anim-fade-up anim-delay-2 ${inView ? 'is-visible' : ''}`}>
          Whether you are inviting Sumit Sir for a university keynote, accelerating your startup MVP,
          or commissioning custom enterprise AI architecture with SuPrazo Technologies.
        </p>
      </div>
    </Section>
  )
}

function App() {
  return (
    <Layout>
      <Hero />
      <About />
      <Ecosystem />
      <PricingSection />
      <SocialSection />
      <ConnectSection />
    </Layout>
  )
}

export default App
