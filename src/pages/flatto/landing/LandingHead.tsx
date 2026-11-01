import { landingContent } from "./content/landingContent";
import { HERO_PHONE_SIZES } from "./sections/Hero";
import { screenSources } from "./ui/screenSources";

const { meta, hero } = landingContent;

const CREAM = "#FBF6EF";

// Share cards are read from the raw HTML by apps that don't run JavaScript.
export const LandingHead = () => (
  <>
    <title>{meta.title}</title>
    <meta name="description" content={meta.description} />
    <meta name="theme-color" content={CREAM} />
    <link rel="canonical" href={meta.url} />
    <link rel="icon" type="image/png" href="/flatto/icon.png" />
    <link rel="apple-touch-icon" href="/flatto/apple-touch-icon.png" />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en_GB" />
    <meta property="og:site_name" content="Flatto" />
    <meta property="og:title" content={meta.shareTitle} />
    <meta property="og:description" content={meta.shareDescription} />
    <meta property="og:url" content={meta.url} />
    <meta property="og:image" content={meta.shareImage} />
    <meta property="og:image:secure_url" content={meta.shareImage} />
    <meta property="og:image:type" content="image/jpeg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content={meta.shareImageAlt} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={meta.shareTitle} />
    <meta name="twitter:description" content={meta.shareDescription} />
    <meta name="twitter:image" content={meta.shareImage} />
    <meta name="twitter:image:alt" content={meta.shareImageAlt} />
    <link
      rel="preload"
      as="image"
      type="image/avif"
      imageSrcSet={screenSources(hero.screen.name)}
      imageSizes={HERO_PHONE_SIZES}
    />
  </>
);
