const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    "./dist/**/*.html",
    "./dist/**/*.js"
  ],
  theme: {
    screens: {
      md: "768px",
      lg: "1025px",
      xl: "1440px"
    },
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
      "blue": {
        100: "#BEE2FD",
        200: "#ABBCFF",
        300: "#0070C9",
        400: "#022959"
      },
      "purple": {
        100: "#7A29DC",
        200: "#483EFF",
      },
      "red": "#EE374A",
      "pink": "#F9818E",
      "brown": "#8a2121",
      "green": {
        100: "#6fd649",
        200: "#027202"
      }
    },
    fontFamily: {
      inter: ["Inter", ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
}