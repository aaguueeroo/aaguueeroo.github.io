import { Box, Typography } from "@mui/material";
import TechnologyGrid from "../../../components/TechnologyGrid";
import { ProjectTechnologiesSectionContent } from "../projects/projectContentTypes";

type ProjectTechnologiesSectionProps = {
  technologies: ProjectTechnologiesSectionContent;
};

const ProjectTechnologiesSection = ({
  technologies,
}: ProjectTechnologiesSectionProps) => {
  return (
    <Box
      component="section"
      sx={{
        mb: 16,
        opacity: { xs: 1, md: 1 },
        transition: "opacity 1.2s ease-out, transform 1.2s ease-out",
      }}
    >
      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 6,
          textAlign: "center",
        }}
      >
        {technologies.title}
      </Typography>
      <TechnologyGrid technologies={technologies.technologies} />
    </Box>
  );
};

export default ProjectTechnologiesSection;

