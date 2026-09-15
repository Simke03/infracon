'use client'

import ScrollReveal from '../ScrollReveal'

const points = [
  {
    title: 'Licencirani inženjeri',
    text: 'Sertifikovani profesionalci sa iskustvom u svim oblastima građevinarstva.',
  },
  {
    title: 'Poštovanje rokova',
    text: 'Detaljan plan i sistematično izvođenje, bez iznenađenja na kraju.',
  },
  {
    title: 'Provjereni materijali',
    text: 'Radimo samo sa dobavljačima čiji materijali garantuju trajnost.',
  },
  {
    title: 'Jasna komunikacija',
    text: 'Klijent u svakom trenutku zna u kojoj je fazi projekat.',
  },
]

// Sits at the foot of the projects spread as a quiet band, not a full section.
export default function ApproachV2() {
  return (
    <section className="bg-cream-100 text-navy-800 pb-28 md:pb-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="bg-cream-200/70 px-6 py-12 md:px-12 md:py-16">
          <ScrollReveal>
            <h2 className="font-orbitron font-bold uppercase text-2xl md:text-4xl leading-tight tracking-[0.04em] max-w-[18ch]">
              Razlika je <span className="block mt-2 font-dm font-normal normal-case tracking-[-0.02em] text-navy-500">u pristupu</span>
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mt-12">
            {points.map((point, i) => (
              <ScrollReveal key={point.title} delay={i * 0.05}>
                <div className="border-t border-navy-800/20 pt-5">
                  <h3 className="font-dm font-semibold text-navy-800">{point.title}</h3>
                  <p className="font-dm text-sm text-navy-600 leading-relaxed mt-2">{point.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
