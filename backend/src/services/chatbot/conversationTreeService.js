const VISITOR_TYPES = {
  STUDENT: "student",
  BUSINESS: "business",
  INSTITUTION: "institution",
  EVENT_ORGANIZER: "event_organizer",
  PROFESSIONAL: "professional",
  GENERAL: "general"
};

const INTENTS = {
  MENTORSHIP: "mentorship",
  CAREER: "career",
  HACKATHON_JUDGING: "hackathon_judging",
  SPEAKING: "speaking_engagement",
  WORKSHOP: "workshop",
  PARTNERSHIP: "partnership",
  COLLABORATION: "collaboration",
  PROJECT: "project",
  MEETING: "meeting",
  PROFESSIONAL_OPPORTUNITY: "professional_opportunity",
  ABOUT_SUMIT: "about_sumit",
  GENERAL_ENQUIRY: "general_enquiry"
};

const REQUIRED_FIELDS = {
  [INTENTS.MENTORSHIP]: [
    "institution",
    "background",
    "areaOfInterest",
    "purpose"
  ],

  [INTENTS.CAREER]: [
    "background",
    "areaOfInterest",
    "purpose"
  ],

  [INTENTS.HACKATHON_JUDGING]: [
    "institution",
    "eventName",
    "eventDate",
    "eventFormat",
    "expectedRole"
  ],

  [INTENTS.SPEAKING]: [
    "organization",
    "eventName",
    "eventDate",
    "eventFormat",
    "audience",
    "topic"
  ],

  [INTENTS.WORKSHOP]: [
    "organization",
    "eventName",
    "eventDate",
    "audience",
    "topic"
  ],

  [INTENTS.PARTNERSHIP]: [
    "organization",
    "representativeRole",
    "objective",
    "proposedCollaboration"
  ],

  [INTENTS.COLLABORATION]: [
    "organization",
    "objective",
    "proposedCollaboration"
  ],

  [INTENTS.PROJECT]: [
    "organization",
    "projectDescription",
    "objective"
  ],

  [INTENTS.MEETING]: [
    "organization",
    "purpose",
    "preferredTimeframe"
  ],

  [INTENTS.PROFESSIONAL_OPPORTUNITY]: [
    "organization",
    "opportunity",
    "purpose"
  ],

  [INTENTS.ABOUT_SUMIT]: [],

  [INTENTS.GENERAL_ENQUIRY]: [
    "purpose"
  ]
};

const FIELD_QUESTIONS = {
  institution:
    "Could you share the name of your college, university, or institution?",

  background:
    "Could you briefly tell me about your background or current role?",

  areaOfInterest:
    "What area are you currently interested in?",

  purpose:
    "Could you tell me a little more about what you would like to discuss with Sumit?",

  eventName:
    "What is the name of the event?",

  eventDate:
    "When is the event scheduled to take place?",

  eventFormat:
    "Could you share the format of the event and how Sumit would be involved?",

  expectedRole:
    "What role would you like Sumit to take during the event?",

  organization:
    "Could you share the name of your organization or institution?",

  audience:
    "Who will be attending or participating in the event?",

  topic:
    "What topic or subject would you like Sumit to address?",

  representativeRole:
    "What is your role or position within the organization?",

  objective:
    "What would you like to achieve through this discussion?",

  proposedCollaboration:
    "Could you briefly describe the collaboration you have in mind?",

  projectDescription:
    "Could you tell me a little about the project?",

  preferredTimeframe:
    "What timeframe would work for the meeting?",

  opportunity:
    "Could you describe the professional opportunity you would like to discuss?"
};

const VISITOR_PATTERNS = {
  [VISITOR_TYPES.STUDENT]: [
    /\b(student|students|undergraduate|undergrad|college student|university student|btech|b\.tech|bachelor|engineering student|campus)\b/i,
    /\b(mentor|mentorship|guidance|career guidance|career advice)\b/i
  ],

  [VISITOR_TYPES.BUSINESS]: [
    /\b(company|business|businesses|startup|startups|enterprise|enterprises|corporate|organization|organisation|firm|agency|client)\b/i,
    /\b(partnership|partnerships|sponsor|sponsorship|commercial|business opportunity)\b/i
  ],

  [VISITOR_TYPES.INSTITUTION]: [
    /\b(college|university|school|institution|faculty|professor|lecturer|dean|department|hod|head of department)\b/i,
    /\b(hackathon|hackathons|academic|academia|campus event)\b/i
  ],

  [VISITOR_TYPES.EVENT_ORGANIZER]: [
    /\b(event organizer|event organiser|organizer|organiser|conference organizer|conference organiser)\b/i,
    /\b(conference|summit|seminar|webinar|keynote|speaking engagement|speaker invitation)\b/i
  ],

  [VISITOR_TYPES.PROFESSIONAL]: [
    /\b(professional|founder|cofounder|co-founder|entrepreneur|consultant|developer|engineer|manager|director|executive|investor)\b/i,
    /\b(opportunity|project|collaboration|meeting|connect|networking)\b/i
  ]
};

