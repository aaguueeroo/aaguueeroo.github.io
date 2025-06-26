// Example color palette (rose/white shades)
import { Box, Typography } from "@mui/material";
import { MaxWidths } from "../../../theme/constants";
import daisiesImage from "../../../assets/images/fun facts/daisies-optimized.jpeg";
import oreoImage from "../../../assets/images/fun facts/oreo-optimized.png";
import { Typography as TypographyConstants } from "../../../theme/constants";

const colors = [
  "#FFF6F4", // lightest rose
  "#F6EBE9", // lighter rose
  "#F2D6D0", // light rose
  "#E4B4AB", // medium rose
  "#CF8B7F", // main rose (darkest)
  "rgba(207,139,127,0.15)", // rose with opacity
  "#F8E3DE", // extra light rose
  "#F9F6F5", // almost white
];

const funFacts = [
  "I don't drink coffee. Chocomilk is my go-to breakfast. Nothing beats it!",
  "Nighttime is my favorite part of the day. It's when everything is quiet and I can fully dive into my projects.",
  "I love the countryside. I grew up surrounded by cows and open fields.",
  "Astronomy has always fascinated me. The night sky never stops inspiring me.",
  "My cat Oreo is adorable, and a little pirate. She only has one eye.",
  "I'm into history novels and horror films."
];

const containerData = [
  { text: funFacts[0], style: { gridRow: "1 / 2", gridColumn: "1 / 2", background: colors[0] } },
  { text: funFacts[1], style: { gridRow: "1 / 3", gridColumn: "2 / 3", background: colors[1], alignItems: "flex-start", justifyContent: "flex-start" }, type: "long-vertical" },
  { text: funFacts[2], style: { gridRow: "1 / 2", gridColumn: "3 / 4", background: colors[2] } },
  { text: funFacts[3], style: { gridRow: "1 / 2", gridColumn: "4 / 5", background: colors[0] } },
  { 
    text: funFacts[4], 
    style: { gridRow: "2 / 4", gridColumn: "1 / 2", background: colors[4], color: "#fff" }, 
    type: "split-image"
  },
  { style: { gridRow: "2 / 4", gridColumn: "3 / 5", backgroundImage: `url(${daisiesImage})`, backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" } },
  { text: funFacts[5], style: { gridRow: "3 / 4", gridColumn: "2 / 3", background: colors[5], alignItems: "flex-start", justifyContent: "flex-start" } },
];

const useStyles = () => ({
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
  },
});

export const BeyondDevelopment = () => {
  const classes = useStyles();

  return (
    <Box
      sx={{
        ...classes.section,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: { xs: 0, sm: 24, md: 32 },
        marginTop: { xs: 12, sm: 0, md: 28},
      }}
    >
      <div style={{ maxWidth: MaxWidths.content, width: "100%", margin: "0 auto" }}>
        <h2 style={{
          fontSize: "2.7rem",
          color: "#CF8B7F",
          fontWeight: 700,
          marginBottom: 32,
          textAlign: "center",
          lineHeight: 1.1,
          fontFamily: "Golos Text, sans-serif",
        }}>Beyond work</h2>
        <div className="beyond-development-grid" style={{ gridTemplateRows: 'repeat(3, 1fr)' }}>
          {containerData.map((item, idx) => {
            if (item.type === "split-image") {
              return (
                <div
                  key={idx}
                  className="beyond-development-cell"
                  style={{ ...item.style, display: 'flex', flexDirection: 'column', padding: 0, overflow: 'hidden' }}
                >
                  <Typography className="bdc-text" sx={{ 
                    padding: 20, 
                    flex: '0 0 auto', 
                    color: item.style.color,
                    ...TypographyConstants.body
                  }}>
                    {item.text}
                  </Typography>
                  <Box sx={{ 
                    width: '100%', 
                    flex: '1 1 auto', 
                    display: 'flex', 
                    alignItems: 'stretch', 
                    justifyContent: 'stretch', 
                    padding: 0, 
                    margin: 0, 
                    marginBottom: '-20px',
                    maxHeight: { xs: '200px', sm: '200px', md: 'none' }
                  }}>
                    <img src={oreoImage} alt="cat" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block', padding: 0, margin: 0, borderBottomLeftRadius: 24, borderBottomRightRadius: 24 }} />
                  </Box>
                </div>
              );
            }
            if (item.type === "markers-with-image") {
              return (
                <div
                  key={idx}
                  className="beyond-development-cell"
                  style={{ ...item.style, position: 'relative' }}
                >
                  <Typography className="bdc-text" sx={{ 
                    color: item.style.color || undefined,
                    ...TypographyConstants.body
                  }}>
                    {item.text}
                  </Typography>
                  <div style={{ 
                    position: 'absolute', 
                    bottom: '20px', 
                    right: '36px', 
                    width: '55%', 
                    height: '55%', 
                    padding: 0, 
                    margin: 0 
                  }}>
                  </div>
                </div>
              );
            }
            return (
              <div
                key={idx}
                className={
                  item.type === "long-horizontal"
                    ? "beyond-development-cell long-horizontal"
                    : item.type === "long-vertical"
                    ? "beyond-development-cell long-vertical"
                    : "beyond-development-cell"
                }
                style={{ ...item.style }}
              >
                <Typography className="bdc-text" sx={{ 
                  color: item.style.color || undefined,
                  ...TypographyConstants.body
                }}>
                  {item.text}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </Box>
  );
};