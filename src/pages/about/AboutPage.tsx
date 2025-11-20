import "./AboutPage.css";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AboutHero } from "../home/components/AboutHero";
import { BeyondDevelopment } from "./components/BeyondDevelopment";
import { AboutFinalCTA } from "./components/AboutFinalCTA";
import WhoAmISection from "./components/WhoAmISection";

export const AboutPage = () => {
  return (
    <div className="about-root">
      <Navbar />
      <main className="about-main">
        <AboutHero />
        <WhoAmISection />
        <BeyondDevelopment />
        <AboutFinalCTA />
      </main>
      <Footer />
    </div>
  );
};
