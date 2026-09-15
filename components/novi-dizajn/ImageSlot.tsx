// Placeholder frame where a real project photo will go. Crop marks keep it
// reading as an intentional drawing-board frame rather than a missing image.
interface ImageSlotProps {
  className?: string
  label?: string
  tone?: 'light' | 'dark'
  transitionName?: string
}

export default function ImageSlot({ className = '', label = 'Fotografija', tone = 'light', transitionName }: ImageSlotProps) {
  const surface = tone === 'light' ? 'bg-cream-200 text-navy-400' : 'bg-navy-800 text-cream-600'
  const tick = tone === 'light' ? 'border-navy-800/25' : 'border-cream-400/25'

  return (
    <div
      className={`relative overflow-hidden ${surface} ${className}`}
      style={transitionName ? ({ viewTransitionName: transitionName } as React.CSSProperties) : undefined}
    >
      <span className={`absolute top-3 left-3 w-4 h-4 border-t border-l ${tick}`} />
      <span className={`absolute top-3 right-3 w-4 h-4 border-t border-r ${tick}`} />
      <span className={`absolute bottom-3 left-3 w-4 h-4 border-b border-l ${tick}`} />
      <span className={`absolute bottom-3 right-3 w-4 h-4 border-b border-r ${tick}`} />
      <span className="absolute bottom-5 left-6 font-dm text-[11px] tracking-widest uppercase">{label}</span>
    </div>
  )
}
