'use client'

import { motion } from 'framer-motion'

const shapes = [
  { size: 120, x: '10%', y: '20%', duration: 20, delay: 0, opacity: 0.03 },
  { size: 80, x: '85%', y: '15%', duration: 25, delay: 2, opacity: 0.04 },
  { size: 60, x: '70%', y: '70%', duration: 18, delay: 4, opacity: 0.03 },
  { size: 100, x: '20%', y: '80%', duration: 22, delay: 1, opacity: 0.025 },
  { size: 40, x: '50%', y: '40%', duration: 30, delay: 3, opacity: 0.035 },
]

export default function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, i) => (
        <motion.div
          key={i}
          className="absolute border border-cream-400 rounded-sm"
          style={{
            width: shape.size,
            height: shape.size,
            left: shape.x,
            top: shape.y,
            opacity: shape.opacity,
            rotate: 45,
          }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, 15, 0, -10, 0],
            rotate: [45, 50, 45, 40, 45],
          }}
          transition={{
            duration: shape.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: shape.delay,
          }}
        />
      ))}
      {/* Circles */}
      {[
        { size: 200, x: '5%', y: '50%', duration: 28, opacity: 0.02 },
        { size: 150, x: '90%', y: '45%', duration: 24, opacity: 0.025 },
      ].map((circle, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute border border-cream-400 rounded-full"
          style={{
            width: circle.size,
            height: circle.size,
            left: circle.x,
            top: circle.y,
            opacity: circle.opacity,
          }}
          animate={{
            y: [0, -20, 0, 15, 0],
            scale: [1, 1.05, 1, 0.95, 1],
          }}
          transition={{
            duration: circle.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
