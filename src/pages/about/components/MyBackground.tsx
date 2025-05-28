import "../AboutPage.css";

export const MyBackground = () => {
  return (
    <section className="about-section about-experience">
      <div className="about-section-content visual-experience-card">
        <div className="about-section-image">
          <img src="https://placehold.co/160x160" alt="Julia Agüero, mobile developer" />
        </div>
        <div className="about-section-text visual-experience-content">
          <h2>My Background & Journey</h2>
          <div className="visual-experience-grid">
            <div className="visual-experience-item">
              <span className="about-icon" aria-hidden="true">🎓</span>
              <div>
                <div className="visual-experience-label">Academic Roots</div>
                <div className="visual-experience-desc">Studied Criminology & Computer Science</div>
              </div>
            </div>
            <div className="visual-experience-item">
              <span className="about-icon" aria-hidden="true">🔍</span>
              <div>
                <div className="visual-experience-label">Digital Forensics</div>
                <div className="visual-experience-desc">Started in digital forensics before tech</div>
              </div>
            </div>
            <div className="visual-experience-item">
              <span className="about-icon" aria-hidden="true">📱</span>
              <div>
                <div className="visual-experience-label">Flutter Specialist</div>
                <div className="visual-experience-desc">Building mobile apps since university</div>
              </div>
            </div>
            <div className="visual-experience-item">
              <span className="about-icon" aria-hidden="true">🌍</span>
              <div>
                <div className="visual-experience-label">International</div>
                <div className="visual-experience-desc">From Spain, now based in Germany</div>
              </div>
            </div>
            <div className="visual-experience-item">
              <span className="about-icon" aria-hidden="true">👨‍👩‍👧‍👦</span>
              <div>
                <div className="visual-experience-label">Family & Roots</div>
                <div className="visual-experience-desc">Deeply connected to my Spanish family</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 