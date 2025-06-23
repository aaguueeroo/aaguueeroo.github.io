import "./AboutPage.css";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { BeyondDevelopment } from "./components/BeyondDevelopment";
import { AboutFinalCTA } from "./components/AboutFinalCTA";
import WhoAmISection from "../home/components/WhoAmISection";
import { HowIWorkTimeline } from "./components/HowIWorkTimeline";

export const AboutPage = () => {
  return (
    <div className="about-root">
      <Navbar />
      <main className="about-main">
        <WhoAmISection />
        <HowIWorkTimeline />
        <BeyondDevelopment />
        <AboutFinalCTA />
      </main>
      <Footer />
    </div>
  );
};
