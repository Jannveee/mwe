/**
 * Section
 * ---------------------------------------------------------------------
 * Reusable wrapper for every homepage section (Hero, About, Ecosystem,
 * Services, Achievements, SuPrathon, Connect, etc.). Handles:
 * - semantic <section> with id (nav anchor target) + accessible name
 * - consistent max-width container + vertical rhythm
 * - optional background/tone variants
 *
 * Real section content (Hero, About, etc.) is NOT built here — this is
 * purely the structural wrapper, per this phase's scope.
 * ---------------------------------------------------------------------
 */
function Section({ id, ariaLabel, tone = 'base', children, className = '' }) {
  const toneClass = tone === 'raised' ? 'ts-section--raised' : ''

  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`ts-section ${toneClass} ${className}`.trim()}
    >
      <div className="ts-container">{children}</div>
    </section>
  )
}

export default Section
