/**
 * Intake Validation Utilities
 * ---------------------------------------------------------------------
 * Centralized pure validation helpers for all intake questionnaires.
 * Standardizes email, phone, date, positive numbers, and text lengths
 * across student, faculty, founder, and corporate flows.
 * ---------------------------------------------------------------------
 */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
export const PHONE_REGEX = /^[\d\s+\-()]{10,15}$/

export function isValidEmail(value) {
  if (!value || typeof value !== 'string') return false
  return EMAIL_REGEX.test(value.trim())
}

export function isValidPhone(value) {
  if (!value || typeof value !== 'string') return false
  const trimmed = value.trim()
  const digits = trimmed.replace(/\D/g, '')
  return PHONE_REGEX.test(trimmed) && digits.length >= 10
}

export function isValidDate(value) {
  if (!value || typeof value !== 'string') return false
  const timestamp = Date.parse(value)
  return !Number.isNaN(timestamp)
}

export function isValidPositiveInteger(value) {
  if (value === null || value === undefined || value === '') return false
  const num = Number(value)
  return Number.isInteger(num) && num > 0
}

export function isNonEmptyText(value, minLength = 1) {
  if (!value || typeof value !== 'string') return false
  return value.trim().length >= minLength
}

/**
 * Validates Student / Learner answers.
 * Returns errors object (empty if valid).
 */
export function validateStudentAnswers(answers = {}) {
  const errors = {}

  if (!answers.guidanceType) {
    errors.guidanceType = 'Select a guidance type to continue.'
  }
  if (!answers.academicYear) {
    errors.academicYear = 'Select your academic year to continue.'
  }
  if (!isNonEmptyText(answers.careerObjective, 3)) {
    errors.careerObjective = 'Share a brief career objective (at least 3 characters).'
  }
  if (!isNonEmptyText(answers.guidanceQuestion, 5)) {
    errors.guidanceQuestion = 'Add your question for Sumit Sir (at least 5 characters).'
  }

  return errors
}

/**
 * Validates College Faculty / T&P Officer answers.
 */
export function validateFacultyAnswers(answers = {}) {
  const errors = {}

  if (!answers.engagementType) {
    errors.engagementType = 'Select an engagement type to continue.'
  }
  if (!isNonEmptyText(answers.institutionName, 2)) {
    errors.institutionName = 'Institution name is required.'
  }
  if (!isNonEmptyText(answers.contactPerson, 2)) {
    errors.contactPerson = 'Contact person name is required.'
  }
  if (!isNonEmptyText(answers.designation, 2)) {
    errors.designation = 'Designation is required.'
  }
  if (!answers.email?.trim()) {
    errors.email = 'Official email is required.'
  } else if (!isValidEmail(answers.email)) {
    errors.email = 'Enter a valid official email address.'
  }
  if (!answers.phone?.trim()) {
    errors.phone = 'Contact phone number is required.'
  } else if (!isValidPhone(answers.phone)) {
    errors.phone = 'Enter a valid 10-digit phone number.'
  }
  if (!isNonEmptyText(answers.city, 2)) {
    errors.city = 'City is required.'
  }
  if (!isNonEmptyText(answers.stateRegion, 2)) {
    errors.stateRegion = 'State or region is required.'
  }
  if (!isNonEmptyText(answers.eventName, 2)) {
    errors.eventName = 'Event or program name is required.'
  }
  if (!isValidDate(answers.eventDate)) {
    errors.eventDate = 'A valid event date is required.'
  }
  if (!isValidPositiveInteger(answers.audienceSize)) {
    errors.audienceSize = 'Enter a valid positive number for expected audience size.'
  }
  if (!answers.eventFormat) {
    errors.eventFormat = 'Select an event format (Offline, Online, or Hybrid).'
  }

  return errors
}

/**
 * Validates Startup Founder / Entrepreneur answers.
 */
export function validateFounderAnswers(answers = {}) {
  const errors = {}

  if (!answers.ventureStage) {
    errors.ventureStage = 'Select your venture stage to continue.'
  }
  if (!answers.adviceDomain) {
    errors.adviceDomain = 'Select an advice domain to continue.'
  }
  if (!Array.isArray(answers.bottlenecks) || answers.bottlenecks.length === 0) {
    errors.bottlenecks = 'Select at least one current bottleneck.'
  }
  if (!isNonEmptyText(answers.businessDescription, 5)) {
    errors.businessDescription = 'Describe your business or product (at least 5 characters).'
  }
  if (!isNonEmptyText(answers.desiredOutcome, 5)) {
    errors.desiredOutcome = 'Share your desired outcome from this interaction.'
  }

  return errors
}

/**
 * Validates Corporate Client / Business Partner answers.
 */
export function validateCorporateAnswers(answers = {}) {
  const errors = {}

  if (!isNonEmptyText(answers.companyName, 2)) {
    errors.companyName = 'Company / Organization name is required.'
  }
  if (!isNonEmptyText(answers.contactPerson, 2)) {
    errors.contactPerson = 'Contact person name is required.'
  }
  if (!answers.email?.trim()) {
    errors.email = 'Business email address is required.'
  } else if (!isValidEmail(answers.email)) {
    errors.email = 'Enter a valid business email address.'
  }
  if (!answers.phone?.trim()) {
    errors.phone = 'Contact phone number is required.'
  } else if (!isValidPhone(answers.phone)) {
    errors.phone = 'Enter a valid 10-digit contact phone number.'
  }
  if (!answers.serviceCategory) {
    errors.serviceCategory = 'Select a service category to continue.'
  }
  if (!isNonEmptyText(answers.requirementDescription, 5)) {
    errors.requirementDescription = 'Please summarize your business requirement.'
  }
  if (!answers.budgetRange) {
    errors.budgetRange = 'Select an indicative budget range to continue.'
  }
  if (!answers.timeline) {
    errors.timeline = 'Select an estimated project timeline.'
  }

  return errors
}
