import { Box, Link, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { ReactNode } from "react";

import { CONTACT_EMAIL, Flatto, flattoTheme } from "./flattoBrand";

// The frame of the Flatto app's public pages. They wear the app's brand (the Flatto design system)
// instead of the website's: no site navbar or footer.
//
// Their fonts are served from public/flatto/fonts: a page about privacy doesn't send its readers'
// IP addresses to Google.

const ICON_URL = "https://juliaaguero.com/flatto/icon.png";

const FONT_FACES = `
@font-face {
  font-family: 'Bricolage Grotesque';
  src: url('/flatto/fonts/bricolage-grotesque.woff2') format('woff2-variations');
  font-weight: 200 800;
  font-display: swap;
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('/flatto/fonts/plus-jakarta-sans.woff2') format('woff2-variations');
  font-weight: 200 800;
  font-display: swap;
}`;

const PAGES = [
  { path: "/flatto/privacy-policy", label: "Privacy Policy" },
  { path: "/flatto/terms", label: "Terms of Use" },
  { path: "/flatto/support", label: "Support" },
] as const;

export const Email = () => (
  <Link href={`mailto:${CONTACT_EMAIL}`} sx={{ color: Flatto.tealDeep, fontWeight: 700, overflowWrap: "anywhere" }}>
    {CONTACT_EMAIL}
  </Link>
);

export const P = ({ children }: { children: ReactNode }) => (
  <Typography sx={{ fontSize: "1.0625rem", lineHeight: 1.6, color: Flatto.ink, mb: "16px" }}>{children}</Typography>
);

export const SectionTitle = ({ children }: { children: ReactNode }) => (
  <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" }, lineHeight: 1.25, mb: "16px" }}>
    {children}
  </Typography>
);

type FlattoPageProps = {
  title: string;
  description: string;
  url: string;
  lastUpdated?: string;
  intro: ReactNode;
  children?: ReactNode;
};

const FlattoPage = ({ title, description, url, lastUpdated, intro, children }: FlattoPageProps) => (
  <ThemeProvider theme={flattoTheme}>
    <Helmet htmlAttributes={{ lang: "en" }}>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <link rel="icon" type="image/png" href="/flatto/icon.png" />
      <link rel="apple-touch-icon" href="/flatto/apple-touch-icon.png" />
      <meta name="theme-color" content={Flatto.cream} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content="Flatto" />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ICON_URL} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_GB" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ICON_URL} />
      <style>{FONT_FACES}</style>
    </Helmet>
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: Flatto.cream,
        color: Flatto.ink,
        fontFamily: Flatto.body,
      }}
    >
      <Box
        component="header"
        sx={{
          backgroundColor: Flatto.white,
          borderBottom: `1px solid ${Flatto.line}`,
          px: { xs: "16px", sm: "32px" },
          py: "12px",
        }}
      >
        <Box sx={{ maxWidth: "760px", mx: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
          <Box component="img" src="/flatto/icon.png" alt="" sx={{ width: 48, height: 48 }} />
          <Typography
            component="span"
            sx={{ fontFamily: Flatto.display, fontWeight: 800, fontSize: "1.6rem", color: Flatto.ink }}
          >
            Flatto
          </Typography>
        </Box>
      </Box>
      <Box component="main" sx={{ flex: 1, px: { xs: "16px", sm: "32px" }, pb: "64px" }}>
        <Box
          component="article"
          sx={{
            maxWidth: "760px",
            mx: "auto",
            mt: { xs: "32px", md: "48px" },
            display: "flex",
            flexDirection: "column",
            gap: "32px",
          }}
        >
          <Box>
            <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, lineHeight: 1.15, mb: "12px" }}>
              {title}
            </Typography>
            {lastUpdated && (
              <Typography sx={{ fontSize: "1rem", color: Flatto.inkSoft, mb: "16px" }}>
                Last updated: {lastUpdated}
              </Typography>
            )}
            <P>{intro}</P>
          </Box>
          {children}
        </Box>
      </Box>
      <Box
        component="footer"
        sx={{ borderTop: `1px solid ${Flatto.line}`, px: { xs: "16px", sm: "32px" }, py: "24px" }}
      >
        <Box
          sx={{
            maxWidth: "760px",
            mx: "auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "8px 24px",
          }}
        >
          <Typography sx={{ color: Flatto.inkSoft, fontSize: "1rem" }}>Flatto · An app for shared flats.</Typography>
          <Box component="nav" aria-label="Flatto pages" sx={{ display: "flex", flexWrap: "wrap", gap: "8px 16px" }}>
            {PAGES.filter((page) => !url.endsWith(page.path)).map((page) => (
              <Link key={page.path} href={page.path} sx={{ color: Flatto.tealDeep, fontSize: "1rem" }}>
                {page.label}
              </Link>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  </ThemeProvider>
);

export default FlattoPage;
