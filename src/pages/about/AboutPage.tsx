import "./AboutPage.css";
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AboutHero } from "../home/components/AboutHero";
import { BeyondDevelopment } from "./components/BeyondDevelopment";
import { AboutFinalCTA } from "./components/AboutFinalCTA";
import WhoAmISection from "./components/WhoAmISection";

export const AboutPage = () => {
  return (
    <div className="about-root">
      {/* Loaded here and not in AboutPage.css, which ends up in the bundle of every page. */}
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Jua&display=swap" rel="stylesheet" />
      </Helmet>
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
