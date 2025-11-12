import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { Colors, Radiuses, Spacings } from "./constants";

let theme = createTheme({
  palette: {
    primary: {
      main: Colors.primary,
      "100": "#FFF6F4",
      "200": "#F6EBE9",
      "300": "#F2D6D0",
      "400": "#E4B4AB",
      "500": "#CF8B7F",
      "600": "#8C524D",
      "700": "#502423",
      "800": "#2A0F0F",
      "900": "#110404",
    },
    secondary: {
      main: Colors.secondary,
      "100": "#F0F2F3",
      "200": "#D9DCDE",
      "300": "#BEC2C5",
      "400": "#A3A7AA",
      "500": "#212529",
      "600": "#1B1E20",
      "700": "#141618",
      "800": "#0E0F10",
      "900": "#080909",
    },
    success: {
      main: "#648a65",
    },
    error: {
      main: "#ad4949",
    },
    warning: {
      main: "#c1843a",
    },
    background: {
      default: "#F3F3F3",
    },
  },
  spacing: Spacings.xxs,
  shape: {
    borderRadius: Radiuses.xl,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          padding: Spacings.m,
          gap: Spacings.s,
          borderRadius: Radiuses.l,
          boxShadow: "18px 23px 71.5px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
  typography: {
    fontFamily: ["Golos Text", "sans-serif"].join(","),
    h1: {
      fontFamily: ["Golos Text", "sans-serif"].join(","),
      fontWeight: 700,
      lineHeight: 1.2,
      fontSize: "2.5rem",
      "@media (min-width:600px)": {
        fontSize: "3rem",
      },
      "@media (min-width:900px)": {
        fontSize: "3.5rem",
      },
    },
    h2: {
      fontFamily: ["Golos Text", "sans-serif"].join(","),
      fontWeight: 700,
      lineHeight: 1.25,
      fontSize: "2rem",
      "@media (min-width:600px)": {
        fontSize: "2.5rem",
      },
      "@media (min-width:900px)": {
        fontSize: "3rem",
      },
    },
    h3: {
      fontFamily: ["Golos Text", "sans-serif"].join(","),
      fontWeight: 700,
      lineHeight: 1.3,
      fontSize: "1.75rem",
      "@media (min-width:900px)": {
        fontSize: "2.125rem",
      },
    },
    h4: {
      fontFamily: ["Golos Text", "sans-serif"].join(","),
      fontWeight: 700,
      lineHeight: 1.35,
      fontSize: "1.5rem",
      "@media (min-width:900px)": {
        fontSize: "1.875rem",
      },
    },
    h5: {
      fontFamily: ["Golos Text", "sans-serif"].join(","),
      fontWeight: 700,
      lineHeight: 1.35,
      fontSize: "1.25rem",
      "@media (min-width:900px)": {
        fontSize: "1.5rem",
      },
    },
    h6: {
      fontFamily: ["Golos Text", "sans-serif"].join(","),
      fontWeight: 700,
      lineHeight: 1.4,
      fontSize: "1.125rem",
      "@media (min-width:900px)": {
        fontSize: "1.25rem",
      },
    },
    subtitle1: {
      fontFamily: ["Golos Text", "sans-serif"].join(","),
      fontWeight: 600,
      lineHeight: 1.5,
      fontSize: "1.0625rem",
    },
    subtitle2: {
      fontFamily: ["Golos Text", "sans-serif"].join(","),
      fontWeight: 600,
      lineHeight: 1.45,
      fontSize: "0.9375rem",
    },
    button: {
      fontFamily: ["Golos Text", "sans-serif"].join(","),
      fontWeight: 600,
      textTransform: "none",
      fontSize: "1rem",
      lineHeight: 1.4,
    },
    body1: {
      fontFamily: ["Golos Text", "sans-serif"].join(","),
      fontWeight: 400,
      lineHeight: 1.6,
      fontSize: "1rem",
      "@media (min-width:900px)": {
        fontSize: "1.0625rem",
      },
    },
    body2: {
      fontFamily: ["Golos Text", "sans-serif"].join(","),
      fontWeight: 400,
      lineHeight: 1.6,
      fontSize: "0.9375rem",
    },
    caption: {
      fontFamily: ["Golos Text", "sans-serif"].join(","),
      fontWeight: 400,
      lineHeight: 1.4,
      fontSize: "0.8125rem",
    },
  },
});

// This will make all typography responsive automatically
theme = responsiveFontSizes(theme);

export default theme;
