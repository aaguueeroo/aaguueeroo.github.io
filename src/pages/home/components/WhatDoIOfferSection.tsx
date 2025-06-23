import { Box, Card, Typography } from "@mui/material";
import whatDoIOfferTopImage from "../../../assets/images/what_do_i_offer_top.png";
import whatDoIOfferLeftImage from "../../../assets/images/what_do_i_offer_left.png";
import whatDoIOfferRightImage from "../../../assets/images/what_do_i_offer_right.png";
import { MaxWidths, Typography as TypographyConstants } from "../../../theme/constants";

const useStyles = () => ({
  section: {
    padding: {
      xs: "0px 16px",
      sm: "96px 32px",
      md: "0px 96px",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
  },
  mainCardContainer: {
    display: "flex",
    flexDirection: "column",
    gap: { xs: "20px", sm: "40px", md: "40px" },
    alignItems: "stretch",
    width: "100%",
    padding: 0,
  },
  mainCard: {
    minHeight: 300,
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "row",
    gap: "24px",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    padding: 0,
    borderRadius: "40px",
  },
  mainCardBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: `url(${whatDoIOfferTopImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "brightness(1.1) saturate(0.7) blur(1px)",
    transform: "scale(1.1)",
    opacity: 0.3,
  },
  mainCardContent: {
    position: "relative",
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    flex: 1,
    justifyContent: "center",
    padding: {
      xs: "24px 0px",
      sm: "48px 0px",
    },
    color: "black",
    margin: "0",
  },
  cardsRow: {
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "row",
    },
    gap: { xs: "20px", sm: "40px", md: "40px" },
    width: "100%",
  },
  card: {
    height: "auto",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "24px",
    gap: "16px",
    position: "relative",
    overflow: "hidden",
    borderRadius: "40px",
    flex: 1,
    minWidth: 0,
    transition: "transform 0.35s cubic-bezier(.4,1.5,.6,1)",
    "&:hover": {
      transform: "scale(1.01)",
    },
  },
  leftCard: {
    height: "auto",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "24px 24px 0 24px",
    gap: "16px",
    position: "relative",
    overflow: "hidden",
    minHeight: "400px",
  },
  cardImage: {
    width: "100%",
    height: "0",
    paddingBottom: {
      xs: "56.25%", // 16:9 aspect ratio
      sm: "60%",    // Reduced from 100% to make it smaller
    },
    position: "relative",
    borderRadius: "24px",
    marginTop: "auto",
    overflow: "hidden",
  },
  leftCardImage: {
    width: "100%",
    height: "0",
    paddingBottom: {
      xs: "56.25%", // 16:9 aspect ratio
      sm: "60%",    // Reduced from 100% to make it smaller
    },
    position: "relative",
    borderRadius: "24px",
    marginTop: "auto",
    overflow: "hidden",
  },
  leftImageContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    boxSizing: "border-box",
  },
});

export function WhatDoIOfferSection() {
  const classes = useStyles();

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: MaxWidths.content,
        mx: "auto",
        boxSizing: "border-box",
        mt: {
          xs: 10,
          sm: 0,
          md: 15,
          lg: 15,
        },
        mb: {
          xs: 5,
          sm: 5,
          md: 5,
          lg: 5,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "24px",
          width: "100%",
          boxSizing: "border-box",
        }}
      >

        <Box sx={{ ...classes.mainCardContainer }}>
            <Box sx={{ ...classes.mainCardContent }}>
              <Typography
                sx={{
                  ...TypographyConstants.h3
                }}
              >
                Get the full app package, without the hassle.
              </Typography>
              <Typography
                sx={{
                  ...TypographyConstants.body,
                  opacity: 0.8,
                }}
              >
                Large teams, despite being preferred by many, often face unnecessary 
                delays caused by communication layers, meetings, alignment efforts, and 
                miscommunications. These issues are avoided by solo developers, who handle 
                all aspects directly and streamline the process.
              </Typography>
            </Box>

          <Box sx={{ ...classes.cardsRow }}>
            <Card sx={{ ...classes.card }}>
              <Typography variant="subtitle2" textAlign={"start"}
                sx={{
                  ...TypographyConstants.h4
                }}>
                Cohesive experience
              </Typography>
              <Typography variant="body2" textAlign={"start"}
                sx={{
                  ...TypographyConstants.body
                }}>
                From design to code, everything works together. The visuals,
                interactions, and flow are aligned to feel natural and
                intuitive. I turn your ideas into a smooth experience that
                reflects your identity and keeps users engaged.
              </Typography>
              <Box sx={{ ...classes.leftCardImage }}>
                <img
                  src={whatDoIOfferLeftImage}
                  alt="Technical Consulting"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </Box>
            </Card>

            <Card sx={{ ...classes.card }}>
              <Typography variant="subtitle2" textAlign={"start"}
                sx={{
                  ...TypographyConstants.h4
                }}>
                Polished results
              </Typography>
              <Typography variant="body2" textAlign={"start"}
                sx={{
                  ...TypographyConstants.body
                }}>
                I deliver complete, high-quality apps that are ready for real
                users. With attention to detail across all layers —design,
                frontend and backend— you get a product that looks great,
                performs well, and stands out for its reliability and finish.
              </Typography>
              <Box sx={{ ...classes.cardImage }}>
                <img
                  src={whatDoIOfferRightImage}
                  alt="UI/UX Design"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top center",
                  }}
                />
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
