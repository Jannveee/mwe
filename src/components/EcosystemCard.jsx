/**
 * EcosystemCard
 * ---------------------------------------------------------------------
 * Reusable card for one TeamSumit ecosystem entity (SuPrazo
 * Technologies / CodeElevate Academy / SuPrathon Community).
 *
 * The CTA is intentionally a separate, clearly-focusable <button> (not
 * the whole card wrapped in a link/click handler) so it stays a
 * distinct, accessible target with its own label — per requirement to
 * keep card CTAs "separate and accessible."
 *
 * `onCtaClick(entityId)` is supplied by the parent <Ecosystem> section
 * so each entity can later be wired to a different flow (e.g. a
 * different intake-modal branch per entity) without changing this
 * component.
 * ---------------------------------------------------------------------
 */
function EcosystemCard({ entity, cardId, onCtaClick }) {
  const { id, name, descriptor, offerings, ctaLabel } = entity
  const headingId = `ecosystem-card-${id}-heading`

  return (
    <article
      id={cardId || id}
      className={`ts-ecosystem-card ts-ecosystem-card--${id}`}
      aria-labelledby={headingId}
    >
      <div className="ts-ecosystem-card-top-bar" />
      <div className="ts-ecosystem-card-inner">
        <div className="ts-ecosystem-card-header">
          <h3 id={headingId} className="ts-ecosystem-card-title">
            {name}
          </h3>
          <p className="ts-ecosystem-card-descriptor">{descriptor}</p>
        </div>

        <ul className="ts-ecosystem-offerings">
          {offerings.map((offering) => (
            <li key={offering} className="ts-ecosystem-offering">
              <span className="ts-offering-bullet" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
              <span className="ts-offering-text">{offering}</span>
            </li>
          ))}
        </ul>

        <div className="ts-ecosystem-cta-row">
          <button
            type="button"
            className="ts-btn ts-btn--secondary ts-ecosystem-cta"
            onClick={() => onCtaClick?.(id)}
          >
            <span>{ctaLabel}</span>
            <svg className="ts-cta-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  )
}

export default EcosystemCard
