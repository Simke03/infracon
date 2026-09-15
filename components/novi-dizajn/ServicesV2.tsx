'use client'

import ScrollReveal from '../ScrollReveal'

const services = [
  {
    title: 'Visokogradnja',
    description: 'Stambeni i poslovni objekti, od temelja do krova, sa najvišim standardima kvaliteta i sigurnosti.',
  },
  {
    title: 'Niskogradnja',
    description: 'Putevi, mostovi i tuneli. Infrastrukturni projekti koji povezuju zajednice i pokreću razvoj.',
  },
  {
    title: 'Infrastruktura',
    description: 'Vodovod, kanalizacija i elektro mreže. Vitalni sistemi koji čine osnovu svakog naselja.',
  },
  {
    title: 'Rekonstrukcija',
    description: 'Obnova i sanacija objekata, uz poštovanje originalnog karaktera postojećih struktura.',
  },
  {
    title: 'Projektovanje',
    description: 'Idejni i glavni projekti, od vizije do kompletne tehničke dokumentacije.',
  },
  {
    title: 'Konsalting i nadzor',
    description: 'Stručna podrška u svim fazama planiranja i izvođenja radova.',
  },
]

export default function ServicesV2() {
  return (
    <section id="usluge" className="bg-navy-900 text-cream-100 pt-28 pb-32 md:pt-40 md:pb-44">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <ScrollReveal className="lg:col-span-8">
            <h2 className="font-orbitron font-bold uppercase text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[0.04em] [overflow-wrap:anywhere] text-balance">
              Od prvog nacrta <span className="block mt-2 font-dm font-normal normal-case tracking-[-0.02em] text-cream-400">do ključa u ruke</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal className="lg:col-span-3 lg:col-start-10" delay={0.1}>
            <p className="font-dm text-cream-400 leading-relaxed max-w-[48ch]">
              Pokrivamo cijeli životni ciklus objekta, pa jedan tim vodi projekat od ideje do predaje.
            </p>
          </ScrollReveal>
        </div>

        <ul className="mt-16 md:mt-24 border-t border-cream-400/15">
          {services.map((service, i) => (
            <li key={service.title} className="border-b border-cream-400/15">
              <ScrollReveal delay={Math.min(i * 0.04, 0.2)}>
                <div className="group grid md:grid-cols-12 gap-3 md:gap-8 py-8 md:py-10 md:-mx-6 md:px-6 transition-colors duration-200 hover:bg-cream-100/[0.03]">
                  <h3 className="md:col-span-5 font-dm font-medium text-3xl md:text-4xl lg:text-5xl tracking-[-0.03em] transition-transform duration-300 ease-out group-hover:translate-x-2">
                    {service.title}
                  </h3>
                  <p className="md:col-span-5 md:col-start-7 self-center font-dm text-cream-400 leading-relaxed max-w-[52ch]">
                    {service.description}
                  </p>
                  <span
                    aria-hidden="true"
                    className="hidden md:block md:col-span-1 md:col-start-12 self-center justify-self-end w-8 h-px bg-cream-400/40 origin-right transition-transform duration-300 ease-out group-hover:scale-x-150"
                  />
                </div>
              </ScrollReveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
