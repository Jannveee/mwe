/**
 * src/validators/appointmentValidator.js
 * ─────────────────────────────────────────────────────────────────────────
 * Pure JavaScript validation matching express-validator rules and response
 * format for appointment / engagement requests.
 */

import { REQUEST_TYPES } from '../models/EngagementRequest.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s+\-().]{7,20}$/;
const MONGO_ID_REGEX = /^[0-9a-fA-F]{24}$/;

export function validateSubmitRequest(body) {
  const errors = [];
  const data = body || {};

  // ── name ──────────────────────────────────────────────────────────────────
  const rawName = data.name !== undefined && data.name !== null ? String(data.name).trim() : '';
  if (!rawName) {
    errors.push({ field: 'name', message: 'Name is required.' });
  } else if (rawName.length > 120) {
    errors.push({ field: 'name', message: 'Name must not exceed 120 characters.' });
  }

  // ── email ─────────────────────────────────────────────────────────────────
  const rawEmail = data.email !== undefined && data.email !== null ? String(data.email).trim() : '';
  if (!rawEmail) {
    errors.push({ field: 'email', message: 'Email is required.' });
  } else if (!EMAIL_REGEX.test(rawEmail)) {
    errors.push({ field: 'email', message: 'A valid email address is required.' });
  }

  // ── requestType ───────────────────────────────────────────────────────────
  const rawRequestType =
    data.requestType !== undefined && data.requestType !== null ? String(data.requestType).trim() : '';
  if (!rawRequestType) {
    errors.push({ field: 'requestType', message: 'requestType is required.' });
  } else if (!REQUEST_TYPES.includes(rawRequestType)) {
    errors.push({
      field: 'requestType',
      message: `requestType must be one of: ${REQUEST_TYPES.join(', ')}.`,
    });
  }

  // ── phone ─────────────────────────────────────────────────────────────────
  if (data.phone !== undefined && data.phone !== null && String(data.phone).trim() !== '') {
    const rawPhone = String(data.phone).trim();
    if (!PHONE_REGEX.test(rawPhone)) {
      errors.push({
        field: 'phone',
        message: 'Phone number must contain only digits, spaces, +, -, (, ) and be 7–20 characters.',
      });
    }
  }

  // ── role ──────────────────────────────────────────────────────────────────
  if (data.role !== undefined && data.role !== null && String(data.role).trim() !== '') {
    const rawRole = String(data.role).trim();
    if (!['college', 'student', 'industry', ''].includes(rawRole)) {
      errors.push({
        field: 'role',
        message: "role must be 'college', 'student', or 'industry'.",
      });
    }
  }

  // ── reason ────────────────────────────────────────────────────────────────
  if (data.reason !== undefined && data.reason !== null && String(data.reason).trim() !== '') {
    const rawReason = String(data.reason).trim();
    if (rawReason.length > 80) {
      errors.push({ field: 'reason', message: 'reason must not exceed 80 characters.' });
    }
  }

  // ── organizationName ──────────────────────────────────────────────────────
  if (
    data.organizationName !== undefined &&
    data.organizationName !== null &&
    String(data.organizationName).trim() !== ''
  ) {
    const rawOrg = String(data.organizationName).trim();
    if (rawOrg.length > 200) {
      errors.push({ field: 'organizationName', message: 'organizationName must not exceed 200 characters.' });
    }
  }

  // ── organizationType ──────────────────────────────────────────────────────
  if (
    data.organizationType !== undefined &&
    data.organizationType !== null &&
    String(data.organizationType).trim() !== ''
  ) {
    const rawOrgType = String(data.organizationType).trim();
    if (rawOrgType.length > 80) {
      errors.push({ field: 'organizationType', message: 'organizationType must not exceed 80 characters.' });
    }
  }

  // ── country ───────────────────────────────────────────────────────────────
  if (data.country !== undefined && data.country !== null && String(data.country).trim() !== '') {
    const rawCountry = String(data.country).trim();
    if (rawCountry.length > 100) {
      errors.push({ field: 'country', message: 'country must not exceed 100 characters.' });
    }
  }

  // ── city ──────────────────────────────────────────────────────────────────
  if (data.city !== undefined && data.city !== null && String(data.city).trim() !== '') {
    const rawCity = String(data.city).trim();
    if (rawCity.length > 100) {
      errors.push({ field: 'city', message: 'city must not exceed 100 characters.' });
    }
  }

  // ── engagementMode ────────────────────────────────────────────────────────
  if (
    data.engagementMode !== undefined &&
    data.engagementMode !== null &&
    String(data.engagementMode).trim() !== ''
  ) {
    const rawMode = String(data.engagementMode).trim();
    if (!['in-person', 'online', 'hybrid'].includes(rawMode)) {
      errors.push({
        field: 'engagementMode',
        message: "engagementMode must be 'in-person', 'online', or 'hybrid'.",
      });
    }
  }

  // ── preferredDate ─────────────────────────────────────────────────────────
  if (
    data.preferredDate !== undefined &&
    data.preferredDate !== null &&
    String(data.preferredDate).trim() !== ''
  ) {
    const rawDate = String(data.preferredDate).trim();
    const parsedDate = new Date(rawDate);
    // Must be valid date string
    if (isNaN(parsedDate.getTime())) {
      errors.push({
        field: 'preferredDate',
        message: 'preferredDate must be a valid ISO 8601 date (e.g. 2025-12-31).',
      });
    }
  }

  // ── message ───────────────────────────────────────────────────────────────
  if (data.message !== undefined && data.message !== null && String(data.message).trim() !== '') {
    const rawMessage = String(data.message).trim();
    if (rawMessage.length > 2000) {
      errors.push({ field: 'message', message: 'Message must not exceed 2000 characters.' });
    }
  }

  // ── details ───────────────────────────────────────────────────────────────
  if (data.details !== undefined && data.details !== null) {
    if (typeof data.details !== 'object' || Array.isArray(data.details)) {
      errors.push({ field: 'details', message: 'details must be a JSON object.' });
    }
  }

  // ── source ────────────────────────────────────────────────────────────────
  if (data.source !== undefined && data.source !== null && String(data.source).trim() !== '') {
    const rawSource = String(data.source).trim();
    if (rawSource.length > 60) {
      errors.push({ field: 'source', message: 'source must not exceed 60 characters.' });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

export function validateMongoId(id) {
  if (!id || !MONGO_ID_REGEX.test(String(id))) {
    return {
      isValid: false,
      errors: [{ field: 'id', message: 'Invalid request ID format.' }],
    };
  }
  return { isValid: true, errors: [] };
}
