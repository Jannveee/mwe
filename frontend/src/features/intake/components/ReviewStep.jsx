import { useState, useEffect, useImperativeHandle, useRef, forwardRef } from 'react';
import { useIntake } from '../IntakeContext';
import { REASONS, ROLE_LABELS, DETAIL_FIELDS } from '../constants';
import { submitAppointment } from '../../../lib/api';

const ReviewStep = forwardRef(function ReviewStep({ role, answers, onSubmittingChange }, ref) {
  const { goNext } = useIntake();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const inFlight = useRef(false); // blocks double-clicks instantly

  const safeAnswers = answers || {};
  const reason = safeAnswers.reason;
  const details = safeAnswers.details || {};
  const contact = safeAnswers.contact || {};
  const fields = DETAIL_FIELDS[role]?.[reason] || [];
  const reasonLabel = REASONS[role]?.find((r) => r.value === reason)?.label || '—';

  useEffect(() => {
    onSubmittingChange?.(submitting);
  }, [submitting, onSubmittingChange]);

  const handleSubmit = async () => {
    if (inFlight.current) return;
    inFlight.current = true;
    setSubmitting(true);
    setError('');
    try {
      await submitAppointment({
        name: contact.name,
        email: contact.email,
        phone: contact.phone,
        role,
        reason,
        detailValues: details,
      });
      goNext(); // → SUCCESS, only after the backend accepted it
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  };

  // Lets ConnectModal's footer button trigger the submit
  useImperativeHandle(ref, () => ({ submit: handleSubmit }), [role, answers]);

  return (
    <div>
      <h4>Review Your Request</h4>
      <dl className="ts-intake-review-list">
        <div className="ts-intake-review-row"><dt>Role</dt><dd>{ROLE_LABELS[role] || '—'}</dd></div>
        <div className="ts-intake-review-row"><dt>Reason</dt><dd>{reasonLabel}</dd></div>
        {fields.filter((f) => f.type !== 'display').map((f) => (
          <div className="ts-intake-review-row" key={f.name}>
            <dt>{f.label}</dt>
            <dd>{details[f.name] || '—'}</dd>
          </div>
        ))}
        <div className="ts-intake-review-row"><dt>Name</dt><dd>{contact.name || '—'}</dd></div>
        <div className="ts-intake-review-row"><dt>Email</dt><dd>{contact.email || '—'}</dd></div>
        <div className="ts-intake-review-row"><dt>Phone</dt><dd>{contact.phone || '—'}</dd></div>
      </dl>

      {error && (
        <p role="alert" style={{ color: '#c0392b', marginTop: 12 }}>{error}</p>
      )}
    </div>
  );
});

export default ReviewStep;