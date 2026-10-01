/**
 * src/routes/seo.js
 * ─────────────────────────────────────────────────────────────────────────
 * SEO/GEO backend support for TeamSumit.
 *
 * What genuinely belongs on the backend (vs. the React frontend):
 *
 *  ✅ Structured data (JSON-LD) served as an API so a future SSR/Next.js
 *     migration can consume it without reimplementing the data.
 *  ✅ robots.txt if the backend ever serves the site root.
 *  ✅ Sitemap data (machine-readable, consumed by crawlers / SSR layer).
 *
 *  ❌ <title>, <meta description>, Open Graph tags — these belong in the
 *     React frontend (index.html or a future Next.js _app).  They are NOT
 *     implemented here to avoid duplicating the existing frontend's head.
 *
 * GET /api/seo/structured-data  →  JSON-LD Person + WebSite schema
 * GET /api/seo/sitemap          →  Flat page list for sitemap generation
 */

'use strict';

const { Router } = require('express');

const router = Router();

// ── Structured Data (JSON-LD) ─────────────────────────────────────────────
// Represents Sumit Waghmare as a Person + his Organisation + WebSite.
// Consumed by a future Next.js / SSR layer to inject into <script type="application/ld+json">.
// NOTE: No invented claims, awards, or rankings — only factual descriptions.
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

// ── Sitemap data ─────────────────────────────────────────────────────────
// Returns a machine-readable list of pages for a future sitemap generator.
// Intended to be consumed by a crawler or a Next.js sitemap plugin.
const SITEMAP_PAGES = [
  { path: '/',              changefreq: 'weekly',  priority: 1.0 },
  { path: '/#about',        changefreq: 'monthly', priority: 0.8 },
  { path: '/#ecosystem',    changefreq: 'monthly', priority: 0.7 },
  { path: '/#pricing',      changefreq: 'monthly', priority: 0.8 },
  { path: '/#connect',      changefreq: 'monthly', priority: 0.9 },
  { path: '/#achievements', changefreq: 'monthly', priority: 0.6 },
];

router.get('/structured-data', (req, res) => {
  res.status(200).json({
    success: true,
    data: STRUCTURED_DATA,
  });
});

router.get('/sitemap', (req, res) => {
  const baseUrl = process.env.SITE_URL || 'https://teamsumit.com';
  const pages = SITEMAP_PAGES.map((p) => ({
    ...p,
    url: `${baseUrl}${p.path}`,
    lastmod: new Date().toISOString().split('T')[0],
  }));

  res.status(200).json({
    success: true,
    data: pages,
  });
});

module.exports = router;
