import { createStitches } from "@stitches/react";

export const { styled, css, globalCss, theme } = createStitches({
  theme: {
    colors: {
      white: "#FFF",
      black: "#000",
      blackOpac: "rgba(0,0,0,0.35)",
      green500: "#22C55E",
      green600: "#1ca64f",
      red500: "#EF4444",
      yellow500: "#f5c30b",
      yellow600: "#dbaf0b",
      blue500: "#6366F1",
      grey200: "#EEE",
      grey300: "#E0E0E0",
      grey600: "#919191",
      grey800: "#333",
    },
  },
});
