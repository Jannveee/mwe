import { forwardRef } from 'react'

/**
 * CheckboxGroupField
 * ---------------------------------------------------------------------
 * Reusable multi-select checkbox group component.
 * Uses a semantic <fieldset> and <legend> for accessibility,
 * ensuring screen readers announce the group context.
 *
 * Props:
 * - id: unique ID prefix for options
 * - legend: group label/question
 * - required: boolean
 * - error: error message string
 * - hint: helper text string
 * - options: Array<{ value: string, label: string }>
 * - values: Array<string> (currently selected values)
 * - onChange: (nextValues: string[]) => void
 * ---------------------------------------------------------------------
 */
const CheckboxGroupField = forwardRef(function CheckboxGroupField(
  { id, legend, required = false, error, hint, options = [], values = [], onChange },
  ref,
) {
  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  function handleToggle(optionValue) {
    const isChecked = values.includes(optionValue)
    const nextValues = isChecked
      ? values.filter((val) => val !== optionValue)
      : [...values, optionValue]
    onChange(nextValues)
  }

  return (
    <fieldset
      ref={ref}
      id={id}
      className={`ts-field ts-checkbox-group ${error ? 'ts-checkbox-group--error' : ''}`}
      aria-describedby={describedBy}
      aria-invalid={error ? true : undefined}
      aria-required={required || undefined}
    >
      <legend className="ts-field-label ts-checkbox-legend">
        {legend}
        {required && (
          <span className="ts-field-required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </legend>

      {hint && (
        <p id={hintId} className="ts-field-hint">
          {hint}
        </p>
      )}

      <div className="ts-checkbox-grid">
        {options.map((option) => {
          const optionId = `${id}-${option.value}`
          const isSelected = values.includes(option.value)

          return (
            <label
              key={option.value}
              htmlFor={optionId}
              className={`ts-checkbox-card ${isSelected ? 'ts-checkbox-card--checked' : ''}`}
            >
              <input
                id={optionId}
                type="checkbox"
                className="ts-checkbox-input"
                checked={isSelected}
                onChange={() => handleToggle(option.value)}
                value={option.value}
              />
              <span className="ts-checkbox-custom" aria-hidden="true" />
              <span className="ts-checkbox-label">{option.label}</span>
            </label>
          )
        })}
      </div>

      {error && (
        <p id={errorId} className="ts-field-error" role="alert">
          {error}
        </p>
      )}
    </fieldset>
  )
})

export default CheckboxGroupField
