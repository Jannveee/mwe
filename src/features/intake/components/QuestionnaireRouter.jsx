import { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { useIntake } from '../IntakeContext';
import { REASONS, DETAIL_FIELDS, ROLE_LABELS } from '../constants';

const SUB_STEPS = { REASON: 'reason', DETAILS: 'details', CONTACT: 'contact' };

/**
 * QuestionnaireRouter
 * Exposes goSubNext / goSubBack via ref so ConnectModal can drive navigation.
 * Notifies parent of canSubNext changes via onCanSubNextChange callback.
 */
const QuestionnaireRouter = forwardRef(function QuestionnaireRouter({ role, onCanSubNextChange }, ref) {
  const { setAnswers, goNext } = useIntake();
  const [subStep, setSubStep] = useState(SUB_STEPS.REASON);
  const [reason, setReason] = useState('');
  const [details, setDetails] = useState({});
  const [contact, setContact] = useState({ name: '', email: '', phone: '' });

  const fields = DETAIL_FIELDS[role]?.[reason] || [];

  const handleDetailChange = (name, value) =>
    setDetails((d) => ({ ...d, [name]: value }));

  const handleContactChange = (name, value) =>
    setContact((c) => ({ ...c, [name]: value }));

  const handleFinish = () => {
    setAnswers({ reason, details, contact });
    goNext(); // → REVIEW
  };

  const canSubNext =
    subStep === SUB_STEPS.REASON   ? !!reason :
    subStep === SUB_STEPS.DETAILS  ? true :
    !!(contact.name && contact.email && contact.phone.length === 10);

  // Notify parent every time canSubNext changes so it can re-render controls
  useEffect(() => {
    onCanSubNextChange?.(canSubNext);
  }, [canSubNext]);

  useImperativeHandle(ref, () => ({
    goSubNext() {
      if (!canSubNext) return;
      if (subStep === SUB_STEPS.REASON)        setSubStep(SUB_STEPS.DETAILS);
      else if (subStep === SUB_STEPS.DETAILS)  setSubStep(SUB_STEPS.CONTACT);
      else                                     handleFinish();
    },
    goSubBack() {
      if (subStep === SUB_STEPS.DETAILS)       setSubStep(SUB_STEPS.REASON);
      else if (subStep === SUB_STEPS.CONTACT)  setSubStep(SUB_STEPS.DETAILS);
    },
    isFirstSubStep: subStep === SUB_STEPS.REASON,
  }), [subStep, reason, contact, canSubNext]);

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
          {(REASONS[role] || []).map((r) => (
            <option key={r.value} value={r.value}>{r.label}</option>
          ))}
        </select>
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
      </div>
    );
  }

  // CONTACT sub-step
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
        <label htmlFor="contact-phone">Phone *</label>
        <input
          id="contact-phone"
          className="ts-input"
          type="tel"
          required
          maxLength={10}
          value={contact.phone}
          onChange={(e) => {
            const digits = e.target.value.replace(/\D/g, '').slice(0, 10);
            handleContactChange('phone', digits);
          }}
          placeholder="10-digit mobile number"
        />
      </div>
    </div>
  );
});

export default QuestionnaireRouter;