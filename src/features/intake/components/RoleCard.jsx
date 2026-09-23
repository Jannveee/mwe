/**
 * RoleCard
 * ---------------------------------------------------------------------
 * One selectable role option. A real <button> (not a div with a click
 * handler) so it's keyboard-operable and announced correctly, with
 * aria-pressed reflecting selection state — matches the pattern
 * EcosystemCard already uses for its CTA (separate, accessible target).
 * ---------------------------------------------------------------------
 */
function RoleCard({ role, isSelected, onSelect }) {
  return (
    <button
      type="button"
      className={`ts-card ts-card--interactive ts-intake-role-card ${
        isSelected ? 'ts-intake-role-card--selected' : ''
      }`}
      aria-pressed={isSelected}
      onClick={() => onSelect(role.id)}
    >
      <span className="ts-intake-role-card-title">{role.title}</span>
      <span className="ts-intake-role-card-description">{role.description}</span>
    </button>
  )
}

export default RoleCard
