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
  const { id, name, monogram, descriptor, offerings, ctaLabel } = entity
  const headingId = `ecosystem-card-${id}-heading`

  return (
    <article id={cardId || id} className="ts-glass ts-ecosystem-card" aria-labelledby={headingId}>
      <div className="ts-ecosystem-card-header">
        <span className="ts-ecosystem-monogram" aria-hidden="true">
          {monogram}
        </span>
        <div>
          <h3 id={headingId} className="ts-ecosystem-card-title">
            {name}
          </h3>
          <p className="ts-ecosystem-card-descriptor">{descriptor}</p>
        </div>
      </div>

      <ul className="ts-ecosystem-offerings">
        {offerings.map((offering) => (
          <li key={offering} className="ts-ecosystem-offering">
            {offering}
          </li>
        ))}
      </ul>

      <div className="ts-ecosystem-cta-row">
        <button
          type="button"
          className="ts-btn ts-btn--secondary ts-ecosystem-cta"
          onClick={() => onCtaClick?.(id)}
        >
          {ctaLabel}
        </button>
      </div>
    </article>
  )
}

export default EcosystemCard
