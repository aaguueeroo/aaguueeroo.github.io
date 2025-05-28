import { useEffect, useState } from "react";
import "../AboutPage.css";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import LayersIcon from '@mui/icons-material/Layers';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import UpdateIcon from '@mui/icons-material/Update';

export const HowIWorkTimeline = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    {
      icon: <AssignmentTurnedInIcon fontSize="large" color="primary" />, 
      title: "1. Kickoff",
      subtitle: "We sign an initial contract and set clear expectations to start the project.",
    },
    {
      icon: <PlaylistAddCheckIcon fontSize="large" color="primary" />, 
      title: "2. Planning",
      subtitle: "I organize the project into milestones and define a detailed roadmap, always with your input and agreement.",
    },
    {
      icon: <BuildCircleIcon fontSize="large" color="primary" />, 
      title: "3. Foundation",
      subtitle: "I set up the project, backend, environments, and build the first essential features.",
    },
    {
      icon: <LayersIcon fontSize="large" color="primary" />, 
      title: "4. Feature Development",
      subtitle: "We proceed by feature groups (epics) following the roadmap that we agreed on.",
    },
    {
      icon: <RocketLaunchIcon fontSize="large" color="primary" />, 
      title: "5. Delivery & Launch",
      subtitle: "Deployment, handover, and contract closure. Your product is ready for the world!",
    },
    {
      icon: <UpdateIcon fontSize="large" color="primary" />, 
      title: "Optional: Maintenance",
      subtitle: "Ongoing support and updates to keep your app running smoothly.",
    },
  ];

  return (
    <section className={`about-section about-timeline${isMobile ? " mobile-timeline" : ""}`}>
      <h2>How I Work</h2>
      <div className="timeline-container">
        <ul className="timeline-list">
          {steps.map((step, idx) => (
            <li className="timeline-item" key={idx}>
              {/* Left column: blank for mobile, card if left for desktop */}
              <div className={`timeline-col timeline-col-left`}>
                {!isMobile && idx % 2 === 0 ? (
                  <div className="timeline-card">
                    <div className="timeline-content">
                      <div className="timeline-icon">{step.icon}</div>
                      <div>
                        <div className="timeline-step-title">{step.title}</div>
                        <div className="timeline-step-desc">{step.subtitle}</div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
              {/* Center column: dot on the line, line as background */}
              <div className="timeline-col timeline-col-center">
                {idx !== 0 && <div className="timeline-line-top" />}
                <span className="timeline-circle" />
                {idx !== steps.length - 1 && <div className="timeline-line-bottom" />}
              </div>
              {/* Right column: card for mobile, or card if right for desktop */}
              <div className={`timeline-col timeline-col-right`}>
                {(isMobile || idx % 2 !== 0) ? (
                  <div className="timeline-card">
                    <div className="timeline-content">
                      <div className="timeline-icon">{step.icon}</div>
                      <div>
                        <div className="timeline-step-title">{step.title}</div>
                        <div className="timeline-step-desc">{step.subtitle}</div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}; 