'use client'

import Image from 'next/image'

interface LogoProps {
  size?: number
  showText?: boolean
  className?: string
  light?: boolean
}

export default function Logo({ size = 48, showText = true, className = '', light = false }: LogoProps) {
  const color = light ? '#f2f0ec' : '#1c2736'

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Image
        src="/logo.svg"
        alt="INFRACON logo"
        width={size}
        height={size}
        priority
      />

      {showText && (
        <span
          className="font-display font-semibold tracking-ultrawide mt-2 text-sm"
          style={{ color }}
        >
          INFRACON
        </span>
      )}
    </div>
  )
}