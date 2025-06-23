import React from "react";
import { Box, Typography } from "@mui/material";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { SEO } from "../../components/SEO";
import { MaxWidths } from "../../theme/constants";
import { Typography as TypographyConstants } from "../../theme/constants";

const BlogPage: React.FC = () => {
  return (
    <>
      <SEO
        title="Blog - Julia Agüero Mobile App Development Insights"
        description="Read insights about mobile app development, UX design, and the latest trends in the industry. Tips, tutorials, and thoughts from a mobile app developer."
        url="/blog"
      />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <Box sx={{ flex: 1, pt: "70px" }}>
          <Box
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
                borderRadius: "32px",
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
                I'm working on creating valuable content about mobile app development, UX design, and building amazing digital experiences.
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
          </Box>
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default BlogPage;

