import {
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTheme } from "@mui/material/styles";
import useStyles from "./menu-styles";
import { useNavigate } from "react-router-dom";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const Menu = ({ isOpen, onClose }: MenuProps) => {
  const theme = useTheme();
  const classes = useStyles(theme);
  const navigate = useNavigate();

  const menuItems = [
    { label: "About me", path: "/about" },
    { label: "My projects", path: "/projects" },
    { label: "Blog", path: "/blog" },
  ];

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: { ...classes.drawer },
      }}
    >
      <Box sx={{ ...classes.wrapperContainer }}>
        <Box sx={{ ...classes.container }}>
          <Box sx={{ ...classes.closeButtonContainer }}>
            <IconButton onClick={onClose}>
              <CloseIcon sx={{ ...classes.closeIcon }} />
            </IconButton>
          </Box>

          <List sx={{ ...classes.list }}>
            {menuItems.map((item) => (
              <ListItem
                key={item.label}
                component="button"
                onClick={() => navigate(item.path)}
                sx={{ ...classes.listItem }}
              >
                <Typography variant="h2" sx={{ ...classes.listItemText }}>
                  {item.label}
                </Typography>
                <ArrowForwardIcon
                  color="primary"
                  sx={{ ...classes.listItemIcon }}
                />
              </ListItem>
            ))}
          </List>

          <Button
            variant="contained"
            color="secondary"
            sx={{ ...classes.button }}
            endIcon={<ArrowForwardIcon />}
            size="large"
          >
            Get a budget
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Menu;
