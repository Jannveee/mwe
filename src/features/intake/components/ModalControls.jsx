import { STEPS } from '../constants.js'


function ModalControls({ step, canGoBack, onBack, onCancel, onRestart, onClose }) {
  const isSuccess = step === STEPS.SUCCESS
  const isRoleStep = step === STEPS.ROLE

  return (
    <div className="ts-intake-controls">
      <div className="ts-intake-controls-left">
        <button type="button" className="ts-btn ts-btn--ghost" onClick={onRestart}>
          Restart
        </button>
      </div>

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
                className="ts-btn ts-btn--secondary"
                onClick={onBack}
                disabled={!canGoBack}
              >
                Back
              </button>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default ModalControls