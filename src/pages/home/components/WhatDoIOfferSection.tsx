import { Box, Card, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import whatDoIOfferTopImage from "../../../assets/images/what_do_i_offer_top.png";
import whatDoIOfferLeftImage from "../../../assets/images/what_do_i_offer_left.png";
import whatDoIOfferRightImage from "../../../assets/images/what_do_i_offer_right.png";

const useStyles = () => ({
  section: {
    padding: {
      xs: "0px 16px",
      sm: "96px 32px",
      md: "0px 96px"
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
    gap: { xs: "20px", sm: "40px", md: "40px"},
    alignItems: "stretch",
    width: "100%",
    padding: 0
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
    borderRadius: "40px"
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
    opacity: 0.3
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
      xs: "24px",
      sm: "48px",
      md: "96px"
    },
    color: "black",
    margin: "0"
  },
  cardsRow: {
    display: "flex",
    flexDirection: {
      xs: "column",
      sm: "row"
    },
    gap: { xs: "20px", sm: "40px", md: "40px"},
    width: "100%"
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
    '&:hover': {
      transform: 'scale(1.01)',
    }
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
    minHeight: "400px"
  },
  cardImage: {
    width: "100%",
    height: "0",
    paddingBottom: {
      xs: "56.25%", // 16:9 aspect ratio
      sm: "100%"
    },
    position: "relative",
    borderRadius: "24px",
    marginTop: "auto",
    overflow: "hidden"
  },
  leftCardImage: {
    width: "100%",
    height: "0",
    paddingBottom: {
      xs: "56.25%", // 16:9 aspect ratio
      sm: "100%"
    },
    position: "relative",
    borderRadius: "24px",
    marginTop: "auto",
    overflow: "hidden"
  },
  leftImageContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    boxSizing: "border-box"
  },
});

export function WhatDoIOfferSection() {
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box sx={{ 
      ...classes.section,
      width: "100%",
      maxWidth: "1200px",
      mx: "auto",
      boxSizing: "border-box"
    }}>
      <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "24px",
        width: "100%",
        boxSizing: "border-box"
      }}>
        <Typography 
          variant="h1" 
          align="center" 
          gutterBottom
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 700,
            fontSize: {
              xs: '2.5rem',
              sm: '3.5rem',
              md: '4rem',
              lg: '5rem'
            },
            lineHeight: 1.2,
            width: "100%",
            marginTop: '80px'
          }}
        >
          What do I offer?
        </Typography>

        <Box sx={{ ...classes.mainCardContainer }}>
          <Card sx={{ ...classes.mainCard }}>
            <Box sx={{ ...classes.mainCardBackground }} />
            <Box sx={{ ...classes.mainCardContent }}>
              <Typography variant="h6" sx={{ 
                fontSize: { xs: '1.5rem', sm: '2.2rem', md: '3.5rem' }, fontWeight: 600, lineHeight: 1.3 
              }}>
                Get all your app developed without delays.
              </Typography>
              <Typography variant="body1" sx={{ 
                fontSize: { xs: '1.1rem', sm: '1.5rem', md: '2.5rem' }, opacity: 0.8 
              }}>
                Comprehensive web and mobile solutions.
              </Typography>
            </Box>
          </Card>

          <Box sx={{ ...classes.cardsRow }}>
            <Card sx={{ ...classes.card }}>
              <Typography variant="subtitle2" textAlign={"start"}>
                Technical Consulting
              </Typography>
              <Typography variant="body2" textAlign={"start"}>
                Expert advice on technology choices, architecture, and best
                practices for your projects. Helping you make informed decisions
                for your technical solutions.
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
                    objectPosition: "center"
                  }}
                />
              </Box>
            </Card>

            <Card sx={{ ...classes.card }}>
              <Typography variant="subtitle2" textAlign={"start"}>
                UI/UX Design
              </Typography>
              <Typography variant="body2" textAlign={"start"}>
                Creating intuitive and beautiful user interfaces. Focus on user
                experience and modern design principles to make your application
                stand out.
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
                    objectPosition: "top center"
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
