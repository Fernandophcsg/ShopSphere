/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "path-to-your-node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
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
);