export const initialIntakeState = {
  step: 1,
  role: null,
  reason: null,
  details: {},
  contact: { name: '', email: '', phone: '' },
  submitted: false,
};

export function intakeReducer(state, action) {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.payload, reason: null, details: {}, step: 2 };
    case 'SET_REASON':
      return { ...state, reason: action.payload, details: {}, step: 3 };
    case 'SET_DETAIL_FIELD':
      return { ...state, details: { ...state.details, [action.field]: action.value } };
    case 'SET_CONTACT_FIELD':
      return { ...state, contact: { ...state.contact, [action.field]: action.value } };
    case 'GO_TO_STEP':
      return { ...state, step: action.payload };
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 5) };
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 1) };
    case 'SUBMIT':
      return { ...state, submitted: true };
    case 'RESET':
      return initialIntakeState;
    default:
      return state;
  }
}