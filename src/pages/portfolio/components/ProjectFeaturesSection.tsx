import { Box, Typography } from "@mui/material";
import FeatureCarousel from "../../../components/FeatureCarousel";
import { ProjectFeaturesSectionContent } from "../projects/projectContent.types";

type ProjectFeaturesSectionProps = {
  features: ProjectFeaturesSectionContent;
  onFeatureImageClick: (imageSrc: string, imageAlt: string) => void;
};

const ProjectFeaturesSection = ({
  features,
  onFeatureImageClick,
}: ProjectFeaturesSectionProps) => {
  return (
    <Box component="section" sx={{ mb: 16 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 6, fontWeight: 600, textAlign: "center" }}
      >
        {features.title}
      </Typography>
      <FeatureCarousel
        features={features.features.map((feature) => ({
          id: feature.id,
          title: feature.title,
          description: feature.description,
          image: feature.image,
          imageAlt: feature.imageAlt,
        }))}
        onImageClick={onFeatureImageClick}
      />
    </Box>
  );
};

export default ProjectFeaturesSection;

