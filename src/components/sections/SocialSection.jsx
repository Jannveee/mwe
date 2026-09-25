import { useInView } from '../../hooks/useInView.js'
import Section from '../layout/Section.jsx'

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
    // SVG icon inline — Instagram gradient brand colours
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="ts-social-platform-icon">
        <defs>
          <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
            <stop offset="0%" stopColor="#fdf497"/>
            <stop offset="5%" stopColor="#fdf497"/>
            <stop offset="45%" stopColor="#fd5949"/>
            <stop offset="60%" stopColor="#d6249f"/>
            <stop offset="90%" stopColor="#285AEB"/>
          </radialGradient>
        </defs>
        <rect width="24" height="24" rx="6" fill="url(#ig-grad)"/>
        <circle cx="12" cy="12" r="4" stroke="#fff" strokeWidth="1.8" fill="none"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="#fff"/>
      </svg>
    ),
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
    href: 'https://www.linkedin.com/in/sumit-ceo ',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="ts-social-platform-icon">
        <rect width="24" height="24" rx="6" fill="#0A66C2"/>
        <path d="M7 9.5H5V17H7V9.5ZM6 8.5C5.45 8.5 5 8.05 5 7.5S5.45 6.5 6 6.5 7 6.95 7 7.5 6.55 8.5 6 8.5ZM19 17H17V13.2C17 12.13 16.54 11.5 15.65 11.5C14.74 11.5 14.27 12.16 14.27 13.2V17H12.27V9.5H14.27V10.42C14.73 9.78 15.5 9.35 16.5 9.35C17.99 9.35 19 10.3 19 12.39V17Z" fill="#fff"/>
      </svg>
    ),
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
        {profile.icon}
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
        className="ts-social-card__cta"
        aria-label={`${profile.cta} (opens in new tab)`}
      >
        <span className="ts-social-card__cta-icon" aria-hidden="true">{profile.icon}</span>
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

