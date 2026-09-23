import { forwardRef } from 'react'

/**
 * TextAreaField
 * ---------------------------------------------------------------------
 * Reusable free-text field. A <textarea> (not <input>) for every text
 * field here since even the "shorter" ones (career objective, the
 * guidance question) benefit from a couple of visible lines — kept to
 * `rows={2}` by default to stay lightweight rather than defaulting to
 * a tall composer box.
 *
 * Explicit font-size in ts-field-input (see intake.css) is >=16px,
 * which avoids iOS Safari's automatic zoom-on-focus for form fields —
 * relevant for mobile keyboard behavior.
 *
 * Same accessible wiring as SelectField: label/hint/error,
 * aria-describedby, aria-invalid, aria-required, and a forwarded ref
 * for focus management on validation failure.
 * ---------------------------------------------------------------------
 */
const TextAreaField = forwardRef(function TextAreaField(
  { id, label, required = false, error, hint, value, onChange, rows = 2, placeholder },
  ref,
) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="ts-field">
      <label htmlFor={id} className="ts-field-label">
        {label}
        {required && (
          <span className="ts-field-required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </label>

      {hint && (
        <p id={hintId} className="ts-field-hint">
          {hint}
        </p>
      )}

      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={`ts-field-input ts-field-textarea ${error ? 'ts-field-input--error' : ''}`}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
      />

      {error && (
        <p id={errorId} className="ts-field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

export default TextAreaField
