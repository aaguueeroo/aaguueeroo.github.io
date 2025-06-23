import { Box, Typography } from "@mui/material";
import PrimaryButton from "../../../components/PrimaryButton";
import { MaxWidths } from "../../../theme/constants";

const useStyles = () => ({
  section: {
    width: "100%",
    display: "flex",
    justifyContent: "center"
  },
  box: {
    padding: {
      xs: "32px 32px",
      sm: "64px 64px",
      md: "128px 128px"
    },
    display: "flex",
    height: "30vh",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "32px",
    width: "100%",
    maxWidth: MaxWidths.content,
    mx: "auto",
    position: "relative",
    overflow: "hidden"
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: "url('https://picsum.photos/seed/picsum/2000/1200')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    transform: "scale(1.1)",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.4)",
      zIndex: 1
    }
  },
  content: {
    position: "relative",
    zIndex: 2,
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    alignItems: "flex-start"
  }
});

const PortfolioSection = () => {
  const classes = useStyles();

  return (
    <Box sx={{ ...classes.section }}>
      <Box sx={{ ...classes.box }}>
        <Box sx={{ ...classes.backgroundImage }} />
        <Box sx={{ ...classes.content }}>
          <Typography variant="h1" textAlign={"start"}
            sx={{
              fontSize: { xs: '2rem', sm: '2.5rem', md: '4rem', lg: '5rem' },
              fontWeight: 700,
              lineHeight: 1.2
            }}
          >
            Get to know my work
          </Typography>
          <PrimaryButton>
            See projects
          </PrimaryButton>
        </Box>
      </Box>
    </Box>
  );
};

export default PortfolioSection;
