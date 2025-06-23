import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { MaxWidths, Typography as TypographyConstants } from "../../theme/constants";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";

const BlogPage: React.FC = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Box sx={{ flex: 1, pt: "70px" }}>
        <Container
          sx={{
            maxWidth: MaxWidths.content,
            mx: "auto",
            py: { xs: 8, sm: 12, md: 16, lg: 20 },
            px: { xs: 2, sm: 3, md: 4 },
          }}
        >
          <Box
            sx={{
              textAlign: "center",
              py: 8,
              px: 4,
              borderRadius: "24px",
              backgroundColor: "#fff",
              boxShadow: "18px 23px 71.5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              sx={{
                ...TypographyConstants.h2,
                color: "primary",
                marginBottom: 4,
              }}
            >
              Blog Coming Soon! 🚀
            </Typography>
            <Typography
              sx={{
                ...TypographyConstants.body,
                color: "text.secondary",
                marginBottom: 2,
              }}
            >
              I'm working on creating valuable content about web development, design, and building amazing digital experiences.
            </Typography>
            <Typography
              sx={{
                ...TypographyConstants.bodySmall,
                color: "text.secondary",
                fontStyle: "italic",
              }}
            >
              Stay tuned for insights, tutorials, and behind-the-scenes stories from my projects.
            </Typography>
          </Box>
        </Container>
      </Box>
      <Footer />
    </Box>
  );
};

export default BlogPage;

