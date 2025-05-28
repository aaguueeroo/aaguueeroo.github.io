import { Theme } from "@mui/material/styles";

const useStyles = (theme: Theme) => ({
  drawer: {
    width: "100%",
    bgcolor: theme.palette.background.default,
    display: "flex",
    flexDirection: "column",
  },
  wrapperContainer: {
    width: "100%",
    flex: 1,
    display: "grid",
    justifyItems: "center",
  },
  container: {
    minWidth: "0",
    padding: "0 32px 32px 32px",
    width: "100%",
    maxWidth: "1920px",
    display: "flex",
    flexDirection: "column",
  },
  closeButtonContainer: {
    display: "flex",
    justifyContent: "flex-end",
    padding: 0,
  },
  closeIcon: {
    fontSize: {
      xs: '2.5rem',
      sm: '4rem',
      md: '5rem'
    },
  },
  list: {
    flex: 1,
    height: 300,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  '@keyframes bounceX': {
    '0%': { transform: 'translateX(0)' },
    '50%': { transform: 'translateX(-8px)' },
    '100%': { transform: 'translateX(0)' },
  },
  listItem: {
    background: "none",
    border: "none",
    padding: {
      xs: "12px",
      sm: "24px",
      md: "24px"
    },
    display: "flex",
    justifyContent: "flex-end",
    gap: '16px',
    alignItems: "center",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
      background: "none",
      "& .MuiTypography-root": {
        color: theme.palette.primary.main,
        transform: "scale(1.05)",
        transition: "transform 0.3s ease-in-out, color 0.3s ease-in-out",
      },
      "& .menu-arrow": {
        animation: 'bounceX 1s ease-in-out infinite',
      },
    },
  },
  listItemText: {
    transition: "color 0.3s ease-in-out",
    fontSize: {
      md: "4.5rem"
    },
    textAlign: "right",
    color: "#212529",
  },
  listItemIcon: {
    fontSize: {
      xs: "2rem",
      sm: "3rem",
      md: "4.5rem"
    },
    transition: "all 0.3s ease-in-out",
  },
  button: {
    alignSelf: "center",
    padding: "8px 64px",
    fontSize: {
      xs: "1.2rem !important",
      sm: "2rem !important",
      md: "3.2rem !important"
    },
    lineHeight: 1.2,
    "& .MuiSvgIcon-root": {
      fontSize: {
        xs: "1.5rem",
        sm: "2.5rem",
        md: "3.5rem"
      },
      color: theme.palette.primary.main,
    },
    gap: 4,
    bgcolor: theme.palette.secondary.main,
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      transform: "scale(1.05)",
      bgcolor: theme.palette.primary.main,
      fontSize: {
        xs: "1.3rem !important",
        sm: "2.1rem !important",
        md: "3.3rem !important"
      },
      "& .MuiSvgIcon-root": {
        color: theme.palette.secondary.main,
      },
    },
  },
});

export default useStyles;
