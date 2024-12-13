/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        slider1: "url('/src/assets/images/slider1.png')",
        slider2: "url('/src/assets/images/slider2.png')",
        slider3: "url('/src/assets/images/slider3.png')",
      },
      colors: {
        customGreen: "#1A775B",
        
      }
    },
  },
  plugins: [],
}