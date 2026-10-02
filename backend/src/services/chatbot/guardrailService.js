const MAX_TEXT_LENGTH = 4000;

const GUARDRAIL_RESPONSE =
  "I can help with professional enquiries involving Sumit Waghmare, including mentorship, career guidance, business opportunities, partnerships, collaborations, institutional engagements, speaking opportunities, events and related professional matters. Please provide a little more context about your enquiry.";

const LENGTH_RESPONSE =
  "Please shorten your enquiry and provide the key details relevant to your request.";

const TECHNICAL_OUT_OF_SCOPE_RESPONSE =
  "I am unable to assist with general programming, coding, technical problem-solving or unrelated technical questions. I can, however, help with professional enquiries involving Sumit Waghmare.";

const GENERAL_OUT_OF_SCOPE_RESPONSE =
  "I am designed to assist with professional enquiries involving Sumit Waghmare and his professional activities. Please provide a request related to that context.";

const TECHNICAL_REQUEST_PATTERNS = [
  /*
   * Direct programming requests
   */
  /\b(write|write me|generate|create|implement|code|coding|program|programming|debug|debugging|compile|refactor)\b.*\b(code|program|function|script|class|method|algorithm|solution|component|application|app)\b/i,

  /\b(give|provide|show)\s+(me\s+)?\b.*\b(code|source code|implementation|script|function|solution)\b/i,

  /\bhow\s+(do|can)\s+i\b.*\b(code|implement|program|build|debug|compile|configure)\b/i,

  /\bhow\s+to\b.*\b(code|implement|program|build|debug|compile|configure)\b/i,

  /*
   * Programming-language questions
   */
  /\b(what\s+is|what's|explain|teach\s+me|how\s+does|how\s+do)\b.*\b(python|javascript|typescript|java|c\+\+|c#|rust|golang|php|ruby|kotlin|swift|scala|dart)\b/i,

  /*
   * Framework / library questions
   */
  /\b(what\s+is|what's|explain|teach\s+me|how\s+does|how\s+do)\b.*\b(react|reactjs|next\.?js|vue|angular|svelte|node\.?js|express|django|flask|fastapi|spring boot|laravel|rails)\b/i,

  /*
   * Algorithm / data-structure questions
   */
  /\b(solve|solve\s+this|solve\s+the|help\s+(me\s+)?solve)\b.*\b(coding|programming|algorithm|leetcode|problem)\b/i,

  /\b(what\s+is|what's|explain|teach\s+me|how\s+does|how\s+do)\b.*\b(algorithm|data structure|recursion|api|regex|big[\s-]?o|time complexity|space complexity)\b/i,

  /*
   * Explicit algorithm implementation
   */
  /\b(binary search|linear search|bubble sort|quick sort|quicksort|merge sort|mergesort|insertion sort|selection sort|heap sort|sorting algorithm|search algorithm)\b.*\b(implement|code|write|solve|program|function)\b/i,

  /*
   * Technical problem statements
   */
  /\b(reverse|sort|search|traverse|iterate|remove duplicates|find maximum|find minimum|find the maximum|find the minimum)\b.*\b(array|list|tree|graph|elements?|values?)\b/i,

  /*
   * Coding platforms
   */
  /\b(leetcode|codeforces|hackerrank|competitive programming|coding challenge|coding problem)\b/i,

  /*
   * Technical implementation artifacts
   */
  /\b(api endpoint|rest api|graphql|database schema|sql query|regex|regular expression|git command|github action|dockerfile|docker compose)\b.*\b(write|create|generate|implement|code|build|debug|solve)\b/i,

  /*
   * Language + implementation request
   */
  /\b(python|javascript|typescript|java|c\+\+|c#|rust|golang|php|ruby|kotlin|swift|scala|dart)\b.*\b(code|program|script|function|class|algorithm|implement|debug|solve|build)\b/i,

  /*
   * Framework + implementation request
   */
  /\b(react|reactjs|next\.?js|vue|angular|svelte|node\.?js|express|django|flask|fastapi|spring boot|laravel|rails)\b.*\b(code|component|implementation|implement|debug|build|create|generate)\b/i,

  /*
   * Direct code-output requests
   */
  /\b(write|generate|create|give|provide|show)\b.*\b(function|class|component|script|program|code snippet|source code)\b/i
];

const TECHNICAL_SUBJECT_PATTERNS = [
  /*
   * Algorithms
   */
  /\b(binary search|linear search|bubble sort|quick sort|quicksort|merge sort|mergesort|insertion sort|selection sort|heap sort|sorting algorithm|search algorithm|algorithm)\b/i,

  /*
   * Data structures
   */
  /\b(array|arrays|linked list|linked lists|stack|stacks|queue|queues|tree|trees|binary tree|graph|graphs|heap|hashmap|hash map|hash table|data structure|data structures)\b/i,

  /*
   * Computer science concepts
   */
  /\b(time complexity|space complexity|big[\s-]?o|runtime complexity|recursion)\b/i,

  /*
   * Coding platforms / competitions
   */
  /\b(leetcode|codeforces|hackerrank|competitive programming|coding challenge|coding problem)\b/i
];

const GENERAL_OUT_OF_SCOPE_PATTERNS = [
  /\b(math|mathematics|calculus|algebra|trigonometry|geometry|statistics)\b/i,

  /\b(physics|chemistry|biology|astronomy|geology)\b/i,

  /\b(homework|assignment|exam question|exam preparation|study plan)\b/i,

  /\b(stock price|share price|stock market|share market|crypto|cryptocurrency|bitcoin|ethereum|forex|trading)\b/i,

  /\b(weather|temperature forecast|weather forecast|rain forecast|humidity forecast)\b/i,

  /\b(news|current events|politics|political|election|elections|political party|government policy)\b/i,

  /\b(recipe|recipes|cooking)\b/i,

  /\b(movie|movies|film|films|tv show|tv shows|television)\b/i,

  /\b(song|songs|lyrics|music recommendation)\b/i,

  /\b(game|games|gaming|videogame|video game)\b/i,

  /\b(translate this|translation|grammar correction)\b/i,

  /\b(write me an essay|write an essay|creative writing)\b/i,

  /\b(write a poem|write me a poem|write a story|write me a story)\b/i,

  /\b(joke|jokes|riddle|riddles|poem|poetry)\b/i
];

const PROFESSIONAL_CONTEXT_PATTERNS = [
  /\b(sumit|sumit waghmare|teamsumit|team sumit)\b/i,

  /\b(mentor|mentorship|mentoring|guidance|career guidance|career advice)\b/i,

  /\b(partnership|partnerships|partner|partners|collaboration|collaborate|collaborating)\b/i,

  /\b(sponsor|sponsorship|sponsorships)\b/i,

  /\b(hackathon|hackathons|judge|judging|jury|juries)\b/i,

  /\b(keynote|speaker|speaking|speech|conference|seminar|summit|webinar)\b/i,

  /\b(workshop|workshops|training|masterclass|lecture)\b/i,

  /\b(event|events|institution|institutional|college|university|faculty|professor|academic)\b/i,

  /\b(meeting|meet|connect|call|discussion|appointment|schedule|book)\b/i,

  /\b(project|projects|proposal|proposals|opportunity|opportunities)\b/i,

  /\b(company|companies|business|businesses|startup|startups|enterprise|enterprises)\b/i,

  /\b(career|job|jobs|internship|internships|professional|founder|entrepreneur)\b/i,

  /\b(SuPrazo|SuPrazo Technologies|CodeElevate|CodeElevate Academy|SuPrathon|SuPrathon Community)\b/i
];

/*
 * Strong professional intent means the user is genuinely
 * trying to engage Sumit or an associated organization
 * professionally.
 */
const STRONG_PROFESSIONAL_PATTERNS = [
  /\b(invite|invitation)\b.*\b(sumit|speaker|judge|keynote|workshop|event)\b/i,

  /\b(sumit)\b.*\b(judge|judging|jury|speaker|speaking|keynote|workshop|mentor|mentorship|meeting|partner|partnership|collaboration)\b/i,

  /\b(would like|would love|want|wants|interested|looking)\b.*\b(work with|collaborate|partner|meet|connect|invite|engage)\b/i,

  /\b(partnership|collaboration|project|meeting|professional opportunity)\b.*\b(with sumit|with teamsumit|with suprazo|with codeelevate|with suprathon)\b/i,

  /\b(college|university|institution|company|organization|organisation)\b.*\b(invite|partner|collaborate|engage|host|organize|organise)\b/i,

  /\b(hackathon|conference|seminar|summit|workshop|event)\b.*\b(judge|speaker|keynote|invite|host|conduct|organize|organise)\b/i,

  /\b(workshop|seminar|conference|event|hackathon)\b.*\b(for|at|with)\b.*\b(student|students|college|university|company|organization|organisation|institution)\b/i
];

const MANIPULATION_PATTERNS = [
  {
    name: "instruction_override",
    weight: 10,
    pattern:
      /\b(ignore|disregard|forget|override|bypass|cancel)\s+(all\s+)?(of\s+)?(your\s+|the\s+)?(previous|prior|above|original)\s+(instructions|rules|constraints|directions)\b/i
  },

  {
    name: "system_prompt_extraction",
    weight: 10,
    pattern:
      /\b(reveal|show|display|print|provide|give|tell me|expose)\s+(me\s+)?(your\s+)?(system|hidden|secret|internal)\s+(prompt|instructions|rules|message)\b/i
  },

  {
    name: "prompt_extraction",
    weight: 9,
    pattern:
      /\b(what\s+(are|is)|tell\s+me|show\s+me|give\s+me)\s+(your\s+)?(hidden|internal|secret)\s+(instructions|prompt|rules)\b/i
  },

  {
    name: "developer_mode",
    weight: 9,
    pattern:
      /\b(developer\s+mode|dev\s+mode|debug\s+mode|admin\s+mode|root\s+mode)\b/i
  },

  {
    name: "unrestricted_mode",
    weight: 10,
    pattern:
      /\b(unrestricted\s+mode|unfiltered\s+mode|uncensored\s+mode|no\s+restrictions|without\s+restrictions)\b/i
  },

  {
    name: "jailbreak",
    weight: 10,
    pattern:
      /\b(jailbreak|jailbroken|bypass\s+guardrails?|bypass\s+safety)\b/i
  },

  {
    name: "role_override",
    weight: 8,
    pattern:
      /\b(you\s+are\s+now|from\s+now\s+on\s+you\s+are|pretend\s+you\s+are|act\s+as)\s+(an?\s+)?(unrestricted|unfiltered|different|new)\s+(assistant|ai|model|system)\b/i
  },

  {
    name: "identity_override",
    weight: 8,
    pattern:
      /\b(you\s+are\s+not\s+the|you\s+are\s+no\s+longer\s+the|stop\s+being\s+the)\s+(teamsumit|executive|assistant|chatbot)\b/i
  },

  {
    name: "instruction_injection",
    weight: 8,
    pattern:
      /\b(new\s+system\s+prompt|new\s+instructions|new\s+rules|replacement\s+instructions|replacement\s+system\s+message)\b/i
  },

  {
    name: "authority_claim",
    weight: 8,
    pattern:
      /\b(i\s+am|i'm|i\s+work\s+as|i\s+work\s+for|the)\s+(the\s+)?(administrator|admin|developer|owner|system\s+administrator|system\s+developer)\b/i
  },

  {
    name: "authorization_claim",
    weight: 8,
    pattern:
      /\b(i\s+am|i'm|i\s+have|i\s+was)\s+(fully\s+)?(authorized|authorised|approved|permitted|given\s+permission)\b/i
  },

  {
    name: "permission_bypass",
    weight: 8,
    pattern:
      /\b(i\s+have\s+permission|i\s+am\s+authorized|i\s+am\s+authorised|you\s+have\s+permission|you\s+are\s+authorized|you\s+are\s+authorised)\s+to\s+(bypass|ignore|override|reveal|expose|disclose)\b/i
  },

  {
    name: "prompt_repeat",
    weight: 9,
    pattern:
      /\b(repeat|reproduce|recite|copy)\s+(your\s+)?(entire\s+)?(system\s+prompt|hidden\s+instructions|internal\s+instructions)\b/i
  },

  {
    name: "prompt_encoding",
    weight: 8,
    pattern:
      /\b(encode|decode|translate|convert)\s+(your\s+)?(system|hidden|secret|internal)\s+(prompt|instructions)\b/i
  },

  {
    name: "prompt_boundary_injection",
    weight: 8,
    pattern:
      /(<\s*(system|developer|instruction|assistant)\s*>|<\/\s*(system|developer|instruction|assistant)\s*>|###\s*(system|developer|instruction)|BEGIN\s+(SYSTEM|DEVELOPER)\s+(PROMPT|MESSAGE)|END\s+(SYSTEM|DEVELOPER)\s+(PROMPT|MESSAGE))/i
  },

  {
    name: "role_marker_injection",
    weight: 7,
    pattern:
      /\b(system|developer|assistant)\s*:\s*(ignore|override|reveal|follow|execute)\b/i
  },

  {
    name: "fake_tool_authority",
    weight: 7,
    pattern:
      /\b(tool|function|api|backend)\s+(call|instruction|command)\s*:\s*/i
  },

  {
    name: "secret_extraction",
    weight: 10,
    pattern:
      /\b(reveal|show|give|print|display|provide|tell me)\s+(the\s+)?(api\s*key|secret|token|password|credentials?|secrets?)\b/i
  },

  {
    name: "environment_variable_extraction",
    weight: 10,
    pattern:
      /\b(reveal|show|give|print|display|provide|list|tell me)\b.*\b(environment\s+variables?|env\s+variables?|process\.env|dotenv|\.env)\b/i
  },

  {
    name: "internal_file_extraction",
    weight: 8,
    pattern:
      /\b(show|reveal|print|give|list|display|provide)\s+(your\s+)?(internal\s+files?|source\s+files?|server\s+files?|backend\s+files?|configuration\s+files?|config\s+files?)\b/i
  },

  {
    name: "backend_information_extraction",
    weight: 8,
    pattern:
      /\b(show|reveal|print|give|list|display|provide|explain|describe)\b.*\b(backend|server|server-side|internal\s+architecture|backend\s+architecture|server\s+architecture|internal\s+implementation|implementation\s+details)\b/i
  },

  {
    name: "guardrail_extraction",
    weight: 9,
    pattern:
      /\b(show|reveal|explain|list|describe)\s+(your\s+)?(guardrails?|filters?|security\s+rules?|blocking\s+rules?)\b/i
  }
];

function normalizeText(text) {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactText(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9+#]+/g, "")
    .trim();
}

function matchesAnyPattern(text, patterns) {
  return patterns.some((pattern) =>
    pattern.test(text)
  );
}

function calculateManipulationScore(text) {
  const normalized = normalizeText(text);
  const compact = compactText(text);

  let score = 0;
  const matchedSignals = [];

  for (const signal of MANIPULATION_PATTERNS) {
    if (signal.pattern.test(normalized)) {
      score += signal.weight;
      matchedSignals.push(signal.name);
    }
  }

  if (
    compact.includes("ignorepreviousinstructions") ||
    compact.includes("disregardpreviousinstructions") ||
    compact.includes("ignoreallpreviousinstructions")
  ) {
    score += 10;
    matchedSignals.push(
      "compact_instruction_override"
    );
  }

  if (
    compact.includes("revealyoursystemprompt") ||
    compact.includes("showyoursystemprompt") ||
    compact.includes("revealyourhiddeninstructions")
  ) {
    score += 10;
    matchedSignals.push(
      "compact_prompt_extraction"
    );
  }

  const instructionMarkers = [
    "system",
    "developer",
    "instruction",
    "instructions",
    "prompt",
    "override",
    "bypass",
    "jailbreak"
  ];

  const markerCount =
    instructionMarkers.filter((marker) =>
      normalized.includes(marker)
    ).length;

  if (markerCount >= 3) {
    score += 5;
    matchedSignals.push(
      "multiple_instruction_markers"
    );
  }

  return {
    score,
    matchedSignals
  };
}

function hasProfessionalContext(text) {
  return matchesAnyPattern(
    normalizeText(text),
    PROFESSIONAL_CONTEXT_PATTERNS
  );
}

function hasStrongProfessionalIntent(text) {
  return matchesAnyPattern(
    normalizeText(text),
    STRONG_PROFESSIONAL_PATTERNS
  );
}

function matchesTechnicalRequest(text) {
  return matchesAnyPattern(
    normalizeText(text),
    TECHNICAL_REQUEST_PATTERNS
  );
}

function matchesTechnicalSubject(text) {
  return matchesAnyPattern(
    normalizeText(text),
    TECHNICAL_SUBJECT_PATTERNS
  );
}

function matchesGeneralOutOfScopeIntent(text) {
  return matchesAnyPattern(
    normalizeText(text),
    GENERAL_OUT_OF_SCOPE_PATTERNS
  );
}

export function evaluateMessage({
  message,
  messages = []
}) {
  if (
    typeof message !== "string" ||
    !message.trim()
  ) {
    return {
      allowed: false,
      reason: "empty",
      response: GUARDRAIL_RESPONSE
    };
  }

  const normalized = normalizeText(message);

  if (normalized.length > MAX_TEXT_LENGTH) {
    return {
      allowed: false,
      reason: "length",
      response: LENGTH_RESPONSE
    };
  }

  /*
   * SECURITY ALWAYS COMES FIRST.
   */

  const manipulation =
    calculateManipulationScore(normalized);

  if (manipulation.score >= 8) {
    return {
      allowed: false,
      reason: "manipulation_detected",
      response: GUARDRAIL_RESPONSE,
      security: {
        score: manipulation.score,
        signals: manipulation.matchedSignals
      }
    };
  }

  const professionalContext =
    hasProfessionalContext(normalized);

  const strongProfessionalIntent =
    hasStrongProfessionalIntent(normalized);

  const technicalRequest =
    matchesTechnicalRequest(normalized);

  const technicalSubject =
    matchesTechnicalSubject(normalized);

  const generalOutOfScope =
    matchesGeneralOutOfScopeIntent(normalized);

  /*
   * An actual technical request is blocked unless
   * the message clearly represents a legitimate
   * professional engagement.
   *
   * Example:
   *
   * "Write Python code for me."
   * → BLOCK
   *
   * "I'm contacting Sumit. Write Python code for me."
   * → BLOCK
   *
   * "Can Sumit conduct a Python workshop?"
   * → ALLOW
   */

  if (
    technicalRequest &&
    !strongProfessionalIntent
  ) {
    return {
      allowed: false,
      reason: "technical_out_of_scope",
      response:
        TECHNICAL_OUT_OF_SCOPE_RESPONSE
    };
  }

  /*
   * A standalone technical subject is also outside
   * the assistant's scope unless there is a clear
   * professional reason for mentioning it.
   *
   * Example:
   *
   * "Bubble sort"
   * → BLOCK
   *
   * "Can Sumit conduct a workshop on bubble sort?"
   * → ALLOW
   */

  if (
    technicalSubject &&
    !strongProfessionalIntent
  ) {
    return {
      allowed: false,
      reason: "technical_out_of_scope",
      response:
        TECHNICAL_OUT_OF_SCOPE_RESPONSE
    };
  }

  /*
   * Broad unrelated subjects are blocked when there
   * is no professional context.
   */

  if (
    generalOutOfScope &&
    !professionalContext
  ) {
    return {
      allowed: false,
      reason: "out_of_scope",
      response:
        GENERAL_OUT_OF_SCOPE_RESPONSE
    };
  }

  return {
    allowed: true,
    reason: "safe_for_routing",
    context: {
      professionalContext,
      strongProfessionalIntent
    }
  };
}

export function getGuardrailMetadata({
  message,
  messages = []
}) {
  const result = evaluateMessage({
    message,
    messages
  });

  return {
    allowed: result.allowed,
    reason: result.reason,
    security: result.security || null,
    context: result.context || null
  };
}