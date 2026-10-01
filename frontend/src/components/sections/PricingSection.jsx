import Section from '../layout/Section.jsx'
import { PRICING_AUDIENCES, PRICING_DISCLAIMER } from '../../data/pricingConfig.js'
import { useIntake } from '../../features/intake/IntakeContext.jsx'
import { SOURCES } from '../../features/intake/constants.js'
import { useInView } from '../../hooks/useInView.js'

/* Monogram initials that match the site's existing editorial monogram style */
const AUDIENCE_META = {
  college: { monogram: 'CU', descriptor: 'Campus Programs' },
  student: { monogram: 'SL', descriptor: 'CodeElevate & Community' },
  industry: { monogram: 'IE', descriptor: 'SuPrazo Technologies' },
}

function PricingSection() {
  const { openIntake, selectRole } = useIntake()
  const [headerRef, headerInView] = useInView()
  const [disclaimerRef, disclaimerInView] = useInView()

  function handleAudienceClick(aud) {
    openIntake(SOURCES.PRICING, { role: aud.role })
    selectRole(aud.role)
  }

  return (
    <Section id="pricing" ariaLabel="Engagement Models and Pricing" tone="raised" className="ts-pricing-section">
      <div className="ts-section-header" ref={headerRef}>
        <p className={`ts-eyebrow anim-fade ${headerInView ? 'is-visible' : ''}`}>Purpose-Driven Collaboration</p>
        <h2 className={`ts-section-title anim-fade-up anim-delay-1 ${headerInView ? 'is-visible' : ''}`}>Engagement Models &amp; Tracks</h2>
        <p className={`ts-section-subtitle anim-fade-up anim-delay-2 ${headerInView ? 'is-visible' : ''}`}>
          Transparent, milestone-based frameworks tailored for students, institutions,
          ventures, and enterprises. Choose your track to initiate an inquiry.
        </p>
      </div>

      {/* Honest Disclaimer Callout */}
      <div
        ref={disclaimerRef}
        className={`ts-pricing-disclaimer anim-fade anim-delay-3 ${disclaimerInView ? 'is-visible' : ''}`}
        role="note" aria-label="Commercial policy disclaimer"
      >
        <span className="ts-pricing-disclaimer-icon" aria-hidden="true">ℹ️</span>
        <div>{PRICING_DISCLAIMER}</div>
      </div>

      {/* 3 Audience Cards */}
      <div className="ts-audience-grid" role="list" aria-label="Audience engagement tracks">
        {PRICING_AUDIENCES.map((aud, i) => (
          <AudienceCardItem
            key={aud.id}
            aud={aud}
            index={i}
            onSelect={handleAudienceClick}
          />
        ))}
      </div>
    </Section>
  )
}

function AudienceCardItem({ aud, index, onSelect }) {
  const [ref, inView] = useInView()
  const meta = AUDIENCE_META[aud.id] || { monogram: '??', descriptor: '' }
  const delayClass = `anim-delay-${index + 1}`

  return (
    <article
      ref={ref}
      className={`ts-audience-card anim-fade-up ${delayClass} ${inView ? 'is-visible' : ''}`}
      role="listitem"
      aria-label={aud.label}
    >
      {/* Card header — matches ecosystem card style */}
      <div className="ts-audience-card__header">
        <span className="ts-audience-monogram" aria-hidden="true">
          {meta.monogram}
        </span>
        <div>
          <h3 className="ts-audience-card__title">{aud.label}</h3>
          <p className="ts-audience-card__descriptor">{meta.descriptor}</p>
        </div>
      </div>

      {/* Description */}
      <p className="ts-audience-card__desc">{aud.description}</p>

      {/* Tiers list — dash style matching ecosystem offerings */}
      <ul className="ts-audience-card__tiers">
        {aud.tiers.map((tier) => (
          <li key={tier.id} className="ts-audience-card__tier">
            {tier.name}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <div className="ts-audience-card__action">
        <button
          type="button"
          className="ts-btn ts-btn--primary ts-audience-card__btn"
          onClick={() => onSelect(aud)}
        >
          Explore Track &rarr;
        </button>
      </div>
    </article>
  )
}

export default PricingSection
