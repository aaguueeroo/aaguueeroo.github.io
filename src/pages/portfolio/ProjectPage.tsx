import { Box, Container, Typography, Button, Grid, Chip } from "@mui/material";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { Project } from "../../types/portfolio";

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // Mock data - in a real app, this would be fetched based on the slug
  const projects: Project[] = [
    {
      id: "1",
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product management, shopping cart, and payment integration. The platform supports multiple payment methods, real-time inventory tracking, and comprehensive admin dashboard for managing products, orders, and customers.",
      shortDescription: "Full-stack e-commerce platform with modern features",
      image: "/src/assets/images/hero.png",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe", "Express", "JWT"],
      category: "Web Development",
      featured: true,
      githubUrl: "https://github.com/example/ecommerce",
      liveUrl: "https://example-ecommerce.com",
      slug: "ecommerce-platform"
    },
    {
      id: "2",
      title: "Mobile App",
      description: "A cross-platform mobile application built with Flutter. The app provides real-time data synchronization and offline capabilities for better user experience. Features include user authentication, data caching, push notifications, and seamless offline/online data synchronization.",
      shortDescription: "Cross-platform mobile app with offline capabilities",
      image: "/src/assets/images/hero.png",
      technologies: ["Flutter", "Dart", "Firebase", "SQLite", "Provider", "HTTP"],
      category: "Mobile Development",
      featured: true,
      githubUrl: "https://github.com/example/mobile-app",
      liveUrl: "https://example-app.com",
      slug: "mobile-app"
    },
    {
      id: "3",
      title: "Data Analytics Dashboard",
      description: "A comprehensive data analytics dashboard that visualizes complex datasets with interactive charts and real-time updates. The dashboard provides insights into user behavior, sales performance, and system metrics with customizable widgets and exportable reports.",
      shortDescription: "Interactive data visualization dashboard",
      image: "/src/assets/images/hero.png",
      technologies: ["React", "D3.js", "Python", "FastAPI", "PostgreSQL", "Redis"],
      category: "Data Visualization",
      featured: false,
      githubUrl: "https://github.com/example/dashboard",
      slug: "data-analytics-dashboard"
    },
    {
      id: "4",
      title: "API Microservices",
      description: "A scalable microservices architecture built with Node.js and Docker. Implements RESTful APIs with proper authentication and rate limiting. The system includes service discovery, load balancing, and comprehensive monitoring with health checks and logging.",
      shortDescription: "Scalable microservices architecture",
      image: "/src/assets/images/hero.png",
      technologies: ["Node.js", "Docker", "MongoDB", "Redis", "Express", "JWT"],
      category: "Backend Development",
      featured: false,
      githubUrl: "https://github.com/example/microservices",
      slug: "api-microservices"
    }
  ];

  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return (
      <>
        <Navbar />
        <Box sx={{ pt: 10, pb: 8 }}>
          <Container maxWidth="lg">
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
        </Box>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.title} - Julia's Portfolio</title>
        <meta name="description" content={project.shortDescription} />
      </Helmet>
      <SEO 
        title={`${project.title} - Julia's Portfolio`}
        description={project.shortDescription}
        url={`/portfolio/${project.slug}`}
      />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <Box sx={{ pt: 10, pb: 8, flex: 1 }}>
          <Container maxWidth="lg">
            <Box sx={{ mb: 4 }}>
              <Button 
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate("/portfolio")}
                sx={{ mb: 3 }}
              >
                Back to Portfolio
              </Button>
            </Box>

            <Grid container spacing={6}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 4 }}>
              <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
                {project.title}
              </Typography>
                  <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
                    {project.category}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.7 }}>
                    {project.description}
                  </Typography>
                </Box>

                <Box sx={{ mb: 4 }}>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    Technologies Used
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {project.technologies.map((tech) => (
                      <Chip 
                        key={tech} 
                        label={tech} 
                        variant="outlined"
                        sx={{ fontWeight: 500 }}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  {project.githubUrl && (
                    <Button
                      variant="outlined"
                      startIcon={<GitHubIcon />}
                      onClick={() => window.open(project.githubUrl, "_blank")}
                      size="large"
                    >
                      View Code
                    </Button>
                  )}
                  {project.liveUrl && (
                    <Button
                      variant="contained"
                      startIcon={<LaunchIcon />}
                      onClick={() => window.open(project.liveUrl, "_blank")}
                      size="large"
                    >
                      Live Demo
                    </Button>
                  )}
                </Box>
              </Grid>

              <Grid item xs={12} md={6}>
                <Box 
                  component="img"
                  src={project.image}
                  alt={project.title}
                  sx={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 2,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
                  }}
                />
              </Grid>
            </Grid>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default ProjectPage;
