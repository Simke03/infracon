'use client'

const items = [
  'VISOKOGRADNJA',
  'NISKOGRADNJA',
  'INFRASTRUKTURA',
  'REKONSTRUKCIJA',
  'PROJEKTOVANJE',
  'KONSALTING',
  'KVALITET',
  'POUZDANOST',
]

export default function Marquee() {
  const content = items.map((item) => (
    <span key={item} className="flex items-center gap-8 shrink-0">
      <span className="font-orbitron text-sm md:text-base tracking-ultrawide text-cream-400/30">
        {item}
      </span>
      <span className="w-1.5 h-1.5 rounded-full bg-cream-400/20 shrink-0" />
    </span>
  ))

  return (
    <div className="relative overflow-hidden py-6 md:py-8 bg-navy-900 border-y border-cream-400/5">
      <div className="flex gap-8 marquee-track">
        <div className="flex gap-8 shrink-0 marquee-scroll">
          {content}
        </div>
        <div className="flex gap-8 shrink-0 marquee-scroll" aria-hidden="true">
          {content}
        </div>
      </div>
    </div>
  )
}
