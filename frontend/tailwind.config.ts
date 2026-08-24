import type { Config } from 'tailwindcss'

/**
 * Tokens da identidade SoulUp.
 * Valores fixos — não criar variações fora desta lista.
 */
const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        soul: { DEFAULT: '#29B4B7', light: '#A4DBDE', wash: '#E8F6F6', deep: '#0F5F61' },
        navy: { DEFAULT: '#16486B', dark: '#0E3550' },
        sun: { DEFAULT: '#C8A84B', wash: '#FBF6E8', line: '#EBD9A8', text: '#7A6320' },
        ink: { DEFAULT: '#000000', muted: '#6B7A85' },
        line: '#E3E7EA',
        surf: '#F5F5F5',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: { card: '12px', pill: '9999px' },
      keyframes: {
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.03)' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        orbit: 'orbit 24s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config
