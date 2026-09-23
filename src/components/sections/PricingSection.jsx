import { useState } from 'react'
import Section from '../layout/Section.jsx'
import { PRICING_AUDIENCES, PRICING_DISCLAIMER } from '../../data/pricingConfig.js'
import { useIntake } from '../../features/intake/IntakeContext.jsx'
import { SOURCES } from '../../features/intake/constants.js'


function PricingSection() {
  const { openIntake, selectRole, updateAnswers } = useIntake()
  const [activeAudienceId, setActiveAudienceId] = useState('college')

  const currentAudience =
    PRICING_AUDIENCES.find((a) => a.id === activeAudienceId) || PRICING_AUDIENCES[0]

  function handleTierSelect(tier) {
  openIntake(SOURCES.PRICING, { tierId: tier.id, role: currentAudience.role })
  selectRole(currentAudience.role)
  if (tier.preselect) {
    updateAnswers(currentAudience.role, tier.preselect)
  }
}

  return (
    <Section id="pricing" ariaLabel="Engagement Models and Pricing" tone="raised" className="ts-pricing-section">
      <div className="ts-section-header">
        <p className="ts-eyebrow">Purpose-Driven Collaboration</p>
        <h2 className="ts-section-title">Engagement Models &amp; Tracks</h2>
        <p className="ts-section-subtitle">
          Transparent, milestone-based frameworks tailored for students, institutions,
          ventures, and enterprises. Choose your track to initiate an inquiry.
        </p>
      </div>

      {/* Honest Disclaimer Callout */}
      <div className="ts-pricing-disclaimer" role="note" aria-label="Commercial policy disclaimer">
        <span className="ts-pricing-disclaimer-icon" aria-hidden="true">
          ℹ️
        </span>
        <div>{PRICING_DISCLAIMER}</div>
      </div>

      {/* Audience Tabs */}
      <div className="ts-pricing-tabs" role="tablist" aria-label="Audience engagement tracks">
        {PRICING_AUDIENCES.map((aud) => {
          const isSelected = aud.id === activeAudienceId
          return (
            <button
              key={aud.id}
              type="button"
              role="tab"
              id={`pricing-tab-${aud.id}`}
              aria-selected={isSelected}
              aria-controls={`pricing-panel-${aud.id}`}
              className="ts-pricing-tab"
              onClick={() => setActiveAudienceId(aud.id)}
            >
              <span>{aud.label}</span>
              <span className="ts-pricing-tab-badge">{aud.badge}</span>
            </button>
          )
        })}
      </div>

      <p className="ts-pricing-audience-desc">{currentAudience.description}</p>

      {/* Tiers Grid */}
      <div
        id={`pricing-panel-${currentAudience.id}`}
        role="tabpanel"
        aria-labelledby={`pricing-tab-${currentAudience.id}`}
        className="ts-pricing-grid"
      >
        {currentAudience.tiers.map((tier) => (
          <div
            key={tier.id}
            className={`ts-pricing-card ${tier.isPopular ? 'ts-pricing-card--popular' : ''}`}
          >
            {tier.badge && <span className="ts-pricing-card-badge">{tier.badge}</span>}

            <div className="ts-pricing-card-header">
              <h3 className="ts-pricing-card-name">{tier.name}</h3>
              <p className="ts-pricing-card-summary">{tier.summary}</p>
            </div>

            <div className="ts-pricing-card-price-block">
              <div className="ts-pricing-card-price">{tier.priceDisplay}</div>
              <span className="ts-pricing-card-subtext">{tier.priceSubtext}</span>
            </div>

            <ul className="ts-pricing-card-features">
              {tier.deliverables.map((feature, idx) => (
                <li key={idx} className="ts-pricing-card-feature-item">
                  <span className="ts-pricing-card-feature-icon" aria-hidden="true">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <div className="ts-pricing-card-action">
              <button
                type="button"
                className={`ts-btn ${tier.isPopular ? 'ts-btn--primary' : 'ts-btn--secondary'} ts-pricing-card-btn`}
                onClick={() => handleTierSelect(tier)}
              >
                {tier.ctaText} &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default PricingSection
