export default function AudienceCard({ role, title, tag, bullets, onCtaClick }) {
  return (
    <article className="ts-card ts-glass audience-card">
      <span className="ts-badge">{tag}</span>
      <h3 className="audience-card__title">{title}</h3>
      <ul className="audience-card__bullets">
        {bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
      <button
        type="button"
        className="ts-btn"
        aria-label={`Book a session for ${title}`}
        onClick={() => onCtaClick(role)}
      >
        Book a Session
      </button>
    </article>
  );
}