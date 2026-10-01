import { useIntake } from '../IntakeContext';

export default function ContactStep() {
  const { state, dispatch } = useIntake();

  const handleChange = (field, value) => {
    dispatch({ type: 'SET_CONTACT_FIELD', field, value });
  };

  return (
    <div>
      <div className="ts-field">
        <label htmlFor="contact-name">Full Name *</label>
        <input
          id="contact-name"
          className="ts-input"
          type="text"
          required
          value={state.contact.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>
      <div className="ts-field">
        <label htmlFor="contact-email">Email *</label>
        <input
          id="contact-email"
          className="ts-input"
          type="email"
          required
          value={state.contact.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
      </div>
      <div className="ts-field">
        <label htmlFor="contact-phone">Phone</label>
        <input
          id="contact-phone"
          className="ts-input"
          type="tel"
          value={state.contact.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      </div>
      <div className="step-nav">
        <button type="button" className="ts-btn ts-btn--ghost" onClick={() => dispatch({ type: 'PREV_STEP' })}>Back</button>
        <button
          type="button"
          className="ts-btn"
          disabled={!state.contact.name || !state.contact.email}
          onClick={() => dispatch({ type: 'NEXT_STEP' })}
        >
          Next
        </button>
      </div>
    </div>
  );
}