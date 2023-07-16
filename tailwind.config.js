/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "customColor": "#320061",
        "customBg": "#e3e3e3",
        "customLight": "#e3e3e3"
      },
    },
  },
  plugins: [],
});

