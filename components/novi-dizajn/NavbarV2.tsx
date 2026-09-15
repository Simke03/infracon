'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useFinishPageTransition } from './TransitionLink'
import Logo from '../Logo'
import { BASE } from './base'

const navLinks = [
  { href: '#o-nama', label: 'O nama' },
  { href: '#usluge', label: 'Usluge' },
  { href: '#projekti', label: 'Projekti' },
  { href: '#kontakt', label: 'Kontakt' },
]

// `solid` is for inner pages that have no photo hero behind the bar.
export default function NavbarV2({ solid = false }: { solid?: boolean }) {
  const router = useRouter()
  useFinishPageTransition()
  const [scrolled, setScrolled] = useState(solid)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(solid || window.scrollY > 50)
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
  }, [solid])

  // Open menu: lock page scroll and let Escape close it
  useEffect(() => {
    if (!mobileOpen) return
    const close = (e: KeyboardEvent) => e.key === 'Escape' && setMobileOpen(false)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', close)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', close)
    }
  }, [mobileOpen])

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push(`${BASE}${href}`)
    }
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,box-shadow] duration-300 ease-out ${
          scrolled
            ? 'bg-navy-900/90 backdrop-blur-md'
            : 'bg-transparent'
        }`}
        initial={{ opacity: 0, transform: 'translateY(-100%)' }}
        animate={{ opacity: 1, transform: 'translateY(0%)' }}
        transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <button
              onClick={() => (solid ? router.push(BASE) : window.scrollTo({ top: 0, behavior: 'smooth' }))}
              className={`flex items-center gap-3 group transition-[opacity,transform] duration-300 ease-out active:scale-[0.97] ${scrolled || mobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              aria-hidden={!(scrolled || mobileOpen)}
              tabIndex={scrolled || mobileOpen ? 0 : -1}
            >
              <Logo size={70} showText={false} light />
              <span className="font-dm font-semibold text-cream-100 tracking-widest text-sm">
                INFRACON
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`relative font-dm text-sm tracking-wider transition-[color,transform] duration-150 ease-out active:scale-[0.97] ${
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
                      transition={{ duration: 0.25, ease: [0.77, 0, 0.175, 1] }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Hamburger */}
            <button
              className="md:hidden relative w-11 h-11 -mr-1.5 flex items-center justify-center transition-transform duration-150 ease-out active:scale-[0.97]"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? 'Zatvori meni' : 'Otvori meni'}
            >
              <div className="flex flex-col gap-1.5">
                <motion.span
                  className="block w-6 h-px bg-cream-100 origin-center"
                  animate={mobileOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                />
                <motion.span
                  className="block w-6 h-px bg-cream-100"
                  animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15 }}
                />
                <motion.span
                  className="block w-6 h-px bg-cream-100 origin-center"
                  animate={mobileOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
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
            className="fixed inset-0 z-40 bg-navy-800/[0.98] backdrop-blur-lg md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-10">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-dm font-medium text-3xl text-cream-100 tracking-[-0.01em] active:scale-[0.97]"
                  initial={{ opacity: 0, transform: 'translateY(12px)' }}
                  animate={{ opacity: 1, transform: 'translateY(0px)' }}
                  exit={{ opacity: 0, transition: { duration: 0.1 } }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
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
