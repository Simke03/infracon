import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'INFRACON — novi dizajn',
  robots: { index: false, follow: false },
}

export default function NoviDizajnLayout({ children }: { children: React.ReactNode }) {
  return children
}
