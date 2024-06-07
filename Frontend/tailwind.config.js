import { transform } from 'typescript';

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
        'gray-100':'#f1f1f1'
      },
      width:{
        "96": "400px",
        "block": "15px"
      },
      translate:{
        "30": "118.5px"
      },
      animation:{
        "rotate": "circle 1s linear infinite",
        "logo": "loader 5s linear infinite",
        "loadbar": "bar 5s linear infinite",
        "maxscale": "maxs 5s linear"
      },
      keyframes : {
        circle: {
          "0%": { transform: "rotate(0deg)"},
          "100%": { transform: "rotate(360deg)" },
        },
        loader:{
          "0% ": {opacity: "0.5" , scale:"0.98"},
          "5%": {opacity: "1" , scale: "1"},
          "10% ": {opacity: "0.5" , scale:'0.98'},
          "15%": {opacity: "1" ,scale: '1'},
        },
        bar:{
          '0% , 100%' : {width: '20%',left : '0'},
          '25%': {width:'50%'},
          '50%': {width:'30%', left: '70%'},
          '75%': {width:'50%'},
        },
        maxs:{
          '0%':  {scale:"1"},
          '100%':{scale:"100000"},
        }
      },
      
    },
  },
  plugins: [],
}