import { useInView } from '../hooks/useInView.js'

/**
 * Timeline
 * ---------------------------------------------------------------------
 * Renders a list of milestone entries as a responsive vertical
 * timeline (single column on mobile, connected rail on larger
 * screens). Built as a semantic <ol> since milestones are
 * chronologically ordered.
 * ---------------------------------------------------------------------
 */
function Timeline({ items }) {
  return (
    <ol className="ts-timeline">
      {items.map((item, index) => (
        <TimelineItem key={item.id} item={item} index={index} />
      ))}
    </ol>
  )
}

function TimelineItem({ item, index }) {
  const [ref, isInView] = useInView()

  return (
    <li
      ref={ref}
      className={`ts-timeline-item ${isInView ? 'ts-timeline-item--visible' : ''} ${index === 0 ? 'ts-timeline-item--latest' : ''}`}
      style={{ transitionDelay: `${Math.min(index, 4) * 80}ms` }}
    >
      <div className="ts-timeline-marker" aria-hidden="true" />
      <div className="ts-timeline-content">
        <span className="ts-timeline-badge">{item.marker}</span>
        <h3 className="ts-timeline-title">{item.title}</h3>
        <p className="ts-timeline-description">{item.description}</p>
      </div>
    </li>
  )
}

export default Timeline
