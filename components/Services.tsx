'use client'

import { motion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import TiltCard from './TiltCard'
import FloatingShapes from './FloatingShapes'

const services = [
  {
    title: 'Visokogradnja',
    description: 'Stambeni i poslovni objekti — od temelja do krova, sa najvišim standardima kvaliteta i sigurnosti.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="1.5">
        <rect x="8" y="16" width="32" height="28" rx="1" />
        <line x1="8" y1="44" x2="40" y2="44" />
        <rect x="14" y="22" width="6" height="6" rx="0.5" />
        <rect x="28" y="22" width="6" height="6" rx="0.5" />
        <rect x="14" y="32" width="6" height="6" rx="0.5" />
        <rect x="28" y="32" width="6" height="6" rx="0.5" />
        <path d="M24 16V8L16 12" />
        <line x1="20" y1="44" x2="20" y2="38" />
        <line x1="28" y1="44" x2="28" y2="38" />
        <line x1="20" y1="38" x2="28" y2="38" />
      </svg>
    ),
  },
  {
    title: 'Niskogradnja',
    description: 'Putevi, mostovi i tuneli — infrastrukturni projekti koji povezuju zajednice i pokreću razvoj.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 36C4 36 12 20 24 20C36 20 44 36 44 36" />
        <line x1="4" y1="36" x2="44" y2="36" />
        <line x1="14" y1="36" x2="14" y2="26" />
        <line x1="24" y1="36" x2="24" y2="20" />
        <line x1="34" y1="36" x2="34" y2="26" />
        <path d="M4 40H44" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: 'Infrastruktura',
    description: 'Vodovod, kanalizacija i elektro mreže — vitalni sistemi koji čine osnovu svakog naselja.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="24" r="18" />
        <circle cx="24" cy="24" r="8" />
        <line x1="24" y1="6" x2="24" y2="16" />
        <line x1="24" y1="32" x2="24" y2="42" />
        <line x1="6" y1="24" x2="16" y2="24" />
        <line x1="32" y1="24" x2="42" y2="24" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Rekonstrukcija',
    description: 'Obnova i sanacija objekata — dajemo novi život postojećim strukturama uz poštovanje originalnog karaktera.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="1.5">
        <path d="M8 44V20L24 8L40 20V44" />
        <line x1="8" y1="44" x2="40" y2="44" />
        <path d="M18 44V32H30V44" />
        <rect x="14" y="22" width="6" height="6" rx="0.5" />
        <rect x="28" y="22" width="6" height="6" rx="0.5" />
        <path d="M36 14L42 8M42 8L38 8M42 8V12" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Projektovanje',
    description: 'Idejni i glavni projekti — od vizije do tehničke dokumentacije, sa pažnjom prema svakom detalju.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="6" width="36" height="36" rx="1" />
        <line x1="6" y1="14" x2="42" y2="14" />
        <line x1="14" y1="6" x2="14" y2="42" />
        <line x1="22" y1="14" x2="22" y2="42" strokeWidth="0.5" opacity="0.5" />
        <line x1="30" y1="14" x2="30" y2="42" strokeWidth="0.5" opacity="0.5" />
        <line x1="38" y1="14" x2="38" y2="42" strokeWidth="0.5" opacity="0.5" />
        <line x1="14" y1="22" x2="42" y2="22" strokeWidth="0.5" opacity="0.5" />
        <line x1="14" y1="30" x2="42" y2="30" strokeWidth="0.5" opacity="0.5" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Konsalting',
    description: 'Stručni savjeti i nadzor — profesionalna podrška u svim fazama planiranja i izvođenja radova.',
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-12 h-12" stroke="currentColor" strokeWidth="1.5">
        <circle cx="24" cy="16" r="10" />
        <path d="M24 6V8" />
        <path d="M24 24V26" />
        <path d="M14 16H16" />
        <path d="M32 16H34" />
        <path d="M24 16L30 12" strokeWidth="2" strokeLinecap="round" />
        <path d="M24 16V12" strokeWidth="1" strokeLinecap="round" />
        <rect x="10" y="32" width="28" height="10" rx="1" />
        <line x1="10" y1="36" x2="38" y2="36" />
        <line x1="18" y1="32" x2="18" y2="42" />
        <line x1="30" y1="32" x2="30" y2="42" />
        <line x1="24" y1="26" x2="24" y2="32" />
      </svg>
    ),
  },
]

export default function Services() {
  return (
    <section id="usluge" className="section-dark py-24 md:py-32 lg:py-40 relative overflow-hidden">
      <FloatingShapes />
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section header */}
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-display text-xs tracking-ultrawide text-cream-500 uppercase">
              Usluge
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream-100 mt-4 leading-tight">
              Potpuna ponuda
              <br />
              <span className="italic text-cream-400">građevinskih usluga</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Services grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.08}>
              <TiltCard tiltStrength={8}>
                <motion.div
                  className="group relative p-8 rounded-sm border border-cream-400/10 bg-navy-700/30 hover:bg-navy-700/60 transition-all duration-500"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Hover border effect */}
                  <div className="absolute inset-0 rounded-sm border border-cream-400/0 group-hover:border-cream-400/20 transition-all duration-500" />

                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-cream-400/5 via-transparent to-transparent" />

                  <div className="relative text-cream-400 group-hover:text-cream-300 transition-colors duration-300">
                    {service.icon}
                  </div>

                  <h3 className="relative font-display font-semibold text-cream-100 text-lg tracking-wide mt-6">
                    {service.title}
                  </h3>

                  <p className="relative text-cream-500 text-sm leading-relaxed mt-3 font-display">
                    {service.description}
                  </p>

                  {/* Decorative corner */}
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-cream-400/0 group-hover:border-cream-400/20 transition-all duration-500" />
                </motion.div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
