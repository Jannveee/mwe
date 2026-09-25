import { useIntake } from '../../features/intake/IntakeContext.jsx'
import { SOURCES } from '../../features/intake/constants.js'

/**
 * ConnectButton
 * ---------------------------------------------------------------------
 * The single, reused "Connect With Sumit Sir" primary CTA. Used in the
 * header and footer so the action stays visually and behaviorally
 * consistent everywhere it appears.
 *
 * Opens the intake modal via useIntake(), tagging the open with
 * `source` so where a request came from is captured. Defaults to
 * SOURCES.HOMEPAGE (its most common placement); pass `source="header"`
 * when rendering inside the header. An `onClick` override is still
 * supported for call sites that need different behavior.
 * ---------------------------------------------------------------------
 */
function ConnectButton({ children, onClick, source = SOURCES.HOMEPAGE, className = '', size = 'base', ...rest }) {
  const { openIntake } = useIntake()
  const sizeClass = size === 'lg' ? 'ts-btn--lg' : size === 'sm' ? 'ts-btn--sm' : ''

  const handleClick = (event) => {
    if (onClick) {
      onClick(event)
      return
    }
    openIntake(source)
  }

  return (
    <button
      type="button"
      className={`ts-btn ts-btn--primary ${sizeClass} ${className}`.trim()}
      onClick={handleClick}
      {...rest}
    >
      {children || 'Connect With Sumit Sir'}
    </button>
  )
}

export default ConnectButton
