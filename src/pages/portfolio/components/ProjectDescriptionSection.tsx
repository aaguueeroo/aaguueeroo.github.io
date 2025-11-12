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
        {description.paragraphs.map((paragraph) => (
          <Typography
            key={paragraph}
            variant="body1"
            sx={{ lineHeight: 1.7, fontSize: "1rem" }}
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
              sx={{ mb: 1, lineHeight: 1.6, fontSize: "1rem" }}
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

