import Section from '../layout/Section.jsx'
import EcosystemCard from '../EcosystemCard.jsx'
import { ECOSYSTEM_ENTITIES } from '../../data/ecosystemContent.js'
import { useIntake } from '../../features/intake/IntakeContext.jsx'
import { SOURCES } from '../../features/intake/constants.js'
import { useInView } from '../../hooks/useInView.js'

const CARD_ANIMS = ['anim-fade-left', 'anim-fade-up', 'anim-fade-right']

function Ecosystem() {
  const { openIntake } = useIntake()
  const [headerRef, headerInView] = useInView()

  function handleEntityCta(entityId) {
    openIntake(SOURCES.ECOSYSTEM, { entityId })
  }

  return (
    <Section id="ecosystem" ariaLabel="Ecosystem" tone="base">
      <div ref={headerRef}>
        <p className={`ts-eyebrow anim-fade ${headerInView ? 'is-visible' : ''}`}>Ecosystem</p>
        <h2 className={`ts-section-title anim-fade-up anim-delay-1 ${headerInView ? 'is-visible' : ''}`}>
          The TeamSumit Ecosystem
        </h2>
        <p className={`ts-section-subtitle anim-fade-up anim-delay-2 ${headerInView ? 'is-visible' : ''}`}>
          Three connected initiatives spanning technology, education, and innovation.
        </p>
      </div>

      <div className="ts-ecosystem-grid">
        {ECOSYSTEM_ENTITIES.map((entity, i) => (
          <AnimatedCard key={entity.id} animClass={CARD_ANIMS[i]} delay={`anim-delay-${i + 1}`}>
            <EcosystemCard
              entity={entity}
              cardId={entity.id === 'suprazo' ? 'services' : entity.id === 'suprathon' ? 'suprathon' : undefined}
              onCtaClick={handleEntityCta}
            />
          </AnimatedCard>
        ))}
      </div>
    </Section>
  )
}

function AnimatedCard({ children, animClass, delay }) {
  const [ref, inView] = useInView()
  return (
    <div ref={ref} className={`${animClass} ${delay} ${inView ? 'is-visible' : ''}`}>
      {children}
    </div>
  )
}

export default Ecosystem
