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

        // Protótipo Pet Planet — portadas do standalone, que declarava CSS solto.
        'pp-bob': {
          '0%, 100%': { transform: 'translateY(0) rotate(-2deg)' },
          '50%': { transform: 'translateY(-6px) rotate(2deg)' },
        },
        'pp-celebrate': {
          '0%, 100%': { transform: 'translateY(0) rotate(-4deg) scale(1)' },
          '25%': { transform: 'translateY(-12px) rotate(0deg) scale(1.04)' },
          '50%': { transform: 'translateY(-4px) rotate(4deg) scale(1)' },
          '75%': { transform: 'translateY(-10px) rotate(-2deg) scale(1.03)' },
        },
        'pp-sad': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(2px)' },
        },
        'pp-sleep': {
          '0%, 100%': { transform: 'translateY(0) rotate(-3deg)' },
          '50%': { transform: 'translateY(2px) rotate(-3deg)' },
        },
        'pp-poked': {
          '0%': { transform: 'translateY(0) scale(1)' },
          '30%': { transform: 'translateY(-14px) scale(1.08)' },
          '60%': { transform: 'translateY(4px) scale(0.96)' },
          '100%': { transform: 'translateY(0) scale(1)' },
        },
        'pp-twinkle': {
          '0%, 100%': { opacity: '.3', transform: 'scale(.7)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        'pp-pulse': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        'pp-rise': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pp-zzz': {
          '0%': { opacity: '0', transform: 'translate(0,0) scale(.7)' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translate(8px,-12px) scale(1.1)' },
        },
        'pp-coin': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(720deg)' },
        },
        'pp-confetti-fly': {
          '0%': { transform: 'translate(-50%, -50%) rotate(0deg)', opacity: '1' },
          '100%': {
            transform: 'translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) rotate(540deg)',
            opacity: '0',
          },
        },
        'pp-screen-in': {
          from: { opacity: '0', transform: 'scale(0.96)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        breathe: 'breathe 4s ease-in-out infinite',
        orbit: 'orbit 24s linear infinite',

        'pp-bob': 'pp-bob 3.2s ease-in-out infinite',
        'pp-celebrate': 'pp-celebrate 1.4s ease-in-out infinite',
        'pp-sad': 'pp-sad 4s ease-in-out infinite',
        'pp-sleep': 'pp-sleep 4s ease-in-out infinite',
        'pp-poked': 'pp-poked 0.7s cubic-bezier(.2,.7,.3,1) forwards',
        'pp-twinkle': 'pp-twinkle 2s ease-in-out infinite',
        'pp-pulse': 'pp-pulse 1.6s ease-in-out infinite',
        'pp-rise': 'pp-rise 0.6s ease-out both',
        'pp-zzz': 'pp-zzz 2.4s ease-in-out infinite',
        'pp-coin': 'pp-coin 2.4s ease-in-out infinite',
        'pp-confetti-fly': 'pp-confetti-fly 1.4s cubic-bezier(.2,.7,.3,1) forwards',
        'pp-screen-in': 'pp-screen-in 0.3s ease-out both',
      },
    },
  },
  plugins: [],
}

export default config
