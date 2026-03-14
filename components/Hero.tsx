'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Logo from './Logo'
import MagneticButton from './MagneticButton'
import FloatingShapes from './FloatingShapes'

const words = ['Infrastruktura', 'i', 'konstrukcije', 'za', 'budućnost']

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '20%'])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center section-dark overflow-hidden">
      {/* Parallax background layer */}
      <motion.div
        className="absolute inset-0 grid-pattern"
        style={{ y: backgroundY }}
      />

      {/* Radial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-800/50 to-navy-800" />

      {/* Floating geometric shapes */}
      <FloatingShapes />

      {/* Animated corner accents */}
      <motion.div
        className="absolute top-20 left-8 w-20 h-20 border-l border-t border-cream/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      />
      <motion.div
        className="absolute bottom-20 right-8 w-20 h-20 border-r border-b border-cream/10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      />

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Logo size={300} showText={false} light className="mx-auto" />
        </motion.div>

        {/* Company name */}
        <motion.h1
          className="font-orbitron font-bold text-cream-100 tracking-ultrawide text-3xl md:text-5xl lg:text-6xl mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          INFRACON
        </motion.h1>

        {/* Divider line */}
        <motion.div
          className="w-16 h-px bg-cream-400 mx-auto mt-6"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />

        {/* Tagline - word by word reveal */}
        <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 mt-6">
          {words.map((word, i) => (
            <motion.span
              key={i}
              className="font-serif text-cream-300 text-xl md:text-2xl lg:text-3xl italic inline-block"
              initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: 0.7 + i * 0.12,
                duration: 0.6,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          className="font-display text-cream-500 text-sm md:text-base tracking-wider mt-4 max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7 }}
        >
          Gradimo pouzdano. Gradimo za generacije.
        </motion.p>

        {/* CTA Button with magnetic effect */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6 }}
        >
          <MagneticButton strength={0.4}>
            <a
              href="#kontakt"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('kontakt')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-block font-display text-sm tracking-widest text-cream-100 border border-cream-400/40 px-8 py-3 hover:bg-cream-100/5 hover:border-cream-400/80 transition-all duration-500"
            >
              KONTAKTIRAJTE NAS
            </a>
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <span className="text-cream-500 text-xs tracking-widest font-display">SCROLL</span>
          <div className="w-px h-8 bg-gradient-to-b from-cream-400/60 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}
