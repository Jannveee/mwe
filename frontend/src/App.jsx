import { useState, useEffect } from 'react'
import { useInView } from './hooks/useInView.js'
import useChatbot from './hooks/useChatbot.js'

import Layout from './components/layout/Layout.jsx'
import Section from './components/layout/Section.jsx'
import Hero from './components/sections/Hero.jsx'
import About from './components/sections/About.jsx'
import Ecosystem from './components/sections/Ecosystem.jsx'
import PricingSection from './components/sections/PricingSection.jsx'
import SocialSection from './components/sections/SocialSection.jsx'
import AchievementsPage from './components/sections/AchievementsPage.jsx'
import ChatWidget from './components/chatbot/ChatWidget.jsx'

function ConnectSection() {
  const [ref, inView] = useInView()

  return (
    <Section
      id="connect"
      ariaLabel="Connect With Sumit "
      className="ts-statement-section"
    >
      <div ref={ref}>
        <p className={`ts-eyebrow anim-fade ${inView ? 'is-visible' : ''}`}>
          Initiate Collaboration
        </p>

        <h2
          className={`ts-section-title anim-fade-up anim-delay-1 ${
            inView ? 'is-visible' : ''
          }`}
        >
          Let&apos;s Build Something Exceptional.
        </h2>

        <p
          className={`ts-section-subtitle anim-fade-up anim-delay-2 ${
            inView ? 'is-visible' : ''
          }`}
        >
          Whether you are inviting Sumit  for a university keynote, accelerating
          your startup MVP, or commissioning custom enterprise AI architecture
          with SuPrazo Technologies.
        </p>
      </div>
    </Section>
  )
}

function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash

      if (
        hash === '#achievements' ||
        hash === '#gallery' ||
        hash === '#testimonials' ||
        hash === '#milestones' ||
        hash.startsWith('#achievements')
      ) {
        return 'achievements'
      }
    }

    return 'main'
  })

  const {
    isOpen,
    onOpen,
    onClose,
    messages,
    isLoading,
    error,
    onSend,
    onClear,
  } = useChatbot()

  // Listen to hash changes for browser back/forward buttons
  useEffect(() => {
    function handleHash() {
      const hash = window.location.hash

      if (
        hash === '#achievements' ||
        hash === '#gallery' ||
        hash === '#testimonials' ||
        hash === '#milestones' ||
        hash.startsWith('#achievements')
      ) {
        setCurrentView('achievements')
      } else {
        setCurrentView('main')
      }
    }

    window.addEventListener('hashchange', handleHash)

    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  function handleOpenAchievements(subAnchor) {
    const targetHash = subAnchor ? `#${subAnchor}` : '#achievements'

    window.location.hash = targetHash
    setCurrentView('achievements')

    if (subAnchor) {
      setTimeout(() => {
        const el = document.getElementById(subAnchor)

        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  function handleBackToMain(target = 'main', anchor = '#home') {
    setCurrentView('main')

    if (
      window.location.hash.includes('achievements') ||
      window.location.hash.includes('gallery') ||
      window.location.hash.includes('testimonials') ||
      window.location.hash.includes('milestones')
    ) {
      window.history.pushState(null, '', window.location.pathname)
    }

    if (anchor && anchor !== '#home') {
      setTimeout(() => {
        const el = document.getElementById(anchor.replace('#', ''))

        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100)
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <>
      <Layout
        currentView={currentView}
        onNavigate={(target, anchor) => {
          if (target === 'main') {
            handleBackToMain(target, anchor)
          } else if (target === 'achievements') {
            handleOpenAchievements()
          }
        }}
        onOpenAchievements={handleOpenAchievements}
      >
        {currentView === 'achievements' ? (
          <AchievementsPage
            onBackToMain={() => handleBackToMain('main')}
          />
        ) : (
          <>
            <Hero />
            <About />
            <Ecosystem />
            <PricingSection />
            <SocialSection />
            <ConnectSection />
          </>
        )}
      </Layout>

      <ChatWidget
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSend={onSend}
        onClear={onClear}
      />
    </>
  )
}

export default App