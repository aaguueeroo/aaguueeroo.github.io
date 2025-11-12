import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Button, Container, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import { Footer } from "../../../components/Footer";
import ProjectPage from "./ProjectPage";
import { getProjectContentBySlug } from "./projectRegistry";

const PortfolioProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const projectContent = slug ? getProjectContentBySlug(slug) : undefined;

  if (!projectContent) {
    return (
      <>
        <Helmet>
          <title>Project not found - Julia's Portfolio</title>
          <meta
            name="description"
            content="The project you are looking for could not be found."
          />
        </Helmet>
        <Navbar />
        <Box sx={{ pt: 16, pb: 8, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
          <Container maxWidth="lg" sx={{ flex: 1 }}>
            <Typography variant="h4" sx={{ textAlign: "center", mt: 8 }}>
              Project not found
            </Typography>
            <Box sx={{ textAlign: "center", mt: 4 }}>
              <Button
                variant="contained"
                onClick={() => navigate("/portfolio")}
                startIcon={<ArrowBackIcon />}
              >
                Back to Portfolio
              </Button>
            </Box>
          </Container>
          <Footer />
        </Box>
      </>
    );
  }

  return <ProjectPage content={projectContent} />;
};

export default PortfolioProjectPage;

