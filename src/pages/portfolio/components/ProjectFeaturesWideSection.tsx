import { Box, Typography } from "@mui/material";
import { ProjectFeaturesSectionContent } from "../projects/projectContentTypes";

type ProjectFeaturesWideSectionProps = {
  features: ProjectFeaturesSectionContent;
  onFeatureImageClick: (imageSrc: string, imageAlt: string) => void;
};

const ProjectFeaturesWideSection = ({
  features,
  onFeatureImageClick,
}: ProjectFeaturesWideSectionProps) => {
  return (
    <Box component="section" sx={{ mb: 16 }}>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 8,
          fontWeight: 700,
          textAlign: "center",
          fontSize: { xs: "1.9rem", md: "2.4rem" },
        }}
      >
        {features.title}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {features.features.map((feature) => (
          <Box key={feature.id} sx={{ mb: 4 }}>
            {/* Title above image */}
            <Typography
              variant="h4"
              component="h3"
              sx={{
                mb: 3,
                fontSize: { xs: "1.5rem", md: "2rem" },
                fontWeight: 600,
                color: "text.primary",
                textAlign: "center",
              }}
            >
              {feature.title}
            </Typography>

            {/* Full-width image */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                mb: 3,
              }}
            >
              <Box
                component="button"
                type="button"
                onClick={() =>
                  onFeatureImageClick(feature.image, feature.imageAlt ?? feature.title)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onFeatureImageClick(feature.image, feature.imageAlt ?? feature.title);
                  }
                }}
                aria-label={`Open ${feature.title} image`}
                sx={{
                  height: { xs: "300px", md: "400px" },
                  overflow: "hidden",
                  cursor: "pointer",
                  border: 0,
                  padding: 0,
                  backgroundColor: "transparent",
                  display: "block",
                  "&:focus-visible": {
                    outline: "2px solid currentColor",
                    outlineOffset: "4px",
                  },
                }}
              >
                <Box
                  component="img"
                  src={feature.image}
                  alt={feature.imageAlt ?? feature.title}
                  sx={{
                    height: "100%",
                    width: "auto",
                    display: "block",
                    pointerEvents: "none",
                  }}
                />
              </Box>
            </Box>

            {/* Description below image */}
            <Typography
              variant="body1"
              sx={{
                textAlign: "center",
                maxWidth: "800px",
                mx: "auto",
              }}
            >
              {feature.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectFeaturesWideSection;

