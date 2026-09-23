import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from '../hooks/useFocusTrap.js'
import { useScrollLock } from '../hooks/useScrollLock.js'

/**
 * ModalShell
 * ---------------------------------------------------------------------
 * Purely structural/accessible modal chrome — knows nothing about
 * intake state. Handles:
 * - Portal to document.body (correct stacking regardless of trigger).
 * - role="dialog" + aria-modal + aria-labelledby (title) +
 *   aria-describedby (optional subtitle).
 * - Focus trap + focus restore (useFocusTrap).
 * - Body scroll lock while open (useScrollLock).
 * - Escape-to-close.
 * - Click on the overlay (outside the dialog) closes it.
 * - A close (×) button, always present.
 *
 * `onClose` is called for Escape, overlay click, and the close button
 * alike — the caller (ConnectModal) decides whether that maps to
 * CANCEL or CLOSE (today they're the same action).
 * ---------------------------------------------------------------------
 */
function ModalShell({ isOpen, titleId, title, descriptionId, onClose, children }) {
  const dialogRef = useRef(null)

  useFocusTrap(dialogRef, isOpen)
  useScrollLock(isOpen)

  useEffect(() => {
    if (!isOpen) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  function handleOverlayMouseDown(event) {
    // Only close when the mousedown started on the overlay itself,
    // not when a drag/selection started inside the dialog and was
    // released over the overlay.
    if (event.target === event.currentTarget) {
      onClose()
    }
  }

  return createPortal(
    <div
      className="ts-modal-overlay ts-intake-overlay"
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        ref={dialogRef}
        className="ts-modal ts-intake-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
      >
        <button
          type="button"
          className="ts-modal-close"
          aria-label="Close dialog"
          onClick={onClose}
          data-autofocus
        >
          <span aria-hidden="true">&times;</span>
        </button>

        <h2 id={titleId} className="ts-intake-title">
          {title}
        </h2>

        {children}
      </div>
    </div>,
    document.body,
  )
}

export default ModalShell
