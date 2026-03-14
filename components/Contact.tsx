'use client'

import { useState, FormEvent } from 'react'
import ScrollReveal from './ScrollReveal'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) newErrors.name = 'Ime je obavezno'
    if (!formData.email.trim()) {
      newErrors.email = 'Email je obavezan'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Unesite validan email'
    }
    if (!formData.message.trim()) newErrors.message = 'Poruka je obavezna'
    return newErrors
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  return (
    <section id="kontakt" className="section-dark py-24 md:py-32 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="max-w-3xl">
            <span className="font-display text-xs tracking-ultrawide text-cream-500 uppercase">
              Kontakt
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-cream-100 mt-4 leading-tight">
              Započnite <span className="italic text-cream-400">projekat</span>
              <br />
              sa nama
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-16 mt-16">
          {/* Contact form */}
          <ScrollReveal delay={0.1}>
            {submitted ? (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="text-center">
                  <div className="font-serif text-4xl text-cream-100 italic">Hvala!</div>
                  <p className="font-display text-cream-400 mt-4">
                    Vaša poruka je poslata. Javićemo vam se uskoro.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div>
                  <input
                    type="text"
                    placeholder="Vaše ime *"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1 font-display">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    type="email"
                    placeholder="Email adresa *"
                    className="form-input"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1 font-display">{errors.email}</p>
                  )}
                </div>

                <div>
                  <input
                    type="tel"
                    placeholder="Broj telefona"
                    className="form-input"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div>
                  <textarea
                    placeholder="Vaša poruka *"
                    rows={5}
                    className="form-input resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  {errors.message && (
                    <p className="text-red-400 text-xs mt-1 font-display">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="font-display text-sm tracking-widest text-cream-100 border border-cream-400/40 px-8 py-3 hover:bg-cream-100/5 hover:border-cream-400/80 transition-all duration-500 w-full md:w-auto"
                >
                  POŠALJITE PORUKU
                </button>
              </form>
            )}
          </ScrollReveal>

          {/* Contact info + Map */}
          <ScrollReveal delay={0.2} direction="right">
            <div className="space-y-10">
              {/* Contact details */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-display text-xs tracking-ultrawide text-cream-500 uppercase">
                    Adresa
                  </h4>
                  <p className="font-display text-cream-200 mt-2">
                    Bulevar Svetog Petra Cetinjskog bb
                    <br />
                    81000 Podgorica, Crna Gora
                  </p>
                </div>

                <div>
                  <h4 className="font-display text-xs tracking-ultrawide text-cream-500 uppercase">
                    Telefon
                  </h4>
                  <a
                    href="tel:+38220123456"
                    className="font-display text-cream-200 mt-2 block hover:text-cream-400 transition-colors"
                  >
                    +382 20 123 456
                  </a>
                </div>

                <div>
                  <h4 className="font-display text-xs tracking-ultrawide text-cream-500 uppercase">
                    Email
                  </h4>
                  <a
                    href="mailto:info@infracon.me"
                    className="font-display text-cream-200 mt-2 block hover:text-cream-400 transition-colors"
                  >
                    info@infracon.me
                  </a>
                </div>

                <div>
                  <h4 className="font-display text-xs tracking-ultrawide text-cream-500 uppercase">
                    Društvene mreže
                  </h4>
                  <div className="flex gap-4 mt-3">
                    <a
                      href="#"
                      className="font-display text-sm text-cream-400 hover:text-cream-200 transition-colors"
                      aria-label="Instagram"
                    >
                      Instagram
                    </a>
                    <span className="text-cream-600">|</span>
                    <a
                      href="#"
                      className="font-display text-sm text-cream-400 hover:text-cream-200 transition-colors"
                      aria-label="Facebook"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
              <div className="map-placeholder rounded-sm h-56 flex items-center justify-center relative">
                <div className="relative z-10 text-center">
                  <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 mx-auto text-cream-400/60" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                  <p className="font-display text-xs text-cream-500/60 mt-2 tracking-wider">
                    PODGORICA, CRNA GORA
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
