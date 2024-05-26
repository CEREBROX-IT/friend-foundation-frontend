/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#003A5D",
          dark: "#1e3a8a",
        },
        secondary: {
          light: "#FDB714",
          dark: "#FDB714",
        },
        third: {
          light: "#E9A60A",
          dark: "#b45309",
        },
        fourth: {
          light: "#F5F6FB",
          dark: "#454545",
        },
        fifth: {
          light: "#202020",
          dark: "#202020",
        },
        sixth: {
          light: "#FFFFFF",
          dark: "#2c2c2c",
        },
      },
    },
  },
  plugins: [],
};
