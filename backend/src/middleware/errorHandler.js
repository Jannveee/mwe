/**
 * src/middleware/errorHandler.js
 * ─────────────────────────────────────────────────────────────────────────
 * Central error formatting helper for Next.js Route Handlers.
 */

import { jsonResponse } from './cors.js';

export function handleRouteError(err, req) {
  // Mongoose validation error (schema-level)
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors || {}).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return jsonResponse(
      {
        success: false,
        message: 'Validation failed.',
        errors,
      },
      400,
      req
    );
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return jsonResponse(
      {
        success: false,
        message: `A record with this ${field} already exists.`,
      },
      409,
      req
    );
  }

  // Mongoose cast error (bad ObjectId, etc.)
  if (err.name === 'CastError') {
    return jsonResponse(
      {
        success: false,
        message: `Invalid value for field '${err.path}'.`,
      },
      400,
      req
    );
  }

  // Generic / unexpected error
  const statusCode = err.statusCode || err.status || 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'An internal server error occurred.'
      : err.message || 'An internal server error occurred.';

  console.error('[Error]', err);

  return jsonResponse(
    {
      success: false,
      message,
    },
    statusCode,
    req
  );
}
