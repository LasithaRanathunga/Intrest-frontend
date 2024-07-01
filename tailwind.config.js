/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Noto: ["Noto Sans", "sans-serif"],
        Pacifico: ["Pacifico", "cursive"],
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
