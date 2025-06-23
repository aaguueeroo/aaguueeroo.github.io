import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router-dom";
import { SEO } from "../components/SEO";
import Navbar from "../components/Navbar";
import { Footer } from "../components/Footer";
import PrimaryButton from "../components/PrimaryButton";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Page Not Found - Julia Agüero"
        description="The page you're looking for doesn't exist. Let me help you find what you need."
        url="/404"
      />
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar />
        <Box sx={{ flex: 1, pt: "70px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "calc(100vh - 70px)",
              background: "#fafafa",
              padding: "2rem",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative elements */}
            <Box
              sx={{
                position: "absolute",
                top: "10%",
                left: "10%",
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                background: "linear-gradient(45deg, rgba(207,139,127,0.1), rgba(207,139,127,0.05))",
                animation: "float 6s ease-in-out infinite",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: "15%",
                right: "15%",
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: "linear-gradient(45deg, rgba(207,139,127,0.08), rgba(207,139,127,0.03))",
                animation: "float 8s ease-in-out infinite reverse",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: "60%",
                left: "5%",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "linear-gradient(45deg, rgba(207,139,127,0.06), rgba(207,139,127,0.02))",
                animation: "float 7s ease-in-out infinite",
              }}
            />

            <Box
              sx={{
                textAlign: "center",
                maxWidth: "700px",
                width: "100%",
                padding: "2.5rem 3rem",
                background: "white",
                borderRadius: "16px",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* 404 Icon */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "1rem",
                }}
              >
                <SearchIcon
                  sx={{
                    fontSize: "4rem",
                    color: "#CF8B7F",
                    opacity: 0.7,
                  }}
                />
              </Box>
              
              <Typography
                variant="h1"
                sx={{
                  fontSize: "2.5rem",
                  color: "#333",
                  marginBottom: "0.5rem",
                  fontWeight: 600,
                  fontFamily: "Golos Text, sans-serif",
                }}
              >
                404
              </Typography>
              
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: "#666",
                  marginBottom: "1.5rem",
                  lineHeight: 1.5,
                  fontFamily: "Golos Text, sans-serif",
                }}
              >
                Page not found
              </Typography>
              
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "#888",
                  marginBottom: "2rem",
                  lineHeight: 1.5,
                  fontFamily: "Golos Text, sans-serif",
                }}
              >
                The page you're looking for doesn't exist or has been moved.
              </Typography>
              
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PrimaryButton
                  onClick={() => navigate("/")}
                  showArrow={false}
                >
                  Back to Home
                </PrimaryButton>
              </Box>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>

      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </>
  );
}; 