/**
 * src/routes/appointments.js
 * ─────────────────────────────────────────────────────────────────────────
 * Routes for the engagement / appointment request API.
 *
 * Mounted at /api/appointments in app.js.
 *
 * Validation strategy:
 *  - name:        required, 1–120 chars, trimmed
 *  - email:       required, valid email format
 *  - requestType: required, must be one of the allowed enum values
 *  - phone:       optional, digits/spaces/+/- only, 7–20 chars if provided
 *  - All other fields are optional but sanitised.
 */

'use strict';

const { Router }  = require('express');
const { body, param } = require('express-validator');

const { REQUEST_TYPES } = require('../models/EngagementRequest');
const { validate }      = require('../middleware/validate');
const { authAdmin }     = require('../middleware/authAdmin');
const {
  submitRequest,
  listRequests,
  getRequest,
} = require('../controllers/engagementController');

const router = Router();

// ─── Validation rules ─────────────────────────────────────────────────────

const submitValidators = [
  body('name')
    .trim()
    .notEmpty().withMessage('Name is required.')
    .isLength({ max: 120 }).withMessage('Name must not exceed 120 characters.'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required.')
    .isEmail().withMessage('A valid email address is required.')
    .normalizeEmail(),

  body('requestType')
    .trim()
    .notEmpty().withMessage('requestType is required.')
    .isIn(REQUEST_TYPES)
    .withMessage(`requestType must be one of: ${REQUEST_TYPES.join(', ')}.`),

  // Optional fields — sanitise only
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .matches(/^[\d\s+\-().]{7,20}$/)
    .withMessage('Phone number must contain only digits, spaces, +, -, (, ) and be 7–20 characters.'),

  body('role')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(['college', 'student', 'industry', ''])
    .withMessage("role must be 'college', 'student', or 'industry'."),

  body('reason')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 80 }).withMessage('reason must not exceed 80 characters.'),

  body('organizationName')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 200 }).withMessage('organizationName must not exceed 200 characters.'),

  body('organizationType')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 80 }).withMessage('organizationType must not exceed 80 characters.'),

  body('country')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage('country must not exceed 100 characters.'),

  body('city')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 100 }).withMessage('city must not exceed 100 characters.'),

  body('engagementMode')
    .optional({ checkFalsy: true })
    .trim()
    .isIn(['in-person', 'online', 'hybrid'])
    .withMessage("engagementMode must be 'in-person', 'online', or 'hybrid'."),

  body('preferredDate')
    .optional({ checkFalsy: true })
    .isISO8601().withMessage('preferredDate must be a valid ISO 8601 date (e.g. 2025-12-31).')
    .toDate(),

  body('message')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 2000 }).withMessage('Message must not exceed 2000 characters.'),

  body('details')
    .optional()
    .isObject().withMessage('details must be a JSON object.'),

  body('source')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 60 }).withMessage('source must not exceed 60 characters.'),
];

const idValidator = [
  param('id')
    .isMongoId().withMessage('Invalid request ID format.'),
];

// ─── Routes ───────────────────────────────────────────────────────────────

/**
 * POST /api/appointments
 * Submit a new engagement request (the primary public endpoint).
 */
router.post('/', submitValidators, validate, submitRequest);

/**
 * GET /api/appointments
 * Retrieve all submissions — internal/admin use.
 * Protected by authAdmin middleware.
 */
router.get('/', authAdmin, listRequests);

/**
 * GET /api/appointments/:id
 * Retrieve a single submission by MongoDB ObjectId.
 * Protected by authAdmin middleware.
 */
router.get('/:id', authAdmin, idValidator, validate, getRequest);

module.exports = router;
