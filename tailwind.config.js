/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // Educational App Primary
        secondary: '#818CF8', // Educational App Secondary
        cta: '#F97316', // Educational App CTA
        background: '#EEF2FF', // Educational App Background
        text: '#1E1B4B', // Educational App Text
        border: '#C7D2FE', // Educational App Border
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}