import Section from '../layout/Section.jsx'
import Timeline from '../Timeline.jsx'
import { useInView } from '../../hooks/useInView.js'
import { highlightText } from '../../utils/highlightText.jsx'
import { ABOUT_BIO, ABOUT_HIGHLIGHT_TERMS, TIMELINE_MILESTONES } from '../../data/aboutContent.js'

function About() {
  const [headerRef, headerInView] = useInView()

  return (
    <Section id="about" ariaLabel="About Sumit" className="ts-about-section">
      <div ref={headerRef}>
        <p className={`ts-eyebrow anim-fade ${headerInView ? 'is-visible' : ''}`}>Philosophy &amp; Leadership</p>
        <h2 className={`ts-section-title anim-fade-up anim-delay-1 ${headerInView ? 'is-visible' : ''}`}>
          Engineered for Impact &amp; Innovation
        </h2>
      </div>

      <div className="ts-about-layout">
        <div>
          <div className="ts-about-bio">
            {ABOUT_BIO.map((paragraph, index) => (
              <BioParagraph key={index} text={paragraph} />
            ))}
          </div>

          <FounderShowcaseCard />
        </div>

        <div className="ts-about-timeline-wrap">
          <h3 className="ts-timeline-heading">Key Milestones</h3>
          <Timeline items={TIMELINE_MILESTONES} />
        </div>
      </div>
    </Section>
  )
}

function BioParagraph({ text }) {
  const [ref, isInView] = useInView()
  return (
    <p ref={ref} className={`ts-about-paragraph ts-anim-reveal-left ${isInView ? 'is-visible' : ''}`}>
      {highlightText(text, ABOUT_HIGHLIGHT_TERMS)}
    </p>
  )
}

function FounderShowcaseCard() {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`ts-about-founder-card anim-fade-up anim-delay-2 ${isInView ? 'is-visible' : ''}`}
    >
      <div className="ts-about-founder-media">
        <img
          src="/hero 4.jpeg"
          alt="Sumit Waghmare — Best Engineer & Gold Medalist"
          className="ts-about-founder-img"
          loading="lazy"
        />
        <div className="ts-about-founder-badge">
          <div className="ts-about-badge-text">
            <span className="ts-about-badge-title">Best Engineer · Gold Medalist</span>
            <span className="ts-about-badge-batch">Graduating Batch 2022–2026</span>
          </div>
        </div>
      </div>

      <div className="ts-about-founder-info">
        <div className="ts-about-founder-meta">
          <span className="ts-about-founder-kicker">Leadership &amp; Engineering</span>
          <h3 className="ts-about-founder-name">Sumit Waghmare</h3>
          <p className="ts-about-founder-title">
            Director, SuPrazo Technologies · Founder, CodeElevate
          </p>
        </div>

        <ul className="ts-about-founder-focus">
          <li>
            <span className="ts-focus-dot" />
            <span>AI-First Hybrid IT &amp; Enterprise Architecture</span>
          </li>
          <li>
            <span className="ts-focus-dot" />
            <span>Curriculum Acceleration &amp; Student Builder Cohorts</span>
          </li>
          <li>
            <span className="ts-focus-dot" />
            <span>High-Velocity National Hackathons &amp; Campus Innovation</span>
          </li>
        </ul>

        <blockquote className="ts-about-founder-quote">
          &ldquo;Transforming technical ambition into production-ready software systems.&rdquo;
        </blockquote>
      </div>
    </div>
  )
}

export default About
