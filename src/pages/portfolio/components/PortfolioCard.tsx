import { Card, CardContent, CardMedia, Typography, Box, Chip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import { Project } from "../../../types/portfolio";

interface PortfolioCardProps {
  project: Project;
}

const PortfolioCard = ({ project }: PortfolioCardProps) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/portfolio/${project.slug}`);
  };

  const handleGitHubClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.githubUrl) {
      window.open(project.githubUrl, "_blank");
    }
  };

  const handleLiveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.liveUrl) {
      window.open(project.liveUrl, "_blank");
    }
  };

  return (
    <Card 
      sx={{ 
        height: "100%",
        display: "flex",
        flexDirection: "column",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
        }
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="200"
        image={project.image}
        alt={project.title}
        sx={{ objectFit: "cover" }}
      />
      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 1 }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 600, flexGrow: 1 }}>
            {project.title}
          </Typography>
          {project.featured && (
            <Chip 
              label="Featured" 
              size="small" 
              color="primary" 
              sx={{ ml: 1, fontSize: "0.75rem" }}
            />
          )}
        </Box>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {project.shortDescription}
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: "0.875rem" }}>
            Technologies:
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {project.technologies.slice(0, 3).map((tech) => (
              <Chip 
                key={tech} 
                label={tech} 
                size="small" 
                variant="outlined"
                sx={{ fontSize: "0.75rem" }}
              />
            ))}
            {project.technologies.length > 3 && (
              <Chip 
                label={`+${project.technologies.length - 3}`} 
                size="small" 
                variant="outlined"
                sx={{ fontSize: "0.75rem" }}
              />
            )}
          </Box>
        </Box>

        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="body2" color="primary" sx={{ fontWeight: 500 }}>
            {project.category}
          </Typography>
          
          <Box sx={{ display: "flex", gap: 0.5 }}>
            {project.githubUrl && (
              <IconButton 
                size="small" 
                onClick={handleGitHubClick}
                sx={{ color: "text.secondary" }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            )}
            {project.liveUrl && (
              <IconButton 
                size="small" 
                onClick={handleLiveClick}
                sx={{ color: "text.secondary" }}
              >
                <LaunchIcon fontSize="small" />
              </IconButton>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
