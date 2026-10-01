/**
 * src/services/engagementService.js
 * ─────────────────────────────────────────────────────────────────────────
 * Business logic layer for engagement request operations.
 * Next.js route handlers call these functions.
 */

import { connectDB } from '../config/db.js';
import EngagementRequest from '../models/EngagementRequest.js';

/**
 * Create and persist a new engagement request.
 *
 * @param {object} data - Validated + sanitised request body
 * @returns {Promise<EngagementRequest>} The saved document
 */
export async function createEngagementRequest(data) {
  await connectDB();
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
export async function getAllEngagementRequests() {
  await connectDB();
  return EngagementRequest.find({}).sort({ createdAt: -1 }).lean();
}

/**
 * Retrieve a single engagement request by its MongoDB _id.
 *
 * @param {string} id - MongoDB ObjectId string
 * @returns {Promise<EngagementRequest|null>}
 */
export async function getEngagementRequestById(id) {
  await connectDB();
  return EngagementRequest.findById(id).lean();
}

export default {
  createEngagementRequest,
  getAllEngagementRequests,
  getEngagementRequestById,
};
