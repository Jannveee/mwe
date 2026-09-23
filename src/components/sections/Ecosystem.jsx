import Section from '../layout/Section.jsx'
import EcosystemCard from '../EcosystemCard.jsx'
import { ECOSYSTEM_ENTITIES } from '../../data/ecosystemContent.js'
import { useIntake } from '../../features/intake/IntakeContext.jsx'
import { SOURCES } from '../../features/intake/constants.js'

/**
 * Ecosystem
 * ---------------------------------------------------------------------
 * Renders the three ecosystem entity cards. Owns the CTA callback so
 * each card can eventually route to a different flow per entity — see
 * `handleEntityCta` below.
 *
 * Each card's CTA now opens the intake modal tagged with
 * source: 'ecosystem' and sourceMeta: { entityId }, so which entity's
 * card was used is captured even though all three currently funnel
 * into the same generic intake wizard.
 * ---------------------------------------------------------------------
 */
function Ecosystem() {
  const { openIntake } = useIntake()

  function handleEntityCta(entityId) {
    openIntake(SOURCES.ECOSYSTEM, { entityId })
  }

  return (
    <Section id="ecosystem" ariaLabel="Ecosystem" tone="base">
      <p className="ts-eyebrow">Ecosystem</p>
      <h2 className="ts-section-title">The TeamSumit Ecosystem</h2>
      <p className="ts-section-subtitle">
        Three connected initiatives spanning technology, education, and
        innovation.
      </p>

      <div className="ts-ecosystem-grid">
        {ECOSYSTEM_ENTITIES.map((entity) => (
          <EcosystemCard
            key={entity.id}
            entity={entity}
            cardId={entity.id === 'suprazo' ? 'services' : entity.id === 'suprathon' ? 'suprathon' : undefined}
            onCtaClick={handleEntityCta}
          />
        ))}
      </div>
    </Section>
  )
}

export default Ecosystem
