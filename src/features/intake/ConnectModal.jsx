import { useRef, useState } from 'react'
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

function ConnectModal() {
  const { state, derived, closeIntake, cancelIntake, selectRole, goNext, goBack } =
    useIntake()

  const questionnaireRef = useRef(null)
  // Track canSubNext in state so parent re-renders when child value changes
  const [canSubNext, setCanSubNext] = useState(false)

  function handleSelectRole(roleId) {
    selectRole(roleId)
  }

  // Reset canSubNext when leaving the questionnaire step
  const isQuestionnaire = state.step === STEPS.QUESTIONNAIRE
  function handleNext() {
    if (state.step === STEPS.QUESTIONNAIRE && questionnaireRef.current) {
      questionnaireRef.current.goSubNext()
    } else {
      goNext()
    }
  }

  function handleBack() {
    if (state.step === STEPS.QUESTIONNAIRE && questionnaireRef.current) {
      const { isFirstSubStep } = questionnaireRef.current
      if (isFirstSubStep) {
        goBack() // back to ROLE step
      } else {
        questionnaireRef.current.goSubBack()
      }
    } else {
      goBack()
    }
  }

  // Is the Next button enabled? Use state (updated by child callback) for questionnaire step
  const computedCanGoNext = state.step === STEPS.QUESTIONNAIRE ? canSubNext : derived.canGoNext

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
        return (
          <QuestionnaireRouter
            ref={questionnaireRef}
            role={state.role}
            descriptionId={DESCRIPTION_ID}
            onCanSubNextChange={setCanSubNext}
          />
        )
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
        canGoBack={derived.canGoBack || state.step === STEPS.QUESTIONNAIRE}
        canGoNext={computedCanGoNext}
        onNext={handleNext}
        onBack={handleBack}
        onCancel={cancelIntake}
        onClose={closeIntake}
      />
    </ModalShell>
  )

}

export default ConnectModal
