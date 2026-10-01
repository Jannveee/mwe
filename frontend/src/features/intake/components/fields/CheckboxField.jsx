import { forwardRef } from 'react'

/**
 * CheckboxField
 * ---------------------------------------------------------------------
 * Reusable single boolean checkbox component (e.g. NDA required).
 * Accessible label and native input with custom cyberpunk-themed box.
 * ---------------------------------------------------------------------
 */
const CheckboxField = forwardRef(function CheckboxField(
  { id, label, checked = false, onChange, hint, error },
  ref,
) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="ts-field">
      <label
        htmlFor={id}
        className={`ts-checkbox-card ${checked ? 'ts-checkbox-card--checked' : ''}`}
      >
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="ts-checkbox-input"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          aria-describedby={describedBy}
          aria-invalid={error ? true : undefined}
        />
        <span className="ts-checkbox-custom" aria-hidden="true" />
        <div className="ts-field-label-group">
          <span className="ts-checkbox-label">{label}</span>
          {hint && (
            <p id={hintId} className="ts-field-hint" style={{ margin: '2px 0 0' }}>
              {hint}
            </p>
          )}
        </div>
      </label>

      {error && (
        <p id={errorId} className="ts-field-error" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

export default CheckboxField
