import "../AboutPage.css";
import aboutMeImg from "../../../assets/images/about_me_girl_illustration.png";

export const AboutHero = () => {
  return (
    <section className="about-intro">
      <img
        src={aboutMeImg}
        alt="Illustration of Julia"
        className="about-intro-img"
      />
      <h1 className="about-intro-title">Hi! I'm Julia</h1>
      <p className="about-intro-desc">
        I'm a passionate creator who loves turning ideas into delightful digital experiences. My journey blends code, design, and a love for helping people bring their visions to life.
      </p>
    </section>
  );
}; 