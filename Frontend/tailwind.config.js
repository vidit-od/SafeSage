/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "space": "Space Grotesk",
        "lobster": "Lobster"
      },
      fontSize:{
        "3xl": "30px",
        "8xl":"80px"
      },
      backgroundColor:{
        'semi-black': 'rgba(0,0,0,0.5)',
        'semi-white': 'rgba(255,255,255,0.5)',
      },
      width:{
        "96": "400px"
      }
    },
  },
  plugins: [],
}