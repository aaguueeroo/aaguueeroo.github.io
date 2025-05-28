import "./AboutPage.css";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
// import { MyBackground } from "./components/MyBackground";
import { AboutHero } from "./components/AboutHero";
import { HowIWorkTimeline } from "./components/HowIWorkTimeline";
import { BeyondDevelopment } from "./components/BeyondDevelopment";
import { AboutFinalCTA } from "./components/AboutFinalCTA";

export const AboutPage = () => {
  return (
    <div className="about-root">
      <Navbar />
      <main className="about-main">
        <AboutHero />
        {/* <MyBackground /> */}
        <BeyondDevelopment />
        <HowIWorkTimeline />
        <AboutFinalCTA />
      </main>
      <Footer />
    </div>
  );
};
