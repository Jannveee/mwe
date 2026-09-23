import { useIntake } from '../IntakeContext';
import { REASONS, ROLE_LABELS } from '../constants';

export default function ReasonSelectStep() {
  const { state, dispatch } = useIntake();
  const reasons = REASONS[state.role] || [];

  return (
    <div className="ts-field">
      <label htmlFor="reason-select">
        What would you like from {ROLE_LABELS[state.role]}?
      </label>
      <select
        id="reason-select"
        className="ts-select"
        value={state.reason || ''}
        onChange={(e) => dispatch({ type: 'SET_REASON', payload: e.target.value })}
      >
        <option value="" disabled>Select a reason</option>
        {reasons.map((r) => (
          <option key={r.value} value={r.value}>{r.label}</option>
        ))}
      </select>
      <div className="step-nav">
        <button type="button" className="ts-btn ts-btn--ghost" onClick={() => dispatch({ type: 'PREV_STEP' })}>Back</button>
        <button
          type="button"
          className="ts-btn"
          disabled={!state.reason}
          onClick={() => dispatch({ type: 'NEXT_STEP' })}
        >
          Next
        </button>
      </div>
    </div>
  );
}