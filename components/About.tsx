'use client'

import ScrollReveal from './ScrollReveal'
import AnimatedCounter from './AnimatedCounter'

const stats = [
  { target: 5, label: 'Godina iskustva' },
  { target: 20, label: 'Završenih projekata' },
  { target: 10, label: 'Stručnih inženjera' },
  { target: 15, label: 'Zadovoljnih klijenata' },
]

export default function About() {
  return (
    <section id="o-nama" className="section-light py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-display text-xs tracking-ultrawide text-cream-600 uppercase">
              O nama
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-navy-800 mt-4 leading-tight">
              Gradimo temelje
              <br />
              <span className="italic text-navy-500">pouzdane budućnosti</span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 mt-16">
          {/* Text content */}
          <ScrollReveal delay={0.1}>
            <div className="space-y-6 text-navy-600 leading-relaxed font-display">
              <p className="text-lg">
                INFRACON je građevinska kompanija posvećena izgradnji kvalitetne
                infrastrukture i konstrukcija u Crnoj Gori. Naš tim iskusnih
                inženjera i stručnjaka pristupa svakom projektu sa istom
                posvećenošću — bilo da se radi o stambenom objektu, putu ili
                kompletnoj infrastrukturnoj mreži.
              </p>
              <p>
                Kombinujemo savremene metode građenja sa dubokim poznavanjem
                lokalnih uslova, standarda i propisa. Vjerujemo da kvalitetna
                gradnja počinje od temeljnog planiranja, precizne realizacije i
                transparentne komunikacije sa klijentima.
              </p>
              <p>
                Naša misija je jednostavna — graditi objekte i infrastrukturu
                koji će služiti generacijama. Svaki projekat koji preuzmemo
                tretiramo kao vlastiti, jer znamo da ono što gradimo danas
                definiše prostor u kojem ćemo živjeti sutra.
              </p>
            </div>
          </ScrollReveal>

          {/* Visual element - abstract architectural shape */}
          <ScrollReveal delay={0.3} direction="right">
            <div className="relative h-full min-h-[300px] lg:min-h-[400px]">
              <div className="absolute inset-0 bg-navy-800 rounded-sm" />
              <div className="absolute inset-4 border border-cream-400/20 rounded-sm" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-serif text-6xl md:text-7xl text-cream-100/90 italic">IC</div>
                  <div className="w-12 h-px bg-cream-400/40 mx-auto mt-4" />
                  <div className="font-display text-xs tracking-ultrawide text-cream-400/60 mt-4">
                    EST. 2024
                  </div>
                </div>
              </div>
              {/* Decorative corner marks */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-cream-400/30" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cream-400/30" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cream-400/30" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-cream-400/30" />
            </div>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <div className="mt-24 pt-16 border-t border-navy-200/30">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.1}>
                <AnimatedCounter
                  target={stat.target}
                  label={stat.label}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
