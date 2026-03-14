'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import TiltCard from './TiltCard'

const categories = ['Sve', 'Visokogradnja', 'Niskogradnja', 'Infrastruktura']

interface Project {
  title: string
  category: string
  description: string
  color: string
  details: {
    lokacija: string
    godina: string
    površina: string
    status: string
    opis: string
  }
}

const projects: Project[] = [
  {
    title: 'Stambeni kompleks "Marina"',
    category: 'Visokogradnja',
    description: 'Savremeni stambeni kompleks sa 48 stanova u Podgorici.',
    color: 'from-navy-600 to-navy-800',
    details: {
      lokacija: 'Podgorica, Zabjelo',
      godina: '2024 — 2025',
      površina: '6.200 m²',
      status: 'Završen',
      opis: 'Savremeni stambeni kompleks sa 48 stambenih jedinica raspoređenih u tri lamele. Projekat obuhvata podzemnu garažu, dječije igralište, zelene površine i modernu fasadu sa termoizolacijom. Svi stanovi ispunjavaju najviše standarde energetske efikasnosti.',
    },
  },
  {
    title: 'Regionalni put Cetinje-Budva',
    category: 'Niskogradnja',
    description: 'Rekonstrukcija dionice puta u dužini od 12km.',
    color: 'from-navy-700 to-navy-900',
    details: {
      lokacija: 'Cetinje — Budva',
      godina: '2024',
      površina: '12 km',
      status: 'Završen',
      opis: 'Kompletna rekonstrukcija regionalne saobraćajnice uključujući zamjenu asfaltnog zastora, proširenje kolovoza, izgradnju novih odvodnih kanala i postavljanje zaštitnih ograda. Projekat je značajno poboljšao bezbjednost i protočnost saobraćaja.',
    },
  },
  {
    title: 'Vodovodna mreža Danilovgrad',
    category: 'Infrastruktura',
    description: 'Proširenje vodovodne mreže za 3 nova naselja.',
    color: 'from-navy-500 to-navy-700',
    details: {
      lokacija: 'Danilovgrad',
      godina: '2025',
      površina: '8.5 km mreže',
      status: 'U toku',
      opis: 'Proširenje vodovodne mreže za tri nova naselja u okolini Danilovgrada. Projekat uključuje postavljanje glavnog cjevovoda, distributivnih linija, hidranata i priključaka za domaćinstva. Koriste se HDPE cijevi najnovije generacije.',
    },
  },
  {
    title: 'Poslovni centar "Atlas"',
    category: 'Visokogradnja',
    description: 'Moderan poslovni objekat sa 2.500m² korisne površine.',
    color: 'from-navy-600 to-navy-900',
    details: {
      lokacija: 'Podgorica, City kvart',
      godina: '2024 — 2025',
      površina: '2.500 m²',
      status: 'Završen',
      opis: 'Moderan poslovni objekat na četiri etaže sa podzemnim parkingom. Objekat je projektovan po principima pametne zgrade sa centralnim sistemom upravljanja klimatizacijom, osvjetljenjem i pristupom. Fasada kombinuje aluminijumske panele i strukturalno staklo.',
    },
  },
  {
    title: 'Most na rijeci Morači',
    category: 'Niskogradnja',
    description: 'Novi pješačko-biciklistički most u urbanom području.',
    color: 'from-navy-700 to-navy-800',
    details: {
      lokacija: 'Podgorica',
      godina: '2025',
      površina: '120 m',
      status: 'U toku',
      opis: 'Pješačko-biciklistički most savremenog dizajna koji povezuje dva gradska naselja preko rijeke Morače. Čelična konstrukcija sa drvenom oblogom pruža siguran i estetski privlačan prelaz. Most uključuje LED rasvjetu i odmorišta sa klupama.',
    },
  },
  {
    title: 'Kanalizacioni sistem Bar',
    category: 'Infrastruktura',
    description: 'Izgradnja sistema za prečišćavanje otpadnih voda.',
    color: 'from-navy-500 to-navy-800',
    details: {
      lokacija: 'Bar',
      godina: '2024 — 2025',
      površina: '15 km mreže',
      status: 'Završen',
      opis: 'Izgradnja kompletnog kanalizacionog sistema uključujući kolektor, pumpne stanice i postrojenje za prečišćavanje otpadnih voda. Sistem obrađuje otpadne vode prije ispuštanja u more, čime se značajno poboljšava ekološko stanje priobalnog pojasa.',
    },
  },
  {
    title: 'Stambena zgrada "Sunce"',
    category: 'Visokogradnja',
    description: 'Energetski efikasna stambena zgrada sa 24 stana.',
    color: 'from-navy-600 to-navy-700',
    details: {
      lokacija: 'Nikšić',
      godina: '2025',
      površina: '3.100 m²',
      status: 'U toku',
      opis: 'Stambena zgrada sa 24 stana projektovana po standardima energetske efikasnosti klase A. Objekat koristi solarnu energiju za zagrijavanje vode, ima ventilisanu fasadu i trostruko zastakljene prozore. Uključuje zajednički krovni vrt.',
    },
  },
  {
    title: 'Elektro mreža Nikšić',
    category: 'Infrastruktura',
    description: 'Modernizacija elektrodistributivne mreže.',
    color: 'from-navy-700 to-navy-950',
    details: {
      lokacija: 'Nikšić, šire područje',
      godina: '2024',
      površina: '22 km mreže',
      status: 'Završen',
      opis: 'Kompletna modernizacija elektrodistributivne mreže na širem području Nikšića. Projekat obuhvata zamjenu starih nadzemnih vodova podzemnim kablovima, ugradnju novih trafo-stanica i implementaciju sistema daljinskog nadzora i upravljanja.',
    },
  },
]

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('Sve')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [selectedProject])

  const filtered = activeFilter === 'Sve'
    ? projects
    : projects.filter((p) => p.category === activeFilter)

  return (
    <>
      <section id="projekti" className="section-light py-24 md:py-32 lg:py-40">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section header */}
          <ScrollReveal>
            <div className="max-w-3xl">
              <span className="font-display text-xs tracking-ultrawide text-cream-600 uppercase">
                Projekti
              </span>
              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy-800 mt-4 leading-tight">
                Naš portfolio
                <br />
                <span className="italic text-navy-500">realizovanih radova</span>
              </h2>
            </div>
          </ScrollReveal>

          {/* Filter tabs */}
          <ScrollReveal delay={0.1}>
            <div className="flex flex-wrap gap-3 mt-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`font-display text-sm tracking-wider px-5 py-2 rounded-sm transition-all duration-300 ${
                    activeFilter === cat
                      ? 'bg-navy-800 text-cream-100'
                      : 'bg-navy-100/50 text-navy-600 hover:bg-navy-200/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </ScrollReveal>

          {/* Projects grid */}
          <motion.div layout="position" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.title}
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <TiltCard tiltStrength={6} className="group relative aspect-[4/3] rounded-sm overflow-hidden cursor-pointer"
                  >
                    <div
                      className="absolute inset-0"
                      onClick={() => setSelectedProject(project)}
                    >
                      {/* Placeholder background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${project.color}`} />

                      {/* Grid pattern */}
                      <div className="absolute inset-0 grid-pattern opacity-50" />

                      {/* Project initial letter */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-serif text-8xl text-cream-100/5 group-hover:text-cream-100/10 transition-all duration-500 group-hover:scale-110">
                          {project.title[0]}
                        </span>
                      </div>

                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-navy-900/0 group-hover:bg-navy-900/80 transition-all duration-500" />

                      {/* Content - always visible at bottom */}
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <div className="transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-500">
                          <span className="inline-block font-display text-[10px] tracking-ultrawide text-cream-300/80 bg-cream-100/10 px-3 py-1 rounded-sm uppercase">
                            {project.category}
                          </span>
                          <h3 className="font-display font-semibold text-cream-100 text-lg mt-3">
                            {project.title}
                          </h3>
                          <p className="font-display text-cream-300/80 text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Decorative corner on hover */}
                      <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-cream-400/0 group-hover:border-cream-400/30 transition-all duration-500" />
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-navy-950/85"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal content */}
            <motion.div
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-navy-800 rounded-sm shadow-2xl will-change-transform"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
            >
              {/* Header image area */}
              <div className={`relative h-56 md:h-72 bg-gradient-to-br ${selectedProject.color}`}>
                <div className="absolute inset-0 grid-pattern opacity-40" />

                {/* Large initial letter */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-serif text-[10rem] md:text-[14rem] text-cream-100/5 leading-none select-none">
                    {selectedProject.title[0]}
                  </span>
                </div>

                {/* Category badge */}
                <div className="absolute top-6 left-6">
                  <span className="inline-block font-display text-[10px] tracking-ultrawide text-cream-300/90 bg-cream-100/10 px-4 py-1.5 rounded-sm uppercase">
                    {selectedProject.category}
                  </span>
                </div>

                {/* Close button */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-navy-900/60 rounded-sm hover:bg-navy-900/80 transition-colors group"
                  aria-label="Zatvori"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-cream-300 group-hover:text-cream-100 transition-colors" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                  </svg>
                </button>

                {/* Decorative corners */}
                <div className="absolute bottom-4 left-6 w-8 h-8 border-b border-l border-cream-400/20" />
                <div className="absolute bottom-4 right-6 w-8 h-8 border-b border-r border-cream-400/20" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <h3 className="font-serif text-3xl md:text-4xl text-cream-100 leading-tight">
                  {selectedProject.title}
                </h3>

                <div className="w-12 h-px bg-cream-400/30 mt-5" />

                {/* Info grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                  {[
                    { label: 'Lokacija', value: selectedProject.details.lokacija },
                    { label: 'Period', value: selectedProject.details.godina },
                    { label: 'Površina', value: selectedProject.details.površina },
                    { label: 'Status', value: selectedProject.details.status },
                  ].map((item) => (
                    <div key={item.label}>
                      <div className="font-display text-[10px] tracking-ultrawide text-cream-500 uppercase">
                        {item.label}
                      </div>
                      <div className="font-display text-sm text-cream-200 mt-1.5">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="mt-8 pt-8 border-t border-cream-400/10">
                  <h4 className="font-display text-xs tracking-ultrawide text-cream-500 uppercase mb-4">
                    O projektu
                  </h4>
                  <p className="font-display text-cream-300/90 leading-relaxed">
                    {selectedProject.details.opis}
                  </p>
                </div>

                {/* Placeholder for future gallery */}
                <div className="mt-8 pt-8 border-t border-cream-400/10">
                  <h4 className="font-display text-xs tracking-ultrawide text-cream-500 uppercase mb-4">
                    Galerija
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`aspect-[4/3] rounded-sm bg-gradient-to-br ${selectedProject.color} opacity-60`}
                      >
                        <div className="w-full h-full grid-pattern opacity-30" />
                      </div>
                    ))}
                  </div>
                  <p className="font-display text-xs text-cream-600 mt-3 italic">
                    Fotografije će biti dodane po završetku projekta.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
