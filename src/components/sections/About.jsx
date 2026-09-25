import Section from '../layout/Section.jsx'
import Timeline from '../Timeline.jsx'
import { useInView } from '../../hooks/useInView.js'
import { useCountUp } from '../../hooks/useCountUp.js'
import { highlightText } from '../../utils/highlightText.jsx'
import { ABOUT_BIO, ABOUT_HIGHLIGHT_TERMS, TIMELINE_MILESTONES } from '../../data/aboutContent.js'

const EDITORIAL_STATS = [
  { num: '10k+', desc: 'Aspiring engineers and student builders mentored.' },
  { num: '50+', desc: 'National hackathons judged and campus keynotes delivered.' },
  { num: '3', desc: 'Integrated ecosystems across tech, academy, and community.' },
  { num: '100%', desc: 'Commitment to real-world engineering execution.' },
]

function About() {
  return (
    <Section id="about" ariaLabel="About Sumit" className="ts-about-section">
      <p className="ts-eyebrow">Philosophy &amp; Leadership</p>
      <h2 className="ts-section-title">Engineered for Impact &amp; Innovation</h2>

      <div className="ts-about-layout">
        <div>
          <div className="ts-about-bio">
            {ABOUT_BIO.map((paragraph, index) => (
              <BioParagraph key={index} text={paragraph} />
            ))}
          </div>

          <div className="ts-about-stats-grid">
            {EDITORIAL_STATS.map((stat, idx) => (
              <StatItem key={idx} stat={stat} />
            ))}
          </div>
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

function StatItem({ stat }) {
  const [ref, display] = useCountUp(stat.num)
  return (
    <div className="ts-about-stat-item" ref={ref}>
      <span className="ts-about-stat-num">{display}</span>
      <span className="ts-about-stat-desc">{stat.desc}</span>
    </div>
  )
}

export default About