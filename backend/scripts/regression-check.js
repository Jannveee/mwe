/**
 * scripts/regression-check.js
 * Comprehensive regression check for the Next.js backend.
 */

'use strict';

require('dotenv').config();

const BASE = 'http://localhost:5000/api';
const ADMIN_KEY = process.env.ADMIN_API_KEY || 'local_dev_admin_key_123';

const results = [];

async function check(label, method, path, body, extraHeaders) {
  const headers = { 'Content-Type': 'application/json', ...extraHeaders };
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  try {
    const res = await fetch(BASE + path, opts);
    const json = await res.json();
    return { label, status: res.status, body: json, headers: res.headers };
  } catch (err) {
    return { label, status: 0, body: {}, headers: new Headers(), err: err.message };
  }
}

function result(label, pass, status, detail) {
  results.push({ label, pass, status, detail });
}

async function run() {
  let savedId = null;

  // ────────────────────────────────────────────────────────────
  // SECTION 1: Health check
  // ────────────────────────────────────────────────────────────
  {
    const r = await check('HEALTH-1  GET /api/health', 'GET', '/health');
    result(
      r.label,
      r.status === 200 && r.body.status === 'ok' && r.body.db === 'connected',
      r.status,
      'status=' + r.body.status + ' db=' + r.body.db + ' env=' + r.body.env + ' timestamp=' + (r.body.timestamp ? 'present' : 'missing')
    );
  }

  // ────────────────────────────────────────────────────────────
  // SECTION 2: Valid appointment creation
  // ────────────────────────────────────────────────────────────
  {
    const r = await check('POST-1    POST /api/appointments (INDIVIDUAL_MENTORSHIP)', 'POST', '/appointments', {
      name: 'Regression User',
      email: 'regression@test.com',
      requestType: 'INDIVIDUAL_MENTORSHIP',
      role: 'student',
      reason: 'career-guidance',
      phone: '9876543210',
      message: 'Regression test message.',
      source: 'regression'
    });
    savedId = r.body.data && r.body.data.id ? r.body.data.id : null;
    result(
      r.label,
      r.status === 201 && r.body.success === true && !!r.body.data && !!r.body.data.id && r.body.data.requestType === 'INDIVIDUAL_MENTORSHIP',
      r.status,
      'id=' + (savedId || 'MISSING') + ' requestType=' + (r.body.data && r.body.data.requestType)
    );
  }

  {
    const r = await check('POST-2    POST /api/appointments (GUEST_LECTURE + all optional fields)', 'POST', '/appointments', {
      name: 'Dr. College Prof',
      email: 'prof@college.edu',
      requestType: 'GUEST_LECTURE',
      role: 'college',
      reason: 'guest-lecture',
      organizationName: 'Test University',
      organizationType: 'university',
      country: 'India',
      city: 'Pune',
      engagementMode: 'in-person',
      preferredDate: '2025-12-01',
      details: { audienceSize: '200', topic: 'AI in Engineering' },
      source: 'homepage'
    });
    result(
      r.label,
      r.status === 201 && r.body.success === true && r.body.data && r.body.data.requestType === 'GUEST_LECTURE',
      r.status,
      'requestType=' + (r.body.data && r.body.data.requestType) + ' name=' + (r.body.data && r.body.data.name)
    );
  }

  {
    const r = await check('POST-3    POST /api/appointments (GLOBAL_ENGAGEMENT, online)', 'POST', '/appointments', {
      name: 'James International',
      email: 'james@intl.edu',
      requestType: 'GLOBAL_ENGAGEMENT',
      country: 'United States',
      engagementMode: 'online'
    });
    result(
      r.label,
      r.status === 201 && r.body.success === true && r.body.data && r.body.data.requestType === 'GLOBAL_ENGAGEMENT',
      r.status,
      'requestType=' + (r.body.data && r.body.data.requestType) + ' email=' + (r.body.data && r.body.data.email)
    );
  }

  // ────────────────────────────────────────────────────────────
  // SECTION 3: Validation errors → 422
  // ────────────────────────────────────────────────────────────
  {
    const r = await check('VAL-1     POST missing name + email + requestType → 422', 'POST', '/appointments', { message: 'oops' });
    const errs = r.body.errors || [];
    result(
      r.label,
      r.status === 422 && r.body.success === false && errs.some(function(e) { return e.field === 'name'; }) && errs.some(function(e) { return e.field === 'email'; }) && errs.some(function(e) { return e.field === 'requestType'; }),
      r.status,
      'errors=[' + errs.map(function(e) { return e.field; }).join(',') + ']'
    );
  }

  {
    const r = await check('VAL-2     POST invalid email → 422', 'POST', '/appointments', { name: 'Test', email: 'not-an-email', requestType: 'OTHER' });
    const errs = r.body.errors || [];
    const emailErr = errs.find(function(e) { return e.field === 'email'; });
    result(
      r.label,
      r.status === 422 && r.body.success === false && !!emailErr,
      r.status,
      'email_error=' + (emailErr ? emailErr.message : 'MISSING')
    );
  }

  {
    const r = await check('VAL-3     POST invalid requestType → 422', 'POST', '/appointments', { name: 'Test', email: 'test@test.com', requestType: 'BOGUS_TYPE' });
    const errs = r.body.errors || [];
    const typeErr = errs.find(function(e) { return e.field === 'requestType'; });
    result(
      r.label,
      r.status === 422 && r.body.success === false && !!typeErr,
      r.status,
      'requestType_error=' + (typeErr ? typeErr.message.slice(0, 50) : 'MISSING')
    );
  }

  {
    const r = await check('VAL-4     POST invalid phone → 422', 'POST', '/appointments', { name: 'Test', email: 'test@test.com', requestType: 'OTHER', phone: 'abc' });
    const errs = r.body.errors || [];
    const phoneErr = errs.find(function(e) { return e.field === 'phone'; });
    result(
      r.label,
      r.status === 422 && r.body.success === false && !!phoneErr,
      r.status,
      'phone_error=' + (phoneErr ? phoneErr.message.slice(0, 50) : 'MISSING')
    );
  }

  {
    const r = await check('VAL-5     POST invalid engagementMode → 422', 'POST', '/appointments', { name: 'Test', email: 'test@test.com', requestType: 'OTHER', engagementMode: 'carrier-pigeon' });
    const errs = r.body.errors || [];
    const modeErr = errs.find(function(e) { return e.field === 'engagementMode'; });
    result(
      r.label,
      r.status === 422 && r.body.success === false && !!modeErr,
      r.status,
      'mode_error=' + (modeErr ? modeErr.message.slice(0, 50) : 'MISSING')
    );
  }

  {
    const r = await check('VAL-6     POST invalid preferredDate → 422', 'POST', '/appointments', { name: 'Test', email: 'test@test.com', requestType: 'OTHER', preferredDate: 'not-a-date' });
    const errs = r.body.errors || [];
    const dateErr = errs.find(function(e) { return e.field === 'preferredDate'; });
    result(
      r.label,
      r.status === 422 && r.body.success === false && !!dateErr,
      r.status,
      'date_error=' + (dateErr ? dateErr.message.slice(0, 50) : 'MISSING')
    );
  }

  {
    const r = await check('VAL-7     POST details not object → 422', 'POST', '/appointments', { name: 'Test', email: 'test@test.com', requestType: 'OTHER', details: 'not-an-object' });
    const errs = r.body.errors || [];
    const detailErr = errs.find(function(e) { return e.field === 'details'; });
    result(
      r.label,
      r.status === 422 && r.body.success === false && !!detailErr,
      r.status,
      'details_error=' + (detailErr ? detailErr.message.slice(0, 50) : 'MISSING')
    );
  }

  // ────────────────────────────────────────────────────────────
  // SECTION 4: Admin authentication
  // ────────────────────────────────────────────────────────────
  {
    const r = await check('AUTH-1    GET /api/appointments — no key → 401', 'GET', '/appointments');
    result(r.label, r.status === 401 && r.body.success === false, r.status, 'message=' + r.body.message);
  }

  {
    const r = await check('AUTH-2    GET /api/appointments — wrong key → 403', 'GET', '/appointments', null, { 'x-api-key': 'wrong_key_xyz' });
    result(r.label, r.status === 403 && r.body.success === false, r.status, 'message=' + r.body.message);
  }

  {
    const r = await check('AUTH-3    GET /api/appointments — correct key → 200', 'GET', '/appointments', null, { 'x-api-key': ADMIN_KEY });
    const data = r.body.data || [];
    result(
      r.label,
      r.status === 200 && r.body.success === true && Array.isArray(data) && data.length >= 3,
      r.status,
      'count=' + data.length + ' is_array=' + Array.isArray(data) + ' newest_first=' + (data.length >= 2 ? (new Date(data[0].createdAt) >= new Date(data[1].createdAt)) : 'n/a')
    );
  }

  {
    const r = await check('AUTH-4    GET /api/appointments/:id — no key → 401', 'GET', '/appointments/' + (savedId || '000000000000000000000001'));
    result(r.label, r.status === 401 && r.body.success === false, r.status, 'message=' + r.body.message);
  }

  {
    const r = await check('AUTH-5    GET /api/appointments/:id — wrong key → 403', 'GET', '/appointments/' + (savedId || '000000000000000000000001'), null, { 'x-api-key': 'wrong_key' });
    result(r.label, r.status === 403 && r.body.success === false, r.status, 'message=' + r.body.message);
  }

  // ────────────────────────────────────────────────────────────
  // SECTION 5: Appointment retrieval
  // ────────────────────────────────────────────────────────────
  if (savedId) {
    const r = await check('GET-1     GET /api/appointments/:id (valid id, correct key) → 200', 'GET', '/appointments/' + savedId, null, { 'x-api-key': ADMIN_KEY });
    const d = r.body.data || {};
    result(
      r.label,
      r.status === 200 && r.body.success === true && String(d._id) === String(savedId) && d.requestType === 'INDIVIDUAL_MENTORSHIP',
      r.status,
      '_id=' + d._id + ' requestType=' + d.requestType + ' status=' + d.status
    );
  }

  {
    const r = await check('GET-2     GET /api/appointments/:id (invalid id format) → 422', 'GET', '/appointments/not-a-real-id', null, { 'x-api-key': ADMIN_KEY });
    result(r.label, r.status === 422 && r.body.success === false, r.status, 'message=' + r.body.message);
  }

  {
    const r = await check('GET-3     GET /api/appointments/:id (valid id, not found) → 404', 'GET', '/appointments/000000000000000000000000', null, { 'x-api-key': ADMIN_KEY });
    result(r.label, r.status === 404 && r.body.success === false, r.status, 'message=' + r.body.message);
  }

  // ────────────────────────────────────────────────────────────
  // SECTION 6: SEO endpoints
  // ────────────────────────────────────────────────────────────
  {
    const r = await check('SEO-1     GET /api/seo/structured-data → 200', 'GET', '/seo/structured-data');
    const graph = r.body.data && r.body.data['@graph'] ? r.body.data['@graph'] : [];
    const hasPerson  = graph.some(function(n) { return n['@type'] === 'Person'; });
    const hasWebSite = graph.some(function(n) { return n['@type'] === 'WebSite'; });
    const hasService = graph.some(function(n) { return n['@type'] === 'Service'; });
    const context    = r.body.data && r.body.data['@context'] === 'https://schema.org';
    result(
      r.label,
      r.status === 200 && r.body.success === true && graph.length === 4 && hasPerson && hasWebSite && hasService && context,
      r.status,
      'graph_items=' + graph.length + ' Person=' + hasPerson + ' WebSite=' + hasWebSite + ' Service=' + hasService + ' schema.org=' + context
    );
  }

  {
    const r = await check('SEO-2     GET /api/seo/sitemap → 200', 'GET', '/seo/sitemap');
    const pages = r.body.data || [];
    const hasRoot    = pages.some(function(p) { return p.path === '/'; });
    const hasUrls    = pages.every(function(p) { return p.url && p.url.startsWith('http'); });
    const hasLastmod = pages.every(function(p) { return !!p.lastmod; });
    const hasFreq    = pages.every(function(p) { return !!p.changefreq; });
    const hasPrio    = pages.every(function(p) { return typeof p.priority === 'number'; });
    result(
      r.label,
      r.status === 200 && r.body.success === true && pages.length === 6 && hasRoot && hasUrls && hasLastmod,
      r.status,
      'pages=' + pages.length + ' hasRoot=' + hasRoot + ' hasUrls=' + hasUrls + ' hasLastmod=' + hasLastmod + ' hasFreq=' + hasFreq + ' hasPrio=' + hasPrio
    );
  }

  // ────────────────────────────────────────────────────────────
  // SECTION 7: CORS preflight
  // ────────────────────────────────────────────────────────────
  {
    const res = await fetch(BASE + '/appointments', {
      method: 'OPTIONS',
      headers: { 'Origin': 'http://localhost:5173', 'Access-Control-Request-Method': 'POST' }
    });
    result(
      'CORS-1    OPTIONS /api/appointments → 204',
      res.status === 204,
      res.status,
      'Allow-Methods=' + (res.headers.get('access-control-allow-methods') || 'MISSING') + ' Allow-Origin=' + (res.headers.get('access-control-allow-origin') || 'MISSING')
    );
  }

  // ────────────────────────────────────────────────────────────
  // Print
  // ────────────────────────────────────────────────────────────
  const passed = results.filter(function(r) { return r.pass; }).length;
  const failed = results.filter(function(r) { return !r.pass; }).length;

  console.log('');
  console.log('===================================================================');
  console.log('  Next.js Backend -- Regression Check');
  console.log('  Target: ' + BASE);
  console.log('===================================================================');
  results.forEach(function(r) {
    var icon = r.pass ? 'PASS' : 'FAIL';
    console.log('  [' + icon + '] [' + r.status + ']  ' + r.label);
    console.log('           ' + r.detail);
  });
  console.log('-------------------------------------------------------------------');
  console.log('  Total: ' + results.length + '   Passed: ' + passed + '   Failed: ' + failed);
  console.log('===================================================================');
  console.log('');
  process.exit(failed > 0 ? 1 : 0);
}

run().catch(function(err) {
  console.error('Script error:', err.message);
  process.exit(1);
});
