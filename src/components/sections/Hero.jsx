import { TextEffect } from '../motion-primitives/text-effect.tsx'
import { useEffect, useState, useRef } from 'react'
import Section from '../layout/Section.jsx'
import ConnectButton from '../ui/ConnectButton.jsx'
import EcosystemButton from '../ui/EcosystemButton.jsx'
import { useCountUp } from '../../hooks/useCountUp.js'

const HERO_BG_IMAGES = [
  { src: '/hero 2.jpeg', alt: 'TeamSumit event moment', position: 'center 15%' },
  { src: '/hero 4.jpeg', alt: 'TeamSumit event moment', position: 'center 10%' },
  { src: '/hero 6.jpeg', alt: 'TeamSumit event moment', position: 'center 50%' },
  { src: '/hero 1.jpeg', alt: 'TeamSumit event moment', position: 'center' },
  { src: '/hero 3.jpeg', alt: 'TeamSumit event moment', position: 'center 35%' },
]

function useHeroBgCrossfade(count, intervalMs = 5500) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setActive((prev) => (prev + 1) % count), intervalMs)
    return () => clearInterval(id)
  }, [count, intervalMs])
  return active
}

const TRUST_ITEMS = [
  { label: 'Connected Ecosystems', value: '3+' },
  { label: 'Keynotes & Hackathons', value: '50+' },
  { label: 'Industry Aligned', value: '100%' },
]

const HEADING_LINES = [
  'Architecting the Next Era of',
  'Technology, Education &',
  'Venture.',
]

function Hero({ onConnectClick, onExploreClick }) {
  const activeHeroBg = useHeroBgCrossfade(HERO_BG_IMAGES.length)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50)
    return () => clearTimeout(t)
  }, [])

  return (
    <Section id="home" ariaLabel="Home" className="ts-hero">
      <div className="ts-hero-bg" aria-hidden="true">
        {HERO_BG_IMAGES.map((img, i) => (
          <img
            key={img.src}
            className={i === activeHeroBg ? 'is-active' : ''}
            src={img.src}
            alt=""
            style={{ objectPosition: img.position || 'center' }}
            loading={i === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
      </div>
      <div className="ts-hero-scrim" aria-hidden="true" />

      <div className="ts-hero-grid">
        <div className="ts-hero-content">
          <div className={`ts-hero-meta-tag ts-anim-fade-up ${mounted ? 'is-visible' : ''}`} style={{ transitionDelay: '0ms' }}>
            
          </div>

          <TextEffect
  as="h1"
  className="ts-hero-title"
  preset="fade-in-blur"
  speedReveal={1.1}
  speedSegment={0.3}
>
  Architecting the Next Era of Technology, Education & Venture.
</TextEffect>

          <p
            className={`ts-hero-subtitle ts-anim-fade-up ${mounted ? 'is-visible' : ''}`}
            style={{ transitionDelay: '620ms' }}
          >
            Sumit Waghmare is an AI builder, technology founder, and engineering mentor.
            TeamSumit bridges learners, colleges, startups, and enterprises with
            real-world innovation, practical education, and systems architecture.
          </p>

          <div
            className={`ts-hero-actions ts-anim-fade-up ${mounted ? 'is-visible' : ''}`}
            style={{ transitionDelay: '740ms' }}
          >
            <ConnectButton size="lg" onClick={onConnectClick} className="ts-btn--shine" />
            <EcosystemButton size="lg" onClick={onExploreClick} className="ts-btn--fill-hover" />
          </div>

          <dl
          className={`ts-trust-strip ts-anim-fade-up ${mounted ? 'is-visible' : ''}`}
          style={{ transitionDelay: '860ms' }}
          aria-label="Ecosystem Highlights"
        >
          {TRUST_ITEMS.map((item) => (
          <TrustStat key={item.label} item={item} />
         ))}
         </dl>
        </div>
      </div>
    </Section>
  )
}
function TrustStat({ item }) {
  const [ref, display] = useCountUp(item.value)
  return (
    <div className="ts-trust-item" ref={ref}>
      <dt className="ts-trust-value">{display}</dt>
      <dd className="ts-trust-label">{item.label}</dd>
    </div>
  )
}

export default Hero