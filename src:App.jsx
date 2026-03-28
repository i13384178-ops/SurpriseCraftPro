import React, { useState, useEffect, createContext, useContext } from 'react'
import translations from './i18n.js'
import Navbar from './components/Navbar.jsx'
import HomeView from './components/HomeView.jsx'
import AboutView from './components/AboutView.jsx'
import ServicesView from './components/ServicesView.jsx'
import DemoView from './components/DemoView.jsx'
import PricingView from './components/PricingView.jsx'
import ContactView from './components/ContactView.jsx'
import AdminView from './components/AdminView.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppButton from './components/WhatsAppButton.jsx'
import FloatingHearts from './components/FloatingHearts.jsx'

export const AppContext = createContext()

export function useApp() {
  return useContext(AppContext)
}

export default function App() {
  const [view, setView] = useState('home')
  const [lang, setLang] = useState('nl')
  const [dark, setDark] = useState(false)
  const [transitioning, setTransitioning] = useState(false)

  const t = translations[lang] || translations.en

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  const navigateTo = (newView) => {
    if (newView === view) return
    setTransitioning(true)
    setTimeout(() => {
      setView(newView)
      setTransitioning(false)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 300)
  }

  const renderView = () => {
    switch (view) {
      case 'about': return <AboutView />
      case 'services': return <ServicesView />
      case 'demos': return <DemoView />
      case 'pricing': return <PricingView />
      case 'contact': return <ContactView />
      case 'admin': return <AdminView />
      default: return <HomeView />
    }
  }

  return (
    <AppContext.Provider value={{ view, setView: navigateTo, lang, setLang, dark, setDark, t }}>
      <div className={`app ${dark ? 'dark' : 'light'}`}>
        <FloatingHearts />
        <Navbar />
        <main className={`main-content ${transitioning ? 'fade-out' : 'fade-in'}`}>
          {renderView()}
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </AppContext.Provider>
  )
}
