/**
 * src/app.js
 * ─────────────────────────────────────────────────────────────────────────
 * Express application entry point.
 *
 * Startup sequence:
 *  1. Load .env
 *  2. Connect to MongoDB
 *  3. Configure Express (JSON, CORS, routes)
 *  4. Register central error handler
 *  5. Start HTTP server
 */

'use strict';

// ── 1. Load environment variables ─────────────────────────────────────────
require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const { connectDB } = require('./config/db');

// ── Route modules ─────────────────────────────────────────────────────────
const appointmentRoutes = require('./routes/appointments');
const healthRoutes      = require('./routes/health');
const seoRoutes         = require('./routes/seo');

// ── Error handler (must be last) ──────────────────────────────────────────
const { errorHandler } = require('./middleware/errorHandler');

// ─────────────────────────────────────────────────────────────────────────
const app  = express();
const PORT = process.env.PORT || 5000;

// ── 3a. CORS ──────────────────────────────────────────────────────────────
// Allowed origins are comma-separated in ALLOWED_ORIGINS env var.
// Falls back to a permissive '*' only in development.
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : [];

const corsOptions = {
  origin(origin, callback) {
    // Allow requests with no origin (e.g. curl, Postman, mobile apps)
    if (!origin) return callback(null, true);

    if (
      allowedOrigins.length === 0 ||
      allowedOrigins.includes(origin) ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }

    return callback(new Error(`CORS: origin '${origin}' is not allowed.`));
  },
  methods:     ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Handle preflight for all routes

// ── 3b. Body parsing ──────────────────────────────────────────────────────
app.use(express.json({ limit: '50kb' }));
app.use(express.urlencoded({ extended: false, limit: '50kb' }));

// ── 3c. Request logger (development only) ────────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use((req, _res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });
}

// ── 3d. Routes ────────────────────────────────────────────────────────────
app.use('/api/health',       healthRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/seo',          seoRoutes);

// ── 404 handler ───────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ── 4. Central error handler ──────────────────────────────────────────────
app.use(errorHandler);

// ── 5. Start server ───────────────────────────────────────────────────────
async function start() {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log('');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('  TeamSumit Backend API');
      console.log(`  Running  → http://localhost:${PORT}`);
      console.log(`  Health   → http://localhost:${PORT}/api/health`);
      console.log(`  API      → http://localhost:${PORT}/api/appointments`);
      console.log(`  Env      → ${process.env.NODE_ENV}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('');
    });
  } catch (err) {
    console.error('[FATAL] Failed to start server:', err.message);
    process.exit(1);
  }
}

start();

module.exports = app; // Exported for potential future testing
