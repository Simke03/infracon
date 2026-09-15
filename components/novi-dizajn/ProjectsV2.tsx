'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import TransitionLink from './TransitionLink'
import ScrollReveal from '../ScrollReveal'
import ImageSlot from './ImageSlot'
import { projects } from './projects'
import { BASE } from './base'

const categories = ['Sve', 'Visokogradnja', 'Niskogradnja', 'Infrastruktura']

// Alternating wide/narrow rhythm so the grid reads like a spread, not a table.
const layout = [
  'md:col-span-7 aspect-[4/3]',
  'md:col-span-5 aspect-[4/5] md:mt-24',
  'md:col-span-5 aspect-[4/5]',
  'md:col-span-7 aspect-[4/3] md:mt-24',
  'md:col-span-7 aspect-[4/3]',
  'md:col-span-5 aspect-[4/5] md:mt-24',
]

export default function ProjectsV2() {
  const [active, setActive] = useState('Sve')
  const filtered = projects.filter((p) => active === 'Sve' || p.category === active)

  return (
    <section id="projekti" className="bg-cream-100 text-navy-800 pt-28 pb-32 md:pt-40 md:pb-44">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <ScrollReveal>
            <h2 className="font-orbitron font-bold uppercase text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[0.04em] [overflow-wrap:anywhere]">
              Projekti <span className="block mt-2 font-dm font-normal normal-case tracking-[-0.02em] text-navy-500">Izbor realizovanih radova</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="-mx-6 px-6 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:px-0">
            <div role="tablist" aria-label="Filter projekata" className="flex gap-x-6 whitespace-nowrap">
              {categories.map((cat) => {
                const selected = active === cat
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(cat)}
                    className={`relative pb-1.5 font-dm text-sm transition-[color,transform] duration-150 ease-out active:scale-[0.97] ${
                      selected ? 'text-navy-800' : 'text-navy-400 hover:text-navy-700'
                    }`}
                  >
                    {cat}
                    {selected && (
                      <motion.span
                        layoutId="proto-filter"
                        className="absolute inset-x-0 bottom-0 h-px bg-navy-800"
                        transition={{ duration: 0.25, ease: [0.77, 0, 0.175, 1] }}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </ScrollReveal>
        </div>

        <motion.div layout="position" className="grid md:grid-cols-12 gap-x-6 lg:gap-x-8 gap-y-14 md:gap-y-16 mt-16 md:mt-24">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => {
              const [span, ...frame] = layout[i % layout.length].split(' ')
              return (
                <motion.article
                  key={project.slug}
                  layout="position"
                  className={`group ${span} ${frame.filter((c) => c.startsWith('md:mt')).join(' ')}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.12 } }}
                  transition={{ duration: 0.25 }}
                >
                  <TransitionLink
                    href={`${BASE}/projekti/${project.slug}`}
                    className="block transition-transform duration-150 ease-out active:scale-[0.99]"
                  >
                    <div className="overflow-hidden">
                      <ImageSlot
                        className={`w-full transition-transform duration-300 ease-out group-hover:scale-[1.02] ${frame
                          .filter((c) => c.startsWith('aspect'))
                          .join(' ')}`}
                        label={project.category}
                        transitionName={`project-${project.slug}`}
                      />
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 mt-5 border-t border-navy-800/15 pt-4">
                      <h3 className="font-dm font-medium text-2xl md:text-3xl tracking-[-0.02em]">
                        {project.title}
                        <span
                          aria-hidden="true"
                          className="inline-block ml-3 text-navy-400 transition-transform duration-200 ease-out group-hover:translate-x-1"
                        >
                          →
                        </span>
                      </h3>
                      <p className="font-dm text-sm text-navy-500 tabular-nums shrink-0">
                        {project.place} · {project.year}
                      </p>
                    </div>
                  </TransitionLink>
                </motion.article>
              )
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
