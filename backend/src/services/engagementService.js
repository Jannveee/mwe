/**
 * src/services/engagementService.js
 * ─────────────────────────────────────────────────────────────────────────
 * Business logic layer for engagement request operations.
 * Controllers call these functions — they never touch the model directly.
 * This separation makes the code testable and keeps controllers thin.
 */

'use strict';

const EngagementRequest = require('../models/EngagementRequest');

/**
 * Create and persist a new engagement request.
 *
 * @param {object} data - Validated + sanitised request body
 * @returns {Promise<EngagementRequest>} The saved document
 */
async function createEngagementRequest(data) {
  const request = new EngagementRequest(data);
  await request.save();
  return request;
}

/**
 * Retrieve all engagement requests.
 * Sorted newest-first. Intended for internal / admin use only.
 *
 * @returns {Promise<EngagementRequest[]>}
 */
async function getAllEngagementRequests() {
  return EngagementRequest.find({}).sort({ createdAt: -1 }).lean();
}

/**
 * Retrieve a single engagement request by its MongoDB _id.
 *
 * @param {string} id - MongoDB ObjectId string
 * @returns {Promise<EngagementRequest|null>}
 */
async function getEngagementRequestById(id) {
  return EngagementRequest.findById(id).lean();
}

module.exports = {
  createEngagementRequest,
  getAllEngagementRequests,
  getEngagementRequestById,
};
