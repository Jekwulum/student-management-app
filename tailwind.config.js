/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "customColor": "#5D8AA8",
        "customBg": "#dbeeff",
        "customLight": "#e3e3e3"
      },
    },
  },
  plugins: [],
});

