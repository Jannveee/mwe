/**
 * src/app/api/appointments/[id]/route.js
 * ─────────────────────────────────────────────────────────────────────────
 * Route handler for /api/appointments/:id:
 *  - GET: Retrieve a single engagement request by ID (admin protected)
 *  - OPTIONS: CORS preflight
 */

import { jsonResponse, handleOptions } from '../../../../middleware/cors.js';
import { verifyAdminAuth } from '../../../../middleware/authAdmin.js';
import { handleRouteError } from '../../../../middleware/errorHandler.js';
import { validateMongoId } from '../../../../validators/appointmentValidator.js';
import { getEngagementRequestById } from '../../../../services/engagementService.js';

export async function OPTIONS(req) {
  return handleOptions(req);
}

/**
 * GET /api/appointments/:id
 * Retrieve a single submission by MongoDB ObjectId.
 */
export async function GET(req, context) {
  const auth = verifyAdminAuth(req);
  if (!auth.authorized) {
    return auth.response;
  }

  // In Next.js 15 params may be asynchronous
  const resolvedParams = context?.params ? await context.params : {};
  const id = resolvedParams.id;

  const idValidation = validateMongoId(id);
  if (!idValidation.isValid) {
    return jsonResponse(
      {
        success: false,
        message: 'Request validation failed.',
        errors: idValidation.errors,
      },
      422,
      req
    );
  }

  try {
    const request = await getEngagementRequestById(id);

    if (!request) {
      return jsonResponse(
        {
          success: false,
          message: 'Engagement request not found.',
        },
        404,
        req
      );
    }

    return jsonResponse(
      {
        success: true,
        message: 'Engagement request retrieved.',
        data: request,
      },
      200,
      req
    );
  } catch (err) {
    return handleRouteError(err, req);
  }
}
