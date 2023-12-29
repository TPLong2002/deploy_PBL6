/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        l: "24rem",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
