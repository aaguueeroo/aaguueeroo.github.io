import HeroSection from "./components/HeroSection";
import { AboutHero } from "./components/AboutHero";
import { WhatDoIOfferSection } from "./components/WhatDoIOfferSection";
import { LetsGetInTouchSection } from "./components/LetsGetInTouchSection";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { MaxWidths } from "../../theme/constants";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    maxWidth: MaxWidths.layout,
    margin: "0 auto",
  },
  wrapper: {
    width: "100%",
  },
  verticalHeight: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const HomePage = () => {
  const classes = useStyles();

  return (
    <>
      <SEO
        title="Julia Agüero - Complete Mobile App Solutions"
        description="Premium mobile apps tailored to your vision. Full-stack development, UX design, and project management—all in one. Fast, personal, top quality."
        url="/"
      />
      <Box className={classes.container}>
        <Box className={classes.wrapper}>
          <Box className={classes.verticalHeight}>
            <Navbar />
            <HeroSection />
          </Box>
          <AboutHero />
          <WhatDoIOfferSection />
          <LetsGetInTouchSection />
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
