import { useEffect, useState } from "react";
import { Typography, useTheme, Box } from "@mui/material";
import "../AboutPage.css";
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import LayersIcon from '@mui/icons-material/Layers';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import UpdateIcon from '@mui/icons-material/Update';
import { MaxWidths, Typography as TypographyConstants } from "../../../theme/constants";

export const HowIWorkTimeline = () => {
  const theme = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 610);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const steps = [
    {
      icon: <AssignmentTurnedInIcon fontSize="large" color="primary" />, 
      title: "1. Kickoff",
      subtitle: "We sign an initial contract and set clear expectations to start the project.",
    },
    {
      icon: <PlaylistAddCheckIcon fontSize="large" color="primary" />, 
      title: "2. Planning",
      subtitle: "I organize the project into milestones and define a detailed roadmap, always with your input and agreement.",
    },
    {
      icon: <BuildCircleIcon fontSize="large" color="primary" />, 
      title: "3. Foundation",
      subtitle: "I set up the project, backend, environments, and build the first essential features.",
    },
    {
      icon: <LayersIcon fontSize="large" color="primary" />, 
      title: "4. Feature Development",
      subtitle: "We proceed by feature groups (epics) following the roadmap that we agreed on.",
    },
    {
      icon: <RocketLaunchIcon fontSize="large" color="primary" />, 
      title: "5. Delivery & Launch",
      subtitle: "Deployment, handover, and contract closure. Your product is ready for the world!",
    },
    {
      icon: <UpdateIcon fontSize="large" color="primary" />, 
      title: "Optional: Maintenance",
      subtitle: "Ongoing support and updates to keep your app running smoothly.",
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: MaxWidths.content,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: { xs: 8, sm: 10, md: 24 },
      }}
    >
      <Typography 
        variant="h2" 
        align="center" 
        gutterBottom
        sx={{
          color: theme.palette.primary.main,
          ...TypographyConstants.h2,
          marginBottom: 4
        }}
      >
        How is the process?
      </Typography>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          minHeight: "100px",
          padding: 0,
          mt: 6,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 0,
            position: "relative",
            zIndex: 2,
            "@media (max-width: 600px)": {
              gap: "24px",
            },
          }}
        >
          {steps.map((step, idx) => (
            <Box
              key={idx}
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 60px 1fr",
                alignItems: "center",
                width: "100%",
                minHeight: "120px",
                position: "relative",
                "@media (max-width: 900px)": {
                  gridTemplateColumns: "1fr 40px 1fr",
                },
                "@media (max-width: 600px)": {
                  gridTemplateColumns: "40px 1fr",
                  minHeight: "100px",
                },
              }}
            >
              {/* Left column */}
              <Box sx={{ 
                display: "flex", 
                justifyContent: "flex-end", 
                alignItems: "center", 
                height: "100%",
                "@media (max-width: 600px)": {
                  display: "none",
                }
              }}>
                {!isMobile && idx % 2 === 0 && (
                  <Box
                    sx={{
                      minWidth: "260px",
                      maxWidth: "600px",
                      background: "#fff",
                      boxShadow: "18px 23px 71.5px rgba(0, 0, 0, 0.1)",
                      borderRadius: "20px",
                      padding: "20px 28px",
                      display: "flex",
                      flexDirection: "column",
                      zIndex: 2,
                      transition: "transform 0.35s cubic-bezier(.4,1.5,.6,1)",
                      marginRight: "20px",
                      "&:hover": {
                        transform: "scale(1.01)",
                      },
                      "@media (max-width: 900px)": {
                        margin: "0 8px",
                        minWidth: 0,
                        maxWidth: "100vw",
                        marginRight: "8px",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                      <Box sx={{ color: theme.palette.primary.main }}>{step.icon}</Box>
                      <Box>
                        <Box
                          sx={{
                            ...TypographyConstants.body,
                            fontWeight: 600,
                            color: theme.palette.secondary.main,
                            marginBottom: "8px",
                          }}
                        >
                          {step.title}
                        </Box>
                        <Box
                          sx={{
                            ...TypographyConstants.body,
                            color: "rgba(0, 0, 0, 0.7)",
                            lineHeight: 1.4,
                          }}
                        >
                          {step.subtitle}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>

              {/* Center column */}
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100%",
                  minHeight: 0,
                  flex: 1,
                  padding: 0,
                  margin: 0,
                  "@media (max-width: 610px)": {
                    alignItems: "flex-start",
                    justifyContent: "center",
                  }
                }}
              >
                {idx !== 0 && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: "50%",
                      width: "4px",
                      background: theme.palette.primary.main,
                      borderRadius: "2px",
                      transform: "translateX(-50%)",
                      zIndex: 1,
                      top: 0,
                      height: "calc(50%)",
                      "@media (max-width: 610px)": {
                        left: "12px",
                        transform: "none",
                      }
                    }}
                  />
                )}
                <Box
                  sx={{
                    width: "24px",
                    height: "24px",
                    background: theme.palette.primary.main,
                    border: `4px solid ${theme.palette.primary.main}`,
                    borderRadius: "50%",
                    zIndex: 2,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    position: "relative",
                    margin: 0,
                    padding: 0,
                    transition: "background 0.2s, border 0.2s",
                    "@media (max-width: 610px)": {
                      width: "16px",
                      height: "16px",
                      borderWidth: "3px",
                      marginLeft: "3px",
                    },
                  }}
                />
                {idx !== steps.length - 1 && (
                  <Box
                    sx={{
                      position: "absolute",
                      left: "50%",
                      width: "4px",
                      background: theme.palette.primary.main,
                      borderRadius: "2px",
                      transform: "translateX(-50%)",
                      zIndex: 1,
                      top: "50%",
                      height: "calc(50% + 50px)",
                      "@media (max-width: 610px)": {
                        left: "12px",
                        transform: "none",
                      }
                    }}
                  />
                )}
              </Box>

              {/* Right column */}
              <Box sx={{ 
                display: "flex", 
                justifyContent: "flex-start", 
                alignItems: "center", 
                height: "100%",
                "@media (max-width: 610px)": {
                  justifyContent: "flex-start",
                  width: "100%",
                }
              }}>
                {(isMobile ? true : idx % 2 !== 0) && (
                  <Box
                    sx={{
                      minWidth: "260px",
                      maxWidth: "600px",
                      background: "#fff",
                      boxShadow: "18px 23px 71.5px rgba(0, 0, 0, 0.1)",
                      borderRadius: "20px",
                      padding: "20px 28px",
                      display: "flex",
                      flexDirection: "column",
                      zIndex: 2,
                      transition: "transform 0.35s cubic-bezier(.4,1.5,.6,1)",
                      marginLeft: "20px",
                      "&:hover": {
                        transform: "scale(1.01)",
                      },
                      "@media (max-width: 900px)": {
                        margin: "0 8px",
                        minWidth: 0,
                        maxWidth: "100vw",
                        marginLeft: "8px",
                      },
                      "@media (max-width: 610px)": {
                        margin: "0 0 0 16px",
                        minWidth: 0,
                        maxWidth: "100%",
                        width: "100%",
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "flex-start", gap: "20px" }}>
                      <Box sx={{ color: theme.palette.primary.main }}>{step.icon}</Box>
                      <Box>
                        <Box
                          sx={{
                            ...TypographyConstants.body,
                            fontWeight: 600,
                            color: theme.palette.secondary.main,
                            marginBottom: "8px",
                          }}
                        >
                          {step.title}
                        </Box>
                        <Box
                          sx={{
                            ...TypographyConstants.body,
                            color: "rgba(0, 0, 0, 0.7)",
                            lineHeight: 1.4,
                          }}
                        >
                          {step.subtitle}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}; 