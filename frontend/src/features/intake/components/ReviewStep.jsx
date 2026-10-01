import { useIntake } from '../IntakeContext';
import { REASONS, ROLE_LABELS, DETAIL_FIELDS } from '../constants';

export default function ReviewStep({ role, answers }) {
  const { goNext } = useIntake();
  const safeAnswers = answers || {};
  const reason = safeAnswers.reason;
  const details = safeAnswers.details || {};
  const contact = safeAnswers.contact || {};
  const fields = DETAIL_FIELDS[role]?.[reason] || [];
  const reasonLabel = REASONS[role]?.find((r) => r.value === reason)?.label || '—';

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
      <div className="step-nav">
        <button type="button" className="ts-btn ts-btn--primary" onClick={goNext}>
          Submit Request
        </button>
      </div>
    </div>
  );
}