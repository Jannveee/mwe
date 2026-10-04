/**
 * src/middleware/authAdmin.js
 * ─────────────────────────────────────────────────────────────────────────
 * API key authentication for Next.js Route Handlers.
 * Requires the 'x-api-key' header to match process.env.ADMIN_API_KEY.
 */

import { jsonResponse } from './cors.js';

export function verifyAdminAuth(req) {
  const apiKey = req.headers ? req.headers.get('x-api-key') : null;
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    console.warn(
      '[WARN] ADMIN_API_KEY is not set in environment variables. Admin endpoints are inaccessible.'
    );
    return {
      authorized: false,
      response: jsonResponse(
        {
          success: false,
          message: 'Server configuration error: Authentication is not configured properly.',
        },
        500,
        req
      ),
    };
  }

  if (!apiKey) {
    return {
      authorized: false,
      response: jsonResponse(
        {
          success: false,
          message: 'Unauthorized: Missing x-api-key header.',
        },
        401,
        req
      ),
    };
  }

  if (apiKey !== expectedKey) {
    return {
      authorized: false,
      response: jsonResponse(
        {
          success: false,
          message: 'Forbidden: Invalid API key.',
        },
        403,
        req
      ),
    };
  }

  return { authorized: true };
}
