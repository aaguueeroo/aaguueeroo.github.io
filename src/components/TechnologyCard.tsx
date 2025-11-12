import { Card, CardContent, Typography, Box } from "@mui/material";
interface TechnologyCardProps {
  name: string;
  category: string;
  description: string;
  logo?: string;
  chips?: string[];
  color?: string;
}

const TechnologyCard = ({
  name,
  category,
  description,
  logo,
  chips = [],
  color = "#1976D2",
}: TechnologyCardProps) => {
  // Technology icons mapping
  const renderCustomIcon = (src: string, alt: string): JSX.Element => (
    <Box
      component="img"
      src={src}
      alt={alt}
      sx={{
        width: 32,
        height: 32,
        filter: "brightness(0) invert(1)",
        objectFit: "contain"
      }}
    />
  );
  const getTechnologyIcon = (techName: string) => {
    const iconMap: { [key: string]: JSX.Element } = {
      "Cursor AI": renderCustomIcon(
        "https://img.icons8.com/?size=512&id=DiGZkjCzyZXn&format=png",
        "Cursor AI"
      ),
      Flutter: renderCustomIcon(
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/flutter.svg",
        "Flutter"
      ),
      Supabase: renderCustomIcon(
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/supabase.svg",
        "Supabase"
      ),
      PostgreSQL: renderCustomIcon(
        "https://cdn.jsdelivr.net/npm/simple-icons@v13/icons/postgresql.svg",
        "PostgreSQL"
      )
    };
    return iconMap[techName] || renderCustomIcon(
      "https://img.icons8.com/?size=512&id=DiGZkjCzyZXn&format=png",
      "Default"
    );
  };

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 0.2,
        px: 4,
        py: 2,
        backgroundColor: "#1a1a1a", // Very dark background (close to black)
        border: `2px solid ${color}`, // Medium thickness border with original colors
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)", // Added shadow
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.4)",
        },
      }}
    >
      <CardContent
        sx={{ flex: 1, display: "flex", flexDirection: "column", p: 0 }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
            minHeight: 50,
          }}
        >
          {getTechnologyIcon(name)}
        </Box>

        {/* Technology Name */}
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 2,
            fontSize: "1rem",
            fontWeight: 600,
            color: "white",
          }}
        >
          {name}
        </Typography>

        {/* Chips */}
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, justifyContent: "center" }}>
          {chips.map((chip, index) => (
            <Box
              key={index}
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: "20px",
                border: "1px solid white",
                backgroundColor: "transparent",
                fontSize: "0.75rem",
                fontWeight: 500,
                color: "white",
                textAlign: "center",
              }}
            >
              {chip}
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default TechnologyCard;
