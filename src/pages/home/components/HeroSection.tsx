import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import heroImage from "../../../assets/images/hero.png";
import PrimaryButton from "../../../components/PrimaryButton";

const HeroSection = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${heroImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "100%",
          transform: "scale(1.21)",
        }}
      />
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          py: 3,
          width: "100%",
          "@media (min-width:400px)": {
            py: 3,
          },
          "@media (min-width:450px) and (max-width:735px)": {
            px: '40px',
            py: '20px',
          },
          "@media (min-width:735px)": {
            pl: '6vw',
            pr: '30vw',
            py: '10vw',
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: 700,
            fontSize: {
              xs: '2.5rem',
              sm: '3.5rem',
              md: '4rem',
              lg: '5rem'
            },
            lineHeight: 1.2,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
          gutterBottom
        >
          Get a premium app{" "}
          <span
            style={{
              color: theme.palette.primary.main,
              fontWeight: 700,
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            }}
          >
            fast and easy
          </span>
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.secondary.main,
            fontWeight: 400,
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(4),
            textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
          }}
          gutterBottom
        >
          Share your vision, values and personality. I'll turn them into an app
          that truly represents you.
        </Typography>
        <PrimaryButton onClick={() => navigate('/quote')}>
          <span style={{ display: 'none' }} className="show-xs">Get quote</span>
          <span className="hide-xs">Get your quote for free</span>
        </PrimaryButton>
      </Box>
    </Box>
  );
};

export default HeroSection;