const INTENT_PATTERNS = {
  [INTENTS.MENTORSHIP]: [
    /\b(mentor|mentorship|mentoring|guidance|guide me|career guidance|career advice|advice from sumit)\b/i,
    /\b(?:i['’]m|i am)\s+(?:a\s+)?student\b.*\b(?:help|guidance|advice|mentor)\b/i
  ],

  [INTENTS.CAREER]: [
    /\b(career|career path|career advice|job|jobs|internship|internships|professional growth|career growth)\b/i,
    /\b(getting started|entering|switching into|break into)\b.*\b(industry|career|tech|technology)\b/i
  ],

  [INTENTS.HACKATHON_JUDGING]: [
    /\b(hackathon|hackathons)\b.*\b(judge|judging|jury|juries|panel)\b/i,
    /\b(judge|judging|jury|panel)\b.*\b(hackathon|event|competition)\b/i
  ],

  [INTENTS.SPEAKING]: [
    /\b(keynote|keynote speech|keynote speaker|speaking|speaker|speak at|guest speaker)\b/i,
    /\b(conference|summit|seminar|event)\b.*\b(speak|speaking|address|speaker)\b/i,
    /\b(invite|invitation)\b.*\b(speak|speaker|keynote)\b/i
  ],

  [INTENTS.WORKSHOP]: [
    /\b(workshop|training session|masterclass|master class|session|lecture)\b/i,
    /\b(conduct|deliver|host|lead)\b.*\b(workshop|training|session|masterclass)\b/i
  ],

  [INTENTS.PARTNERSHIP]: [
    /\b(partnership|partner with|strategic partnership|business partnership)\b/i,
    /\b(partner|partners)\b.*\b(with sumit|with us|with the company)\b/i
  ],

  [INTENTS.COLLABORATION]: [
    /\b(collaboration|collaborate|collaborating|work together|joint initiative|joint project)\b/i,
    /\b(would like to work with|interested in working with)\b/i
  ],

  [INTENTS.PROJECT]: [
    /\b(project|projects|implementation|build together|development opportunity)\b/i,
    /\b(project opportunity|project proposal|project discussion)\b/i
  ],

  [INTENTS.MEETING]: [
    /\b(meeting|meet with|meet sumit|connect with sumit|call with sumit|schedule a call)\b/i,
    /\b(book|schedule|arrange|set up)\b.*\b(meeting|call|discussion|session)\b/i
  ],

  [INTENTS.PROFESSIONAL_OPPORTUNITY]: [
    /\b(professional opportunity|business opportunity|opportunity for sumit)\b/i,
    /\b(job offer|advisory role|advisor|board role|consulting opportunity)\b/i
  ],

  [INTENTS.ABOUT_SUMIT]: [
    /\b(who is sumit|about sumit|tell me about sumit|sumit waghmare)\b/i,
    /\b(sumit's|sumit('s)?\s+(work|background|experience|career|companies|journey|role))\b/i
  ]
};

const CONTEXTUAL_FOLLOW_UP_PATTERNS = [
  /^(yes|yeah|yep|sure|okay|ok|correct|right|exactly|that'?s right)$/i,
  /^(it is|it's|the event is|the organization is|the organization was|we are|i am|i'm)\b/i,
  /^(on|at|in|from|for|with|during|around)\b/i,
  /^(our|my|the)\s+(college|university|company|organization|event|hackathon)\b/i
];

function normalizeText(text) {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function matchesAny(text, patterns) {
  return patterns.some((pattern) => pattern.test(text));
}

function detectVisitorType(text) {
  const normalized = normalizeText(text);

  const scores = Object.fromEntries(
    Object.values(VISITOR_TYPES).map((type) => [type, 0])
  );

  for (const [type, patterns] of Object.entries(VISITOR_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(normalized)) {
        scores[type] += 1;
      }
    }
  }

  const ranked = Object.entries(scores)
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1]);

  return ranked.length > 0
    ? ranked[0][0]
    : VISITOR_TYPES.GENERAL;
}

function detectIntent(text) {
  const normalized = normalizeText(text);

  const scores = Object.fromEntries(
    Object.values(INTENTS).map((intent) => [intent, 0])
  );

  for (const [intent, patterns] of Object.entries(INTENT_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(normalized)) {
        scores[intent] += 1;
      }
    }
  }

  const ranked = Object.entries(scores)
    .filter(([, score]) => score > 0)
    .sort((a, b) => b[1] - a[1]);

  return ranked.length > 0
    ? ranked[0][0]
    : INTENTS.GENERAL_ENQUIRY;
}

