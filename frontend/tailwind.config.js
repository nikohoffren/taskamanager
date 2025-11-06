/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#646cff",
          hover: "#535bf2",
        },
        error: {
          DEFAULT: "#ff6b6b",
          bg: "rgba(255, 107, 107, 0.1)",
        },
      },
    },
  },
  plugins: [],
};
