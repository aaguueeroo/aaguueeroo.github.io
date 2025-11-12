import { Box, Grid2 as Grid } from "@mui/material";
import TechnologyCard from "./TechnologyCard";

interface Technology {
  name: string;
  category: string;
  description: string;
  logo?: string;
  chips?: string[];
  color?: string;
}

interface TechnologyGridProps {
  technologies: Technology[];
}

const TechnologyGrid = ({ technologies }: TechnologyGridProps) => {
  return (
    <Box>
      <Grid container spacing={4} justifyContent="center">
        {technologies.map((tech) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={`${tech.name}-${tech.category}`} sx={{ mb: { xs: 3, sm: 0 } }}>
            <TechnologyCard
              name={tech.name}
              category={tech.category}
              description={tech.description}
              logo={tech.logo}
              chips={tech.chips}
              color={tech.color}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TechnologyGrid;
