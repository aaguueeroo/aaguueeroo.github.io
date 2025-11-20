import HeroSection from "./components/HeroSection";
import { WhatDoIOfferSection } from "./components/WhatDoIOfferSection";
import PortfolioOverviewSection from "./components/PortfolioOverviewSection";
import { HowIWorkTimeline } from "../about/components/HowIWorkTimeline";
import { LetsGetInTouchSection } from "./components/LetsGetInTouchSection";
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
          <Box
            sx={{
              width: "100%",
              px: { xs: 2, md: 4 },
              pt: { xs: 8, md: 12 },
              pb: { xs: 8, md: 12 },
            }}
          >
            <Box
              sx={{
                maxWidth: MaxWidths.content,
                mx: "auto",
                width: "100%",
                boxSizing: "border-box",
                padding: {
                  xs: "0px 16px",
                  sm: "96px 32px",
                  md: "0px 96px",
                },
              }}
            >
              <HowIWorkTimeline />
            </Box>
          </Box>
          <PortfolioOverviewSection />
          <Box
            sx={{
              width: "100%",
              px: { xs: 2, md: 4 },
              pt: { xs: 8, md: 12 },
              pb: { xs: 8, md: 12 },
            }}
          >
            <Box
              sx={{
                maxWidth: MaxWidths.content,
                mx: "auto",
                width: "100%",
                boxSizing: "border-box",
                padding: {
                  xs: "0px 16px",
                  sm: "96px 32px",
                  md: "0px 96px",
                },
              }}
            >
              <TestimonialsCarousel testimonials={testimonials} />
            </Box>
          </Box>
          <LetsGetInTouchSection />
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
