/**
 * src/app/api/seo/sitemap/route.js
 * ─────────────────────────────────────────────────────────────────────────
 * Returns flat sitemap page list with computed URLs and lastmod timestamps.
 *
 * GET /api/seo/sitemap
 */

import { jsonResponse, handleOptions } from '../../../../middleware/cors.js';

const SITEMAP_PAGES = [
  { path: '/',              changefreq: 'weekly',  priority: 1.0 },
  { path: '/#about',        changefreq: 'monthly', priority: 0.8 },
  { path: '/#ecosystem',    changefreq: 'monthly', priority: 0.7 },
  { path: '/#pricing',      changefreq: 'monthly', priority: 0.8 },
  { path: '/#connect',      changefreq: 'monthly', priority: 0.9 },
  { path: '/#achievements', changefreq: 'monthly', priority: 0.6 },
];

export async function OPTIONS(req) {
  return handleOptions(req);
}

export async function GET(req) {
  const baseUrl = process.env.SITE_URL || 'https://teamsumit.com';
  const pages = SITEMAP_PAGES.map((p) => ({
    ...p,
    url: `${baseUrl}${p.path}`,
    lastmod: new Date().toISOString().split('T')[0],
  }));

  return jsonResponse(
    {
      success: true,
      data: pages,
    },
    200,
    req
  );
}
