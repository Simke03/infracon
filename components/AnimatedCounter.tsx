'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  target: number
  suffix?: string
  duration?: number
  label: string
}

export default function AnimatedCounter({
  target,
  suffix = '+',
  duration = 2000,
  label,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!isInView || hasAnimated.current) return
    hasAnimated.current = true

    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isInView, target, duration])

  return (
    <div ref={ref} className="text-center">
      <div className="font-serif text-5xl md:text-6xl lg:text-7xl font-light text-navy-800">
        {count}
        <span className="text-cream-500">{suffix}</span>
      </div>
      <div className="mt-3 text-sm tracking-wider uppercase text-navy-500 font-display">
        {label}
      </div>
    </div>
  )
}
