import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Cormorant_Garamond, Orbitron } from 'next/font/google'
import MotionProvider from '@/components/MotionProvider'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://infra-con.com'),
  title: 'INFRACON — Infrastruktura i konstrukcije za budućnost',
  description:
    'INFRACON je građevinska kompanija u Crnoj Gori specijalizovana za visokogradnju, niskogradnju, infrastrukturu, rekonstrukciju, projektovanje i konsalting.',
  keywords: [
    'građevinska firma',
    'Crna Gora',
    'infrastruktura',
    'konstrukcije',
    'visokogradnja',
    'niskogradnja',
    'Podgorica',
    'INFRACON',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'INFRACON — Infrastruktura i konstrukcije za budućnost',
    description:
      'Gradimo pouzdano. Gradimo za generacije. Kompletna ponuda građevinskih usluga u Crnoj Gori.',
    type: 'website',
    url: '/',
    locale: 'sr_Latn_ME',
    siteName: 'INFRACON',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export const viewport: Viewport = {
  themeColor: '#1c2736',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="sr" className={`${jakarta.variable} ${cormorant.variable} ${orbitron.variable}`}>
      <body className="font-display antialiased">
        <MotionProvider>{children}</MotionProvider>
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  )
}
