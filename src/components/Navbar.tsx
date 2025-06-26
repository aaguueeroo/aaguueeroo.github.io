import { AppBar, Box, IconButton } from "@mui/material";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Menu from "./menu/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useTheme } from "@mui/material/styles";
import { MaxWidths } from "../theme/constants";

const useStyles = makeStyles(() => ({
  navBox: {
    display: "flex",
    justifyContent: "space-between",
    height: "100%",
    transition: "background-color 0.3s ease",
    maxWidth: MaxWidths.layout,
    width: "100%",
  },
  appBar: {
    boxShadow: "none !important",
    elevation: 0,
    backgroundColor: "transparent !important",
    transition: "background-color 0.3s ease",
  },
  scrolled: {
    backgroundColor: "white !important",
  },
  iconButton: {
    // Add empty styles for the iconButton class
  },
}));

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const classes = useStyles(useTheme());

  const isHomePage = location.pathname === "/";

  return (
    <AppBar 
      position="fixed" 
      className={classes.appBar}
    >
      <Box className={classes.navBox}>
        {!isHomePage && (
          <IconButton
            className={classes.iconButton}
            onClick={() => navigate("/")}
            sx={{ 
              pl: { xs: 0, sm: 0 },
              "& .MuiSvgIcon-root": {
                fontSize: { xs: "3rem", sm: "3rem", md: "4rem" }
              }
            }}
          >
            <HomeRoundedIcon />
          </IconButton>
        )}
        <Box sx={{ flex: 1 }} />
        <IconButton
          className={classes.iconButton}
          onClick={() => setIsMenuOpen(true)}
          sx={{ 
            pr: { xs: 0, sm: 0 },
            "& .MuiSvgIcon-root": {
              fontSize: { xs: "3em", sm: "3rem", md: "4rem" }
            }
          }}
        >
          <MenuRoundedIcon />
        </IconButton>
      </Box>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </AppBar>
  );
};

export default Navbar;
