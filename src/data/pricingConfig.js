/**
 * Pricing & Engagement Configuration — aligned to 3-role model
 * ---------------------------------------------------------------------
 * STRICT GOVERNANCE RULE: No invented final prices. All commercial terms
 * are "To be discussed", "Scope-dependent", "Honorarium", or "Free".
 * ---------------------------------------------------------------------
 */

export const PRICING_DISCLAIMER =
  'Commercial terms, honorariums, and project scopes are indicative and established mutually based on institutional guidelines, non-profit or student status, cohort size, and custom technical requirements. TeamSumit does not charge hidden fees or process online payments.';

export const PRICING_AUDIENCES = [
  {
    id: 'college',
    label: 'Colleges & Universities',
    role: 'college',
    badge: 'Campus Programs',
    description: 'High-impact technical keynotes, curriculum support, and campus hackathon partnerships.',
    tiers: [
      {
        id: 'college-keynote',
        name: 'Campus Keynote / Guest Lecture',
        badge: 'High Impact',
        isPopular: true,
        priceDisplay: 'Honorarium',
        priceSubtext: 'Per Institutional Guidelines',
        summary: 'Inspiring keynote address for university symposiums, orientations, or tech fests.',
        deliverables: [
          'Keynote session by Sumit Sir on Emerging Tech, AI, & Career Horizons',
          'Interactive Q&A forum with students and department faculty',
          'Pre-event coordination with student organizing committee',
        ],
        ctaText: 'Invite Sumit Sir',
        preselect: { reason: 'guest-lecture' },
      },
      {
        id: 'college-curriculum',
        name: 'Curriculum Design Support',
        badge: 'Advisory',
        isPopular: false,
        priceDisplay: 'To be discussed',
        priceSubtext: 'Scope Dependent',
        summary: 'Industry-academia curriculum review and syllabus modernization.',
        deliverables: [
          'Syllabus gap analysis against current industry practice',
          'Recommendations for emerging tech stacks and lab assignments',
        ],
        ctaText: 'Request Curriculum Support',
        preselect: { reason: 'curriculum' },
      },
      {
        id: 'college-fdp',
        name: 'Faculty Development Workshop',
        badge: 'Intensive',
        isPopular: false,
        priceDisplay: 'To be discussed',
        priceSubtext: 'Batch & Duration Dependent',
        summary: 'Hands-on faculty development program on current industry practices.',
        deliverables: [
          'Full-day practical sessions for participating faculty',
          'Institutional engagement proposal document provided',
        ],
        ctaText: 'Request FDP',
        preselect: { reason: 'faculty-dev' },
      },
    ],
  },
  {
    id: 'student',
    label: 'Students & Learners',
    role: 'student',
    badge: 'CodeElevate & Community',
    description: 'Real-world skills, industry roadmaps, and career mentorship for students.',
    tiers: [
      {
        id: 'student-career',
        name: 'Career Guidance Session',
        badge: 'Most Popular',
        isPopular: true,
        priceDisplay: '₹[ADD AMOUNT]',
        priceSubtext: 'Per Session',
        summary: 'Personalized 1:1 career guidance and roadmap planning.',
        deliverables: [
          'Personalized 1:1 consultation session with Sumit Sir',
          'Detailed career pathway and tech stack audit',
        ],
        ctaText: 'Book Career Guidance',
        preselect: { reason: 'career-guidance' },
      },
      {
        id: 'student-idea',
        name: 'Startup Idea Validation',
        badge: 'Early Stage',
        isPopular: false,
        priceDisplay: 'To be discussed',
        priceSubtext: 'Scope Dependent',
        summary: 'Feedback and validation for early-stage student startup ideas.',
        deliverables: [
          'Idea/venture stage review and honest feedback',
          'Guidance on next steps and resources',
        ],
        ctaText: 'Get Idea Feedback',
        preselect: { reason: 'idea-validation' },
      },
      {
        id: 'student-resume',
        name: 'Resume & Interview Prep',
        badge: 'Placement Ready',
        isPopular: false,
        priceDisplay: 'To be discussed',
        priceSubtext: 'Per Session',
        summary: 'Resume review and mock interview preparation.',
        deliverables: [
          'Resume review with actionable feedback',
          'Mock technical interview practice',
        ],
        ctaText: 'Book Resume Prep',
        preselect: { reason: 'resume-prep' },
      },
    ],
  },
  {
    id: 'industry',
    label: 'Industry & Enterprise',
    role: 'industry',
    badge: 'SuPrazo Technologies',
    description: 'AI-first enterprise systems, corporate training, and hiring partnerships.',
    tiers: [
      {
        id: 'industry-training',
        name: 'Corporate Training & Workshop',
        badge: 'Operational',
        isPopular: false,
        priceDisplay: 'Custom Quote',
        priceSubtext: 'Team Size & Scope Based',
        summary: 'Structured corporate training and leadership workshops.',
        deliverables: [
          'Custom curriculum aligned to team skill gaps',
          'Hands-on labs and project-based evaluation',
        ],
        ctaText: 'Request Training',
        preselect: { reason: 'corporate-training' },
      },
      {
        id: 'industry-consulting',
        name: 'Custom AI / Strategy Consulting',
        badge: 'Enterprise Grade',
        isPopular: true,
        priceDisplay: 'Custom Proposal',
        priceSubtext: 'Enterprise SLA Scope',
        summary: 'Tailored AI/ML architecture and innovation strategy consulting.',
        deliverables: [
          'Requirements discovery & NDA execution',
          'Architecture design, benchmarking, and deployment strategy',
        ],
        ctaText: 'Request Consulting Proposal',
        preselect: { reason: 'consulting' },
      },
      {
        id: 'industry-hiring',
        name: 'Campus Hiring Partnership',
        badge: 'Talent Pipeline',
        isPopular: false,
        priceDisplay: 'To be discussed',
        priceSubtext: 'Partnership Based',
        summary: 'Campus hiring and talent pipeline partnership.',
        deliverables: [
          'Coordination support for recruitment drives',
          'Access to student/campus network',
        ],
        ctaText: 'Start Hiring Partnership',
        preselect: { reason: 'hiring' },
      },
    ],
  },
];