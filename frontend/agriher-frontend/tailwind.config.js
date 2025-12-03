/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14532d",
        secondary: "#f97316",
        accent: "#22d3ee",
      },
    },
  },
  plugins: [],
};

