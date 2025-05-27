import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import WhoAmISection from "./components/WhoAmISection";
import PortfolioSection from "./components/PortfolioSection";
import { WhatDoIOfferSection } from "./components/WhatDoIOfferSection";
import { LetsGetInTouchSection } from "./components/LetsGetInTouchSection";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import HeroSection from "./components/HeroSection";

const useStyles = makeStyles(() => ({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    maxWidth: "1920px",
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
      <Box className={classes.container}>
        <Box className={classes.wrapper}>
          <Box className={classes.verticalHeight}>
            <Navbar />
            <HeroSection />
          </Box>
          <WhoAmISection />
          {/* <PortfolioSection /> */}
          <WhatDoIOfferSection />
          <LetsGetInTouchSection />
          <Footer />
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
