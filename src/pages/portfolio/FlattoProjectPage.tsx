import { Box, Container, Typography, Button, Chip, useTheme } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LaunchIcon from "@mui/icons-material/Launch";
import SendIcon from "@mui/icons-material/Send";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import ImageModal from "../../components/ImageModal";
import FeatureCarousel from "../../components/FeatureCarousel";
import TechnologyGrid from "../../components/TechnologyGrid";
import PrimaryButton from "../../components/PrimaryButton";
import { getProjectBySlug } from "../../services/portfolioService";
import { flattoProject } from "../../data/flattoData";

const FlattoProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState("");
  const [modalImageAlt, setModalImageAlt] = useState("");
  
  // Animation states for different sections
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Get project data based on slug
  const project = getProjectBySlug(slug || "");
  const detailedProject = flattoProject;

  // Set up intersection observers for animations
  useEffect(() => {
    const sections = ['technologies', 'development', 'cta'];
    
    const observers = sections.map(sectionId => {
      const ref = sectionRefs.current[sectionId];
      if (!ref) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => new Set([...prev, sectionId]));
          }
        },
        {
          threshold: 0.2,
          rootMargin: "0px 0px -100px 0px"
        }
      );

      observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach(observer => observer?.disconnect());
    };
  }, []);

  const handleImageClick = (imageSrc: string, imageAlt: string) => {
    setModalImageSrc(imageSrc);
    setModalImageAlt(imageAlt);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  if (!project || !detailedProject) {
    return (
      <>
        <Navbar />
        <Box sx={{ pt: 16, pb: 8 }}>
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
      
      {/* Full-width Hero Section */}
      <Box 
        sx={{ 
          position: "relative",
          height: "100vh",
          width: "100vw",
          backgroundImage: "url('/src/assets/images/portfolio/flatto-hero.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden"
        }}
      >

        {/* Navigation - Positioned absolutely over hero */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 3,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)"
          }}
        >
          <Navbar />
        </Box>

        {/* Back Button - Positioned absolutely */}
        <Button 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/portfolio")}
          sx={{ 
            position: "absolute",
            top: 100,
            left: 24,
            zIndex: 3,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "white"
            },
            backdropFilter: "blur(10px)"
          }}
        >
          Back to Portfolio
        </Button>
        
        {/* Hero Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            textAlign: "left",
            color: "text.primary",
            width: "100%",
            px: { xs: 4, md: 8 },
            py: 8,
            ml: { xs: 2, md: 6 }
          }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              mb: 3, 
              fontSize: { xs: "2rem", md: "3rem" }, 
              fontWeight: 700,
              lineHeight: 1.2,
              color: "text.primary"
            }}
          >
            {detailedProject.hero.title}
          </Typography>
          
          <Typography 
            variant="h5" 
            sx={{ 
              mb: 4, 
              fontSize: { xs: "1rem", md: "1.25rem" }, 
              lineHeight: 1.4,
              maxWidth: "40%",
              color: "text.secondary"
            }}
          >
            {detailedProject.hero.subtitle}
          </Typography>
          
          {/* Action Buttons */}
          <Box sx={{ 
            display: "flex", 
            gap: 2, 
            flexWrap: "wrap", 
            justifyContent: "flex-start", 
            mb: 6 
          }}>
            {project.liveUrl && (
              <Button
                variant="contained"
                startIcon={<LaunchIcon />}
                onClick={() => window.open(project.liveUrl, "_blank")}
                size="large"
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  "&:hover": {
                    backgroundColor: "primary.dark",
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Live Demo
              </Button>
            )}
          </Box>

          {/* Technologies */}
          <Box sx={{ maxWidth: { xs: "100%", md: "90%" } }}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                fontSize: "1.1rem", 
                fontWeight: 600,
                color: "text.primary"
              }}
            >
              Technologies Used
            </Typography>
            <Box sx={{ 
              display: "flex", 
              flexWrap: "wrap", 
              gap: 2, 
              justifyContent: "flex-start" 
            }}>
              {project.technologies.map((tech) => (
                <Chip 
                  key={tech} 
                  label={tech} 
                  variant="outlined"
                  sx={{ 
                    fontWeight: 500,
                    backgroundColor: "rgba(0, 0, 0, 0.05)",
                    color: "text.primary",
                    borderColor: "rgba(0, 0, 0, 0.2)",
                    fontSize: "0.9rem",
                    py: 2,
                    px: 1,
                    "&:hover": {
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                      transform: "translateY(-1px)"
                    },
                    transition: "all 0.2s ease"
                  }}
                />
              ))}
            </Box>
          </Box>
        </Box>

        {/* Scroll Indicator */}
        <Box
          sx={{
            position: "absolute",
            bottom: 32,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            color: "text.primary",
            opacity: 0.7,
            animation: "bounce 2s infinite",
            "@keyframes bounce": {
              "0%, 20%, 50%, 80%, 100%": {
                transform: "translateX(-50%) translateY(0)"
              },
              "40%": {
                transform: "translateX(-50%) translateY(-10px)"
              },
              "60%": {
                transform: "translateX(-50%) translateY(-5px)"
              }
            }
          }}
        >
          <Typography variant="body2" sx={{ mb: 1, fontSize: "0.8rem" }}>
            Scroll to explore
          </Typography>
          <Box
            sx={{
              width: 2,
              height: 24,
              backgroundColor: "text.primary",
              borderRadius: 1
            }}
          />
        </Box>
      </Box>

      {/* Main Content Section */}
      <Box sx={{ pt: 8, pb: 8 }}>
        <Container maxWidth="lg">

            {/* Overview Section */}
            <Box sx={{ mb: 8 }}>
              <Typography variant="body2" sx={{ mb: 3, lineHeight: 1.7, fontSize: "0.85rem" }}>
                {detailedProject.overview.problem}
              </Typography>
              <Typography variant="body2" sx={{ mb: 2, fontSize: "0.9rem" }}>
                The app is especially useful for:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                {detailedProject.overview.targetAudience.map((audience, index) => (
                  <Typography key={index} component="li" variant="body2" sx={{ mb: 1, lineHeight: 1.6, fontSize: "0.85rem" }}>
                    {audience}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Features Section */}
            <Box sx={{ mb: 24 }}>
              <Typography variant="body1" sx={{ mb: 4, fontSize: "0.9rem", fontWeight: 600 }}>
                Features
              </Typography>
              <FeatureCarousel 
                features={detailedProject.features}
                onImageClick={handleImageClick}
              />
            </Box>

            {/* Technologies Section */}
            <Box 
              ref={(el: HTMLDivElement | null) => { sectionRefs.current['technologies'] = el; }}
              sx={{ 
                mb: 16,
                opacity: { xs: 1, md: visibleSections.has('technologies') ? 1 : 0 },
                transform: { xs: "translateY(0)", md: visibleSections.has('technologies') ? "translateY(0)" : "translateY(40px)" },
                transition: { xs: "none", md: "opacity 1.2s ease-out, transform 1.2s ease-out" }
              }}
            >
              <TechnologyGrid technologies={detailedProject.techDetails} />
            </Box>

            {/* Development Process */}
            <Box 
              ref={(el: HTMLDivElement | null) => { sectionRefs.current['development'] = el; }}
              sx={{ 
                mb: 8,
                opacity: { xs: 1, md: visibleSections.has('development') ? 1 : 0 },
                transform: { xs: "translateY(0)", md: visibleSections.has('development') ? "translateY(0)" : "translateY(40px)" },
                transition: { xs: "none", md: "opacity 1.2s ease-out, transform 1.2s ease-out" }
              }}
            >
              <Typography variant="body1" sx={{ mb: 4, fontSize: "0.9rem", fontWeight: 600 }}>
                Development Process
              </Typography>
              <Box component="ol" sx={{ pl: 2, mb: 4 }}>
                <Box component="li" sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      Problem Definition:
                    </Box>{" "}
                    Tenants in shared flats often struggle to stay organized: cleaning schedules get messy, shopping needs are forgotten, and communication is scattered. I envisioned Flatto as a single app to make flat life easier.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      MVP:
                    </Box>{" "}
                    I started with the essentials: a shared shopping list and a cleaning schedule, providing an immediate solution to the most common pain points.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      Feed:
                    </Box>{" "}
                    Next, I added an apartment-specific feed that records shopping and cleaning activities, keeping everyone aligned.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      Shopping List Improvements:
                    </Box>{" "}
                    The shopping list evolved with features like item authorship, purchase history, and buyer tracking for transparency.
                  </Typography>
                </Box>
                <Box component="li" sx={{ mb: 3 }}>
                  <Typography variant="body2" sx={{ fontSize: "0.85rem", lineHeight: 1.7 }}>
                    <Box component="span" sx={{ fontWeight: 600 }}>
                      Cleaning System Improvements:
                    </Box>{" "}
                    The cleaning schedule was refined with flexible modes (whole apartment or specific chores) and a weighted rotation system to ensure fairness.
                  </Typography>
                </Box>
              </Box>
            </Box>

            {/* Call to Action */}
            <Box 
              ref={(el: HTMLDivElement | null) => { sectionRefs.current['cta'] = el; }}
              sx={{ 
                mb: 8, 
                py: 24, 
                textAlign: "center", 
                display: "flex", 
                flexDirection: "column", 
                alignItems: "center",
                opacity: { xs: 1, md: visibleSections.has('cta') ? 1 : 0 },
                transform: { xs: "translateY(0)", md: visibleSections.has('cta') ? "translateY(0)" : "translateY(40px)" },
                transition: { xs: "none", md: "opacity 1.2s ease-out, transform 1.2s ease-out" }
              }}
            >
              <Typography variant="body1" sx={{ mb: 4, fontSize: "1.1rem", fontWeight: 600 }}>
                {detailedProject.callToAction.title}
              </Typography>
              {detailedProject.callToAction.description && (
                <Typography variant="body2" sx={{ mb: 4, lineHeight: 1.7, fontSize: "0.85rem" }}>
                  {detailedProject.callToAction.description}
                </Typography>
              )}
              <PrimaryButton
                showArrow={false}
                endIcon={<SendIcon />}
                onClick={() => navigate("/quote")}
                sx={{
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  padding: theme.spacing(2, 12),
                  display: "flex",
                  alignItems: "center",
                  gap: theme.spacing(1),
                  transition: "all 0.3s ease",
                  transform: "scale(1)",
                  "&:hover": {
                    boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
                    transform: "scale(1.05)",
                    bgcolor: theme.palette.primary.main,
                  },
                  "& .MuiSvgIcon-root": {
                    color: "#CF8B7F",
                    transition: "color 0.3s ease",
                  },
                  "&:hover .MuiSvgIcon-root": {
                    color: "#212529",
                  },
                }}
              >
                {detailedProject.callToAction.buttonText}
              </PrimaryButton>
            </Box>
        </Container>
      </Box>
      
      <Footer />
      
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

export default FlattoProjectPage;
