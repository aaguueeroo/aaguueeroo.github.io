import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getFeaturedProjects } from "../../../services/portfolioService";
import {
  MaxWidths,
  Typography as TypographyConstants,
} from "../../../theme/constants";

const CARD_IMAGE_WIDTH = 120;

const PortfolioOverviewSection = () => {
  const navigate = useNavigate();
  const projects = getFeaturedProjects().slice(0, 3);

  const handleCardClick = (
    slug?: string,
    liveUrl?: string
  ) => {
    if (slug) {
      navigate(`/portfolio/${slug}`);
      return;
    }

    if (liveUrl) {
      window.open(liveUrl, "_blank");
    }
  };

  const handleExploreMore = () => {
    navigate("/portfolio");
  };

  return (
    <Box
      sx={{
        width: "100%",
        px: { xs: 2, md: 4 },
        pt: { xs: 14, md: 36 },
        pb: { xs: 8, md: 12 },
        background:
          "linear-gradient(180deg, rgba(239, 246, 250, 0) 0%, rgba(239, 246, 250, 0.7) 40%, rgba(239, 246, 250, 0.7) 60%, rgba(239, 246, 250, 0.2) 100%)",
      }}
    >
      <Box
        sx={{
          maxWidth: MaxWidths.content,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          gap: { xs: 4, md: 6 },
          boxSizing: "border-box",
          padding: {
            xs: "0px 16px",
            sm: "96px 32px",
            md: "0px 96px",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h2"
            component="h2"
            sx={{
              ...TypographyConstants.h1,
              fontSize: { xs: "2rem", md: "2.6rem" },
            }}
          >
            My projects
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: { xs: 3, md: 4 },
          }}
        >
          {projects.map((project) => (
            <Card
              key={project.id}
              sx={{
                flex: 1,
                display: "flex",
                backgroundColor: "background.paper",
                borderRadius: 0.45,
                boxShadow: "0 8px 24px rgba(15, 45, 82, 0.06)",
                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                "&:hover": {
                  transform: "translateY(-6px)",
                  boxShadow: "0 18px 36px rgba(15, 45, 82, 0.1)",
                },
              }}
            >
              <CardActionArea
                onClick={() =>
                  handleCardClick(project.slug, project.liveUrl)
                }
                sx={{
                  display: "flex",
                  alignItems: "stretch",
                  textAlign: "left",
                  "& .MuiCardActionArea-focusHighlight": {
                    opacity: "0 !important",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image={project.image}
                  alt={project.title}
                  sx={{
                    width: { xs: CARD_IMAGE_WIDTH, md: CARD_IMAGE_WIDTH + 20 },
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 0.2,
                  }}
                />
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    py: { xs: 2.5, md: 3 },
                    px: { xs: 2, md: 3 },
                  }}
                >
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      fontWeight: 700,
                      fontSize: "1.15rem",
                      lineHeight: 1.3,
                    }}
                  >
                    {project.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      flexGrow: 1,
                      lineHeight: 1.55,
                    }}
                  >
                    {project.shortDescription}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Box
                        key={tech}
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 999,
                          backgroundColor: "rgba(33, 37, 41, 0.08)",
                          color: "text.primary",
                          fontSize: "0.75rem",
                          fontWeight: 600,
                        }}
                      >
                        {tech}
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="text"
            onClick={handleExploreMore}
            sx={{
              textTransform: "none",
              fontSize: "1.45rem",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              color: "primary.main",
              px: { xs: 2.5, md: 3.5 },
              py: { xs: 1, md: 1.25 },
              "& .MuiSvgIcon-root": {
                transition: "transform 0.2s ease",
              },
              "&:hover .MuiSvgIcon-root": {
                transform: "translateX(4px)",
              },
            }}
            endIcon={<ArrowForwardIcon />}
          >
            Explore more projects
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PortfolioOverviewSection;
