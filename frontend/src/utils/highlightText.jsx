/**
 * Wraps any occurrence of the given terms in a paragraph with a
 * <mark className="ts-highlight"> span, preserving the rest of the text.
 */
export function highlightText(text, terms = []) {
  if (!terms.length) return text
  const pattern = new RegExp(`(${terms.map(escapeRegExp).join('|')})`, 'g')
  const parts = text.split(pattern)

  return parts.map((part, i) =>
    terms.includes(part) ? (
      <mark className="ts-highlight" key={i}>{part}</mark>
    ) : (
      <span key={i}>{part}</span>
    )
  )
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}