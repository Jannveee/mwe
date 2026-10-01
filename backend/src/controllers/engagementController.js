/**
 * src/controllers/engagementController.js
 * ─────────────────────────────────────────────────────────────────────────
 * Express route handlers for engagement / appointment requests.
 * Each handler delegates to the service layer and returns a consistent
 * JSON response.
 *
 * Response shape (success):
 * { "success": true, "message": "...", "data": { ... } }
 *
 * Errors are forwarded to the central errorHandler via next(err).
 */

'use strict';

const {
  createEngagementRequest,
  getAllEngagementRequests,
  getEngagementRequestById,
} = require('../services/engagementService');

// ─── POST /api/appointments ───────────────────────────────────────────────
/**
 * Submit a new engagement request.
 * Body has already been validated by express-validator before this runs.
 */
async function submitRequest(req, res, next) {
  try {
    const {
      name,
      email,
      phone,
      requestType,
      role,
      reason,
      organizationName,
      organizationType,
      country,
      city,
      engagementMode,
      preferredDate,
      message,
      details,
      source,
    } = req.body;

    const saved = await createEngagementRequest({
      name,
      email,
      phone:            phone           || null,
      requestType,
      role:             role            || null,
      reason:           reason          || null,
      organizationName: organizationName|| null,
      organizationType: organizationType|| null,
      country:          country         || null,
      city:             city            || null,
      engagementMode:   engagementMode  || null,
      preferredDate:    preferredDate   || null,
      message:          message         || null,
      details:          details         || {},
      source:           source          || null,
    });

    return res.status(201).json({
      success: true,
      message: 'Your engagement request has been received. We will be in touch shortly.',
      data: {
        id:          saved._id,
        requestType: saved.requestType,
        name:        saved.name,
        email:       saved.email,
        createdAt:   saved.createdAt,
      },
    });
  } catch (err) {
    return next(err);
  }
}

// ─── GET /api/appointments ────────────────────────────────────────────────
/**
 * Retrieve all engagement requests.
 * This is an internal/debug endpoint — protect with auth before production.
 */
async function listRequests(req, res, next) {
  try {
    const requests = await getAllEngagementRequests();
    return res.status(200).json({
      success: true,
      message: 'Engagement requests retrieved.',
      data: requests,
    });
  } catch (err) {
    return next(err);
  }
}

// ─── GET /api/appointments/:id ────────────────────────────────────────────
/**
 * Retrieve a single engagement request by ID.
 */
async function getRequest(req, res, next) {
  try {
    const request = await getEngagementRequestById(req.params.id);

    if (!request) {
      return res.status(404).json({
        success: false,
        message: 'Engagement request not found.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Engagement request retrieved.',
      data: request,
    });
  } catch (err) {
    return next(err);
  }
}

module.exports = { submitRequest, listRequests, getRequest };
