import { landingContent } from "./content/landingContent";
import { Features } from "./sections/Features";
import { Footer } from "./sections/Footer";
import { FridgeDoor } from "./sections/FridgeDoor";
import { Header } from "./sections/Header";
import { Hero } from "./sections/Hero";
import { Join } from "./sections/Join";
import { MakerNote } from "./sections/MakerNote";
import { Questions } from "./sections/Questions";
import { Steps } from "./sections/Steps";
import { StickyCta } from "./sections/StickyCta";

// The funnel, in order. Each section does one job, from the first look to the email:
// attention, recognition, the turn, the hook, reassurance, trust, objections, action.
export const LandingPage = () => (
  <>
    <a className="skip-link" href="#content">
      {landingContent.skipLink}
    </a>
    <div id="top">
      <Header />
      <main id="content">
        <Hero />
        <FridgeDoor />
        <Features />
        <Steps />
        <MakerNote />
        <Questions />
        <Join />
      </main>
      <Footer />
    </div>
    <StickyCta />
  </>
);
