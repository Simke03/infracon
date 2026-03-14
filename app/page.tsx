'use client'

import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Projects from '@/components/Projects'
import WhyUs from '@/components/WhyUs'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import Marquee from '@/components/Marquee'

export default function Home() {
  return (
    <main>
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Marquee />
      <Services />
      <Projects />
      <WhyUs />
      <Contact />
      <Footer />
    </main>
  )
}
