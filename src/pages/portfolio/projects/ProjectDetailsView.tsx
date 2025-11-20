import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container } from "@mui/material";
import { Footer } from "../../../components/Footer";
import ImageModal from "../../../components/ImageModal";
import { SEO } from "../../../components/SEO";
import ProjectCallToActionSection from "../components/ProjectCallToActionSection";
import ProjectDescriptionSection from "../components/ProjectDescriptionSection";
import ProjectHeroSection from "../components/ProjectHeroSection";
import ProjectTechnologiesSection from "../components/ProjectTechnologiesSection";
import { ProjectPageContent } from "./projectContentTypes";

type ProjectDetailsViewProps = {
  content: ProjectPageContent;
};

const ProjectDetailsView = ({ content }: ProjectDetailsViewProps) => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState<{
    open: boolean;
    imageSrc: string;
    imageAlt: string;
  }>({
    open: false,
    imageSrc: "",
    imageAlt: "",
  });
  const [showStickyButton, setShowStickyButton] = useState<boolean>(false);

  const handleNavigateBack = () => {
    navigate("/portfolio");
  };

  const handleFeatureImageClick = (imageSrc: string, imageAlt: string) => {
    setModalState({
      open: true,
      imageSrc,
      imageAlt,
    });
  };

  const handleCloseModal = () => {
    setModalState((previous) => ({
      ...previous,
      open: false,
    }));
  };

  const handleCallToAction = (href: string) => {
    navigate(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      // Hero section is 100vh, so show button when scrolled past viewport height
      const scrollPosition = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      setShowStickyButton(scrollPosition > viewportHeight);
    };

    // Check initial scroll position
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
      </Helmet>
      <SEO
        title={content.seo.title}
        description={content.seo.description}
        url={`/portfolio/${content.slug}`}
        image={content.seo.image}
      />
      <ProjectHeroSection
        hero={content.hero}
        onNavigateBack={handleNavigateBack}
      />
      <Box component="main" sx={{ pt: 8, pb: 8 }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              backgroundColor: "background.paper",
              py: 2,
              mb: -16,
              borderBottom: "1px solid",
              borderColor: "divider",
              transition: "opacity 0.3s ease-in-out, transform 0.3s ease-in-out",
              opacity: showStickyButton ? 1 : 0,
              transform: showStickyButton ? "translateY(0)" : "translateY(-10px)",
              visibility: showStickyButton ? "visible" : "hidden",
              pointerEvents: showStickyButton ? "auto" : "none",
            }}
          >
            <Button
              onClick={handleNavigateBack}
              startIcon={<ArrowBackIcon />}
              sx={{
                textTransform: "none",
                color: "text.secondary",
                px: 0,
                "&:hover": {
                  color: "primary.main",
                  backgroundColor: "transparent",
                },
              }}
            >
              Back to Portfolio
            </Button>
          </Box>
          <ProjectDescriptionSection description={content.description} />
          <ProjectTechnologiesSection technologies={content.technologies} />
          {content.renderFeaturesSection({
            onOpenImageModal: handleFeatureImageClick,
          })}
          {content.renderExtraSection?.({
            onOpenImageModal: handleFeatureImageClick,
          })}
          <ProjectCallToActionSection
            cta={content.cta}
            onAction={handleCallToAction}
          />
        </Container>
      </Box>
      <Footer />
      <ImageModal
        open={modalState.open}
        onClose={handleCloseModal}
        imageSrc={modalState.imageSrc}
        imageAlt={modalState.imageAlt}
      />
    </>
  );
};

export default ProjectDetailsView;