function extractEntities(text) {
  const normalized = text.trim();

  const entities = {};

  const institutionMatch = normalized.match(
    /\b(?:at|from|of|with)\s+([A-Z][A-Za-z0-9&.'-]*(?:\s+[A-Z][A-Za-z0-9&.'-]*){0,6})\s+(?:University|College|Institute|School)\b/
  );

  if (institutionMatch) {
    entities.institution = institutionMatch[0].trim();
  }

  const organizationMatch = normalized.match(
    /\b(?:at|from|with|representing)\s+([A-Z][A-Za-z0-9&.'-]*(?:\s+[A-Z][A-Za-z0-9&.'-]*){0,6})\b/
  );

  if (organizationMatch && !entities.institution) {
    entities.organization = organizationMatch[1].trim();
  }

  const eventMatch = normalized.match(
    /\b(?:event|hackathon|conference|summit|seminar|workshop)\s+(?:called|named|is)?\s*["']?([^"',.!?]+)["']?/i
  );

  if (eventMatch) {
    entities.eventName = eventMatch[1].trim();
  }

  const dateMatch = normalized.match(
    /\b(?:on|from|scheduled for|taking place on)\s+([^,.!?]+(?:\d{1,2}|\d{4})[^,.!?]*)/i
  );

  if (dateMatch) {
    entities.eventDate = dateMatch[1].trim();
  }

  return entities;
}

function mergeEntities(previous, incoming) {
  return {
    ...(previous || {}),
    ...(incoming || {})
  };
}

function calculateMissingFields(intent, collectedInformation) {
  const requiredFields =
    REQUIRED_FIELDS[intent] ||
    REQUIRED_FIELDS[INTENTS.GENERAL_ENQUIRY];

  return requiredFields.filter(
    (field) =>
      !collectedInformation ||
      collectedInformation[field] === undefined ||
      collectedInformation[field] === null ||
      String(collectedInformation[field]).trim() === ""
  );
}

function createInitialState() {
  return {
    visitorType: VISITOR_TYPES.GENERAL,
    intent: INTENTS.GENERAL_ENQUIRY,
    stage: "identify_context",
    collectedInformation: {},
    missingInformation: ["purpose"],
    nextQuestion: FIELD_QUESTIONS.purpose,
    isComplete: false
  };
}

function updateConversationState({
  message,
  previousState = null
}) {
  const currentState =
    previousState || createInitialState();

  const normalizedMessage = normalizeText(message);

  const isContextualFollowUp =
    matchesAny(
      normalizedMessage,
      CONTEXTUAL_FOLLOW_UP_PATTERNS
    );

  const detectedVisitorType = detectVisitorType(message);
  const detectedIntent = detectIntent(message);

  const visitorType =
    isContextualFollowUp &&
    currentState.visitorType !== VISITOR_TYPES.GENERAL
      ? currentState.visitorType
      : detectedVisitorType !== VISITOR_TYPES.GENERAL
        ? detectedVisitorType
        : currentState.visitorType;

  const intent =
    isContextualFollowUp &&
    currentState.intent !== INTENTS.GENERAL_ENQUIRY
      ? currentState.intent
      : detectedIntent !== INTENTS.GENERAL_ENQUIRY
        ? detectedIntent
        : currentState.intent;

  const extractedEntities = extractEntities(message);

  const collectedInformation = mergeEntities(
    currentState.collectedInformation,
    extractedEntities
  );

  if (
    !collectedInformation.purpose &&
    intent === INTENTS.GENERAL_ENQUIRY &&
    normalizedMessage.length > 10
  ) {
    collectedInformation.purpose = message.trim();
  }

  const missingInformation = calculateMissingFields(
    intent,
    collectedInformation
  );

  const isComplete = missingInformation.length === 0;

  const nextQuestion =
    !isComplete && missingInformation[0]
      ? FIELD_QUESTIONS[missingInformation[0]]
      : null;

  return {
    visitorType,
    intent,
    stage: isComplete
      ? "ready"
      : "collecting_information",
    collectedInformation,
    missingInformation,
    nextQuestion,
    isComplete
  };
}

function buildConversationContext(state) {
  if (!state) {
    return {
      visitorType: VISITOR_TYPES.GENERAL,
      intent: INTENTS.GENERAL_ENQUIRY,
      stage: "identify_context",
      collectedInformation: {},
      missingInformation: ["purpose"],
      isComplete: false
    };
  }

  return {
    visitorType: state.visitorType,
    intent: state.intent,
    stage: state.stage,
    collectedInformation: state.collectedInformation || {},
    missingInformation: state.missingInformation || [],
    isComplete: Boolean(state.isComplete)
  };
}

function getNextQuestion(state) {
  if (!state || state.isComplete) {
    return null;
  }

  return state.nextQuestion || null;
}

export {
  VISITOR_TYPES,
  INTENTS,
  REQUIRED_FIELDS,
  createInitialState,
  detectVisitorType,
  detectIntent,
  extractEntities,
  updateConversationState,
  buildConversationContext,
  getNextQuestion
};