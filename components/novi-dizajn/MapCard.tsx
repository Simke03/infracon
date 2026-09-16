import Image from 'next/image'

// Placeholder location: the pin sits on the centre of Podgorica until the
// client gives the exact address. Base map is OpenStreetMap, recoloured to
// the brand palette, so the page loads no third-party scripts or cookies.
const COORDS = '42.4411,19.2636'
const LABEL = 'Podgorica, Crna Gora'

export default function MapCard({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-navy-800 ${className}`}>
      <Image
        src="/novi-dizajn/mapa-podgorica.jpg"
        alt={`Mapa — ${LABEL}`}
        fill
        sizes="(min-width: 1024px) 40vw, 100vw"
        className="object-cover"
      />

      {/* Fade the tiles into the section so the frame has no hard edge */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/25 to-navy-900/10" />

      {/* Pin */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full rounded-full bg-cream-100" />
          <span className="absolute -inset-3 rounded-full border border-cream-100/50" />
          <span className="absolute -inset-6 rounded-full border border-cream-100/20" />
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3 p-5 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
        <div>
          <p className="font-dm text-sm text-cream-100 whitespace-nowrap">{LABEL}</p>
          <p className="font-dm text-[10px] tracking-wider text-cream-500 mt-1">© OpenStreetMap</p>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${COORDS}`}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 font-dm text-xs tracking-widest uppercase text-navy-900 bg-cream-100 px-4 py-2.5 hover:bg-cream-300 transition-[background-color,transform] duration-200 ease-out active:scale-[0.97]"
        >
          Otvori u mapama
        </a>
      </div>
    </div>
  )
}
