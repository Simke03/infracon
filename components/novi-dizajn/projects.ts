// Placeholder portfolio. Titles, figures and photos get replaced with the
// client's real projects; the shape is what the pages are built around.
export interface Project {
  slug: string
  title: string
  category: 'Visokogradnja' | 'Niskogradnja' | 'Infrastruktura'
  place: string
  year: string
  area: string
  status: string
  client: string
  summary: string
  body: string[]
  gallery: number
}

export const projects: Project[] = [
  {
    slug: 'stambeni-kompleks',
    title: 'Stambeni kompleks',
    category: 'Visokogradnja',
    place: 'Podgorica',
    year: '2025',
    area: '6.200 m²',
    status: 'Završen',
    client: 'Privatni investitor',
    summary: 'Stambeni objekat sa podzemnom garažom i uređenim dvorištem.',
    body: [
      'Opis projekta: obim radova, izazovi na terenu i rješenja koja smo primijenili.',
      'Drugi pasus: materijali, rokovi i rezultat za investitora.',
    ],
    gallery: 6,
  },
  {
    slug: 'regionalni-put',
    title: 'Regionalni put',
    category: 'Niskogradnja',
    place: 'Cetinje',
    year: '2024',
    area: '12 km',
    status: 'Završen',
    client: 'Javni investitor',
    summary: 'Rekonstrukcija dionice sa novim kolovozom i odvodnjom.',
    body: ['Opis projekta: obim radova, izazovi na terenu i rješenja koja smo primijenili.'],
    gallery: 4,
  },
  {
    slug: 'vodovodna-mreza',
    title: 'Vodovodna mreža',
    category: 'Infrastruktura',
    place: 'Danilovgrad',
    year: '2025',
    area: '8,5 km',
    status: 'U toku',
    client: 'Opština',
    summary: 'Proširenje mreže za nova naselja.',
    body: ['Opis projekta: obim radova, izazovi na terenu i rješenja koja smo primijenili.'],
    gallery: 4,
  },
  {
    slug: 'poslovni-objekat',
    title: 'Poslovni objekat',
    category: 'Visokogradnja',
    place: 'Podgorica',
    year: '2024',
    area: '2.500 m²',
    status: 'Završen',
    client: 'Privatni investitor',
    summary: 'Poslovni prostor sa otvorenim etažama.',
    body: ['Opis projekta: obim radova, izazovi na terenu i rješenja koja smo primijenili.'],
    gallery: 6,
  },
  {
    slug: 'pjesacki-most',
    title: 'Pješački most',
    category: 'Niskogradnja',
    place: 'Podgorica',
    year: '2025',
    area: '120 m',
    status: 'Završen',
    client: 'Javni investitor',
    summary: 'Pješačko-biciklistički most u urbanom području.',
    body: ['Opis projekta: obim radova, izazovi na terenu i rješenja koja smo primijenili.'],
    gallery: 4,
  },
  {
    slug: 'kanalizacioni-sistem',
    title: 'Kanalizacioni sistem',
    category: 'Infrastruktura',
    place: 'Bar',
    year: '2024',
    area: '5 km',
    status: 'Završen',
    client: 'Javno preduzeće',
    summary: 'Sistem za prikupljanje i prečišćavanje otpadnih voda.',
    body: ['Opis projekta: obim radova, izazovi na terenu i rješenja koja smo primijenili.'],
    gallery: 4,
  },
]

export const getProject = (slug: string) => projects.find((p) => p.slug === slug)
