import { useState } from 'react';
import { useIntake } from '../IntakeContext';
import { REASONS, DETAIL_FIELDS, ROLE_LABELS } from '../constants';

const SUB_STEPS = { REASON: 'reason', DETAILS: 'details', CONTACT: 'contact' };

export default function QuestionnaireRouter({ role }) {
  const { setAnswers, goNext } = useIntake();
  const [subStep, setSubStep] = useState(SUB_STEPS.REASON);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState({});
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });

  const reasons = REASONS[role] || [];
  const fields = DETAIL_FIELDS[role]?.[reason] || [];

  const handleDetailChange = (name, value) =>
    setDetails((d) => ({ ...d, [name]: value }));

  const handleContactChange = (name, value) =>
    setContact((c) => ({ ...c, [name]: value }));

  const handleFinish = () => {
    setAnswers({ reason, details, contact });
    goNext(); // -> REVIEW
  };

  if (subStep === SUB_STEPS.REASON) {
    return (
      <div className="ts-field">
        <label htmlFor="reason-select">
          What would you like from {ROLE_LABELS[role]}?
        </label>
        <select
          id="reason-select"
          className="ts-select"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        >
          <option value="" disabled>Select a reason</option>
          {reasons.map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
        <div className="step-nav">
          <button type="button" className="ts-btn" disabled={!reason}
            onClick={() => setSubStep(SUB_STEPS.DETAILS)}>
            Next
          </button>
        </div>
      </div>
    );
  }

  if (subStep === SUB_STEPS.DETAILS) {
    return (
      <div>
        {fields.map((f) => (
          <div className="ts-field" key={f.name}>
            <label htmlFor={f.name}>{f.label}{f.required && ' *'}</label>
            {f.type === 'display' ? (
              <p className="ts-badge">{f.display}</p>
            ) : f.type === 'textarea' ? (
              <textarea id={f.name} className="ts-textarea" required={f.required}
                value={details[f.name] || ''}
                onChange={(e) => handleDetailChange(f.name, e.target.value)} />
            ) : (
              <input id={f.name} type={f.type === 'date' ? 'date' : 'text'}
                className="ts-input" required={f.required}
                value={details[f.name] || ''}
                onChange={(e) => handleDetailChange(f.name, e.target.value)} />
            )}
          </div>
        ))}
        <div className="step-nav">
          <button type="button" className="ts-btn ts-btn--ghost" onClick={() => setSubStep(SUB_STEPS.REASON)}>Back</button>
          <button type="button" className="ts-btn" onClick={() => setSubStep(SUB_STEPS.CONTACT)}>Next</button>
        </div>
      </div>
    );
  }

  // CONTACT
  return (
    <div>
      <div className="ts-field">
        <label htmlFor="contact-name">Full Name *</label>
        <input id="contact-name" className="ts-input" type="text" required
          value={contact.name} onChange={(e) => handleContactChange('name', e.target.value)} />
      </div>
      <div className="ts-field">
        <label htmlFor="contact-email">Email *</label>
        <input id="contact-email" className="ts-input" type="email" required
          value={contact.email} onChange={(e) => handleContactChange('email', e.target.value)} />
      </div>
      <div className="ts-field">
        <label htmlFor="contact-phone">Phone</label>
        <input id="contact-phone" className="ts-input" type="tel"
          value={contact.phone} onChange={(e) => handleContactChange('phone', e.target.value)} />
      </div>
      <div className="step-nav">
        <button type="button" className="ts-btn ts-btn--ghost" onClick={() => setSubStep(SUB_STEPS.DETAILS)}>Back</button>
        <button type="button" className="ts-btn" disabled={!contact.name || !contact.email}
          onClick={handleFinish}>
          Next
        </button>
      </div>
    </div>
  );
}