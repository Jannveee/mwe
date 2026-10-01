import { STEPS } from '../constants.js'

function ModalControls({ step, canGoBack, canGoNext, onNext, onBack, onCancel, onClose }) {
  const isSuccess = step === STEPS.SUCCESS
  const isRoleStep = step === STEPS.ROLE

  return (
    <div className="ts-intake-controls">
      {/* Left: arrow back button (hidden on role step and success) */}
      <div className="ts-intake-controls-left">
        {!isRoleStep && !isSuccess && (
          <button
            type="button"
            className="ts-intake-back-arrow"
            onClick={onBack}
            disabled={!canGoBack}
            aria-label="Go back"
          >
            &#8592;
          </button>
        )}
      </div>

      {/* Right: Cancel + Next/Close */}
      <div className="ts-intake-controls-right">
        {isSuccess ? (
          <button type="button" className="ts-btn ts-btn--primary" onClick={onClose}>
            Close
          </button>
        ) : (
          <>
            <button type="button" className="ts-btn ts-btn--ghost" onClick={onCancel}>
              Cancel
            </button>
            {!isRoleStep && (
              <button
                type="button"
                className="ts-btn ts-btn--primary"
                onClick={onNext}
                disabled={!canGoNext}
              >
                Next
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ModalControls