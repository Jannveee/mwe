/**
 * src/middleware/validate.js
 * ─────────────────────────────────────────────────────────────────────────
 * Runs express-validator's validationResult and short-circuits with a
 * 422 response if any validation errors exist.
 *
 * Usage: place after your validation chain in a route array.
 * e.g.  router.post('/', [...validators, validate, controller])
 */

'use strict';

const { validationResult } = require('express-validator');

function validate(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Request validation failed.',
      errors: errors.array().map((e) => ({
        field: e.path,
        message: e.msg,
      })),
    });
  }

  return next();
}

module.exports = { validate };
