import { useIntake } from '../../IntakeContext';
import { DETAIL_FIELDS } from '../../constants';

export default function DetailFieldsStep() {
  const { state, dispatch } = useIntake();
  const fields = DETAIL_FIELDS[state.role]?.[state.reason] || [];

  const handleChange = (field, value) => {
    dispatch({ type: 'SET_DETAIL_FIELD', field, value });
  };

  return (
    <div>
      {fields.map((f) => (
        <div className="ts-field" key={f.name}>
          <label htmlFor={f.name}>{f.label}{f.required && ' *'}</label>
          {f.type === 'display' ? (
            <p className="ts-badge">{f.display}</p>
          ) : f.type === 'textarea' ? (
            <textarea
              id={f.name}
              className="ts-textarea"
              value={state.details[f.name] || ''}
              required={f.required}
              onChange={(e) => handleChange(f.name, e.target.value)}
            />
          ) : (
            <input
              id={f.name}
              type={f.type === 'date' ? 'date' : 'text'}
              className="ts-input"
              value={state.details[f.name] || ''}
              required={f.required}
              onChange={(e) => handleChange(f.name, e.target.value)}
            />
          )}
        </div>
      ))}
      <div className="step-nav">
        <button type="button" className="ts-btn ts-btn--ghost" onClick={() => dispatch({ type: 'PREV_STEP' })}>Back</button>
        <button type="button" className="ts-btn" onClick={() => dispatch({ type: 'NEXT_STEP' })}>Next</button>
      </div>
    </div>
  );
}