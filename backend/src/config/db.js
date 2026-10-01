/**
 * src/config/db.js
 * ─────────────────────────────────────────────────────────────────────────
 * MongoDB connection via Mongoose.
 * URI is read from process.env.MONGODB_URI — never hardcoded.
 */

'use strict';

const mongoose = require('mongoose');

async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment variables.');
  }

  await mongoose.connect(uri);

  console.log(`[DB] MongoDB connected: ${mongoose.connection.host}`);
}

module.exports = { connectDB };
