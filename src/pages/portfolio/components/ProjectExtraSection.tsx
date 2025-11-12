import { Box, Typography } from "@mui/material";
import { ProjectExtraSectionContent } from "../projects/projectContent.types";

type ProjectExtraSectionProps = {
  extra: ProjectExtraSectionContent;
};

const ProjectExtraSection = ({ extra }: ProjectExtraSectionProps) => {
  return (
    <Box component="section" sx={{ mb: 16 }}>
      <Typography
        variant="h4"
        component="h2"
        sx={{ mb: 4, fontWeight: 600, textAlign: "center" }}
      >
        {extra.title}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {extra.paragraphs.map((paragraph) => (
          <Typography
            key={paragraph}
            variant="body1"
            sx={{ lineHeight: 1.7, fontSize: "1rem" }}
          >
            {paragraph}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default ProjectExtraSection;

