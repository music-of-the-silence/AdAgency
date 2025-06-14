import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { AnimatePresence } from 'framer-motion'
import { useCallback } from 'react'

// Components
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const { t: T, i18n } = useTranslation()

  // Set RTL direction for Arabic language
  const setDirection = useCallback(() => {
    const isRTL = i18n.language === 'ar';
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  }, [i18n.language]);

  // Apply direction when language changes
  useEffect(() => {
    setDirection();
  }, [i18n.language, setDirection]);

  // Set up jQuery for any potential jQuery plugins
  useEffect(() => {
    // jQuery initialization code can go here if needed
    return () => {
      // Cleanup jQuery if necessary
    }
  }, [])

  return (
    <AnimatePresence>
      <div className="min-h-screen bg-light dark:bg-primary text-dark dark:text-light relative">
        <Header />
        <main>
          <Hero />
          <Services />
          <Portfolio />
          <Testimonials />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </AnimatePresence>
  )
}

export default App
