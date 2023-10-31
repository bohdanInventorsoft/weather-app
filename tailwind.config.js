/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // 'grey1': 'linear-gradient(270deg, #1d57ef 0%, #10c6df 100%)'
      },
      colors: {
        tertiaryAqua: '#00191c',
        grey1: '#5c6063',
        darkgrey1: '#080e12'
      }
    },
  },
  plugins: [],
}
