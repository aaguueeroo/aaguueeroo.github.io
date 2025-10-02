import { Box, Grid, Typography } from "@mui/material";
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
      <Typography variant="body1" sx={{ mb: 4, fontSize: "0.9rem", fontWeight: 600, textAlign: "center" }}>
        Technologies Used
      </Typography>
      
      <Grid container spacing={4}>
        {technologies.map((tech, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} sx={{ mb: { xs: 3, sm: 0 } }}>
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
