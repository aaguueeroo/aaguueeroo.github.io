import { Box, Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import PortfolioCard from "./components/PortfolioCard";
import { getAllProjects } from "../../services/portfolioService";
import { Typography as TypographyConstants } from "../../theme/constants";

const PortfolioPage = () => {
  // Get real portfolio projects
  const projects = getAllProjects();

  return (
    <>
      <Helmet>
        <title>Portfolio - Julia's Projects</title>
        <meta
          name="description"
          content="Explore Julia's portfolio of web development, mobile app, and software engineering projects."
        />
      </Helmet>
      <SEO
        title="Portfolio - Julia's Projects"
        description="Explore Julia's portfolio of web development, mobile app, and software engineering projects."
        url="/portfolio"
      />
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Navbar />
        <Box sx={{ pt: 12, pb: 8, flex: 1 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 12 }}>
              <Typography variant="h1" component="h1" sx={{ mb: 2 }}>
                My Work
              </Typography>
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 600, mx: "auto", ...TypographyConstants.body }}
              >
                Here are some of the apps and projects I’ve worked on. Each one
                reflects my approach to design, development, and problem
                solving.
              </Typography>
            </Box>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 4, mb: 8 }}>
              {projects.map((project) => (
                <Box
                  key={project.id}
                  sx={{
                    width: {
                      xs: "100%",
                      sm: "calc(50% - 12px)",
                      md: "calc(33.333% - 16px)",
                    },
                  }}
                >
                  <PortfolioCard project={project} />
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default PortfolioPage;
