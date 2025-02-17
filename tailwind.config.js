/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./src/**/*.{html,js,ts,tsx,jsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "blue-button": "#0275ff",
      },
    },
  },
  plugins: [],
};
