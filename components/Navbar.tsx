'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'

const navLinks = [
  { href: '#o-nama', label: 'O nama' },
  { href: '#usluge', label: 'Usluge' },
  { href: '#projekti', label: 'Projekti' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleSectionObserve = () => {
      const sections = ['o-nama', 'usluge', 'projekti', 'kontakt']
      const scrollPos = window.scrollY + 200

      for (const id of sections.reverse()) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(id)
          return
        }
      }
      setActiveSection('')
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('scroll', handleSectionObserve, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('scroll', handleSectionObserve)
    }
  }, [])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy-800/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-3 group"
            >
              <Logo size={70} showText={false} light />
              <span className="font-display font-semibold text-cream-100 tracking-widest text-sm">
                INFRACON
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative font-display text-sm tracking-wider transition-colors duration-300 ${
                    activeSection === link.href.slice(1)
                      ? 'text-cream-100'
                      : 'text-cream-400 hover:text-cream-100'
                  }`}
                >
                  {link.label}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-px bg-cream-400"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden relative w-8 h-8 flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  className="block w-6 h-px bg-cream-100 origin-center"
                  animate={mobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
                <motion.span
                  className="block w-6 h-px bg-cream-100"
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.span
                  className="block w-6 h-px bg-cream-100 origin-center"
                  animate={mobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-navy-800/98 backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-serif text-3xl text-cream-100 tracking-wider"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
