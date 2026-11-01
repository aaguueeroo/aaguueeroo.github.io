import { createTheme } from "@mui/material/styles";

// The colours and fonts of the design system, from flatto/lib/core/theme/app_colors.dart.
export const Flatto = {
  cream: "#FBF6EF",
  white: "#FFFFFF",
  line: "#EDE4D8",
  lineStrong: "#DCCFBF",
  ink: "#173F4A",
  inkSoft: "#4F6B73",
  tangerine: "#EB6F3D",
  tangerineTint: "#FFF3EC",
  tealDeep: "#1C6E68",
  tealTint: "#EDF8F6",
  display: "'Bricolage Grotesque', 'Plus Jakarta Sans', system-ui, sans-serif",
  body: "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif",
} as const;

export const flattoTheme = createTheme({
  palette: {
    primary: { main: Flatto.tealDeep },
    text: { primary: Flatto.ink, secondary: Flatto.inkSoft },
    background: { default: Flatto.cream, paper: Flatto.white },
    divider: Flatto.line,
  },
  typography: {
    fontFamily: Flatto.body,
    h1: { fontFamily: Flatto.display, fontWeight: 800 },
    h2: { fontFamily: Flatto.display, fontWeight: 700 },
  },
});

export const CONTACT_EMAIL = "flatto@juliaaguero.com";
