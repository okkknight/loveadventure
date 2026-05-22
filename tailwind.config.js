/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      boxShadow: {
        soft: '0 18px 50px rgba(91, 72, 56, 0.12)',
        bubble: '0 8px 24px rgba(91, 72, 56, 0.09)',
      },
      keyframes: {
        floatIn: {
          '0%': { opacity: '0', transform: 'translateY(12px) scale(0.98)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        wiggleSoft: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(0.7deg)' },
          '75%': { transform: 'rotate(-0.7deg)' },
        },
      },
      animation: {
        floatIn: 'floatIn 0.45s ease-out both',
        wiggleSoft: 'wiggleSoft 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
