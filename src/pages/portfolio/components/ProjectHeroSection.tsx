import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LaunchIcon from "@mui/icons-material/Launch";
import { Box, Button, Chip, Typography } from "@mui/material";
import Navbar from "../../../components/Navbar";
import { ProjectHeroAction, ProjectHeroContent } from "../projects/projectContentTypes";

type ProjectHeroSectionProps = {
  hero: ProjectHeroContent;
  onNavigateBack: () => void;
  onPrimaryActionClick?: (action: ProjectHeroAction) => void;
};

const ProjectHeroSection = ({
  hero,
  onNavigateBack,
  onPrimaryActionClick,
}: ProjectHeroSectionProps) => {
  const handlePrimaryActionClick = (action: ProjectHeroAction) => {
    onPrimaryActionClick?.(action);
    window.open(action.url, "_blank");
  };

  return (
    <Box
      component="section"
      sx={{
        position: "relative",
        height: "100vh",
        width: "100vw",
        backgroundColor: "background.default",
        backgroundImage: `url('${hero.coverImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
      aria-label={`${hero.title} hero`}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Navbar />
      </Box>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={onNavigateBack}
        sx={{
          position: "absolute",
          top: 100,
          left: 24,
          zIndex: 3,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          color: "primary.main",
          "&:hover": {
            backgroundColor: "white",
          },
          backdropFilter: "blur(10px)",
        }}
      >
        Back to Portfolio
      </Button>

      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "left",
          color: "text.primary",
          width: "100%",
          px: { xs: 4, md: 8 },
          py: 8,
          ml: { xs: 2, md: 6 },
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          sx={{
            mb: 3,
            fontSize: { xs: "2rem", md: "3rem" },
            fontWeight: 700,
            lineHeight: 1.2,
            color: "text.primary",
          }}
        >
          {hero.title}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontSize: { xs: "1.05rem", md: "1.4rem" },
            lineHeight: 1.4,
            maxWidth: { xs: "100%", md: "45%" },
            color: "text.secondary",
          }}
        >
          {hero.subtitle}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.6,
            maxWidth: { xs: "100%", md: "45%" },
            color: "text.primary",
          }}
        >
          {hero.description}
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "flex-start",
            mb: hero.primaryAction ? 6 : 4,
          }}
        >
          {hero.primaryAction && (
            <Button
              variant="contained"
              startIcon={<LaunchIcon />}
              size="large"
              onClick={() => handlePrimaryActionClick(hero.primaryAction!)}
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "primary.dark",
                  transform: "translateY(-2px)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {hero.primaryAction.label}
            </Button>
          )}
        </Box>

        <Box sx={{ maxWidth: { xs: "100%", md: "90%" } }}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "flex-start",
            }}
          >
            {hero.technologies.map((technology) => (
              <Chip
                key={technology}
                label={technology}
                variant="outlined"
                sx={{
                  fontWeight: 500,
                  backgroundColor: "rgba(0, 0, 0, 0.05)",
                  color: "text.primary",
                  borderColor: "rgba(0, 0, 0, 0.2)",
                  fontSize: "0.9rem",
                  py: 2,
                  px: 1,
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    transform: "translateY(-1px)",
                  },
                  transition: "all 0.2s ease",
                }}
              />
            ))}
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          color: "text.primary",
          opacity: 0.7,
          animation: "bounce 2s infinite",
          "@keyframes bounce": {
            "0%, 20%, 50%, 80%, 100%": {
              transform: "translateX(-50%) translateY(0)",
            },
            "40%": {
              transform: "translateX(-50%) translateY(-10px)",
            },
            "60%": {
              transform: "translateX(-50%) translateY(-5px)",
            },
          },
        }}
        aria-hidden="true"
      >
        <Typography variant="body1" sx={{ mb: 1, fontSize: "0.95rem" }}>
          Scroll to explore
        </Typography>
        <Box
          role="presentation"
          sx={{
            width: 2,
            height: 24,
            backgroundColor: "text.primary",
            borderRadius: 1,
          }}
        />
      </Box>
    </Box>
  );
};

export default ProjectHeroSection;

