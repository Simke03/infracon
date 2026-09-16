'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import MagneticButton from '../MagneticButton'
import LogoDraw from './LogoDraw'

const ease = [0.23, 1, 0.32, 1] as const
const services = ['Visokogradnja', 'Niskogradnja', 'Infrastruktura']

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroPhoto() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', reduceMotion ? '0%' : '12%'])

  const reveal = (delay: number) => ({
    initial: { opacity: 0, transform: 'translateY(16px)' },
    animate: { opacity: 1, transform: 'translateY(0px)' },
    transition: { delay, duration: 0.6, ease },
  })

  return (
    <section ref={ref} className="relative min-h-[100dvh] overflow-hidden bg-navy-900 text-cream-100">
      {/* Photo: full-bleed on mobile, right side on desktop */}
      <motion.div
        className="absolute inset-0 lg:left-[38%]"
        style={{ y: imageY }}
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease }}
      >
        <Image
          src="/novi-dizajn/hero-bridge.jpg"
          alt="Betonski vijadukt u planinama"
          fill
          priority
          sizes="(min-width: 1024px) 62vw, 100vw"
          className="object-cover object-[78%_center]"
        />
      </motion.div>

      {/* Blend the photo into the navy page */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/60 to-navy-900/10 lg:from-navy-900 lg:from-[38%] lg:via-navy-900/60 lg:via-[50%] lg:to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-navy-900 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-navy-900/80 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 min-h-[100dvh] flex flex-col justify-center pt-28 pb-32">
        <div className="max-w-xl">
          <LogoDraw className="h-20 md:h-24 w-auto" />

          <motion.h1
            className="font-orbitron font-bold tracking-ultrawide text-4xl md:text-6xl mt-8 text-cream-100"
            {...reveal(0.2)}
          >
            INFRACON
          </motion.h1>

          <motion.div
            className="w-16 h-px bg-cream-400 mt-6 origin-left"
            initial={{ opacity: 0, transform: 'scaleX(0.2)' }}
            animate={{ opacity: 1, transform: 'scaleX(1)' }}
            transition={{ delay: 0.3, duration: 0.6, ease }}
          />

          <motion.p
            className="font-dm text-cream-200 text-2xl md:text-4xl leading-snug tracking-[-0.01em] mt-6 text-balance"
            {...reveal(0.35)}
          >
            Infrastruktura i konstrukcije za budućnost
          </motion.p>

          <motion.p className="font-dm text-cream-400 text-sm md:text-base tracking-wider mt-4" {...reveal(0.45)}>
            Gradimo pouzdano. Gradimo za generacije.
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4" {...reveal(0.55)}>
            <MagneticButton strength={0.3}>
              <a
                href="#kontakt"
                onClick={(e) => {
                  e.preventDefault()
                  scrollToId('kontakt')
                }}
                className="inline-block font-dm text-sm tracking-widest text-navy-900 bg-cream-100 px-8 py-3.5 hover:bg-cream-300 transition-[background-color,transform] duration-200 ease-out active:scale-[0.97]"
              >
                KONTAKTIRAJTE NAS
              </a>
            </MagneticButton>
            <a
              href="#projekti"
              onClick={(e) => {
                e.preventDefault()
                scrollToId('projekti')
              }}
              className="group inline-flex items-center gap-3 py-3 font-dm text-sm tracking-widest text-cream-200 hover:text-cream-100 transition-[color,transform] duration-200 ease-out active:scale-[0.97]"
            >
              NAŠI PROJEKTI
              <span className="block w-6 h-px bg-current transition-transform duration-200 ease-out group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom rail */}
      <motion.div
        className="absolute inset-x-0 bottom-0 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6, ease }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-8 flex items-end justify-between gap-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 font-dm text-[11px] md:text-xs tracking-ultrawide uppercase text-cream-400">
            {services.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <span className="hidden md:block font-dm text-xs tracking-ultrawide uppercase text-cream-500">
            Crna Gora
          </span>
        </div>
      </motion.div>
    </section>
  )
}
