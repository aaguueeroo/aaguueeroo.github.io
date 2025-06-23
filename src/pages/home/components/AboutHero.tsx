import { Box, Typography } from "@mui/material";
import { Typography as TypographyConstants } from "../../../theme/constants";
import aboutMeImg from "../../../assets/images/about_me_girl_illustration.png";

export const AboutHero = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        maxWidth: { xs: "90%", sm: "600px", md: "800px" }, // Responsive max width
        mx: "auto", // This centers it horizontally
        mt: { xs: 12, sm: 24, md: 32 }, // More space on top for phones
        mb: { xs: 12, sm: 0, md: 32 }, // Negative margin for sm to counteract WhatDoIOfferSection spacing
        px: { xs: 4, sm: 4, md: 20 }, // Responsive horizontal padding
        py: { xs: 18, sm: 0, md: 0 }, // Additional vertical padding for phones
        position: "relative", // For the background ellipe
        "&::before": {
          content: '""',
          position: "absolute",
          top: "60%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%", // Extend to full height of the section
          backgroundColor: "#CF8B7F", // Rose gold color
          borderRadius: "50%",
          opacity: 0.5, // Subtle background
          zIndex: -1, // Behind the content
          maxWidth: { xs: "90%", sm: "700px", md: "1000px" }, // Responsive max width for background
          display: { xs: "none", md: "block" }, // Hide on mobile and tablet, show on desktop
        }
      }}
    >
      <Box
        component="img"
        src={aboutMeImg}
        alt="Illustration of Julia"
        sx={{
          width: { xs: "140px", sm: "160px", md: "180px" }, // Responsive image size
          height: { xs: "140px", sm: "160px", md: "180px" },
          objectFit: "cover",
          borderRadius: "50%",
          border: "4px solid #f3f3f3",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          mb: { xs: 4, sm: 5, md: 6 }, // Responsive spacing
        }}
      />
      <Typography
        variant="h4"
        sx={{
          ...TypographyConstants.h2,
          fontFamily: "'Jua', sans-serif",
          fontWeight: "normal",
          textAlign: "center",
          color: "#222",
          mb: { xs: 3, sm: 3, md: 4 }, // Responsive spacing
        }}
      >
        Hi! I'm Julia
      </Typography>
      <Typography
        variant="body1"
        sx={{
          ...TypographyConstants.h4,
          fontFamily: "'Jua', sans-serif",
          textAlign: "center",
          color: "#444",
          fontWeight: 400,
          mb: { xs: 3, sm: 0, md: 4 }, // Remove bottom margin for sm devices
          px: { xs: 1, sm: 2, md: 0 }, // Responsive horizontal padding for text
        }}
      >
        I'm a passionate creator who loves turning ideas into delightful digital experiences. My journey blends code, design, and a love for helping people bring their visions to life.
      </Typography>
    </Box>
  );
}; 