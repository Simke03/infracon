'use client'

import ScrollReveal from './ScrollReveal'

const differentiators = [
  {
    number: '01',
    title: 'Licencirani inženjeri',
    description: 'Naš tim čine sertifikovani profesionalci sa dugogodišnjim iskustvom u svim oblastima građevinarstva.',
  },
  {
    number: '02',
    title: 'Moderna oprema',
    description: 'Koristimo najsavremeniju mehanizaciju i tehnologiju za precizno i efikasno izvođenje radova.',
  },
  {
    number: '03',
    title: 'Poštovanje rokova',
    description: 'Planiramo detaljno i izvršavamo sistematično — vaš projekat se završava na vrijeme, bez iznenađenja.',
  },
  {
    number: '04',
    title: 'Kvalitet materijala',
    description: 'Sarađujemo isključivo sa provjerenim dobavljačima i koristimo materijale koji garantuju trajnost.',
  },
]

export default function WhyUs() {
  return (
    <section className="section-dark py-24 md:py-32 lg:py-40 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 border border-cream-400/5 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 border border-cream-400/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section header */}
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto">
            <span className="font-display text-xs tracking-ultrawide text-cream-500 uppercase">
              Zašto mi
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream-100 mt-4 leading-tight">
              Razlika je u <span className="italic text-cream-400">pristupu</span>
            </h2>
          </div>
        </ScrollReveal>

        {/* Staggered cards */}
        <div className="mt-20 space-y-0">
          {differentiators.map((item, i) => (
            <ScrollReveal key={item.number} delay={i * 0.1}>
              <div className={`flex flex-col md:flex-row items-start gap-6 md:gap-12 py-10 border-b border-cream-400/10 ${
                i % 2 === 1 ? 'md:pl-24 lg:pl-40' : ''
              }`}>
                {/* Number */}
                <span className="font-serif text-5xl md:text-6xl text-cream-400/20 leading-none shrink-0">
                  {item.number}
                </span>

                <div className="max-w-lg">
                  <h3 className="font-display font-semibold text-cream-100 text-xl tracking-wide">
                    {item.title}
                  </h3>
                  <p className="font-display text-cream-500 text-sm leading-relaxed mt-3">
                    {item.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
