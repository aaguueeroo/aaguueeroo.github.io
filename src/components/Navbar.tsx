import { AppBar, Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import Menu from "./menu/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";

const useStyles = makeStyles(() => ({
  iconButton: {
    "& .MuiSvgIcon-root": {
      fontSize: "4rem",
    },
  },
  navBox: {
    display: "flex",
    justifyContent: "flex-end",
    height: "100%",
    transition: "background-color 0.3s ease",
    maxWidth: "1920px",
    width: "100%",
    margin: "0 auto",
    padding: "0 16px",
  },
  appBar: {
    boxShadow: "none !important",
    elevation: 0,
    height: "70px",
    backgroundColor: "transparent !important",
    transition: "background-color 0.3s ease",
  },
  scrolled: {
    backgroundColor: "white !important",
  },
}));

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles(useTheme());

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar 
      position="fixed" 
      className={`${classes.appBar} ${isScrolled ? classes.scrolled : ""}`}
    >
      <Box className={classes.navBox}>
        {!isHomePage && (
          <IconButton
            className={classes.iconButton}
            onClick={() => navigate("/")}
          >
            <HomeIcon />
          </IconButton>
        )}
        <IconButton
          className={classes.iconButton}
          onClick={() => setIsMenuOpen(true)}
          sx={{ pr: { xs: 4, sm: 0 } }}
        >
          <MenuIcon />
        </IconButton>
      </Box>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </AppBar>
  );
};

export default Navbar;
