import HeroSection from "./components/HeroSection";
import { WhatDoIOfferSection } from "./components/WhatDoIOfferSection";
import PortfolioOverviewSection from "./components/PortfolioOverviewSection";
import { HowIWorkTimeline } from "../about/components/HowIWorkTimeline";
import { LetsGetInTouchSection } from "./components/LetsGetInTouchSection";
import { HomeSection } from "./components/HomeSection";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import TestimonialsCarousel from "../../components/TestimonialsCarousel";
import { testimonials } from "../../data/testimonials";
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
          <WhatDoIOfferSection />
          <HomeSection sx={{ py: { xs: 8, md: 12 } }}>
            <HowIWorkTimeline />
          </HomeSection>
          <PortfolioOverviewSection />
          <HomeSection sx={{ py: { xs: 8, md: 12 } }}>
            <TestimonialsCarousel testimonials={testimonials} />
          </HomeSection>
          <LetsGetInTouchSection />
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
