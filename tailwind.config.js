/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        "300": "300px minmax(0,1fr)",
        "200": "200px minmax(0,1fr)",
      },
    },
  },
  plugins: [],
};
