/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brahmaputra Serenity (Primary Theme)
        primary: {
          DEFAULT: '#1E3A8A', // Deep Slate Blue
        },
        secondary: {
          DEFAULT: '#60A5FA', // Soft Sky Blue
        },
        accent: {
          DEFAULT: '#059669', // Assam Tea Green (Interactive)
          dark: '#047857',    // AA-safe green for text and gradients
          glow: '#34D399',    // Soft mint, used only for glows and pulses
        },
        background: {
          DEFAULT: '#F8FAFC', // Soft Pearl White
        },
        text: {
          DEFAULT: '#0F172A', // Charcoal Slate
        },
        warning: {
          DEFAULT: '#D97706', // Muted Amber/Orange
        },
        
        // Reminiscence Theme (Secondary)
        reminiscence: {
          forest: '#1B4332',
          amber: '#D97706',
          bamboo: '#A3E635',
          cream: '#FAF8F5',
          espresso: '#1C1917',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 6px 20px -6px rgba(4, 120, 87, 0.55)',
        'glow-lg': '0 10px 30px -8px rgba(4, 120, 87, 0.65)',
        'glow-primary': '0 8px 24px -8px rgba(30, 58, 138, 0.55)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'splash-in': {
          '0%': { opacity: '0', transform: 'scale(0.88)' },
          '60%': { opacity: '1', transform: 'scale(1.02)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'splash-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'correct-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(52, 211, 153, 0.55)', transform: 'scale(1)' },
          '50%': { boxShadow: '0 0 0 18px rgba(52, 211, 153, 0)', transform: 'scale(1.03)' },
          '100%': { boxShadow: '0 0 0 0 rgba(52, 211, 153, 0)', transform: 'scale(1)' },
        },
        'gentle-shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 400ms ease-out both',
        'splash-in': 'splash-in 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'splash-out': 'splash-out 400ms ease-in both',
        'correct-pulse': 'correct-pulse 1200ms ease-out 2',
        'gentle-shake': 'gentle-shake 400ms ease-in-out 1',
      }
    },
  },
  plugins: [],
}
