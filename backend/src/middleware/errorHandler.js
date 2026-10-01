/**
 * src/middleware/errorHandler.js
 * ─────────────────────────────────────────────────────────────────────────
 * Central Express error handler.
 * Must be registered LAST in the middleware chain (after all routes).
 *
 * Produces consistent JSON error responses:
 * {
 *   "success": false,
 *   "message": "Human-readable description",
 *   "errors": [...]   // optional array of field-level validation errors
 * }
 */

'use strict';

/**
 * Handles Mongoose validation errors into a clean field-error array.
 */
function mongooseValidationErrors(err) {
  return Object.values(err.errors).map((e) => ({
    field: e.path,
    message: e.message,
  }));
}

/**
 * Central error handler middleware.
 * Express identifies error handlers by their 4-argument signature.
 */
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  // ── Mongoose validation error (schema-level) ──────────────────────────
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Validation failed.',
      errors: mongooseValidationErrors(err),
    });
  }

  // ── Mongoose duplicate key error ──────────────────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    return res.status(409).json({
      success: false,
      message: `A record with this ${field} already exists.`,
    });
  }

  // ── Mongoose cast error (bad ObjectId, etc.) ──────────────────────────
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: `Invalid value for field '${err.path}'.`,
    });
  }

  // ── Generic / unexpected error ────────────────────────────────────────
  const statusCode = err.statusCode || err.status || 500;
  const message =
    process.env.NODE_ENV === 'production'
      ? 'An internal server error occurred.'
      : err.message || 'An internal server error occurred.';

  console.error('[Error]', err);

  return res.status(statusCode).json({
    success: false,
    message,
  });
}

module.exports = { errorHandler };
