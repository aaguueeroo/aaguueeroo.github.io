import { Box, Typography } from "@mui/material";
import { ProjectExtraSectionContent } from "../projects/projectContentTypes";

type ProjectExtraSectionProps = {
  extra: ProjectExtraSectionContent;
};

const ProjectExtraSection = ({ extra }: ProjectExtraSectionProps) => {
  return (
    <Box component="section" sx={{ mb: 16 }}>
      <Typography
        variant="h3"
        component="h2"
        sx={{
          mb: 4,
          fontWeight: 700,
          textAlign: "center",
          fontSize: { xs: "1.9rem", md: "2.4rem" },
        }}
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

