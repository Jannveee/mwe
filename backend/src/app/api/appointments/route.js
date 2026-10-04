/**
 * src/app/api/appointments/route.js
 * ─────────────────────────────────────────────────────────────────────────
 * Route handler for /api/appointments:
 *  - POST: Submit a new engagement request (public)
 *  - GET:  Retrieve all submissions (admin protected)
 *  - OPTIONS: CORS preflight
 */

import { jsonResponse, handleOptions } from '../../../middleware/cors.js';
import { verifyAdminAuth } from '../../../middleware/authAdmin.js';
import { handleRouteError } from '../../../middleware/errorHandler.js';
import { validateSubmitRequest } from '../../../validators/appointmentValidator.js';
import {
  createEngagementRequest,
  getAllEngagementRequests,
} from '../../../services/engagementService.js';

export async function OPTIONS(req) {
  return handleOptions(req);
}

/**
 * GET /api/appointments
 * Retrieve all engagement requests (internal/admin only).
 */
export async function GET(req) {
  const auth = verifyAdminAuth(req);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const requests = await getAllEngagementRequests();
    return jsonResponse(
      {
        success: true,
        message: 'Engagement requests retrieved.',
        data: requests,
      },
      200,
      req
    );
  } catch (err) {
    return handleRouteError(err, req);
  }
}

/**
 * POST /api/appointments
 * Submit a new engagement request.
 */
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return jsonResponse(
      {
        success: false,
        message: 'Request validation failed.',
        errors: [{ field: 'body', message: 'Invalid JSON payload.' }],
      },
      422,
      req
    );
  }

  const validation = validateSubmitRequest(body);
  if (!validation.isValid) {
    return jsonResponse(
      {
        success: false,
        message: 'Request validation failed.',
        errors: validation.errors,
      },
      422,
      req
    );
  }

  try {
    const saved = await createEngagementRequest({
      name: body.name ? String(body.name).trim() : '',
      email: body.email ? String(body.email).trim().toLowerCase() : '',
      phone: body.phone ? String(body.phone).trim() : null,
      requestType: body.requestType ? String(body.requestType).trim() : '',
      role: body.role ? String(body.role).trim() : null,
      reason: body.reason ? String(body.reason).trim() : null,
      organizationName: body.organizationName ? String(body.organizationName).trim() : null,
      organizationType: body.organizationType ? String(body.organizationType).trim() : null,
      country: body.country ? String(body.country).trim() : null,
      city: body.city ? String(body.city).trim() : null,
      engagementMode: body.engagementMode ? String(body.engagementMode).trim() : null,
      preferredDate: body.preferredDate ? new Date(body.preferredDate) : null,
      message: body.message ? String(body.message).trim() : null,
      details: body.details || {},
      source: body.source ? String(body.source).trim() : null,
    });

    return jsonResponse(
      {
        success: true,
        message: 'Your engagement request has been received. We will be in touch shortly.',
        data: {
          id: saved._id,
          requestType: saved.requestType,
          name: saved.name,
          email: saved.email,
          createdAt: saved.createdAt,
        },
      },
      201,
      req
    );
  } catch (err) {
    return handleRouteError(err, req);
  }
}
