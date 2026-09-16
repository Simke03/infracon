import type { Metadata } from 'next'
import TransitionLink from '@/components/novi-dizajn/TransitionLink'
import { notFound } from 'next/navigation'
import NavbarV2 from '@/components/novi-dizajn/NavbarV2'
import FooterV2 from '@/components/novi-dizajn/FooterV2'
import ScrollReveal from '@/components/ScrollReveal'
import ImageSlot from '@/components/novi-dizajn/ImageSlot'
import { getProject, projects } from '@/components/novi-dizajn/projects'
import { BASE } from '@/components/novi-dizajn/base'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug)
  return project ? { title: `${project.title} — INFRACON`, description: project.summary } : {}
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug)
  if (!project) notFound()

  const index = projects.indexOf(project)
  const next = projects[(index + 1) % projects.length]
  const facts = [
    { label: 'Lokacija', value: project.place },
    { label: 'Godina', value: project.year },
    { label: 'Obim', value: project.area },
    { label: 'Status', value: project.status },
    { label: 'Investitor', value: project.client },
  ]

  return (
    <main className="bg-cream-100 text-navy-800">
      <NavbarV2 solid />

      <section className="bg-navy-900 text-cream-100 pt-36 md:pt-44">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <TransitionLink
            href={`${BASE}#projekti`}
            className="group inline-flex items-center gap-3 py-2.5 font-dm text-sm text-cream-400 hover:text-cream-100 transition-[color,transform] duration-150 ease-out active:scale-[0.97]"
          >
            <span aria-hidden="true" className="transition-transform duration-200 ease-out group-hover:-translate-x-1">
              ←
            </span>
            Svi projekti
          </TransitionLink>

          <ScrollReveal>
            <p className="font-dm text-cream-400 mt-10">{project.category}</p>
            <h1 className="font-orbitron font-bold uppercase text-3xl sm:text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[0.02em] sm:tracking-[0.04em] mt-3 text-balance [overflow-wrap:anywhere]">
              {project.title}
            </h1>
            <p className="font-dm text-xl md:text-2xl text-cream-300 mt-6 max-w-[40ch] tracking-[-0.01em]">
              {project.summary}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <dl className="grid grid-cols-2 md:grid-cols-5 gap-y-6 mt-14 border-t border-cream-400/15 pt-6">
              {facts.map((f) => (
                <div key={f.label} className="pr-4">
                  <dt className="font-dm text-sm text-cream-500">{f.label}</dt>
                  <dd className="font-dm font-medium text-cream-100 mt-1 tabular-nums">{f.value}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>

          <ImageSlot
            tone="dark"
            className="aspect-[4/3] md:aspect-[21/9] w-full mt-14 md:mt-16 translate-y-12 md:translate-y-20"
            label="Glavna fotografija"
            transitionName={`project-${project.slug}`}
          />
        </div>
      </section>

      <section className="pt-28 md:pt-44 pb-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-10">
          <ScrollReveal className="lg:col-span-4">
            <h2 className="font-orbitron font-bold uppercase text-2xl md:text-3xl tracking-[0.04em]">O projektu</h2>
          </ScrollReveal>
          <ScrollReveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <div className="space-y-5 font-dm text-lg text-navy-600 leading-relaxed max-w-[62ch]">
              {project.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </ScrollReveal>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-6 lg:gap-8 mt-20 md:mt-28">
          {Array.from({ length: project.gallery }, (_, i) => (
            <ScrollReveal key={i} delay={Math.min(i * 0.05, 0.15)} className={i % 3 === 0 ? 'md:col-span-2' : ''}>
              <ImageSlot
                className={`w-full ${i % 3 === 0 ? 'aspect-[16/9]' : 'aspect-[4/5]'}`}
                label={`Fotografija ${i + 2}`}
              />
            </ScrollReveal>
          ))}
        </div>
      </section>

      <TransitionLink
        href={`${BASE}/projekti/${next.slug}`}
        className="group block bg-navy-900 text-cream-100 transition-colors duration-200 hover:bg-navy-800"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 md:py-24 flex flex-col md:flex-row md:items-end md:justify-between gap-4 transition-transform duration-150 ease-out group-active:scale-[0.98]">
          <div>
            <p className="font-dm text-cream-500">Sljedeći projekat</p>
            <p className="font-orbitron font-bold uppercase text-2xl sm:text-3xl md:text-5xl tracking-[0.04em] mt-3 [overflow-wrap:anywhere]">{next.title}</p>
          </div>
          <span
            aria-hidden="true"
            className="font-dm text-4xl text-cream-400 transition-transform duration-200 ease-out group-hover:translate-x-2"
          >
            →
          </span>
        </div>
      </TransitionLink>

      <FooterV2 />
    </main>
  )
}
