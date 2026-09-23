export { AUDIENCES as ROLES, REASONS, DETAIL_FIELDS, ROLE_LABELS } from '../../data/offerContent';

export const STEPS = {
  ROLE: 'role',
  QUESTIONNAIRE: 'questionnaire',
  REVIEW: 'review',
  SUCCESS: 'success',
};

export const STEP_ORDER = [STEPS.ROLE, STEPS.QUESTIONNAIRE, STEPS.REVIEW, STEPS.SUCCESS];

export const SOURCES = {
  HOMEPAGE: 'homepage',
  HEADER: 'header',
  FOOTER: 'footer',
  PRICING: 'pricing',
};

export const STEP_LABELS = {
  role: "Who's connecting with Sumit Sir?",
  questionnaire: 'Tell us more',
  review: 'Review your details',
  success: 'Request received',
};