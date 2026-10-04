/**
 * src/models/EngagementRequest.js
 * ─────────────────────────────────────────────────────────────────────────
 * Mongoose model for all engagement / appointment submissions from the
 * TeamSumit intake flow.
 *
 * The 3 front-end roles (college / student / industry) map to the
 * REQUEST_TYPES enum. Additional types cover global engagement and the
 * remaining manager requirements.
 */

import mongoose, { Schema } from 'mongoose';

// ─── Allowed request types ────────────────────────────────────────────────
export const REQUEST_TYPES = [
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
      type: String,
      trim: true,
      default: null,
    },

    // ── Global engagement fields ──────────────────────────────────────────
    country: {
      type: String,
      trim: true,
      default: null,
    },
    city: {
      type: String,
      trim: true,
      default: null,
    },
    engagementMode: {
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
    details: {
      type: Schema.Types.Mixed,
      default: {},
    },

    // ── Submission metadata ───────────────────────────────────────────────
    source: {
      type: String,
      trim: true,
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'responded', 'closed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// ─── Indexes ──────────────────────────────────────────────────────────────
EngagementRequestSchema.index({ email: 1 });
EngagementRequestSchema.index({ requestType: 1 });
EngagementRequestSchema.index({ status: 1 });
EngagementRequestSchema.index({ createdAt: -1 });

// Cache model on mongoose instance to prevent recompilation in Next.js hot reload
const EngagementRequest =
  mongoose.models.EngagementRequest ||
  mongoose.model('EngagementRequest', EngagementRequestSchema);

export default EngagementRequest;
export { EngagementRequest };
