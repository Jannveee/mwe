/**
 * src/app/api/seo/structured-data/route.js
 * ─────────────────────────────────────────────────────────────────────────
 * Returns JSON-LD structured data for TeamSumit.
 *
 * GET /api/seo/structured-data
 */

import { jsonResponse, handleOptions } from '../../../../middleware/cors.js';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://teamsumit.com/#sumit-waghmare',
      name: 'Sumit Waghmare',
      jobTitle: 'Engineering Mentor & Technology Entrepreneur',
      description:
        'Sumit Waghmare is an engineering mentor, technology entrepreneur, and industry-academia engagement specialist. He works with engineering students, colleges, universities, and industry organisations across India and globally to bridge the gap between academic learning and real-world engineering practice.',
      url: 'https://teamsumit.com',
      sameAs: [],
      knowsAbout: [
        'Engineering Mentorship',
        'Technology Career Guidance',
        'College and University Engagement',
        'Industry-Academia Collaboration',
        'Startup Incubation',
        'Software Engineering',
        'Artificial Intelligence',
        'Global Education Engagement',
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'SuPrazo Technologies',
        url: 'https://teamsumit.com',
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://teamsumit.com/#website',
      url: 'https://teamsumit.com',
      name: 'TeamSumit — Technology, Education & Venture',
      description:
        'Official portal for Sumit Waghmare — engineering mentor, guest lecturer, and technology entrepreneur. Colleges, universities, students, and industry partners can connect to request mentorship, guest lectures, faculty development workshops, corporate training, and global engagement.',
      publisher: {
        '@id': 'https://teamsumit.com/#sumit-waghmare',
      },
      inLanguage: 'en',
    },
    {
      '@type': 'Service',
      '@id': 'https://teamsumit.com/#college-engagement',
      name: 'College & University Engagement',
      description:
        'Guest lectures, faculty development workshops, curriculum design support, and startup incubation mentorship for engineering colleges and universities in India and internationally.',
      provider: {
        '@id': 'https://teamsumit.com/#sumit-waghmare',
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Place',   name: 'International / Global' },
      ],
      serviceType: 'Educational Engagement',
    },
    {
      '@type': 'Service',
      '@id': 'https://teamsumit.com/#student-mentorship',
      name: 'Individual Mentorship for Engineering Students',
      description:
        'One-on-one career guidance, startup idea validation, resume preparation, and industry networking support for engineering students.',
      provider: {
        '@id': 'https://teamsumit.com/#sumit-waghmare',
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Place',   name: 'International / Global' },
      ],
      serviceType: 'Mentorship',
    },
  ],
};

export async function OPTIONS(req) {
  return handleOptions(req);
}

export async function GET(req) {
  return jsonResponse(
    {
      success: true,
      data: STRUCTURED_DATA,
    },
    200,
    req
  );
}
