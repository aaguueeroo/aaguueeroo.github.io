import { Container, Typography, Card, useTheme, Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Theme } from "@mui/material/styles";
import CodeIcon from '@mui/icons-material/Code';
import PaletteIcon from '@mui/icons-material/Palette';
import GroupIcon from '@mui/icons-material/Group';
import whoAmIImage from "../../../assets/images/who_am_i.png";

const useStyles = (theme: Theme) => ({
  section: {
    padding: "96px 96px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
  },
  mainCard: {
    height: "auto",
    backgroundColor: "#fff",
    boxShadow: "18px 23px 71.5px rgba(0, 0, 0, 0.1)",
    borderRadius: "40px",
    display: "flex",
    flexDirection: {
      xs: "column",
      md: "row"
    },
    alignItems: "center",
    justifyContent: "center",
    padding: "32px",
    gap: "24px",
  },
  imageContainer: {
    width: {
      xs: "100%",
      sm: "100%",
      md: "400px"
    },
    height: {
      xs: "300px",
      sm: "400px",
      md: "400px"
    },
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    flexShrink: 0,
    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      borderRadius: "24px",
      filter: "brightness(1.3) saturate(0.9)",
      position: "relative",
      zIndex: 1,
    },
    "&::after": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: `linear-gradient(rgba(255, 192, 203, 0.15), rgba(255, 192, 203, 0.15))`,
      borderRadius: "24px",
      zIndex: 2,
    }
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    minWidth: 0,
  },
  listItem: {
    padding: "8px",
    borderRadius: "20px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.02)",
    }
  },
  listItemIcon: {
    minWidth: "48px",
    alignSelf: "flex-start",
    marginTop: "4px",
    "& .MuiSvgIcon-root": {
      fontSize: "32px",
      color: theme.palette.primary.main,
    }
  },
  listItemTitle: {
    fontWeight: 700,
    fontSize: "10px",
    marginBottom: "2px",
  },
  listItemText: {
    fontSize: "4px",
    color: "rgba(0, 0, 0, 0.7)",
    lineHeight: 1.4,
  },
  cardsRow: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "1fr",
      md: "repeat(3, 1fr)"
    },
    gap: "24px",
    width: "100%",
  },
  smallCard: {
    height: {
      xs: 160,
      sm: 180,
      md: 280
    },
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "18px 23px 71.5px rgba(0, 0, 0, 0.1)",
    borderRadius: "40px",
    padding: "24px",
    transition: "transform 0.35s cubic-bezier(.4,1.5,.6,1)",
    '&:hover': {
      transform: 'scale(1.01)',
    }
  },
  number: {
    fontSize: {
      xs: "36px",
      sm: "42px",
      md: "48px"
    },
    lineHeight: {
      xs: "44px",
      sm: "50px",
      md: "58px"
    },
    fontWeight: 700,
    textAlign: "center",
    color: "#000000",
  },
  label: {
    fontSize: {
      xs: "24px",
      sm: "28px",
      md: "32px"
    },
    lineHeight: {
      xs: "30px",
      sm: "34px",
      md: "38px"
    },
    fontWeight: 400,
    textAlign: "center",
    color: "#000000",
  },
});

const WhoAmISection = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const skills = [
    {
      icon: <CodeIcon />,
      title: "Developer",
      description: "Full-stack development with modern frameworks and technologies."
    },
    {
      icon: <PaletteIcon />,
      title: "Designer",
      description: "Creating intuitive and beautiful user interfaces with a focus on UX."
    },
    {
      icon: <GroupIcon />,
      title: "Manager",
      description: "Leading teams and managing projects through effective communication."
    }
  ];

  return (
    <Box sx={{ 
      padding: {
        xs: "32px",
        sm: "48px",
        md: "96px"
      },
      width: "100%",
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
            width: "100%"
          }}
        >
          Who am I?
        </Typography>
        
        <Card sx={{
          ...classes.mainCard,
          width: "100%",
          boxSizing: "border-box"
        }}>
          <Box sx={classes.imageContainer}>
            <img src={whoAmIImage} alt="Profile" />
          </Box>
          <Box sx={classes.contentContainer}>
            {skills.map((skill, index) => (
              <ListItem key={index} sx={classes.listItem}>
                <ListItemIcon sx={classes.listItemIcon}>
                  {skill.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography 
                      variant="body1"
                      sx={{
                        fontWeight: 700,
                        fontSize: "20px !important",
                        marginBottom: "2px",
                      }}>
                      {skill.title}
                    </Typography>
                  }
                  secondary={
                    <Typography 
                      variant="body2"
                      sx={{
                        fontSize: "18px !important",
                        color: "rgba(0, 0, 0, 0.7)",
                        lineHeight: 1.4,
                      }}>
                      {skill.description}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
          </Box>
        </Card>

        <Box sx={{
          ...classes.cardsRow,
          width: "100%",
          boxSizing: "border-box"
        }}>
          <Card sx={{...classes.smallCard}}>
            <Typography sx={{...classes.number}}>
              +4
            </Typography>
            <Typography sx={{...classes.label}}>
              years experience
            </Typography>
          </Card>

          <Card sx={{...classes.smallCard}}>
            <Typography sx={{...classes.number}}>
              +8000
            </Typography>
            <Typography sx={{...classes.label}}>
              hours of coding
            </Typography>
          </Card>

          <Card sx={{...classes.smallCard}}>
            <Typography sx={{...classes.number}}>
              +20
            </Typography>
            <Typography sx={{...classes.label}}>
              projects completed
            </Typography>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default WhoAmISection;
