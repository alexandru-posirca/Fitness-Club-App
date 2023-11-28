const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./dist/**/*.html",
    "./dist/**/*.js"
  ],
  theme: {
    colors: {
      "white-main": "#FAFAF9",
      "black-main": "#171717",
      "gray-dark": {
        100: "#EFEDE8a6",
        200: "#303030",
      },
      "gray-light": {
        50: "#F8F9FF",
        100: "#F8F4FF",
        200: "#9699AA",
        300: "#323443",
        400: "#232532",
      },
      "orange": {
        100: "#FFAF7E",
        200: "#EFA082",
        300: "#EF8964",
        400: "#EF8963",
        500: "#E6533C",
      },
      "purple": {
        100: "#7A29DC",
        200: "#483EFF",
      },
    },
    fontFamily: {
      inter: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
}