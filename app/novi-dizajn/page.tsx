'use client'

// Redesign, served next to the live homepage so the client can compare both.
import NavbarV2 from '@/components/novi-dizajn/NavbarV2'
import HeroPhoto from '@/components/novi-dizajn/HeroPhoto'
import AboutV2 from '@/components/novi-dizajn/AboutV2'
import ServicesV2 from '@/components/novi-dizajn/ServicesV2'
import ProjectsV2 from '@/components/novi-dizajn/ProjectsV2'
import ApproachV2 from '@/components/novi-dizajn/ApproachV2'
import ContactV2 from '@/components/novi-dizajn/ContactV2'
import FooterV2 from '@/components/novi-dizajn/FooterV2'
import ScrollProgress from '@/components/ScrollProgress'

export default function NoviDizajnHome() {
  return (
    <main>
      <ScrollProgress />
      <NavbarV2 />
      <HeroPhoto />
      <AboutV2 />
      <ServicesV2 />
      <ProjectsV2 />
      <ApproachV2 />
      <ContactV2 />
      <FooterV2 />
    </main>
  )
}
