/**
 * src/app/api/health/route.js
 * ─────────────────────────────────────────────────────────────────────────
 * Health-check route — verifies the server is alive and MongoDB is connected.
 *
 * GET /api/health  →  200 { status: 'ok', db: 'connected' }
 */

import mongoose from 'mongoose';
import { connectDB } from '../../../config/db.js';
import { jsonResponse, handleOptions } from '../../../middleware/cors.js';

export async function OPTIONS(req) {
  return handleOptions(req);
}

export async function GET(req) {
  try {
    await connectDB();
  } catch (err) {
    // If DB connection fails, readyState check below will catch it and report degraded
    console.error('[Health] DB connection error:', err.message);
  }

  const dbState = mongoose.connection.readyState;
  // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  const dbStatus = dbState === 1 ? 'connected' : 'disconnected';

  return jsonResponse(
    {
      success: dbState === 1,
      status: dbState === 1 ? 'ok' : 'degraded',
      db: dbStatus,
      env: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    },
    dbState === 1 ? 200 : 503,
    req
  );
}
