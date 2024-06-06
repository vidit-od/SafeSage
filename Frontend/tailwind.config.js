/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'semi-black': 'rgba(0,0,0,0.5)',
      },
      width:{
        "96": "400px"
      }
    },
  },
  plugins: [],
}