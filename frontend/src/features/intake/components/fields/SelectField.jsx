import { forwardRef } from 'react'

/**
 * SelectField
 * ---------------------------------------------------------------------
 * Reusable single-choice field (native <select> — deliberately not a
 * custom listbox, to keep the questionnaire lightweight and to get
 * correct mobile keyboard/picker behavior for free).
 *
 * Wires up label/hint/error accessibly: aria-describedby points at
 * whichever of hint/error are present, aria-invalid + aria-required
 * reflect field state, and the error is rendered with role="alert" so
 * screen readers announce it the moment validation runs.
 *
 * Forwards its ref to the underlying <select> so a parent can
 * imperatively focus the first invalid field after a failed
 * validation attempt.
 * ---------------------------------------------------------------------
 */
const SelectField = forwardRef(function SelectField(
  { id, label, required = false, error, hint, value, onChange, options, placeholder = 'Select…' },
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

      <select
        ref={ref}
        id={id}
        className={`ts-field-input ts-field-select ${error ? 'ts-field-input--error' : ''}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
      >
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p id={errorId} className="ts-field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

export default SelectField
