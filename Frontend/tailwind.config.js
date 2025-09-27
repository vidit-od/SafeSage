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
        "8xl":"80px",
        "10xl":"70px"
      },
      backgroundColor:{
        'semi-black': 'rgba(0,0,0,0.5)',
        'semi-white': 'rgba(255,255,255,0.5)',
        'gray-100':'#f1f1f1',
        'blue-custom1':'#719FAE',
        'orange-100':'#fff5Ef',
        'skeleton': '#f1f1f1',
        'grad': 'linear-gradient(to right, transparent, #d7d7d7, transparent)'
      },
      width:{
        "96": "400px",
        "block": "15px",
        "1":"2px",
        "50vw":"39vw"
      },
      height:{
        "50vh": "50vh",
        "2/3vh":"300px"
      },
      rotate:{
        "30":"20deg"
      },
      translate:{
        "30": "118.5px",
        "screen": "100vh"
      },
      animation:{
        "rotate"        : "circle 1s  linear infinite",
        "logo"          : "loader 5s  linear infinite",
        "loadbar"       : "bar    5s  linear infinite",
        'catagories'    : "shifts 50s linear infinite",
        'bounce'        : "leftbounce 2s linear infinite",
        'skeleton'      : 'skeletons 1s linear infinite',
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
        shifts:{
          "0%": { transform: "translateX(0%)"},
          "100%": { transform: "translateX(-50%)" },
        },
        leftbounce:{
          '0%': { transform: " translateX(0px) translateY(2px)"},
          '5%': { transform: " translateX(5px) translateY(2px)"},
          '10%': { transform: " translateX(0px) translateY(2px)"},
          '15%': { transform: " translateX(5px) translateY(2px)"},
          '20%': { transform: " translateX(0px) translateY(2px)"},
        },
        skeletons:{
          '100%': {transform: 'translateX(100%)'}
        }
      },
      boxShadow: {
        'bdr-light': 'rgba(101, 119, 134, 0.2) 0px 0px 15px, rgba(101, 119, 134, 0.15) 0px 0px 3px 1px',
      }
    },
  },
  plugins: [],
}