/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}" 
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
      },
      colors: {
        'grayy': '#4B4B4B',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    }, 
  },
  plugins: [],
  important: true, // Đảm bảo CSS của Tailwind không bị ghi đè
};
 