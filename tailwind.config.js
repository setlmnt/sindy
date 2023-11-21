/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx,svg}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto Condensed", "sans-serif"],
        Antonio: ["Antonio", "sans-serif"],
        Cairo: ["Cairo Play", "sans-serif"],
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
  themes: [
      "light",
      "dark",
      "cupcake",
      "bumblebee",
      "emerald",
      "corporate",
      "synthwave",
      "retro",
      "cyberpunk",
      "valentine",
      "halloween",
      "garden",
      "forest",
      "aqua",
      "lofi",
      "pastel",
      "fantasy",
      "wireframe",
      "black",
      "luxury",
      "dracula",
      "cmyk",
      "autumn",
      "business",
      "acid",
      "lemonade",
      "night",
      "coffee",
      "winter",
      "dim",
      "nord",
      "sunset",
    ],
  },
}