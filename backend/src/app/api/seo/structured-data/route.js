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
      name: 'Sumit Krishna Waghmare',
      alternateName: 'Sumit Waghmare',

      // Primary role title; additional roles expressed via hasOccupation below.
      jobTitle: 'Director, SuPrazo Technologies',

      description:
        'Sumit Krishna Waghmare is an Indian technology entrepreneur, mentor, hackathon organizer and International Book of Records world record holder from Nagpur, Maharashtra. He is the Director of SuPrazo Technologies and works across AI, technology, student education, entrepreneurship, mentorship and innovation.',

      url: 'https://teamsumit.com',
      image: 'https://teamsumit.com/api/images/sumitsir3.jpeg',
      email: 'sumitwaghmare645@gmail.com',
      birthDate: '2004-06-09',

      nationality: {
        '@type': 'Country',
        name: 'India',
      },

      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Nagpur',
        addressRegion: 'Maharashtra',
        addressCountry: 'IN',
      },

      // Verified social / professional profile URLs.
      sameAs: [
        'https://www.linkedin.com/in/sumit-ceo',
        'https://www.instagram.com/team_.sumit/',
      ],

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
            'Delivers keynote sessions, masterclasses, and one-on-one mentorship to engineering students, colleges, and universities in India.',
        },
        {
          '@type': 'Occupation',
          name: 'Hackathon Organizer & Judge',
          description:
            'Organizes and judges hackathons and technology innovation challenges for students and institutions across India.',
        },
      ],

      // ── Awards and recognitions ─────────────────────────────────────────
      // IBOR record achieved 13 July 2025 (not 2026).
      award: [
        'International Book of Records — Youngest to Organise Hackathon Event (13 July 2025, Nagpur, Maharashtra, India)',
        'World Record Holder — International Book of Records',
        'India\'s Youngest Organizer of a Hackathon Event',
        'Felicitated by RTMNU University (Vice Chancellor) for contributions to education and youth entrepreneurship',
        'National and international awards and recognitions',
        '50+ Certificates across domains',
      ],

      // ── Areas of expertise ──────────────────────────────────────────────
      knowsAbout: [
        'Artificial Intelligence',
        'Generative AI',
        'AI Tools',
        'AI Education',
        'Entrepreneurship',
        'Innovation',
        'Engineering Mentorship',
        'Student Mentorship',
        'Technology Career Guidance',
        'College and University Engagement',
        'Industry-Academia Collaboration',
        'Startup Incubation',
        'Startup Development',
        'Software Development',
        'Web Technologies',
        'Digital Products',
        'Technology Consulting',
        'Automation',
        'Hackathon Organisation',
        'Large-scale Training Programs',
        'Innovation and Student Opportunity Cells',
        'Global Education Engagement',
        'Education Technology',
        'Career Preparation',
        'Corporate Mobility',
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

      // ── Education ───────────────────────────────────────────────────────
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Rashtrasant Tukadoji Maharaj Nagpur University',
        alternateName: 'RTMNU',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Nagpur',
          addressRegion: 'Maharashtra',
          addressCountry: 'IN',
        },
      },

      // ── Associated organisations ─────────────────────────────────────────
      memberOf: [
        { '@type': 'Organization', name: 'SuPrazo Technologies' },
        { '@type': 'Organization', name: 'CodeElevate Academy' },
        { '@type': 'Organization', name: 'Team Sumit' },
      ],
    },

    // ── Node 2: WebSite ──────────────────────────────────────────────────
    {
      '@type': 'WebSite',
      '@id': 'https://teamsumit.com/#website',
      url: 'https://teamsumit.com',
      name: 'TeamSumit — Sumit Waghmare | Technology, Education & Venture',
      description:
        'Official portal for Sumit Krishna Waghmare — Indian technology entrepreneur, world record holder, Director of SuPrazo Technologies, engineering mentor, hackathon organizer, and keynote speaker from Nagpur, Maharashtra, India.',
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

export function getStructuredData() {
  const baseUrl = (process.env.BACKEND_URL || process.env.SITE_URL || 'https://teamsumit.com').replace(/\/+$/, '');
  return {
    ...STRUCTURED_DATA,
    '@graph': STRUCTURED_DATA['@graph'].map((node) => {
      if (node['@type'] === 'Person') {
        return {
          ...node,
          image: `${baseUrl}/api/images/sumitsir3.jpeg`,
        };
      }
      return node;
    }),
  };
}

export async function OPTIONS(req) {
  return handleOptions(req);
}

export async function GET(req) {
  return jsonResponse(
    {
      success: true,
      data: getStructuredData(),
    },
    200,
    req
  );
}

