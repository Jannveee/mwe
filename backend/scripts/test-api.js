/**
 * scripts/test-api.js
 * ─────────────────────────────────────────────────────────────────────────
 * Automated API test script using Node.js built-in fetch (v18+).
 * Run with:  npm test   (from backend/)
 *
 * Tests:
 *  T1  Health check
 *  T2  Basic appointment (student/individual)
 *  T3  College/University request
 *  T4  Global Engagement request (international)
 *  T5  Invalid requestType → 422
 *  T6  Invalid email → 422
 *  T7  Missing required fields → 422
 *  T8  GET all appointments
 *  T9  GET single appointment by ID
 */

'use strict';

require('dotenv').config();

const BASE = `http://localhost:${process.env.PORT || 5000}/api`;

let passed = 0;
let failed = 0;
const results = [];

// ─── Helpers ──────────────────────────────────────────────────────────────

async function request(method, path, body, extraHeaders = {}) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  };
  if (body) options.body = JSON.stringify(body);

  const res  = await fetch(`${BASE}${path}`, options);
  const json = await res.json();
  return { status: res.status, body: json };
}

function assert(label, condition, detail = '') {
  if (condition) {
    passed++;
    results.push({ label, result: '✅ PASS' });
  } else {
    failed++;
    results.push({ label, result: `❌ FAIL${detail ? ': ' + detail : ''}` });
  }
}

// ─── Tests ────────────────────────────────────────────────────────────────

