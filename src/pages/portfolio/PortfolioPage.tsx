import { Box, Container, Typography, Grid } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import PortfolioCard from "./components/PortfolioCard";
import { Project } from "../../types/portfolio";

const PortfolioPage = () => {
  // Mock data for portfolio projects
  const projects: Project[] = [
    {
      id: "1",
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform built with React, Node.js, and PostgreSQL. Features include user authentication, product management, shopping cart, and payment integration.",
      shortDescription: "Full-stack e-commerce platform with modern features",
      image: "/src/assets/images/hero.png", // Using existing image as placeholder
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      category: "Web Development",
      featured: true,
      githubUrl: "https://github.com/example/ecommerce",
      liveUrl: "https://example-ecommerce.com",
      slug: "ecommerce-platform"
    },
    {
      id: "2",
      title: "Mobile App",
      description: "A cross-platform mobile application built with Flutter. The app provides real-time data synchronization and offline capabilities for better user experience.",
      shortDescription: "Cross-platform mobile app with offline capabilities",
      image: "/src/assets/images/hero.png", // Using existing image as placeholder
      technologies: ["Flutter", "Dart", "Firebase", "SQLite"],
      category: "Mobile Development",
      featured: true,
      githubUrl: "https://github.com/example/mobile-app",
      liveUrl: "https://example-app.com",
      slug: "mobile-app"
    },
    {
      id: "3",
      title: "Data Analytics Dashboard",
      description: "A comprehensive data analytics dashboard that visualizes complex datasets with interactive charts and real-time updates.",
      shortDescription: "Interactive data visualization dashboard",
      image: "/src/assets/images/hero.png", // Using existing image as placeholder
      technologies: ["React", "D3.js", "Python", "FastAPI"],
      category: "Data Visualization",
      featured: false,
      githubUrl: "https://github.com/example/dashboard",
      slug: "data-analytics-dashboard"
    },
    {
      id: "4",
      title: "API Microservices",
      description: "A scalable microservices architecture built with Node.js and Docker. Implements RESTful APIs with proper authentication and rate limiting.",
      shortDescription: "Scalable microservices architecture",
      image: "/src/assets/images/hero.png", // Using existing image as placeholder
      technologies: ["Node.js", "Docker", "MongoDB", "Redis"],
      category: "Backend Development",
      featured: false,
      githubUrl: "https://github.com/example/microservices",
      slug: "api-microservices"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Portfolio - Julia's Projects</title>
        <meta name="description" content="Explore Julia's portfolio of web development, mobile app, and software engineering projects." />
      </Helmet>
      <SEO 
        title="Portfolio - Julia's Projects"
        description="Explore Julia's portfolio of web development, mobile app, and software engineering projects."
        url="/portfolio"
      />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <Box sx={{ pt: 10, pb: 8, flex: 1 }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: "center", mb: 6 }}>
              <Typography variant="h2" component="h1" sx={{ mb: 2 }}>
                My Portfolio
              </Typography>
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
                A collection of projects that showcase my skills in web development, 
                mobile app development, and software engineering.
              </Typography>
            </Box>

            <Grid container spacing={4} sx={{ mb: 4 }}>
              {projects.map((project) => (
                <Grid item xs={12} sm={6} md={4} key={project.id}>
                  <PortfolioCard project={project} />
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default PortfolioPage;
