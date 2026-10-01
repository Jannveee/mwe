import { STEP_ORDER, STEP_LABELS } from '../constants.js'

/**
 * ProgressIndicator
 * ---------------------------------------------------------------------
 * Shows the four wizard steps (role → questionnaire → review →
 * success) with the current one highlighted. Purely presentational —
 * takes the current step index as a prop rather than reading context
 * directly, so it stays easy to preview/test in isolation.
 *
 * aria-hidden dots are decorative; the real accessible status is the
 * visually-hidden text plus the dialog title changing per step (see
 * ConnectModal), so screen reader users aren't dependent on the dots.
 * ---------------------------------------------------------------------
 */
function ProgressIndicator({ currentIndex }) {
  return (
    <div className="ts-intake-progress" role="group" aria-label="Progress">
      <p className="ts-intake-progress-status">
        Step {Math.min(currentIndex + 1, STEP_ORDER.length)} of {STEP_ORDER.length}:{' '}
        {STEP_LABELS[STEP_ORDER[currentIndex]]}
      </p>
      <ol className="ts-intake-progress-track">
        {STEP_ORDER.map((step, index) => {
          const state =
            index < currentIndex ? 'complete' : index === currentIndex ? 'current' : 'upcoming'
          return (
            <li
              key={step}
              className={`ts-intake-progress-dot ts-intake-progress-dot--${state}`}
              aria-hidden="true"
            />
          )
        })}
      </ol>
    </div>
  )
}

export default ProgressIndicator
