'use client'

import Logo from './Logo'

const quickLinks = [
  { href: '#o-nama', label: 'O nama' },
  { href: '#usluge', label: 'Usluge' },
  { href: '#projekti', label: 'Projekti' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function Footer() {
  const handleClick = (href: string) => {
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-navy-950 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Logo + tagline */}
          <div>
            <Logo size={70} light showText />
            <p className="font-display text-cream-600 text-sm mt-4 max-w-xs">
              Infrastruktura i konstrukcije za budućnost Crne Gore.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-xs tracking-ultrawide text-cream-500 uppercase mb-4">
              Navigacija
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleClick(link.href)}
                    className="font-display text-sm text-cream-400 hover:text-cream-200 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h4 className="font-display text-xs tracking-ultrawide text-cream-500 uppercase mb-4">
              Kontakt
            </h4>
            <div className="space-y-2 font-display text-sm text-cream-400">
              <p>Bulevar Svetog Petra Cetinjskog bb</p>
              <p>81000 Podgorica, Crna Gora</p>
              <a href="tel:+38220123456" className="block hover:text-cream-200 transition-colors mt-3">
                +382 20 123 456
              </a>
              <a href="mailto:info@infracon.me" className="block hover:text-cream-200 transition-colors">
                info@infracon.me
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-cream-400/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-display text-xs text-cream-600">
            &copy; 2026 INFRACON. Sva prava zadržana.
          </p>
          <p className="font-display text-xs text-cream-600">
            Developed by{' '}
            <a
              href="https://quanticstudios.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-400 hover:text-cream-200 transition-colors"
            >
              Quantic Studios
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
