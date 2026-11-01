import { renderToStaticMarkup } from "react-dom/server";
import { LandingHead } from "./LandingHead";
import { LandingPage } from "./LandingPage";

// Called at build time by scripts/prerenderLanding.ts. Never runs in a visitor's browser.
export const renderLanding = () => ({
  head: renderToStaticMarkup(<LandingHead />),
  body: renderToStaticMarkup(<LandingPage />),
});
