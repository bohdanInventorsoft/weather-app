/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
    './views/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tertiaryAqua: '#00191c',
        grey1: '#5c6063',
        darkgrey1: '#080e12'
      }
    },
  },
  plugins: [],
}
