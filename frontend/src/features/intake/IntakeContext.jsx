import { createContext, useContext, useState, useMemo } from 'react';
import { STEPS } from './constants';

const IntakeContext = createContext(null);

const STEP_ORDER = [STEPS.ROLE, STEPS.QUESTIONNAIRE, STEPS.REVIEW, STEPS.SUCCESS];

const initialState = {
  isOpen: false,
  step: STEPS.ROLE,
  role: null,
  answers: {},
  source: null,
};

export function IntakeProvider({ children }) {
  const [state, setState] = useState(initialState);

  const openIntake = (source) =>
    setState((s) => ({ ...s, isOpen: true, source }));

  const closeIntake = () => setState((s) => ({ ...s, isOpen: false }));

  const cancelIntake = () => setState(initialState);

  const selectRole = (roleId) =>
    setState((s) => ({ ...s, role: roleId, step: STEPS.QUESTIONNAIRE, answers: {} }));

  const setAnswers = (answers) =>
    setState((s) => ({ ...s, answers: { ...s.answers, ...answers } }));

  const goNext = () =>
    setState((s) => {
      const idx = STEP_ORDER.indexOf(s.step);
      return { ...s, step: STEP_ORDER[Math.min(idx + 1, STEP_ORDER.length - 1)] };
    });

  const goBack = () =>
    setState((s) => {
      const idx = STEP_ORDER.indexOf(s.step);
      return { ...s, step: STEP_ORDER[Math.max(idx - 1, 0)] };
    });

  const restart = () => setState((s) => ({ ...initialState, isOpen: s.isOpen }));

  const updateAnswers = (role, partial) =>
  setState((s) => ({ ...s, answers: { ...s.answers, ...partial } }));

  const derived = useMemo(() => {
    const idx = STEP_ORDER.indexOf(state.step);
    return {
      stepIndex: idx,
      canGoBack: idx > 0 && state.step !== STEPS.SUCCESS,
      canGoNext: state.step === STEPS.REVIEW, // Review's own Submit uses this
    };
  }, [state.step]);

  return (
    <IntakeContext.Provider
      value={{
        state,
        derived,
        openIntake,
        closeIntake,
        cancelIntake,
        selectRole,
        setAnswers,
        goNext,
        goBack,
        restart,
      }}
    >
      {children}
    </IntakeContext.Provider>
  );
}

export function useIntake() {
  const ctx = useContext(IntakeContext);
  if (!ctx) throw new Error('useIntake must be used within IntakeProvider');
  return ctx;
}