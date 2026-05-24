/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'display': ['var(--font-display)'],
        'body': ['var(--font-body)'],
        'mono': ['var(--font-mono)'],
      },
      colors: {
        denim: {
          950: '#080c14',
          900: '#0d1421',
          800: '#121b2e',
          700: '#1a2640',
          600: '#243552',
          500: '#2e4468',
          400: '#3d5a87',
          300: '#5a7aaa',
          200: '#7d9cc6',
          100: '#a8c0de',
        },
        raw: {
          gold: '#c8a94a',
          rust: '#b85c38',
          chalk: '#e8e0d0',
          ash: '#9a9080',
          thread: '#4a6741',
        }
      },
      backgroundImage: {
        'denim-texture': "url('/images/denim-bg.png')",
      },
      animation: {
        'swing': 'swing 3s ease-in-out infinite',
        'bounce-slow': 'bounceSlow 2s ease-in-out infinite',
        'stitch-draw': 'stitchDraw 2s ease-in-out forwards',
      },
      keyframes: {
        swing: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        bounceSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      }
    },
  },
  plugins: [],
}
