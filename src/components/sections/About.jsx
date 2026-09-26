import Section from '../layout/Section.jsx'
import Timeline from '../Timeline.jsx'
import { useInView } from '../../hooks/useInView.js'
import { highlightText } from '../../utils/highlightText.jsx'
import { ABOUT_BIO, ABOUT_HIGHLIGHT_TERMS, TIMELINE_MILESTONES } from '../../data/aboutContent.js'

function About() {
  const [headerRef, headerInView] = useInView()

  return (
    <Section id="about" ariaLabel="About Sumit" className="ts-about-section">
      <div ref={headerRef} className="ts-about-header">
        <p className={`ts-eyebrow anim-fade ${headerInView ? 'is-visible' : ''}`}>Philosophy &amp; Leadership</p>
        <h2 className={`ts-section-title anim-fade-up anim-delay-1 ${headerInView ? 'is-visible' : ''}`}>
          Engineered for Impact &amp; Innovation
        </h2>
        <div className="ts-about-bio">
          {ABOUT_BIO.map((paragraph, index) => (
            <BioParagraph key={index} text={paragraph} />
          ))}
        </div>
      </div>

      <div className="ts-about-layout">
        <FounderShowcaseCard />

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
          <span className="ts-about-badge-icon" aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </span>
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
            <span>Director, SuPrazo Technologies</span>
            <span className="ts-founder-sep">·</span>
            <span>Founder, CodeElevate</span>
          </p>
        </div>

        <ul className="ts-about-founder-focus">
          <li>
            <span className="ts-focus-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>AI-First Hybrid IT &amp; Enterprise Architecture</span>
          </li>
          <li>
            <span className="ts-focus-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>Curriculum Acceleration &amp; Student Builder Cohorts</span>
          </li>
          <li>
            <span className="ts-focus-icon" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </span>
            <span>High-Velocity National Hackathons &amp; Campus Innovation</span>
          </li>
        </ul>

        <blockquote className="ts-about-founder-quote">
          <svg className="ts-quote-icon" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <span>&ldquo;Transforming technical ambition into production-ready software systems.&rdquo;</span>
        </blockquote>
      </div>
    </div>
  )
}

export default About