async function runTests() {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('  TeamSumit Backend — API Test Suite');
  console.log(`  Target: ${BASE}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  let savedId = null;

  // ── T1: Health check ─────────────────────────────────────────────────
  {
    const { status, body } = await request('GET', '/health');
    assert('T1 Health check returns 200',     status === 200,     `got ${status}`);
    assert('T1 Health body status ok',        body.status === 'ok', JSON.stringify(body));
    assert('T1 DB reports connected',         body.db === 'connected', body.db);
  }

  // ── T2: Basic student / individual request ────────────────────────────
  {
    const { status, body } = await request('POST', '/appointments', {
      name:        'Rahul Sharma',
      email:       'rahul.sharma@example.com',
      phone:       '9876543210',
      requestType: 'INDIVIDUAL_MENTORSHIP',
      role:        'student',
      reason:      'career-guidance',
      message:     'I want career guidance for software engineering.',
      source:      'pricing',
    });
    assert('T2 Basic request returns 201',    status === 201,          `got ${status}`);
    assert('T2 Response success=true',        body.success === true,   JSON.stringify(body));
    assert('T2 requestType preserved',        body.data?.requestType === 'INDIVIDUAL_MENTORSHIP');
    assert('T2 Returns an id',                !!body.data?.id);
  }

  // ── T3: College / University request ─────────────────────────────────
  {
    const { status, body } = await request('POST', '/appointments', {
      name:             'Dr. Priya Desai',
      email:            'priya.desai@vit.edu.in',
      phone:            '9123456789',
      requestType:      'GUEST_LECTURE',
      role:             'college',
      reason:           'guest-lecture',
      organizationName: 'Vishwakarma Institute of Technology',
      organizationType: 'university',
      country:          'India',
      city:             'Pune',
      engagementMode:   'in-person',
      preferredDate:    '2025-11-15',
      message:          'We would like to invite Sumit for our annual tech symposium.',
      details: {
        institutionName: 'Vishwakarma Institute of Technology',
        audienceSize:    '300',
        topic:           'AI in Real-World Engineering',
      },
      source: 'homepage',
    });
    assert('T3 College request returns 201',  status === 201,         `got ${status}`);
    assert('T3 success=true',                 body.success === true,  JSON.stringify(body));
    assert('T3 requestType=GUEST_LECTURE',    body.data?.requestType === 'GUEST_LECTURE');
  }

  // ── T4: Global Engagement (international) ─────────────────────────────
  {
    const { status, body } = await request('POST', '/appointments', {
      name:             'James O\'Brien',
      email:            'james.obrien@mit.edu',
      requestType:      'GLOBAL_ENGAGEMENT',
      role:             'college',
      reason:           'guest-lecture',
      organizationName: 'Massachusetts Institute of Technology',
      organizationType: 'university',
      country:          'United States',
      city:             'Cambridge',
      engagementMode:   'online',
      message:          'We would like Sumit to deliver an online session for our Global Innovation Lab.',
      source:           'homepage',
    });
    assert('T4 Global Engagement returns 201', status === 201,         `got ${status}`);
    assert('T4 success=true',                  body.success === true,  JSON.stringify(body));
    assert('T4 requestType=GLOBAL_ENGAGEMENT', body.data?.requestType === 'GLOBAL_ENGAGEMENT');
    if (body.data?.id) savedId = body.data.id; // Save for T9
  }

  // ── T5: Invalid requestType → 422 ─────────────────────────────────────
  {
    const { status, body } = await request('POST', '/appointments', {
      name:        'Test User',
      email:       'test@example.com',
      requestType: 'INVALID_TYPE',
    });
    assert('T5 Invalid requestType → 422',   status === 422,          `got ${status}`);
    assert('T5 success=false',               body.success === false);
    assert('T5 errors array present',        Array.isArray(body.errors));
  }

  // ── T6: Invalid email → 422 ───────────────────────────────────────────
  {
    const { status, body } = await request('POST', '/appointments', {
      name:        'Bad Email User',
      email:       'not-an-email',
      requestType: 'OTHER',
    });
    assert('T6 Invalid email → 422',         status === 422,          `got ${status}`);
    assert('T6 success=false',               body.success === false);
    assert('T6 email error reported',        body.errors?.some((e) => e.field === 'email'));
  }

  // ── T7: Missing required fields → 422 ────────────────────────────────
  {
    const { status, body } = await request('POST', '/appointments', {
      message: 'I forgot to include name, email, and requestType.',
    });
    assert('T7 Missing required fields → 422', status === 422,        `got ${status}`);
    assert('T7 success=false',                 body.success === false);
    assert('T7 Multiple errors returned',      body.errors?.length >= 2);
  }

  // ── T8a: GET all without auth → 401 ──────────────────────────────────────
  {
    const { status, body } = await request('GET', '/appointments');
    assert('T8a GET all without auth → 401', status === 401,          `got ${status}`);
    assert('T8a success=false',              body.success === false);
  }

  // ── T8b: GET all with auth ──────────────────────────────────────────
  {
    const apiKey = process.env.ADMIN_API_KEY;
    const { status, body } = await request('GET', '/appointments', null, { 'x-api-key': apiKey });
    assert('T8b GET all returns 200',         status === 200,          `got ${status}`);
    assert('T8b success=true',                body.success === true);
    assert('T8b data is an array',            Array.isArray(body.data));
    assert('T8b At least 3 entries saved',    body.data?.length >= 3, `got ${body.data?.length}`);
  }

  // ── T9a: GET single by ID without auth → 401 ───────────────────────────
  if (savedId) {
    const { status, body } = await request('GET', `/appointments/${savedId}`);
    assert('T9a GET by ID without auth → 401', status === 401,        `got ${status}`);
    assert('T9a success=false',                body.success === false);
  } else {
    results.push({ label: 'T9a GET by ID without auth', result: '⏭  SKIP (no saved ID)' });
  }

  // ── T9b: GET single appointment by ID with auth ───────────────────────
  if (savedId) {
    const apiKey = process.env.ADMIN_API_KEY;
    const { status, body } = await request('GET', `/appointments/${savedId}`, null, { 'x-api-key': apiKey });
    assert('T9b GET by ID returns 200',       status === 200,          `got ${status}`);
    assert('T9b success=true',                body.success === true);
    assert('T9b Correct ID returned',         body.data?._id === savedId);
  } else {
    results.push({ label: 'T9b GET by ID', result: '⏭  SKIP (no saved ID)' });
  }

  // ─── Summary ──────────────────────────────────────────────────────────
  console.log('\nTest Results:');
  console.log('─────────────────────────────────────────────────────');
  results.forEach(({ label, result }) => {
    console.log(`  ${result}  ${label}`);
  });
  console.log('─────────────────────────────────────────────────────');
  console.log(`  Total: ${passed + failed}   Passed: ${passed}   Failed: ${failed}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  process.exit(failed > 0 ? 1 : 0);
}

runTests().catch((err) => {
  console.error('\n[TEST ERROR] Could not reach the server.\n');
  console.error('Make sure the backend is running: npm run dev\n');
  console.error(err.message);
  process.exit(1);
});
