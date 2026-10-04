/**
 * src/middleware/cors.js
 * ─────────────────────────────────────────────────────────────────────────
 * CORS helpers for Next.js Route Handlers.
 */

import { NextResponse } from 'next/server';

export function getCorsHeaders(req) {
  const allowedOrigins = process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
    : [];

  const origin = req?.headers ? req.headers.get('origin') : null;
  let allowOrigin = '*';

  if (origin) {
    if (
      allowedOrigins.length === 0 ||
      allowedOrigins.includes(origin) ||
      process.env.NODE_ENV !== 'production'
    ) {
      allowOrigin = origin;
    }
  }

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
    'Access-Control-Allow-Credentials': 'true',
  };
}

export function handleOptions(req) {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(req),
  });
}

export function jsonResponse(data, status = 200, req = null) {
  const headers = req ? getCorsHeaders(req) : {};
  return NextResponse.json(data, {
    status,
    headers,
  });
}
