/**
 * src/routes/health.js
 * ─────────────────────────────────────────────────────────────────────────
 * Health-check route — useful for verifying the server is alive and the
 * database connection is established.
 *
 * GET /api/health  →  200 { status: 'ok', db: 'connected' }
 */

'use strict';

const { Router }   = require('express');
const mongoose     = require('mongoose');

const router = Router();

router.get('/', (req, res) => {
  const dbState = mongoose.connection.readyState;
  // 0=disconnected, 1=connected, 2=connecting, 3=disconnecting
  const dbStatus = dbState === 1 ? 'connected' : 'disconnected';

  res.status(dbState === 1 ? 200 : 503).json({
    success: dbState === 1,
    status:  dbState === 1 ? 'ok' : 'degraded',
    db:      dbStatus,
    env:     process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
