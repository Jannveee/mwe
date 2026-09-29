import { useInView } from '../../hooks/useInView.js'
import Section from '../layout/Section.jsx'

/**
 * Platform icons
 * - variant "tile":  coloured rounded square (used for the big card icon)
 * - variant "glyph": plain outline camera, coloured via currentColor (Instagram button)
 */
function PlatformIcon({ id, variant = 'tile' }) {
  if (id === 'instagram') {
    if (variant === 'glyph') {
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="ts-social-platform-icon ts-social-platform-icon--glyph"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      )
    }

    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="ts-social-platform-icon">
        <defs>
          <linearGradient id="ts-ig-tile-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F58529" />
            <stop offset="0.5" stopColor="#DD2A7B" />
            <stop offset="1" stopColor="#8134AF" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#ts-ig-tile-grad)" />
        <g
          transform="translate(5 5) scale(0.583)"
          fill="none"
          stroke="#fff"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </g>
      </svg>
    )
  }

  // LinkedIn tile (used for both the big icon and the button icon)
   return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="ts-social-platform-icon">
      <rect width="24" height="24" rx="6" fill="#0077B5" />
      <g fill="#fff" transform="translate(-0.5 0)">
        {/* the "i": dot + stem */}
        <circle cx="6.5" cy="6.6" r="1.7" />
        <rect x="5" y="10" width="3" height="9" />
        {/* the "n" */}
        <path d="M10.3 10h3v1.3c.5-.9 1.6-1.6 3.1-1.6 2.6 0 3.7 1.6 3.7 4.3V19h-3v-4.4c0-1.3-.4-2.2-1.6-2.2-1.3 0-2.2.9-2.2 2.3V19h-3z" />
      </g>
    </svg>
  )
  
}

const SOCIAL_PROFILES = [
  {
    id: 'instagram',
    platform: 'Instagram',
    handle: '@team_.sumit',
    tagline: 'Founder · Journey · AI · Business · Discipline',
    stats: [
      { value: '1K+', label: 'Followers' },
      { value: '20+', label: 'Posts' },
      { value: '100%', label: 'Real' },
    ],
    cta: 'Follow on Instagram',
    href: 'https://www.instagram.com/team_.sumit',
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    handle: 'Sumit Waghmare',
    tagline: 'Director · Entrepreneur · Speaker · Judge',
    stats: [
      { value: '17k+', label: 'Followers' },
      { value: '20+', label: 'Posts' },
      { value: 'Top', label: 'Voice' },
    ],
    cta: 'Connect on LinkedIn',
    href: 'https://www.linkedin.com/in/sumit-ceo',
  },
]

function SocialCard({ profile, animClass }) {
  const [ref, isInView] = useInView()
  return (
    <article
      ref={ref}
      className={`ts-social-card ${animClass} ${isInView ? 'is-visible' : ''}`}
      aria-label={`${profile.platform} profile for ${profile.handle}`}
    >
      {/* Platform icon */}
      <div className="ts-social-card__icon-wrap">
        <PlatformIcon id={profile.id} variant="tile" />
      </div>

      {/* Handle & tagline */}
      <div className="ts-social-card__identity">
        <p className="ts-social-card__handle">{profile.handle}</p>
        <p className="ts-social-card__tagline">{profile.tagline}</p>
      </div>

      {/* Stats row */}
      <div className="ts-social-card__stats anim-stagger">
        {profile.stats.map((stat) => (
          <div key={stat.label} className="ts-social-stat">
            <span className="ts-social-stat__value">{stat.value}</span>
            <span className="ts-social-stat__label">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href={profile.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`ts-social-card__cta ts-social-card__cta--${profile.id}`}
        aria-label={`${profile.cta} (opens in new tab)`}
      >
        <span className="ts-social-card__cta-icon" aria-hidden="true">
          <PlatformIcon
            id={profile.id}
            variant={profile.id === 'instagram' ? 'glyph' : 'tile'}
          />
        </span>
        {profile.cta}
      </a>
    </article>
  )
}

function SocialSection() {
  const [eyebrowRef, eyebrowInView] = useInView()
  const [titleRef, titleInView] = useInView()
  const [subRef, subInView] = useInView()

  return (
    <Section id="social" ariaLabel="Online Presence" tone="base" className="ts-social-section">
      <div className="ts-section-header">
        <p
          ref={eyebrowRef}
          className={`ts-eyebrow anim-fade ${eyebrowInView ? 'is-visible' : ''}`}
        >
          Online Presence
        </p>
        <h2
          ref={titleRef}
          className={`ts-section-title ts-social-title anim-fade-up ${titleInView ? 'is-visible' : ''}`}
        >
          Follow the <em className="ts-social-title__accent">journey</em>.
        </h2>
        <p
          ref={subRef}
          className={`ts-section-subtitle anim-fade-up anim-delay-2 ${subInView ? 'is-visible' : ''}`}
        >
          Documenting every step of building a company, a brand,
          and a life worth living.
        </p>
      </div>

      <div className="ts-social-grid">
        <SocialCard profile={SOCIAL_PROFILES[0]} animClass="anim-fade-left" />
        <SocialCard profile={SOCIAL_PROFILES[1]} animClass="anim-fade-right" />
      </div>
    </Section>
  )
}

export default SocialSection