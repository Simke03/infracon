'use client'

import Link from 'next/link'
import { BASE } from './base'

const links = [
  { href: '#o-nama', label: 'O nama' },
  { href: '#usluge', label: 'Usluge' },
  { href: '#projekti', label: 'Projekti' },
  { href: '#kontakt', label: 'Kontakt' },
]

export default function FooterV2() {
  return (
    <footer className="bg-navy-950 text-cream-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/novi-dizajn/mark.svg" alt="" className="h-14 w-auto" />
            <p className="font-orbitron font-bold tracking-ultrawide text-2xl md:text-3xl text-cream-100 mt-6">INFRACON</p>
            <p className="font-dm text-lg text-cream-400 mt-2">Infrastruktura i konstrukcije za budućnost</p>
          </div>

          <nav aria-label="Podnožje">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={`${BASE}${link.href}`}
                    className="font-dm text-sm text-cream-400 hover:text-cream-100 inline-block transition-[color,transform] duration-150 ease-out active:scale-[0.97]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-16 pt-8 border-t border-cream-400/10 flex flex-col md:flex-row md:justify-between gap-3 font-dm text-xs text-cream-600">
          <p>© 2026 INFRACON · Podgorica, Crna Gora</p>
          <p>
            Developed by{' '}
            <a
              href="https://quanticstudios.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream-400 hover:text-cream-100 transition-colors duration-150"
            >
              Quantic Studios
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
