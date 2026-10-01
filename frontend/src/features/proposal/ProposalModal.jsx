import { useEffect, useRef, useState } from 'react'
import { formatProposalMarkdown } from './proposalGenerator.js'
import { useFocusTrap } from '../intake/hooks/useFocusTrap.js'
import { useScrollLock } from '../intake/hooks/useScrollLock.js'

/**
 * ProposalModal — Phase 18 & 20
 * ---------------------------------------------------------------------
 * Displays the official institutional engagement proposal document.
 * Provides pure client-side PDF export via window.print() and
 * formatted text / markdown clipboard copying.
 * Includes complete keyboard focus trapping, scroll locking, and ARIA.
 * ---------------------------------------------------------------------
 */
function ProposalModal({ isOpen, onClose, proposalData }) {
  const [copied, setCopied] = useState(false)
  const dialogRef = useRef(null)

  useFocusTrap(dialogRef, isOpen)
  useScrollLock(isOpen)

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !proposalData) return null

  function handlePrint() {
    window.print()
  }

  async function handleCopy() {
    const text = formatProposalMarkdown(proposalData)
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback
    }
  }

  const { recipient, speaker, event, deliverables, prerequisites, commercials } = proposalData

  return (
    <div
      className="ts-proposal-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ts-proposal-dialog-title"
    >
      <div className="ts-proposal-dialog" ref={dialogRef}>
        <div className="ts-proposal-topbar">
          <h2 id="ts-proposal-dialog-title" className="ts-proposal-topbar-title">
            <span>📄</span> Official Proposal Preview
          </h2>
          <div className="ts-proposal-topbar-actions">
            <button
              type="button"
              className="ts-btn ts-btn--secondary ts-btn--sm"
              onClick={handleCopy}
            >
              {copied ? '✓ Copied' : 'Copy Text'}
            </button>
            <button
              type="button"
              className="ts-btn ts-btn--primary ts-btn--sm"
              onClick={handlePrint}
            >
              Print / Save PDF
            </button>
            <button
              type="button"
              className="ts-btn ts-btn--ghost ts-btn--sm"
              onClick={onClose}
              aria-label="Close proposal view"
            >
              &times; Close
            </button>
          </div>
        </div>

        <div className="ts-proposal-body">
          <div className="ts-proposal-sheet">
            {/* Letterhead */}
            <div className="ts-proposal-letterhead">
              <div className="ts-proposal-brand-lockup">
                <img
                  src="/teamsumit-logo.png"
                  alt="TeamSumit"
                  className="ts-proposal-logo-img"
                  width="48"
                  height="48"
                />
                <div>
                  <h1 className="ts-proposal-brand-title">TeamSumit</h1>
                  <p className="ts-proposal-brand-subtitle">
                    SuPrazo Technologies &bull; CodeElevate Academy &bull; SuPrathon Community
                  </p>
                </div>
              </div>
              <div className="ts-proposal-meta-card">
                <div>
                  <span className="ts-proposal-meta-ref">{proposalData.refCode}</span>
                </div>
                <div>Date: {proposalData.issueDate}</div>
              </div>
            </div>

            <h2 className="ts-proposal-doc-title">{proposalData.title}</h2>

            {/* Recipient & Speaker */}
            <div className="ts-proposal-section">
              <h3 className="ts-proposal-section-heading">1. Partner &amp; Resource Details</h3>
              <div className="ts-proposal-table-grid">
                <div className="ts-proposal-item">
                  <span className="ts-proposal-item-label">Institution / Organization</span>
                  <span className="ts-proposal-item-val">{recipient.institution}</span>
                </div>
                <div className="ts-proposal-item">
                  <span className="ts-proposal-item-label">Key Contact / Coordinator</span>
                  <span className="ts-proposal-item-val">
                    {recipient.name} ({recipient.designation})
                  </span>
                </div>
                <div className="ts-proposal-item">
                  <span className="ts-proposal-item-label">Location / City</span>
                  <span className="ts-proposal-item-val">{recipient.location}</span>
                </div>
                <div className="ts-proposal-item">
                  <span className="ts-proposal-item-label">Official Email &amp; Phone</span>
                  <span className="ts-proposal-item-val">
                    {recipient.email} | {recipient.phone}
                  </span>
                </div>
                <div className="ts-proposal-item">
                  <span className="ts-proposal-item-label">Invited Expert / Speaker</span>
                  <span className="ts-proposal-item-val">{speaker.name}</span>
                </div>
                <div className="ts-proposal-item">
                  <span className="ts-proposal-item-label">Speaker Designation &amp; Profile</span>
                  <span className="ts-proposal-item-val">{speaker.title}</span>
                </div>
              </div>
            </div>

            {/* Program Specs */}
            <div className="ts-proposal-section">
              <h3 className="ts-proposal-section-heading">2. Session Specifications</h3>
              <div className="ts-proposal-table-grid">
                <div className="ts-proposal-item">
                  <span className="ts-proposal-item-label">Program Name</span>
                  <span className="ts-proposal-item-val">{event.eventName}</span>
                </div>
                <div className="ts-proposal-item">
                  <span className="ts-proposal-item-label">Engagement Category</span>
                  <span className="ts-proposal-item-val">{event.engagementType}</span>
                </div>
                <div className="ts-proposal-item">
                  <span className="ts-proposal-item-label">Proposed Schedule</span>
                  <span className="ts-proposal-item-val">{event.eventDate}</span>
                </div>
                <div className="ts-proposal-item">
                  <span className="ts-proposal-item-label">Delivery Format &amp; Audience</span>
                  <span className="ts-proposal-item-val">
                    {event.format} &bull; {event.audience}
                  </span>
                </div>
              </div>
            </div>

            {/* Deliverables */}
            <div className="ts-proposal-section">
              <h3 className="ts-proposal-section-heading">3. Key Scope &amp; Deliverables</h3>
              <ol className="ts-proposal-list">
                {deliverables.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ol>
            </div>

            {/* Prerequisites */}
            <div className="ts-proposal-section">
              <h3 className="ts-proposal-section-heading">4. Technical &amp; Campus Logistics</h3>
              <ul className="ts-proposal-list" style={{ listStyleType: 'disc' }}>
                {prerequisites.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Commercial terms */}
            <div className="ts-proposal-section">
              <h3 className="ts-proposal-section-heading">5. Financial &amp; Operational Terms</h3>
              <div className="ts-proposal-callout">
                <p className="ts-proposal-callout-title">{commercials.summary}</p>
                <p className="ts-proposal-callout-body">{commercials.note}</p>
              </div>
            </div>

            {/* Signature Block */}
            <div className="ts-proposal-signatures">
              <div className="ts-proposal-sign-block">
                <div className="ts-proposal-sign-line" />
                <span className="ts-proposal-sign-name">Sumit Waghmare</span>
                <span className="ts-proposal-sign-role">Founder, TeamSumit &amp; SuPrazo Technologies</span>
              </div>
              <div className="ts-proposal-sign-block" style={{ textAlign: 'right', alignItems: 'flex-end' }}>
                <div className="ts-proposal-sign-line" />
                <span className="ts-proposal-sign-name">{recipient.name}</span>
                <span className="ts-proposal-sign-role">{recipient.institution}</span>
              </div>
            </div>

            <div className="ts-proposal-footer-note">
              Official inquiry coordination: {speaker.contactEmail} &bull; Validated for academic review and scheduling.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProposalModal
