/**
 * src/app/api/seo/structured-data/route.js
 * ─────────────────────────────────────────────────────────────────────────
 * Returns JSON-LD structured data for TeamSumit.
 *
 * GET /api/seo/structured-data
 *
 * ── Schema.org graph (4 nodes — count is asserted by regression-check.js) ──
 *  Node 1: Person       — Sumit Waghmare
 *  Node 2: WebSite      — teamsumit.com
 *  Node 3: Service      — College & University Engagement
 *  Node 4: Service      — Student Mentorship & Engineering Opportunities
 *
 * IMPORTANT: Do NOT add or remove top-level @graph nodes without updating
 * the graph.length assertion in scripts/regression-check.js (SEO-1).
 */

import { jsonResponse, handleOptions } from '../../../../middleware/cors.js';

const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@graph': [
    // ── Node 1: Person ───────────────────────────────────────────────────
    {
      '@type': 'Person',
      '@id': 'https://teamsumit.com/#sumit-waghmare',
      name: 'Sumit Waghmare',

      // Primary role title; additional roles expressed via hasOccupation below.
      jobTitle: 'Director, SuPrazo Technologies',

      description:
        'Sumit Waghmare is a technology entrepreneur, engineering mentor, and the Director of SuPrazo Technologies. A world record holder recognised for organising engineering innovation events, he has delivered over 50 seminars and workshops, mentored engineering students nationally and internationally, and served as a national- and international-level judge and speaker. He works with colleges, universities, students, and industry organisations across India and globally to bridge the gap between academic learning and real-world engineering practice.',

      url: 'https://teamsumit.com',

      // Social and professional profile URLs — to be added when verified URLs are available.
      sameAs: [],

      // ── Multiple occupations / roles ────────────────────────────────────
      hasOccupation: [
        {
          '@type': 'Occupation',
          name: 'Director & Technology Entrepreneur',
          description:
            'Director of SuPrazo Technologies, leading AI-first hybrid IT solutions, custom AI/ML development, SaaS products, and technology consulting.',
        },
        {
          '@type': 'Occupation',
          name: 'Engineering Mentor & Speaker',
          description:
            'Delivers keynote sessions, masterclasses, and one-on-one mentorship to engineering students, colleges, and universities in India and internationally.',
        },
        {
          '@type': 'Occupation',
          name: 'National & International Judge',
          description:
            'Serves as a judge at national- and international-level technology competitions, hackathons, and innovation challenges.',
        },
      ],

      // ── Awards and recognitions ─────────────────────────────────────────
      award: [
        'World Record Holder',
        'One World Record',
        'India\'s Youngest Organizer',
        'India\'s Youngest Organiser of a Hackathon Event (Nagpur, Maharashtra)',
        '#1 Highest Profile Engineer across University',
        'Best Engineer Award',
        'Top Performer Award',
        'Student of the Year',
        'Entrepreneur of the Year',
        '50+ Certificates across domains',
        'National and international awards and recognitions',
        'Felicitated by RTMNU University (Vice Chancellor) for contributions to education and youth entrepreneurship',
      ],

      // ── Areas of expertise ──────────────────────────────────────────────
      // Preserves all original entries; adds manager-specified domains.
      knowsAbout: [
        'Artificial Intelligence',
        'Entrepreneurship',
        'Innovation',
        'Engineering Mentorship',
        'Technology Career Guidance',
        'College and University Engagement',
        'Industry-Academia Collaboration',
        'Startup Incubation',
        'Software Engineering',
        'Hackathon Organisation',
        'Large-scale Training Programs',
        'Innovation and Student Opportunity Cells',
        'Global Education Engagement',
      ],

      // ── Employer / venture ──────────────────────────────────────────────
      worksFor: {
        '@type': 'Organization',
        '@id': 'https://teamsumit.com/#suprazo-technologies',
        name: 'SuPrazo Technologies',
        description:
          'An AI-first hybrid IT company offering web development, application development, custom AI/ML solutions, SaaS development, business automation, and technology consulting.',
        url: 'https://teamsumit.com',
        location: {
          '@type': 'Place',
          name: 'Nagpur, Maharashtra, India',
        },
      },
    },

    // ── Node 2: WebSite ──────────────────────────────────────────────────
    {
      '@type': 'WebSite',
      '@id': 'https://teamsumit.com/#website',
      url: 'https://teamsumit.com',
      name: 'TeamSumit — Technology, Education & Venture',
      description:
        'Official portal for Sumit Waghmare — Director of SuPrazo Technologies, engineering mentor, keynote speaker, and national- and international-level judge. Colleges, universities, students, and industry partners can connect to request mentorship, guest lectures, faculty development workshops, hackathon partnerships, large-scale training programs, and global engagement.',
      publisher: {
        '@id': 'https://teamsumit.com/#sumit-waghmare',
      },
      inLanguage: 'en',
    },

    // ── Node 3: Service — College & University Engagement ────────────────
    {
      '@type': 'Service',
      '@id': 'https://teamsumit.com/#college-engagement',
      name: 'College & University Engagement',
      description:
        'Keynote sessions, guest lectures, faculty development workshops, curriculum design support, startup incubation mentorship, hackathon hosting, and Innovation & Student Opportunity Cell setup for engineering colleges and universities across India and internationally. Sumit is available as a national- and international-level judge and speaker.',
      provider: {
        '@id': 'https://teamsumit.com/#sumit-waghmare',
      },
      areaServed: [
        { '@type': 'Country', name: 'India' },
        { '@type': 'Place',   name: 'International / Global' },
      ],
      serviceType: 'Educational Engagement',
    },

    // ── Node 4: Service — Student Mentorship ─────────────────────────────
    {
      '@type': 'Service',
      '@id': 'https://teamsumit.com/#student-mentorship',
      name: 'Student Mentorship & Engineering Opportunities',
      description:
        'One-on-one career guidance, startup idea validation, resume and interview preparation, and industry networking support for engineering students. Includes access to large-scale training programs, hackathons, and student opportunity initiatives in India and internationally.',
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
