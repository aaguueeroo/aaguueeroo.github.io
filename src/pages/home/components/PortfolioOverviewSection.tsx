import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LaunchIcon from "@mui/icons-material/Launch";
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
import { HomeSection } from "./HomeSection";
import {
  Typography as TypographyConstants,
} from "../../../theme/constants";

// On phones and in the three-across row, each card shows its image above the text. In between,
// a third of the row is too narrow for that, so each card takes a full row with the image beside
// the text.
const IMAGE_BESIDE_FROM = "sm";
const THREE_ACROSS_FROM = "lg";

// The project thumbnails are 3:2 screenshots.
const IMAGE_ASPECT_RATIO = 3 / 2;
const IMAGE_BESIDE_WIDTH = 220;

/** A responsive value that switches with the card layout described above. */
const byCardLayout = <T,>(imageAbove: T, imageBeside: T) => ({
  xs: imageAbove,
  [IMAGE_BESIDE_FROM]: imageBeside,
  [THREE_ACROSS_FROM]: imageAbove,
});

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
    <HomeSection
      sx={{
        pt: { xs: 14, md: 36 },
        pb: { xs: 8, md: 12 },
        background:
          "linear-gradient(180deg, rgba(239, 246, 250, 0) 0%, rgba(239, 246, 250, 0.7) 40%, rgba(239, 246, 250, 0.7) 60%, rgba(239, 246, 250, 0.2) 100%)",
      }}
      contentSx={{
        display: "flex",
        flexDirection: "column",
        gap: { xs: 4, md: 6 },
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
            flexDirection: { xs: "column", [THREE_ACROSS_FROM]: "row" },
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
              {/*
                A div, not a <button>: Safari wraps a button's children in an inner box that
                ignores this flex layout, so the cards first render cut to the shorter texts.
                MUI still makes it focusable and opens it with Enter or Space.
              */}
              <CardActionArea
                component="div"
                onClick={() =>
                  handleCardClick(project.slug, project.liveUrl)
                }
                sx={{
                  display: "flex",
                  flexDirection: byCardLayout("column", "row"),
                  alignItems: "stretch",
                  justifyContent: "flex-start",
                  textAlign: "left",
                  "& .MuiCardActionArea-focusHighlight": {
                    opacity: "0 !important",
                  },
                }}
              >
                {/*
                  Never a percentage height for the image (Safari first renders it cut off).
                  Above the text its aspect ratio sets its height; beside the text the text
                  sets the height, with a 3:2 image as the minimum, and the image fills it.
                */}
                <Box
                  sx={{
                    position: "relative",
                    flexShrink: 0,
                    width: byCardLayout<number | string>("100%", IMAGE_BESIDE_WIDTH),
                    aspectRatio: byCardLayout(String(IMAGE_ASPECT_RATIO), "auto"),
                    minHeight: byCardLayout(
                      0,
                      Math.round(IMAGE_BESIDE_WIDTH / IMAGE_ASPECT_RATIO)
                    ),
                  }}
                >
                  <CardMedia
                    component="img"
                    image={project.image}
                    alt={project.title}
                    sx={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: project.imagePosition ?? "center",
                      borderRadius: 0.2,
                    }}
                  />
                </Box>
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    p: 0,
                    pt: byCardLayout(5, 0),
                    pl: byCardLayout(0, 6),
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
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
                    {project.liveUrl && !project.slug && (
                      <LaunchIcon
                        sx={{
                          fontSize: "1rem",
                          color: "text.secondary",
                          opacity: 0.7,
                        }}
                      />
                    )}
                  </Box>
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
    </HomeSection>
  );
};

export default PortfolioOverviewSection;
