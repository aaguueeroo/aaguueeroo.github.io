import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Box, Container } from "@mui/material";
import { Footer } from "../../../components/Footer";
import ImageModal from "../../../components/ImageModal";
import { SEO } from "../../../components/SEO";
import ProjectCallToActionSection from "../components/ProjectCallToActionSection";
import ProjectDescriptionSection from "../components/ProjectDescriptionSection";
import ProjectExtraSection from "../components/ProjectExtraSection";
import ProjectFeaturesSection from "../components/ProjectFeaturesSection";
import ProjectHeroSection from "../components/ProjectHeroSection";
import ProjectTechnologiesSection from "../components/ProjectTechnologiesSection";
import { ProjectPageContent } from "./projectContent.types";

type ProjectPageProps = {
  content: ProjectPageContent;
};

const ProjectPage = ({ content }: ProjectPageProps) => {
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
          <ProjectDescriptionSection description={content.description} />
          <ProjectFeaturesSection
            features={content.features}
            onFeatureImageClick={handleFeatureImageClick}
          />
          <ProjectTechnologiesSection technologies={content.technologies} />
          <ProjectExtraSection extra={content.extra} />
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

export default ProjectPage;

