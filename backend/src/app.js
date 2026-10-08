/**
 * src/app.js
 * ------------------------------------------------------------
 * Express application entry point.
 *
 * Startup sequence:
 * 1. Load .env
 * 2. Connect to MongoDB
 * 3. Configure Express (JSON, CORS, routes)
 * 4. Register central error handler
 * 5. Start HTTP server
 * ------------------------------------------------------------
 */

'use strict';

// ─── 1. Load environment variables ─────────────────────────
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { connectDB } = require('./config/db');


// ─── Route modules ──────────────────────────────────────────
const appointmentRoutes =
  require('./routes/appointments');

const healthRoutes =
  require('./routes/health');

const seoRoutes =
  require('./routes/seo');

const chatRoutes =
  require('./routes/chatRoutes');


// ─── Error handler ─────────────────────────────────────────
const {
  errorHandler
} = require('./middleware/errorHandler');


// ─── Express application ───────────────────────────────────
const app = express();

const PORT =
  process.env.PORT || 5000;


// ─── CORS ──────────────────────────────────────────────────
const allowedOrigins =
  process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS
        .split(',')
        .map((origin) => origin.trim())
    : [];

const corsOptions = {
  origin(origin, callback) {
    // Allow requests with no Origin header,
    // such as curl, Postman and server-to-server requests.
    if (!origin) {
      return callback(null, true);
    }

    if (
      allowedOrigins.length === 0 ||
      allowedOrigins.includes(origin) ||
      process.env.NODE_ENV !== 'production'
    ) {
      return callback(null, true);
    }

    return callback(
      new Error(
        `CORS: origin '${origin}' is not allowed.`
      )
    );
  },

  methods: [
    'GET',
    'POST',
    'OPTIONS'
  ],

  allowedHeaders: [
    'Content-Type',
    'Authorization'
  ],

  credentials: true
};

app.use(cors(corsOptions));

app.options(
  '*',
  cors(corsOptions)
);


// ─── Body parsing ───────────────────────────────────────────
app.use(
  express.json({
    limit: '50kb'
  })
);

app.use(
  express.urlencoded({
    extended: false,
    limit: '50kb'
  })
);


// ─── Request logger (development only) ──────────────────────
if (
  process.env.NODE_ENV !== 'production'
) {
  app.use(
    (req, _res, next) => {
      console.log(
        `[${new Date().toISOString()}] ${req.method} ${req.path}`
      );

      next();
    }
  );
}


// ─── Routes ─────────────────────────────────────────────────
app.use(
  '/api/health',
  healthRoutes
);

app.use(
  '/api/appointments',
  appointmentRoutes
);

app.use(
  '/api/seo',
  seoRoutes
);

app.use(
  '/api/chat',
  chatRoutes
);


// ─── 404 handler ───────────────────────────────────────────
app.use(
  (req, res) => {
    res.status(404).json({
      success: false,
      message:
        `Route not found: ${req.method} ${req.originalUrl}`
    });
  }
);


// ─── Central error handler ─────────────────────────────────
app.use(errorHandler);


// ─── Start server ───────────────────────────────────────────
async function start() {
  try {
    await connectDB();

    app.listen(
      PORT,
      () => {
        console.log('');
        console.log(
          '================================================'
        );
        console.log(
          '  TeamSumit / MWE Backend API'
        );
        console.log(
          `  Running → http://localhost:${PORT}`
        );
        console.log(
          `  Health  → http://localhost:${PORT}/api/health`
        );
        console.log(
          `  API     → http://localhost:${PORT}/api/appointments`
        );
        console.log(
          `  Chat    → http://localhost:${PORT}/api/chat`
        );
        console.log(
          `  Env     → ${process.env.NODE_ENV}`
        );
        console.log(
          '================================================'
        );
        console.log('');
      }
    );
  } catch (err) {
    console.error(
      '[FATAL] Failed to start server:',
      err.message
    );

    process.exit(1);
  }
}

start();

module.exports = app;