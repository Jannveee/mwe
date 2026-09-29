import { useState, useRef } from 'react'
import { useInView } from '../../hooks/useInView.js'
import { useCountUp } from '../../hooks/useCountUp.js'

// Stat counters configuration
const STAT_COUNTERS = [
  {
    value: '50+',
    label: 'Seminars',
    badge: 'Stage & Keynotes',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" x2="12" y1="19" y2="22" />
      </svg>
    ),
  },
  {
    value: '500K+',
    label: 'Students Reached',
    badge: 'National Impact',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    value: '60K+',
    label: 'Network',
    badge: 'Founders & Builders',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" x2="22" y1="12" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
  {
    value: '3',
    label: 'Areas of Expertise',
    badge: 'AI · Venture · Mentorship',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
  },
]

// Core achievement cards
const ACHIEVEMENT_CARDS = [
  {
    id: 'ibor-2025',
    title: 'IBOR 2025',
    description: 'Youngest person (21 years) to organise a Hackathon Event in Nagpur, Maharashtra.',
    icon: (
      /* Award ribbon medal icon */
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
  {
    id: 'rtmnu-recognition',
    title: 'Felicitated by RTMNU University, Nagpur',
    description: 'Recognised for outstanding contributions to education and youth entrepreneurship by the Vice Chancellor of RTMNU across all campuses during 2022–2026.',
    icon: (
      /* Shield / Protection crest icon */
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    id: 'iit-nit-invites',
    title: "Got Invited to IIT's & NIT's across the Country",
    description: 'Invited at IITs, NITs, and other prestigious institutions to Speaker Session and Tech Talks',
    icon: (
      /* Speaker / Audience users icon */
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    id: 'highest-profile-engineer',
    title: 'One of the Highest Profile Engineer',
    description: 'Got Multiple Awards for academic excellence and achievements across various domains in session 2022–2026.',
    icon: (
      /* Graduation cap / Mortarboard icon */
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
]

// Gallery photo frames using all images starting with "hero"
const GALLERY_FRAMES = [
  {
    id: 'police-commissioner',
    title: 'Meeting the Police Commissioner of Nagpur',
    subtitle: 'Civic Leadership & Youth Safety',
    description: 'Discussion on youth empowerment, cyber innovation, and civic technology initiatives in Nagpur.',
    image: '/hero 1.jpeg',
    location: 'Nagpur Police Headquarters',
    tag: 'Civic Leadership',
  },
  {
    id: 'meeting-dignitaries',
    title: 'Union Minister Nitin Gadkari Sir',
    subtitle: 'State & Ministerial Engagements',
    description: 'Presenting regional youth innovation roadmaps and tech ecosystem developments before ministers & dignitaries.',
    image: '/hero 2.jpeg',
    location: 'Maharashtra State Forum',
    tag: 'Dignitaries',
  },
  {
    id: 'university-visits',
    title: 'University Visits & Tech Talks',
    subtitle: 'Campus Innovation & Keynotes',
    description: 'Invited across major engineering campuses, delivering keynote addresses and mentoring student builders.',
    image: '/hero 6.jpeg',
    location: 'Campus Auditoriums',
    tag: 'University Visits',
  },
  {
    id: 'national-hackathons',
    title: 'Felicitated by VC — RTMNU University',
    subtitle: 'IBOR World Record Event',
    description: 'Directing high-velocity developer hackathons and tech innovation summits across Maharashtra and India.',
    image: '/hero 3.jpeg',
    location: 'Nagpur Convention Center',
    tag: 'National Hackathons',
  },
  {
    id: 'academic-felicitation',
    title: 'Honors & Academic Felicitations',
    subtitle: 'Vice Chancellor & University Recognition',
    description: 'Recognised for pioneering contributions to engineering education, student innovation cohorts, and venture leadership.',
    image: '/hero 4.jpeg',
    location: 'RTMNU University Campus',
    tag: 'Academic Honors',
  },
]

// 6 Testimonials requested by user
const TESTIMONIALS = [
  {
    id: 'testimonial-1',
    quote: "Sumit's energy is infectious. He made the entire 500-student hall sit up and pay attention. His session on AI tools and the future of work was the highlight of our entire fest. Would invite again without hesitation.",
    author: 'Siddharth Raut',
    role: 'Student Fest Organizer, Nagpur',
    initials: 'SR',
  },
  {
    id: 'testimonial-2',
    quote: 'I had a one-on-one mentoring session with Sumit and it completely shifted my perspective on building a startup. His clarity, vision, and honesty are rare in someone so young. I walked out with a full action plan.',
    author: 'Nikhil Bawane',
    role: 'Startup Founder, Nagpur',
    initials: 'NB',
  },
  {
    id: 'testimonial-3',
    quote: 'The personal branding consultation with Sumit completely transformed how I present myself on LinkedIn. Within 3 weeks of implementing his strategy, my profile views tripled. Genuinely impressed by the depth of his thinking.',
    author: 'Kavya Meshram',
    role: 'Marketing Executive, Nagpur',
    initials: 'KM',
  },
  {
    id: 'testimonial-4',
    quote: 'SuPrazo built our business website and honestly exceeded expectations. Clean, fast, and modern. Sumit personally managed the project and delivered on time. Highly recommend.',
    author: 'Rohit Sharma',
    role: 'Business Owner, Nagpur',
    initials: 'RS',
  },
  {
    id: 'testimonial-5',
    quote: 'I attended the CodeElevate workshop and it was genuinely transformative. Sumit has a rare ability to break down complex AI concepts and make students feel capable. Real impact, real results.',
    author: 'Priya Kolhe',
    role: 'MBA Student, Nagpur University',
    initials: 'PK',
  },
  {
    id: 'testimonial-6',
    quote: 'We hired Sumit for a soft skills + AI session for our engineering college. Feedback from students was overwhelmingly positive. He commands a stage with confidence that most professionals can only dream of.',
    author: 'Dr. Vikas Thakre',
    role: 'HOD, Engineering College, Nagpur',
    initials: 'VT',
  },
]

function AchievementsPage({ onBackToMain }) {
  const [headerRef, headerInView] = useInView()
  const [galleryRef, galleryInView] = useInView()
  const [feedbackRef, feedbackInView] = useInView()
  const [activeModalImage, setActiveModalImage] = useState(null)
  const testimonialsScrollRef = useRef(null)

  function handlePrevTestimonials() {
    const container = testimonialsScrollRef.current
    if (!container) return
    const card = container.querySelector('.ts-testimonial-card')
    const step = card ? card.offsetWidth + 24 : 360

    if (container.scrollLeft <= 10) {
      container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' })
    } else {
      container.scrollBy({ left: -step, behavior: 'smooth' })
    }
  }

  function handleNextTestimonials() {
    const container = testimonialsScrollRef.current
    if (!container) return
    const card = container.querySelector('.ts-testimonial-card')
    const step = card ? card.offsetWidth + 24 : 360

    if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 15) {
      container.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      container.scrollBy({ left: step, behavior: 'smooth' })
    }
  }

  return (
    <div className="ts-achievements-page">
      <div className="ts-container">
        {/* Top bar with Back Button & Breadcrumbs — only top return button */}
        <nav className="ts-achievements-topbar" aria-label="Page navigation">
         

          <div className="ts-achievements-breadcrumb" aria-label="Breadcrumb">
            <span>Home</span>
            <span className="ts-breadcrumb-sep" aria-hidden="true">/</span>
            <span className="ts-breadcrumb-item--active">Achievements</span>
          </div>
        </nav>

        {/* -------------------------------------------------------------
            SECTION 1: MILESTONES & NUMBERS SECTION (Showcase Panel)
            ------------------------------------------------------------- */}
        <section id="milestones" className="ts-achievements-section" aria-labelledby="milestones-heading">
          <div ref={headerRef} className="ts-achievements-header ts-milestones-header">
            <p className={`ts-eyebrow anim-fade ${headerInView ? 'is-visible' : ''}`}>
              <span className="ts-eyebrow-dot" aria-hidden="true" />
              Milestones & Recognition
            </p>
            <h1
              id="milestones-heading"
              className={`ts-section-title ts-achievements-title anim-fade-up anim-delay-1 ${headerInView ? 'is-visible' : ''}`}
            >
              Numbers that tell the <span className="ts-title-accent">story.</span>
            </h1>
            <p className={`ts-section-subtitle ts-achievements-desc anim-fade-up anim-delay-2 ${headerInView ? 'is-visible' : ''}`}>
              Building a track record worth remembering — one milestone at a time.
            </p>
          </div>

          {/* Side-by-Side Showcase Panel: 2x2 Square Boxes on Left + 4 Vertical Cards on Right */}
          <div className="ts-milestones-showcase-panel">
            {/* Left Column: Square Stat Counters 2x2 Grid */}
            <div className="ts-stat-counters-grid" role="region" aria-label="Key Milestone Numbers">
              {STAT_COUNTERS.map((stat, idx) => (
                <StatCounterCard key={stat.label} stat={stat} index={idx} />
              ))}
            </div>

            {/* Right Column: Vertical Achievement Cards List */}
            <div className="ts-achievements-vertical-list" role="region" aria-label="Core Achievements">
              {ACHIEVEMENT_CARDS.map((card, idx) => (
                <AchievementCard key={card.id} card={card} index={idx} />
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* -------------------------------------------------------------
          SECTION 2: GALLERY SECTION ("Moments that define the journey")
          ------------------------------------------------------------- */}
      <section id="gallery" className="ts-section ts-gallery-section" aria-labelledby="gallery-heading">
        <div className="ts-container">
          <div ref={galleryRef} className="ts-achievements-header">
            <p className={`ts-eyebrow anim-fade ${galleryInView ? 'is-visible' : ''}`}>
              <span className="ts-eyebrow-dot" aria-hidden="true" />
              Gallery
            </p>
            <h2
              id="gallery-heading"
              className={`ts-section-title ts-achievements-title anim-fade-up anim-delay-1 ${galleryInView ? 'is-visible' : ''}`}
            >
              Moments that define the <span className="ts-title-accent">journey</span>
            </h2>
            <p className={`ts-section-subtitle ts-achievements-desc anim-fade-up anim-delay-2 ${galleryInView ? 'is-visible' : ''}`}>
              From college stages to ministers&apos; offices — every frame tells a chapter of the story.
            </p>
          </div>

          {/* Image-Overlay Photo Frames Grid */}
          <div className="ts-gallery-grid" role="region" aria-label="Visual Archive">
            {GALLERY_FRAMES.map((frame, index) => (
              <PhotoFrame
                key={frame.id}
                frame={frame}
                index={index}
                onSelect={() => setActiveModalImage(frame)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------
          SECTION 3: FEEDBACK SECTION ("What people say")
          With Top-Right Smooth Navigation Arrows
          ------------------------------------------------------------- */}
      <section id="testimonials" className="ts-section ts-feedback-section" aria-labelledby="feedback-heading">
        <div className="ts-container">
          <div className="ts-feedback-header-wrapper">
            <div ref={feedbackRef} className="ts-achievements-header" style={{ marginBottom: 0 }}>
              <p className={`ts-eyebrow anim-fade ${feedbackInView ? 'is-visible' : ''}`}>
                <span className="ts-eyebrow-dot" aria-hidden="true" />
                Testimonials
              </p>
              <h2
                id="feedback-heading"
                className={`ts-section-title ts-achievements-title anim-fade-up anim-delay-1 ${feedbackInView ? 'is-visible' : ''}`}
              >
                What people <span className="ts-title-accent">say</span>
              </h2>
              <p className={`ts-section-subtitle ts-achievements-desc anim-fade-up anim-delay-2 ${feedbackInView ? 'is-visible' : ''}`}>
                Direct reflections from student leaders, startup founders, and marketing executives who have collaborated with Sumit.
              </p>
            </div>

            {/* Left and Right Navigation Arrows in Top Right Corner */}
            <div className="ts-feedback-controls" aria-label="Testimonial navigation">
              <button
                type="button"
                onClick={handlePrevTestimonials}
                className="ts-slider-arrow-btn"
                aria-label="Previous testimonials"
                title="Previous testimonials"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
              </button>
              <button
                type="button"
                onClick={handleNextTestimonials}
                className="ts-slider-arrow-btn"
                aria-label="Next testimonials"
                title="Next testimonials"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </div>
          </div>

          {/* Smooth Snapping Carousel Slider */}
          <div
            ref={testimonialsScrollRef}
            className="ts-testimonials-slider-track"
            role="region"
            aria-label="Client & Partner Testimonials"
          >
            {TESTIMONIALS.map((testimonial, idx) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} index={idx} />
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox / Image Preview Modal */}
      {activeModalImage && (
        <div
          className="ts-gallery-modal"
          role="dialog"
          aria-modal="true"
          aria-label={activeModalImage.title}
          onClick={() => setActiveModalImage(null)}
        >
          <div className="ts-gallery-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ts-gallery-modal-close"
              onClick={() => setActiveModalImage(null)}
              aria-label="Close image modal"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <img
              src={activeModalImage.image}
              alt={activeModalImage.title}
              className="ts-gallery-modal-img"
            />

            <div className="ts-gallery-modal-info">
              <span className="ts-achievement-tag ts-achievement-tag--gold" style={{ marginBottom: '8px' }}>
                {activeModalImage.tag}
              </span>
              <h3 className="ts-gallery-modal-title">{activeModalImage.title}</h3>
              <p className="ts-gallery-modal-desc">{activeModalImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function StatCounterCard({ stat, index }) {
  const [ref, display] = useCountUp(stat.value)
  const [cardRef, isInView] = useInView({ threshold: 0.15 })

  return (
    <div
      ref={(el) => {
        ref.current = el
        cardRef.current = el
      }}
      className={`ts-stat-square-card anim-fade-up anim-delay-${(index % 4) + 1} ${isInView ? 'is-visible' : ''}`}
    >
      <div className="ts-stat-square-val">{display}</div>
      <div className="ts-stat-square-lbl">{stat.label}</div>
    </div>
  )
}

function AchievementCard({ card, index }) {
  const [ref, isInView] = useInView({ threshold: 0.18 })

  return (
    <article
      ref={ref}
      className={`ts-achievement-card anim-fade-right anim-delay-${(index % 4) + 1} ${isInView ? 'is-visible' : ''}`}
    >
      <div className="ts-achievement-card-inner">
        {/* Symbol icon on the left side */}
        <div className="ts-achievement-card-symbol" aria-hidden="true">
          {card.icon}
        </div>

        <div className="ts-achievement-card-content">
          <h3 className="ts-achievement-title">{card.title}</h3>
          <p className="ts-achievement-desc">{card.description}</p>
        </div>
      </div>
    </article>
  )
}

/**
 * Image-Overlay Card Format for Gallery
 * - 100% card height image with relative overflow-hidden and rounded corners
 * - NO top tag
 * - NO view frame button or text
 * - On hover, ONLY a single crisp white line of text shows itself smoothly
 */
function PhotoFrame({ frame, index, onSelect }) {
  const [ref, isInView] = useInView()

  return (
    <figure
      ref={ref}
      className={`group relative overflow-hidden rounded-2xl cursor-pointer shadow-md border border-[#E2DDD4] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#111215] aspect-[4/3] sm:aspect-[16/11] bg-[#111215] ts-photo-frame anim-fade-up anim-delay-${(index % 3) + 1} ${isInView ? 'is-visible' : ''}`}
      onClick={onSelect}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
      aria-label={`View photo: ${frame.title}`}
    >
      {/* 100% card height image */}
      <img
        src={frame.image}
        alt={frame.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ts-photo-frame-img"
        loading="lazy"
      />

      {/* On hover, ONLY a single white line of text shows itself */}
      <figcaption className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-black/90 via-black/55 to-transparent z-10 transition-all duration-300 transform opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 ts-photo-frame-overlay">
        <p className="font-heading text-sm sm:text-base font-bold text-white tracking-tight leading-snug truncate m-0 ts-photo-frame-title-single">
          {frame.title}
        </p>
      </figcaption>
    </figure>
  )
}

function TestimonialCard({ testimonial, index }) {
  const [ref, isInView] = useInView()

  return (
    <div
      ref={ref}
      className={`ts-testimonial-card anim-fade-up anim-delay-${(index % 3) + 1} ${isInView ? 'is-visible' : ''}`}
    >
      <div>
        <div className="ts-testimonial-top">
          <div className="ts-testimonial-stars" aria-label="5 out of 5 stars">
            {[...Array(5)].map((_, i) => (
              <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <svg className="ts-testimonial-quote-icon" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
        <blockquote className="ts-testimonial-quote">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>
      </div>

      <div className="ts-testimonial-author">
        <div className="ts-testimonial-avatar" aria-hidden="true">
          {testimonial.initials}
        </div>
        <div className="ts-testimonial-info">
          <div className="ts-testimonial-name">{testimonial.author}</div>
          <div className="ts-testimonial-role">{testimonial.role}</div>
        </div>
      </div>
    </div>
  )
}

export default AchievementsPage
