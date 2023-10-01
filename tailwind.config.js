/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-500": "#603DE1",
        "main-700": "#240695",
        "secondary-500": "#333335",
        "main-gray": "#F7F8FC",
      },
    },
  },
  plugins: [],
};
