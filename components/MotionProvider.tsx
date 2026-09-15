'use client'

import { MotionConfig } from 'framer-motion'
import { ReactNode } from 'react'

// With reducedMotion="user", Framer keeps opacity fades but drops transform
// motion for visitors who ask their OS for less movement.
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>
}
