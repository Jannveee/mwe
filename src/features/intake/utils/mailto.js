/**
 * Mailto Utility — TEMPORARY / PLACEHOLDER
 * ---------------------------------------------------------------------
 * Frontend-only mailto generator for TeamSumit inquiries, updated for
 * the 3-role model (college / student / industry). Real submission
 * (validation, CRM, PDF) is deferred to later phases per the project
 * plan — this only builds a mailto: link from the new answer shape.
 * ---------------------------------------------------------------------
 */

import { REASONS, ROLE_LABELS } from '../constants.js';

export const DESTINATION_EMAIL = 'sumitwaghmare645@gmail.com';

function reasonLabel(role, reasonValue) {
  return REASONS[role]?.find((r) => r.value === reasonValue)?.label || 'General Inquiry';
}

function formatDetails(details = {}) {
  const entries = Object.entries(details).filter(([, v]) => v);
  if (entries.length === 0) return 'None provided';
  return entries.map(([k, v]) => `${k}: ${v}`).join('\n');
}

/**
 * Builds email draft and mailto URL for any of the 3 roles.
 * `answers` shape: { reason, details, contact }
 */
export function buildEmailDraft(role, answers = {}, source = 'homepage') {
  const { reason, details = {}, contact = {} } = answers;
  const roleTitle = ROLE_LABELS[role] || 'General';
  const reasonTitle = reasonLabel(role, reason);

  const subject = `[TeamSumit Inquiry] ${roleTitle} — ${reasonTitle}`;
  const body = `Hello Sumit Sir & Team,

I would like to connect through TeamSumit.

--- VISITOR DETAILS ---
Role: ${roleTitle}
Reason: ${reasonTitle}
Inquiry Source: ${source}

--- CONTACT ---
Name: ${contact.name || 'N/A'}
Email: ${contact.email || 'N/A'}
Phone: ${contact.phone || 'N/A'}

--- DETAILS ---
${formatDetails(details)}

---
Generated via TeamSumit Official Portal (placeholder — not yet wired to backend)`;

  const mailtoUrl = `mailto:${DESTINATION_EMAIL}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  return { subject, body, destination: DESTINATION_EMAIL, mailtoUrl };
}