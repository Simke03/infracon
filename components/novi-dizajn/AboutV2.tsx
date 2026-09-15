'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import ScrollReveal from '../ScrollReveal'
import ImageSlot from './ImageSlot'

function Count({ target }: { target: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px 0px' })
  const reduceMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) return setValue(target)
    const start = performance.now()
    let frame = 0
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1200, 1)
      setValue(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduceMotion, target])

  return <span ref={ref}>{value}</span>
}

const stats = [
  { target: 5, label: 'godina iskustva' },
  { target: 20, label: 'završenih projekata' },
  { target: 10, label: 'stručnih inženjera' },
  { target: 15, label: 'zadovoljnih klijenata' },
]

export default function AboutV2() {
  return (
    <section id="o-nama" className="bg-cream-100 text-navy-800 pt-28 pb-32 md:pt-40 md:pb-44">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8">
          <ScrollReveal className="lg:col-span-7">
            <h2 className="font-orbitron font-bold uppercase text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[0.04em] [overflow-wrap:anywhere] text-balance">
              Gradimo temelje <span className="block mt-2 font-dm font-normal normal-case tracking-[-0.02em] text-navy-500">pouzdane budućnosti</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal className="lg:col-span-4 lg:col-start-9 lg:pt-4" delay={0.1}>
            <div className="space-y-5 font-dm text-navy-600 leading-relaxed max-w-[60ch]">
              <p className="text-lg text-navy-700">
                INFRACON je građevinska kompanija posvećena izgradnji kvalitetne infrastrukture i konstrukcija u
                Crnoj Gori.
              </p>
              <p>
                Kombinujemo savremene metode građenja sa dubokim poznavanjem lokalnih uslova, standarda i propisa.
                Svaki projekat koji preuzmemo tretiramo kao vlastiti.
              </p>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal className="mt-20 md:mt-28">
          <ImageSlot className="aspect-[4/3] md:aspect-[21/9] w-full" label="Fotografija · tim na gradilištu" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <dl className="grid grid-cols-2 lg:grid-cols-4 mt-16 md:mt-20 border-t border-navy-800/15">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`pt-6 pb-2 pr-6 ${i % 2 === 1 ? 'pl-6 border-l border-navy-800/15' : ''} ${
                  i === 2 ? 'lg:pl-6 lg:border-l lg:border-navy-800/15' : ''
                } ${i >= 2 ? 'mt-6 lg:mt-0' : ''}`}
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-orbitron font-bold text-4xl md:text-5xl tabular-nums leading-none">
                  <Count target={stat.target} />
                  <span className="text-cream-600">+</span>
                </dd>
                <p className="font-dm text-sm text-navy-500 mt-3">{stat.label}</p>
              </div>
            ))}
          </dl>
        </ScrollReveal>
      </div>
    </section>
  )
}
