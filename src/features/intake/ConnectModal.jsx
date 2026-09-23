import { useIntake } from './IntakeContext.jsx'
import { STEPS } from './constants.js'
import ModalShell from './components/ModalShell.jsx'
import ProgressIndicator from './components/ProgressIndicator.jsx'
import ModalControls from './components/ModalControls.jsx'
import RoleSelectStep from './components/RoleSelectStep.jsx'
import QuestionnaireRouter from './components/QuestionnaireRouter.jsx'
import ReviewStep from './components/ReviewStep.jsx'
import SuccessStep from './components/SuccessStep.jsx'

const TITLE_ID = 'intake-modal-title'
const DESCRIPTION_ID = 'intake-modal-description'

const STEP_TITLES = {
  [STEPS.ROLE]: "Who's connecting with Sumit Sir?",
  [STEPS.QUESTIONNAIRE]: 'Tell us more',
  [STEPS.REVIEW]: 'Review your details',
  [STEPS.SUCCESS]: 'Request received',
}

/**
 * ConnectModal
 * ---------------------------------------------------------------------
 * Mounted exactly once (in Layout, alongside <IntakeProvider>). Reads
 * all state from useIntake() and renders nothing when closed, so
 * mounting it doesn't affect the page when the modal isn't in use.
 *
 * This is the only component that knows the mapping from wizard step
 * → which step component to render — everything below it (RoleSelect,
 * QuestionnaireRouter, etc.) is presentational/self-contained.
 * ---------------------------------------------------------------------
 */
function ConnectModal() {
  const { state, derived, closeIntake, cancelIntake, selectRole, goNext, goBack, restart } =
    useIntake()

  function handleSelectRole(roleId) {
    selectRole(roleId)
  }

  function renderStep() {
    switch (state.step) {
      case STEPS.ROLE:
        return (
          <RoleSelectStep
            selectedRole={state.role}
            onSelect={handleSelectRole}
            descriptionId={DESCRIPTION_ID}
          />
        )
      case STEPS.QUESTIONNAIRE:
        return <QuestionnaireRouter role={state.role} descriptionId={DESCRIPTION_ID} />
      case STEPS.REVIEW:
        return <ReviewStep role={state.role} answers={state.answers} descriptionId={DESCRIPTION_ID} />
      case STEPS.SUCCESS:
        return <SuccessStep descriptionId={DESCRIPTION_ID} />
      default:
        return null
    }
  }

  return (
    <ModalShell
      isOpen={state.isOpen}
      titleId={TITLE_ID}
      title={STEP_TITLES[state.step]}
      descriptionId={DESCRIPTION_ID}
      onClose={cancelIntake}
    >
      <ProgressIndicator currentIndex={derived.stepIndex} />

      {renderStep()}

      <ModalControls
  step={state.step}
  canGoBack={derived.canGoBack}
  onBack={goBack}
  onCancel={cancelIntake}
  onRestart={restart}
  onClose={closeIntake}
/>
    </ModalShell>
  )
}

export default ConnectModal
