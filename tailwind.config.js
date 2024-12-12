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
      },
      colors: {
        customGreen: "#1A775B",
        
      }
    },
  },
  plugins: [],
}