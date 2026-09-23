/**
 * Institutional Proposal Generator — adapted for 3-role model
 * ---------------------------------------------------------------------
 * Generates a structured proposal object and plain-text export for
 * College/University and Industry engagements. Frontend-only, in-memory.
 * Student role does not get a formal proposal (no institution involved).
 * ---------------------------------------------------------------------
 */

import { REASONS, ROLE_LABELS } from '../intake/constants.js';

export const DESTINATION_EMAIL = 'sumitwaghmare645@gmail.com';

export function generateProposalRef(entityName = 'INST') {
  const year = new Date().getFullYear();
  const cleanName = (entityName || 'INST').replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  const prefix = cleanName.slice(0, 4).padEnd(4, 'X');
  const numHash = Math.abs(
    cleanName.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 1), 101)
  ) % 9000 + 1000;

  return `TS-PROP-${year}-${prefix}-${numHash}`;
}

function reasonLabel(role, reasonValue) {
  return REASONS[role]?.find((r) => r.value === reasonValue)?.label || 'General Engagement';
}

function getCollegeDeliverables(reason) {
  switch (reason) {
    case 'guest-lecture':
      return [
        'Interactive keynote/masterclass by Sumit Sir on emerging tech & AI.',
        'Live Q&A with students on technology trends and career roadmaps.',
      ];
    case 'curriculum':
      return [
        'Industry-academia curriculum review to identify syllabus gaps.',
        'Recommendations on emerging tech stacks and practical assignments.',
      ];
    case 'incubation':
      return [
        'Mentorship sessions for the institution\'s incubation cell.',
        'Guidance on venture stage progression and founder support structures.',
      ];
    case 'faculty-dev':
      return [
        'Faculty development workshop on current industry practices.',
        'Hands-on session materials for participating faculty.',
      ];
    default:
      return [
        'Institutional technical session customized to academic objectives.',
        'Industry-oriented knowledge sharing and career insights.',
      ];
  }
}

function getIndustryDeliverables(reason) {
  switch (reason) {
    case 'corporate-training':
      return [
        'Structured corporate training / leadership workshop delivery.',
        'Project-based evaluations with feedback for participants.',
      ];
    case 'speaking':
      return [
        'Speaking engagement at the specified company event.',
        'Audience Q&A and takeaway resources for attendees.',
      ];
    case 'consulting':
      return [
        'Technical requirement analysis and architecture roadmap.',
        'Technology stack evaluation and integration strategy.',
      ];
    case 'hiring':
      return [
        'Campus hiring / talent pipeline partnership scoping.',
        'Coordination support for recruitment drives.',
      ];
    default:
      return [
        'Custom engagement scoped to organizational objectives.',
        'Follow-up discovery call to finalize deliverables.',
      ];
  }
}

export const TECHNICAL_PREREQUISITES = [
  'High-Definition projector or LED display with HDMI input.',
  'Collar microphone / cordless mic and sound system (for in-person sessions).',
  'Stable, high-speed Wi-Fi access for live demonstrations.',
  'Designated coordinator for event logistics.',
];

/**
 * Builds a proposal object from the new answers shape: { reason, details, contact }
 */
export function buildProposalData(role, answers = {}) {
  const { reason, details = {}, contact = {} } = answers;
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const reasonTitle = reasonLabel(role, reason);
  const roleTitle = ROLE_LABELS[role] || 'General';

  const entityName = details.institutionName || details.companyName || contact.name || 'Partner';

  const deliverables =
    role === 'college' ? getCollegeDeliverables(reason)
    : role === 'industry' ? getIndustryDeliverables(reason)
    : ['Session/mentorship scoped directly with the individual.'];

  return {
    refCode: generateProposalRef(entityName),
    issueDate: today,
    role,
    title: `${roleTitle} Engagement Proposal — ${reasonTitle}`,
    recipient: {
      name: contact.name || 'N/A',
      designation: details.designation || roleTitle,
      institution: details.institutionName || details.companyName || 'N/A',
      location: details.city || 'N/A',
      email: contact.email || '—',
      phone: contact.phone || '—',
    },
    speaker: {
      name: 'Sumit Sir (Sumit Waghmare)',
      title: 'Tech Speaker, AI/ML Specialist, & Ecosystem Builder',
      organizations: [
        'SuPrazo Technologies (Founder & Principal Architect)',
        'CodeElevate Academy (Founder & Lead Mentor)',
        'SuPrathon Community (Convener & Hackathon Lead)',
      ],
      contactEmail: DESTINATION_EMAIL,
    },
    event: {
      eventName: details.eventName || reasonTitle,
      engagementType: reasonTitle,
      eventDate: details.preferredDate || details.eventDate || 'Mutually Agreed Schedule',
      format: 'On-Campus / Remote (TBD)',
      audience: details.audienceSize || details.teamSize || 'TBD',
      additionalNotes: details.topic || details.scope || details.challenge || details.details || 'None provided',
    },
    deliverables,
    prerequisites: TECHNICAL_PREREQUISITES,
    commercials: {
      summary: 'Commercial / Honorarium Terms',
      note: 'Pricing, honorarium, and logistics are scope-dependent and finalized directly with the team. Placeholder: ₹[ADD AMOUNT].',
    },
  };
}

export function formatProposalMarkdown(proposal) {
  if (!proposal) return '';

  return `========================================================================
TEAMSUMIT & SUPRAZO TECHNOLOGIES
OFFICIAL ENGAGEMENT PROPOSAL
Reference: ${proposal.refCode} | Date: ${proposal.issueDate}
========================================================================

1. RECIPIENT INFORMATION
------------------------------------------------------------------------
Institution/Company: ${proposal.recipient.institution}
Recipient:   ${proposal.recipient.name} (${proposal.recipient.designation})
Location:    ${proposal.recipient.location}
Contact:     ${proposal.recipient.email} | ${proposal.recipient.phone}

2. SPEAKER / RESOURCE PROFILE
------------------------------------------------------------------------
Speaker:       ${proposal.speaker.name}
Role:          ${proposal.speaker.title}
Affiliations:  ${proposal.speaker.organizations.join('; ')}
Official Mail: ${proposal.speaker.contactEmail}

3. PROGRAM SPECIFICATIONS
------------------------------------------------------------------------
Program Name:    ${proposal.event.eventName}
Engagement Type: ${proposal.event.engagementType}
Schedule / Date: ${proposal.event.eventDate}
Delivery Format: ${proposal.event.format}
Expected Batch:  ${proposal.event.audience}
Specific Notes:  ${proposal.event.additionalNotes}

4. KEY DELIVERABLES & OUTCOMES
------------------------------------------------------------------------
${proposal.deliverables.map((item, i) => `[${i + 1}] ${item}`).join('\n')}

5. TECHNICAL PREREQUISITES & LOGISTICS
------------------------------------------------------------------------
${proposal.prerequisites.map((item) => `- ${item}`).join('\n')}

6. COMMERCIAL & HONORARIUM TERMS
------------------------------------------------------------------------
${proposal.commercials.summary}:
${proposal.commercials.note}

7. FORMAL SIGN-OFF & COORDINATION
------------------------------------------------------------------------
Issued on behalf of: TeamSumit & SuPrazo Technologies
Inquiries & Confirmations: ${DESTINATION_EMAIL}
* Note: This preliminary document is prepared for internal review and
  planning purposes. Non-binding until confirmed by both parties.
========================================================================`;
}