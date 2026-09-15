import type { Config } from 'tailwindcss'

const config: Config = {
  future: {
    hoverOnlyWhenSupported: true,
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1c2736',
          50: '#f0f2f5',
          100: '#d9dee5',
          200: '#b3bdcb',
          300: '#8d9cb1',
          400: '#677b97',
          500: '#415a7d',
          600: '#344864',
          700: '#27364b',
          800: '#1c2736',
          900: '#111a24',
          950: '#0a1018',
        },
        cream: {
          DEFAULT: '#c8c2b8',
          50: '#faf9f7',
          100: '#f2f0ec',
          200: '#e5e1da',
          300: '#d4d0ca',
          400: '#c8c2b8',
          500: '#b0a898',
          600: '#978e7d',
          700: '#7d7567',
          800: '#635d52',
          900: '#4a4640',
        },
      },
      fontFamily: {
        display: ['var(--font-jakarta)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body: ['var(--font-jakarta)', 'sans-serif'],
        orbitron: ['var(--font-orbitron)', 'sans-serif'],
        dm: ['var(--font-dm)', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        ultrawide: '0.35em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
      },
      maxWidth: {
        '8xl': '88rem',
      },
    },
  },
  plugins: [],
}

export default config
