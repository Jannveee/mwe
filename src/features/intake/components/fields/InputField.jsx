import { forwardRef } from 'react'

/**
 * InputField
 * ---------------------------------------------------------------------
 * Reusable single-line text / email / tel / date / number input field.
 * Native inputs ensure accessible keyboard types (number pad, email,
 * date picker) across mobile browsers.
 *
 * Follows the same accessible wiring as SelectField and TextAreaField:
 * - label with required indicator
 * - aria-describedby pointing to hint and error
 * - role="alert" on inline error
 * - forwarded ref for imperative focus on validation failure
 * ---------------------------------------------------------------------
 */
const InputField = forwardRef(function InputField(
  {
    id,
    label,
    type = 'text',
    required = false,
    error,
    hint,
    value,
    onChange,
    placeholder,
    min,
    max,
    step,
    autoComplete,
  },
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

      <input
        ref={ref}
        id={id}
        type={type}
        className={`ts-field-input ${error ? 'ts-field-input--error' : ''}`}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        autoComplete={autoComplete}
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

export default InputField
