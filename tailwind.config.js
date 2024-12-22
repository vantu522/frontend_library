/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}" 
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        'gradient-x': 'gradient-x 15s ease infinite',
        'slow-pulse': 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 4s ease-in-out infinite',
        'modal-appear': 'modal-appear 0.5s ease-out',
        'overlay-appear': 'overlay-appear 0.5s ease-in-out',
        'fade-in-down': 'fade-in-down 1s ease-out',
      },
      colors: {
        grayy: '#4B4B4B',
        custom: 'rgba(255, 255, 255, 0.2)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        'modal-appear': {
          '0%': {
            opacity: '0',
            transform: 'scale(0.95) translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1) translateY(0)'
          }
        },
        'overlay-appear': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      },
    },
  },
  variants: {
    extend: {
      transform: ['hover', 'focus'],
      scale: ['hover', 'focus'],
    },
  },
  plugins: [],
  important: true, // Đảm bảo CSS của Tailwind không bị ghi đè
};
