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
      }
    },
  },
  plugins: [],
}
