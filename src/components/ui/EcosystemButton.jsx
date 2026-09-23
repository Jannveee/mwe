/**
 * EcosystemButton
 * ---------------------------------------------------------------------
 * Secondary CTA: "Explore the Ecosystem". Default behavior is a real
 * (non-placeholder) smooth scroll to the #ecosystem anchor, since that
 * section already exists as a placeholder target from Phase 2. An
 * onClick override is supported so this can be repointed later (e.g.
 * to a dedicated ecosystem route) without touching the Hero.
 * ---------------------------------------------------------------------
 */
function EcosystemButton({ onClick, className = '', size = 'base', ...rest }) {
  const sizeClass = size === 'lg' ? 'ts-btn--lg' : size === 'sm' ? 'ts-btn--sm' : ''

  const handleClick = (event) => {
    if (onClick) {
      onClick(event)
      return
    }
    const target = document.getElementById('ecosystem')
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <button
      type="button"
      className={`ts-btn ts-btn--secondary ${sizeClass} ${className}`.trim()}
      onClick={handleClick}
      {...rest}
    >
      Explore the Ecosystem
    </button>
  )
}

export default EcosystemButton
