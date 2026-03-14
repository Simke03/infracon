'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
  children: ReactNode
  className?: string
  tiltStrength?: number
}

export default function TiltCard({ children, className = '', tiltStrength = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(y, [0, 1], [tiltStrength, -tiltStrength]), {
    stiffness: 300,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [0, 1], [-tiltStrength, tiltStrength]), {
    stiffness: 300,
    damping: 30,
  })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect()
    x.set((e.clientX - rect.left) / rect.width)
    y.set((e.clientY - rect.top) / rect.height)
  }

  const reset = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
