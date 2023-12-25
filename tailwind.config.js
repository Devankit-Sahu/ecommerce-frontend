/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl": "0 0 10px rgba(0,0,0,0.204)",
      },
      screens: {
        md: "960px",
      },
    },
  },
  plugins: [],
};
