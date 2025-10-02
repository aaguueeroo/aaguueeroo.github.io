import { Box, Container, Typography, Button, Chip } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LaunchIcon from "@mui/icons-material/Launch";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import ImageModal from "../../components/ImageModal";
import { getProjectBySlug } from "../../services/portfolioService";
import { urbanRunnersProject } from "../../data/urbanRunnersData";
import FlattoProjectPage from "./FlattoProjectPage";

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");

  // Route to FlattoProjectPage for Flatto
  if (slug === "flatto") {
    return <FlattoProjectPage />;
  }

  // Get project data based on slug
  const project = getProjectBySlug(slug || "");
  
  // Get detailed project data for Urban Runners
  const detailedProject = slug === "urban-runners" ? urbanRunnersProject : null;

  const handleImageClick = (imageSrc: string, imageAlt: string) => {
    setModalImageSrc(imageSrc);
    setModalImageAlt(imageAlt);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (!project) {
    return (
      <>
        <Navbar />
        <Box sx={{ pt: 10, pb: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h4" sx={{ textAlign: "center", mt: 8 }}>
              Project not found
            </Typography>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button 
                variant="contained" 
                onClick={() => navigate("/portfolio")}
                startIcon={<ArrowBackIcon />}
              >
                Back to Portfolio
              </Button>
            </Box>
          </Container>
        </Box>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} - Julia's Portfolio</title>
        <meta name="description" content={project.shortDescription} />
      </Helmet>
      <SEO 
        title={`${project.title} - Julia's Portfolio`}
        description={project.shortDescription}
        url={`/portfolio/${project.slug}`}
      />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <Box sx={{ pt: 16, pb: 8, flex: 1 }}>
          <Container maxWidth="lg">
            <Box sx={{ 
              position: "sticky", 
              top: 0, 
              zIndex: 1300, 
              backgroundColor: "white", 
              py: 2, 
              mb: 4,
              borderBottom: "1px solid",
              borderColor: "divider"
            }}>
              <Button 
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/portfolio")}
                sx={{ mb: 0 }}
              >
                Back to Portfolio
              </Button>
            </Box>

            {/* Simple Document Layout */}
            <Box sx={{ maxWidth: "800px", mx: "auto" }}>
              {/* Project Title */}
              <Typography variant="h3" component="h1" sx={{ mb: 2, fontSize: "1.5rem" }}>
                {project.title}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4, fontSize: "0.9rem" }}>
                {project.category}
              </Typography>

              {/* Project Description */}
              <Typography variant="body2" sx={{ mb: 4, lineHeight: 1.7, fontSize: "0.9rem" }}>
                Urban Runners is a Flutter mobile application designed for running clubs and enthusiasts. 
                The app enables users to discover upcoming running events, create their own races, and 
                manage their running journey through personalized profiles. It features secure user 
                authentication, admin approval workflows for user-generated content, and comprehensive 
                settings management.
              </Typography>

              {/* Action Buttons */}
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", mb: 4 }}>
                {project.liveUrl && (
                  <Button
                    variant="contained"
                    startIcon={<LaunchIcon />}
                    onClick={() => window.open(project.liveUrl, "_blank")}
                    size="large"
                  >
                    Live Demo
                  </Button>
                )}
              </Box>

              {/* Technologies */}
              <Typography variant="h5" sx={{ mb: 2, fontSize: "1.1rem" }}>
                Technologies Used
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 4 }}>
                {project.technologies.map((tech) => (
                  <Chip 
                    key={tech} 
                    label={tech} 
                    variant="outlined"
                    sx={{ fontWeight: 500 }}
                  />
                ))}
              </Box>

              {/* Features - Simple Document Flow */}
              {detailedProject && (
                <Box>
                  <Typography variant="h5" sx={{ mb: 4, fontSize: "1.1rem" }}>
                    Key Features
                  </Typography>
                  
                  {/* Feature 1: User Authorization */}
                  <Typography variant="h6" sx={{ mb: 2, fontSize: "1rem" }}>
                    User Authorization
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6, fontSize: "0.85rem" }}>
                    The app provides multiple authentication methods to ensure secure user access. 
                    Users can sign in using their email and password, Google Sign-In, or other 
                    social media accounts. The authentication system includes secure session management 
                    and password reset functionality.
                  </Typography>
                  <Box 
                    component="img"
                    src={detailedProject.features[0].image}
                    alt="User Authorization"
                    onClick={() => handleImageClick(detailedProject.features[0].image, "User Authorization")}
                    sx={{
                      width: "100%",
                      maxWidth: "400px",
                      height: "auto",
                      mb: 4,
                      mx: "auto",
                      display: "block",
                      cursor: "pointer",
                      transition: "opacity 0.2s ease-in-out",
                      "&:hover": {
                        opacity: 0.8
                      }
                    }}
                  />
                  <Typography variant="body2" sx={{ mb: 4, lineHeight: 1.6, fontSize: "0.85rem" }}>
                    The login screen features a clean, intuitive design that guides users through 
                    the authentication process. Users can easily switch between different login 
                    methods and recover their accounts if needed.
                  </Typography>

                  {/* Feature 2: Race Management */}
                  <Typography variant="h6" sx={{ mb: 2, fontSize: "1rem" }}>
                    Race Management
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6, fontSize: "0.85rem" }}>
                    Runners can discover upcoming events and join races directly from the app. 
                    The race management system allows users to browse events by location, date, 
                    and difficulty level. Users can also create their own running events and 
                    share them with the community.
                  </Typography>
                  <Box 
                    component="img"
                    src={detailedProject.features[1].image}
                    alt="Race Management"
                    onClick={() => handleImageClick(detailedProject.features[1].image, "Race Management")}
                    sx={{
                      width: "100%",
                      maxWidth: "400px",
                      height: "auto",
                      mb: 4,
                      mx: "auto",
                      display: "block",
                      cursor: "pointer",
                      transition: "opacity 0.2s ease-in-out",
                      "&:hover": {
                        opacity: 0.8
                      }
                    }}
                  />
                  <Typography variant="body2" sx={{ mb: 4, lineHeight: 1.6, fontSize: "0.85rem" }}>
                    The race creation interface is user-friendly and includes fields for event 
                    details, location, timing, and participant limits. Users can easily join 
                    events with one-tap registration and track their participation history.
                  </Typography>

                  {/* Feature 3: Admin Approval */}
                  <Typography variant="h6" sx={{ mb: 2, fontSize: "1rem" }}>
                    Admin Approval System
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6, fontSize: "0.85rem" }}>
                    Administrators have access to a dedicated dashboard where they can review 
                    and approve user-created events. This ensures content quality and prevents 
                    inappropriate or duplicate events from being published.
                  </Typography>
                  <Box 
                    component="img"
                    src={detailedProject.features[2].image}
                    alt="Admin Approval System"
                    onClick={() => handleImageClick(detailedProject.features[2].image, "Admin Approval System")}
                    sx={{
                      width: "100%",
                      maxWidth: "400px",
                      height: "auto",
                      mb: 4,
                      mx: "auto",
                      display: "block",
                      cursor: "pointer",
                      transition: "opacity 0.2s ease-in-out",
                      "&:hover": {
                        opacity: 0.8
                      }
                    }}
                  />
                  <Typography variant="body2" sx={{ mb: 4, lineHeight: 1.6, fontSize: "0.85rem" }}>
                    The admin interface provides tools for bulk operations, content moderation, 
                    and user management. Admins receive notifications when new events require 
                    approval and can communicate with event creators if needed.
                  </Typography>

                  {/* Feature 4: User Profiles */}
                  <Typography variant="h6" sx={{ mb: 2, fontSize: "1rem" }}>
                    User Profiles & Settings
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.6, fontSize: "0.85rem" }}>
                    Each user has a personalized profile where they can manage their running 
                    statistics, achievements, and preferences. The settings section allows 
                    users to customize their notification preferences, privacy settings, 
                    and account information.
                  </Typography>
                  <Box 
                    component="img"
                    src={detailedProject.features[3].image}
                    alt="User Profiles & Settings"
                    onClick={() => handleImageClick(detailedProject.features[3].image, "User Profiles & Settings")}
                    sx={{
                      width: "100%",
                      maxWidth: "400px",
                      height: "auto",
                      mb: 4,
                      mx: "auto",
                      display: "block",
                      cursor: "pointer",
                      transition: "opacity 0.2s ease-in-out",
                      "&:hover": {
                        opacity: 0.8
                      }
                    }}
                  />
                  <Typography variant="body2" sx={{ mb: 4, lineHeight: 1.6, fontSize: "0.85rem" }}>
                    The profile section displays running statistics, completed events, and 
                    personal achievements. Users can update their profile information, 
                    manage their privacy settings, and customize their app experience 
                    according to their preferences.
                  </Typography>
                </Box>
              )}
            </Box>
          </Container>
        </Box>
        <Footer />
      </Box>
      
      {/* Image Modal */}
      <ImageModal
        open={modalOpen}
        onClose={handleCloseModal}
        imageSrc={modalImageSrc}
        imageAlt={modalImageAlt}
      />
    </>
  );
};

export default ProjectPage;
