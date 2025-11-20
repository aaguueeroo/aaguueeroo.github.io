import { Box, Typography } from "@mui/material";
import { ProjectDescriptionSectionContent } from "../projects/projectContentTypes";

type ProjectDescriptionSectionProps = {
  description: ProjectDescriptionSectionContent;
};

const ProjectDescriptionSection = ({
  description,
}: ProjectDescriptionSectionProps) => {
  return (
    <Box component="section" sx={{ mb: 8 }}>
      <Box sx={{ height: { xs: 24, md: 32 } }} />
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {description.paragraphs.map((paragraph, index) => (
          <Typography
            key={index}
            variant="body1"
          >
            {paragraph}
          </Typography>
        ))}
      </Box>
      {description.bulletPoints && (
        <Box component="ul" sx={{ mt: 4, pl: 3 }}>
          {description.bulletPoints.map((bulletPoint) => (
            <Typography
              key={bulletPoint}
              component="li"
              variant="body1"
              sx={{ mb: 1 }}
            >
              {bulletPoint}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProjectDescriptionSection;

