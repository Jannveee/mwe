/**
 * src/middleware/authAdmin.js
 * ─────────────────────────────────────────────────────────────────────────
 * Very simple API key authentication for admin/internal endpoints.
 * Requires the 'x-api-key' header to match process.env.ADMIN_API_KEY.
 */

'use strict';

function authAdmin(req, res, next) {
  const apiKey = req.headers['x-api-key'];
  const expectedKey = process.env.ADMIN_API_KEY;

  if (!expectedKey) {
    console.warn('[WARN] ADMIN_API_KEY is not set in environment variables. Admin endpoints are inaccessible.');
    return res.status(500).json({
      success: false,
      message: 'Server configuration error: Authentication is not configured properly.',
    });
  }

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Missing x-api-key header.',
    });
  }

  if (apiKey !== expectedKey) {
    return res.status(403).json({
      success: false,
      message: 'Forbidden: Invalid API key.',
    });
  }

  return next();
}

module.exports = { authAdmin };
