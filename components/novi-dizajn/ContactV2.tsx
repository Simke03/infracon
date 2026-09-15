'use client'

import { useState, FormEvent } from 'react'
import ScrollReveal from '../ScrollReveal'

const fieldClass =
  'peer w-full bg-transparent border-0 border-b border-cream-400/25 px-0 pt-6 pb-3 font-dm text-cream-100 placeholder-transparent focus:outline-none focus:border-cream-200 transition-colors duration-200'
const labelClass =
  'pointer-events-none absolute left-0 top-6 font-dm text-cream-500 transition-transform duration-200 ease-out origin-left peer-focus:-translate-y-5 peer-focus:scale-[0.8] peer-[:not(:placeholder-shown)]:-translate-y-5 peer-[:not(:placeholder-shown)]:scale-[0.8]'

export default function ContactV2() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const next: Record<string, string> = {}
    if (!String(data.get('name') ?? '').trim()) next.name = 'Upišite ime'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(data.get('email') ?? ''))) next.email = 'Upišite ispravan email'
    if (!String(data.get('message') ?? '').trim()) next.message = 'Napišite poruku'
    setErrors(next)
    if (Object.keys(next).length === 0) setSent(true)
  }

  return (
    <section id="kontakt" className="bg-navy-900 text-cream-100 pt-28 pb-32 md:pt-40 md:pb-44">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <h2 className="font-orbitron font-bold uppercase text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-[0.04em] [overflow-wrap:anywhere] text-balance">
                Imate projekat? <span className="block mt-2 font-dm font-normal normal-case tracking-[-0.02em] text-cream-400">Razgovarajmo.</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="mt-12 md:mt-16 space-y-8">
                <div>
                  <p className="font-dm text-sm text-cream-500">Telefon</p>
                  <a
                    href="tel:+38220123456"
                    className="inline-block font-dm font-medium text-3xl md:text-4xl tracking-[-0.02em] tabular-nums mt-1 hover:text-cream-300 transition-[color,transform] duration-150 ease-out active:scale-[0.98] origin-left"
                  >
                    +382 20 123 456
                  </a>
                </div>
                <div>
                  <p className="font-dm text-sm text-cream-500">Email</p>
                  <a
                    href="mailto:info@infra-con.com"
                    className="inline-block font-dm font-medium text-3xl md:text-4xl tracking-[-0.02em] mt-1 hover:text-cream-300 transition-[color,transform] duration-150 ease-out active:scale-[0.98] origin-left"
                  >
                    info@infra-con.com
                  </a>
                </div>
                <div>
                  <p className="font-dm text-sm text-cream-500">Adresa</p>
                  <p className="font-dm text-cream-200 mt-2 leading-relaxed">
                    Bulevar Svetog Petra Cetinjskog bb
                    <br />
                    81000 Podgorica, Crna Gora
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal className="lg:col-span-6 lg:col-start-7 lg:pt-3" delay={0.15}>
            {sent ? (
              <div className="border-t border-cream-400/25 pt-8" role="status">
                <p className="font-dm font-medium text-3xl md:text-4xl tracking-[-0.02em]">Poruka je poslata.</p>
                <p className="font-dm text-cream-400 mt-3">Javićemo vam se u najkraćem roku.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  {[
                    { name: 'name', label: 'Ime i prezime', type: 'text', auto: 'name' },
                    { name: 'email', label: 'Email', type: 'email', auto: 'email' },
                  ].map((f) => (
                    <div key={f.name} className="relative">
                      <input
                        id={`c-${f.name}`}
                        name={f.name}
                        type={f.type}
                        autoComplete={f.auto}
                        placeholder=" "
                        aria-invalid={!!errors[f.name]}
                        className={fieldClass}
                      />
                      <label htmlFor={`c-${f.name}`} className={labelClass}>
                        {f.label}
                      </label>
                      {errors[f.name] && <p className="font-dm text-xs text-red-300 mt-2">{errors[f.name]}</p>}
                    </div>
                  ))}
                </div>
                <div className="relative">
                  <input id="c-phone" name="phone" type="tel" autoComplete="tel" placeholder=" " className={fieldClass} />
                  <label htmlFor="c-phone" className={labelClass}>
                    Telefon (nije obavezno)
                  </label>
                </div>
                <div className="relative">
                  <textarea
                    id="c-message"
                    name="message"
                    rows={4}
                    placeholder=" "
                    aria-invalid={!!errors.message}
                    className={`${fieldClass} resize-none`}
                  />
                  <label htmlFor="c-message" className={labelClass}>
                    O kakvom projektu se radi?
                  </label>
                  {errors.message && <p className="font-dm text-xs text-red-300 mt-2">{errors.message}</p>}
                </div>
                <button
                  type="submit"
                  className="font-dm text-sm tracking-widest text-navy-900 bg-cream-100 px-10 py-4 hover:bg-cream-300 transition-[background-color,transform] duration-200 ease-out active:scale-[0.97]"
                >
                  POŠALJITE UPIT
                </button>
              </form>
            )}
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
