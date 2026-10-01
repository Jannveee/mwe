/**
 * src/models/EngagementRequest.js
 * ─────────────────────────────────────────────────────────────────────────
 * Mongoose model for all engagement / appointment submissions from the
 * TeamSumit intake flow.
 *
 * The 3 front-end roles (college / student / industry) map to the
 * REQUEST_TYPES enum. Additional types cover global engagement and the
 * remaining manager requirements.
 *
 * Design notes:
 *  - Only `name`, `email`, and `requestType` are mandatory — all other
 *    fields are optional so the existing simple intake path is not broken.
 *  - `details` is a flexible Mixed map so it stores role+reason-specific
 *    data from the front-end (institutionName, audienceSize, etc.)
 *    without requiring a rigid schema per flow.
 *  - `country` defaults to null (not "India") so global requests are
 *    fully supported.
 *  - Timestamps are managed automatically by Mongoose.
 */

'use strict';

const mongoose = require('mongoose');
const { Schema } = mongoose;

// ─── Allowed request types ────────────────────────────────────────────────
// These align with the front-end role+reason model and the manager's
// requirement for a consistent enum.
const REQUEST_TYPES = [
  'INDIVIDUAL_MENTORSHIP',   // student: career-guidance, idea-validation, resume-prep, networking
  'COLLEGE_UNIVERSITY',      // college role — any reason
  'WORKSHOP',                // faculty-dev, corporate-training
  'GUEST_LECTURE',           // college: guest-lecture
  'INDUSTRY_ENGAGEMENT',     // industry role — speaking, consulting, hiring, corporate-training
  'GLOBAL_ENGAGEMENT',       // explicitly international / online-only requests
  'OTHER',                   // catch-all
];

// ─── Schema ───────────────────────────────────────────────────────────────
const EngagementRequestSchema = new Schema(
  {
    // ── Core contact (always required) ───────────────────────────────────
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
      maxlength: [120, 'Name must not exceed 120 characters.'],
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email address.'],
    },
    phone: {
      type: String,
      trim: true,
      default: null,
    },

    // ── Request classification ────────────────────────────────────────────
    requestType: {
      type: String,
      required: [true, 'requestType is required.'],
      enum: {
        values: REQUEST_TYPES,
        message: `requestType must be one of: ${REQUEST_TYPES.join(', ')}.`,
      },
    },

    // ── Front-end role + reason (preserves intake context) ───────────────
    // role:   'college' | 'student' | 'industry'
    // reason: e.g. 'guest-lecture', 'career-guidance', 'consulting', …
    role: {
      type: String,
      trim: true,
      default: null,
    },
    reason: {
      type: String,
      trim: true,
      default: null,
    },

    // ── Institutional / organizational info ───────────────────────────────
    organizationName: {
      type: String,
      trim: true,
      default: null,
    },
    organizationType: {
      // e.g. 'university', 'company', 'ngo', 'government', 'individual'
      type: String,
      trim: true,
      default: null,
    },

    // ── Global engagement fields ──────────────────────────────────────────
    country: {
      type: String,
      trim: true,
      default: null,           // null = not specified; no default assumption
    },
    city: {
      type: String,
      trim: true,
      default: null,
    },
    engagementMode: {
      // 'in-person' | 'online' | 'hybrid'
      type: String,
      enum: {
        values: ['in-person', 'online', 'hybrid', null],
        message: "engagementMode must be 'in-person', 'online', or 'hybrid'.",
      },
      default: null,
    },

    // ── Scheduling ────────────────────────────────────────────────────────
    preferredDate: {
      type: Date,
      default: null,
    },

    // ── Free-text message ────────────────────────────────────────────────
    message: {
      type: String,
      trim: true,
      default: null,
      maxlength: [2000, 'Message must not exceed 2000 characters.'],
    },

    // ── Role-specific detail fields from the intake flow ─────────────────
    // Stored as a flexible map (Mixed) to accommodate the many field
    // combinations per role+reason without schema bloat.
    // Examples: { institutionName, audienceSize, topic, eventDate, … }
    details: {
      type: Schema.Types.Mixed,
      default: {},
    },

    // ── Submission metadata ───────────────────────────────────────────────
    source: {
      // Which part of the site triggered the form: 'homepage', 'pricing', etc.
      type: String,
      trim: true,
      default: null,
    },
    status: {
      // Internal workflow status — allows future admin tooling without a
      // separate collection.
      type: String,
      enum: ['pending', 'reviewed', 'responded', 'closed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,         // createdAt + updatedAt managed automatically
    versionKey: false,        // omit __v field from responses
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────
// Useful for admin lookups / filtering without a full collection scan.
EngagementRequestSchema.index({ email: 1 });
EngagementRequestSchema.index({ requestType: 1 });
EngagementRequestSchema.index({ status: 1 });
EngagementRequestSchema.index({ createdAt: -1 });

// ─── Export ───────────────────────────────────────────────────────────────
module.exports = mongoose.model('EngagementRequest', EngagementRequestSchema);
module.exports.REQUEST_TYPES = REQUEST_TYPES;
