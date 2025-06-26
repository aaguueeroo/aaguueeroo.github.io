import {
  Box,
  Divider,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useNavigate } from "react-router-dom";
import { MaxWidths } from "../theme/constants";

const useStyles = (theme: Theme) => ({
  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: {
      xs: "32px 32px 32px 32px",   // much smaller on mobile
      sm: "48px 48px 48px 48px", // moderate on tablet
      md: "96px 160px 32px",     // original on desktop
    },
    gap: {
      xs: "16px",
      sm: "32px",
      md: "48px"
    },
    backgroundColor: theme.palette.grey[200], // This should match your #DEE2E6
    alignSelf: "stretch",
  },
  footerContent: {
    display: "flex",
    flexDirection: "column",
    gap: "48px",
    width: "100%",
    maxWidth: MaxWidths.layout,
  },
  socialRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "32px",
    width: "100%",
  },
  socialText: {
    fontWeight: "regular",
    color: theme.palette.secondary.main,
  },
  socialIcons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "start",
    gap: "px",
  },
  icon: {
    color: theme.palette.secondary.main,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      color: theme.palette.primary.main,
      transform: "scale(1.1)",
    },
  },
  divider: {
    width: "100%",
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.2,
    height: "1px",
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    width: "100%",
  },
  textButton: {
    justifyContent: "flex-start",
    padding: "8px 0",
    color: theme.palette.secondary.main,
    fontWeight: "regular",
    lineHeight: "1.0",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.palette.primary.main,
      "& .MuiSvgIcon-root": {
        transform: "translateX(4px)",
      },
    },
    "& .MuiSvgIcon-root": {
      transition: "transform 0.3s ease-in-out",
    },
  },
  copyright: {
    width: "100%",
    textAlign: "center",
    color: theme.palette.secondary.main,
    opacity: 0.7,
  },
});

export function Footer() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const navigate = useNavigate();

  return (
    <Box sx={{ ...classes.footer }}>
      <Box sx= {{...classes.footerContent}}>
        <Box sx={{ ...classes.socialRow }}>
          <Typography variant="subtitle2" sx={{ ...classes.socialText }}>
            Follow me
          </Typography>
          <Box sx={{ ...classes.socialIcons }}>
            <IconButton
              href="https://github.com/aaguueeroo"
              target="_blank"
              sx={{ ...classes.icon }}
            >
              <GitHubIcon />
            </IconButton>
            <IconButton
              href="https://x.com/aaguueeroo"
              target="_blank"
              sx={{ ...classes.icon }}
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              href="https://www.linkedin.com/in/julia-aguero-fraguas/"
              target="_blank"
              sx={{ ...classes.icon }}
            >
              <LinkedInIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ ...classes.divider }} />

        <Box sx={{ ...classes.buttonsContainer }}>
          <Button 
            endIcon={<ArrowForwardIcon />} 
            onClick={() => navigate('/quote')}
            sx={{ ...classes.textButton }}
          >
            Get a quote
          </Button>
          <Button endIcon={<ArrowForwardIcon />} onClick={() => navigate('/about')} sx={{ ...classes.textButton }}>
            About me
          </Button>
          <Button 
            endIcon={<ArrowForwardIcon />} 
            onClick={() => navigate('/blog')}
            sx={{ ...classes.textButton }}
          >
            See blog
          </Button>
        </Box>

        <Typography variant="body2" sx={{ ...classes.copyright }}>
          © 2025 Julia Agüero Fraguas. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
}
