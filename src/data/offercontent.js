export const AUDIENCES = [
  {
    role: 'college',
    title: 'Colleges & Universities',
    tag: 'Institutions',
    bullets: [
      'Guest lectures & masterclasses on entrepreneurship',
      'Curriculum design support for innovation cells',
      'Startup incubation cell mentorship',
      'Faculty development workshops',
    ],
  },
  {
    role: 'student',
    title: 'Students',
    tag: 'Individuals',
    bullets: [
      'One-on-one career guidance sessions',
      'Startup idea validation & mentorship',
      'Resume & interview preparation',
      'Access to internship/industry network',
    ],
  },
  {
    role: 'industry',
    title: 'Industry',
    tag: 'Organizations',
    bullets: [
      'Corporate training & leadership workshops',
      'Speaking engagements at company events',
      'Innovation & strategy consulting',
      'Campus hiring / talent pipeline partnerships',
    ],
  },
];

export const REASONS = {
  college: [
    { value: 'guest-lecture', label: 'Guest Lecture / Masterclass' },
    { value: 'curriculum', label: 'Curriculum Design Support' },
    { value: 'incubation', label: 'Startup Incubation Mentorship' },
    { value: 'faculty-dev', label: 'Faculty Development Workshop' },
    { value: 'other', label: 'Other' },
  ],
  student: [
    { value: 'career-guidance', label: 'Career Guidance Session' },
    { value: 'idea-validation', label: 'Startup Idea Validation' },
    { value: 'resume-prep', label: 'Resume & Interview Prep' },
    { value: 'networking', label: 'Industry Networking' },
    { value: 'other', label: 'Other' },
  ],
  industry: [
    { value: 'corporate-training', label: 'Corporate Training / Workshop' },
    { value: 'speaking', label: 'Speaking Engagement' },
    { value: 'consulting', label: 'Innovation & Strategy Consulting' },
    { value: 'hiring', label: 'Campus Hiring Partnership' },
    { value: 'other', label: 'Other' },
  ],
};

// Field definitions per role+reason. type: 'text' | 'textarea' | 'select' | 'date'
export const DETAIL_FIELDS = {
  college: {
    'guest-lecture': [
      { name: 'institutionName', label: 'Institution Name', type: 'text', required: true },
      { name: 'audienceSize', label: 'Expected Audience Size', type: 'text' },
      { name: 'preferredDate', label: 'Preferred Date', type: 'date' },
      { name: 'topic', label: 'Topic / Focus Area', type: 'textarea' },
    ],
    'curriculum': [
      { name: 'institutionName', label: 'Institution Name', type: 'text', required: true },
      { name: 'department', label: 'Department', type: 'text' },
      { name: 'scope', label: 'Scope of Support Needed', type: 'textarea' },
    ],
    'incubation': [
      { name: 'institutionName', label: 'Institution Name', type: 'text', required: true },
      { name: 'cellStage', label: 'Incubation Cell Stage', type: 'text' },
      { name: 'goals', label: 'Goals for Mentorship', type: 'textarea' },
    ],
    'faculty-dev': [
      { name: 'institutionName', label: 'Institution Name', type: 'text', required: true },
      { name: 'facultyCount', label: 'Number of Faculty', type: 'text' },
      { name: 'focusArea', label: 'Focus Area', type: 'textarea' },
    ],
    'other': [
      { name: 'institutionName', label: 'Institution Name', type: 'text', required: true },
      { name: 'details', label: 'Please describe your request', type: 'textarea', required: true },
    ],
  },
  student: {
    'career-guidance': [
      { name: 'currentStatus', label: 'Current Status (e.g. final year, graduate)', type: 'text' },
      { name: 'careerInterest', label: 'Career Interest / Field', type: 'text' },
      { name: 'priceNote', label: 'Session Fee', type: 'display', display: '₹[ADD AMOUNT]' },
    ],
    'idea-validation': [
      { name: 'ideaSummary', label: 'Briefly describe your idea', type: 'textarea', required: true },
      { name: 'stage', label: 'Current Stage', type: 'text' },
    ],
    'resume-prep': [
      { name: 'targetRole', label: 'Target Role / Industry', type: 'text' },
      { name: 'notes', label: 'Anything specific you want covered', type: 'textarea' },
    ],
    'networking': [
      { name: 'interestArea', label: 'Industry / Domain of Interest', type: 'text' },
    ],
    'other': [
      { name: 'details', label: 'Please describe your request', type: 'textarea', required: true },
    ],
  },
  industry: {
    'corporate-training': [
      { name: 'companyName', label: 'Company Name', type: 'text', required: true },
      { name: 'teamSize', label: 'Team Size', type: 'text' },
      { name: 'trainingGoals', label: 'Training Goals', type: 'textarea' },
    ],
    'speaking': [
      { name: 'companyName', label: 'Company Name', type: 'text', required: true },
      { name: 'eventName', label: 'Event Name', type: 'text' },
      { name: 'eventDate', label: 'Event Date', type: 'date' },
    ],
    'consulting': [
      { name: 'companyName', label: 'Company Name', type: 'text', required: true },
      { name: 'challenge', label: 'Business Challenge', type: 'textarea' },
    ],
    'hiring': [
      { name: 'companyName', label: 'Company Name', type: 'text', required: true },
      { name: 'rolesHiring', label: 'Roles You Are Hiring For', type: 'textarea' },
    ],
    'other': [
      { name: 'companyName', label: 'Company Name', type: 'text', required: true },
      { name: 'details', label: 'Please describe your request', type: 'textarea', required: true },
    ],
  },
};

export const ROLE_LABELS = {
  college: 'Colleges & Universities',
  student: 'Students',
  industry: 'Industry',
};