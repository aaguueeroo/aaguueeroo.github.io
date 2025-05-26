import { Box, Container, Typography, Button } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailIcon from "@mui/icons-material/Email";
import PrimaryButton from "../../../components/PrimaryButton";

const useStyles = (theme: Theme) => ({
  section: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: {
      xs: "96px 16px 96px 16px",
      sm: "160px 32px 160px 32px",
      md: "220px 64px 220px 64px"
    },
    gap: "44px",
    width: "100%",
    alignSelf: "stretch",
    boxSizing: "border-box"
  },
  buttonsContainer: {
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row"
    },
    gap: {
      xs: "16px",
      md: "24px"
    },
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  buttonShared: {
    minHeight: "56px",
    fontSize: "1.25rem",
    boxSizing: "border-box",
    width: {
      xs: "100%",
      sm: "auto"
    }
  },
  primaryButton: {
    padding: '8px 32px',
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 1.2,
    '& .MuiSvgIcon-root': {
      fontSize: '2.5rem',
      color: theme.palette.secondary.main,
    },
    gap: 4,
    bgcolor: theme.palette.primary.main,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      bgcolor: theme.palette.primary.main,
      '& .MuiSvgIcon-root': {
        color: theme.palette.secondary.main
      }
    }
  },
  secondaryButton: {
    padding: '8px 32px',
    color: theme.palette.secondary.main,
    fontWeight: 'bold',
    lineHeight: 1.2,
    border: `2px solid ${theme.palette.secondary.main}`,
    '& .MuiSvgIcon-root': {
      fontSize: '2.5rem',
      color: theme.palette.primary.main,
    },
    gap: 4,
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.05)',
      bgcolor: 'transparent',
      borderColor: theme.palette.primary.main,
      color: theme.palette.primary.main,
      '& .MuiSvgIcon-root': {
        color: theme.palette.primary.main
      }
    }
  }
});

export function LetsGetInTouchSection() {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Container sx={{...classes.section}}>
      <Typography variant="h1" align="center">
        Let's get in touch
      </Typography>
      
      <Typography variant="body1" align="center">
        Ready to bring your vision to life? Let's create something amazing together.
      </Typography>

      <Box sx={{...classes.buttonsContainer}}>
        <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
          <Button
            variant="outlined"
            sx={{...classes.secondaryButton}}
            endIcon={<EmailIcon />}
            style={{ minHeight: 56, width: '100%' }}
          >
            Contact me
          </Button>
        </Box>
        <Box sx={{ width: { xs: '100%', md: 'auto' } }}>
          <PrimaryButton showArrow style={{ minHeight: 56, width: '100%' }}>
            Get a free budget
          </PrimaryButton>
        </Box>
      </Box>
    </Container>
  );
} 