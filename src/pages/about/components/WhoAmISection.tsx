import { Box, Typography, Card, useTheme, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { MaxWidths, Typography as TypographyConstants } from '../../../theme/constants';
import CodeIcon from '@mui/icons-material/Code';
import PaletteIcon from '@mui/icons-material/Palette';
import GroupIcon from '@mui/icons-material/Group';
import whoAmIImage from "../../../assets/images/who_am_i.png";

const useStyles = (theme: Theme) => ({
  section: {
    padding: {
      xs: "0px 16px",
      sm: "96px 32px",
      md: "0px 96px",
    },
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "24px",
    margin: 0
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
      xs: 120,
      sm: 140,
      md: 180
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
      xs: "24px",
      sm: "28px",
      md: "32px"
    },
    lineHeight: {
      xs: "24px",
      sm: "28px",
      md: "32px"
    },
    fontWeight: 700,
    textAlign: "center",
    color: "#000000",
  },
  label: {
    fontSize: {
      xs: "20px",
      sm: "24px",
      md: "28px"
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
      description: "Building robust, maintainable apps with clean architecture and thoughtful code. I focus on performance, structure, and clarity."
    },
    {
      icon: <PaletteIcon />,
      title: "Designer",
      description: "Designing user interfaces that are both intuitive and visually consistent. I care about aesthetics while prioritizing usability."
    },
    {
      icon: <GroupIcon />,
      title: "Manager",
      description: "Planning projects with clarity and intention. I love bringing structure to ideas and making sure everything runs smoothly."
    }
  ];

  return (
    <Box sx={{ 
      width: "100%",
      maxWidth: MaxWidths.content,
      mx: "auto",
      boxSizing: "border-box",
      marginTop: 18,
      marginBottom: 12,
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
          variant="h2" 
          align="center" 
          gutterBottom
          sx={{
            color: theme.palette.primary.main,
            ...TypographyConstants.h2,
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
                        ...TypographyConstants.body,
                        fontWeight: 700,
                        marginBottom: "2px",
                      }}>
                      {skill.title}
                    </Typography>
                  }
                  secondary={
                    <Typography 
                      sx={{
                        ...TypographyConstants.body,
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
              +5
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
