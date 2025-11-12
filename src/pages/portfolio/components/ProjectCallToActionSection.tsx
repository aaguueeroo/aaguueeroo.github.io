import SendIcon from "@mui/icons-material/Send";
import { Box, Typography, useTheme } from "@mui/material";
import PrimaryButton from "../../../components/PrimaryButton";
import { ProjectCallToActionContent } from "../projects/projectContent.types";

type ProjectCallToActionSectionProps = {
  cta: ProjectCallToActionContent;
  onAction: (href: string) => void;
};

const ProjectCallToActionSection = ({
  cta,
  onAction,
}: ProjectCallToActionSectionProps) => {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        mb: 8,
        py: { xs: 12, md: 24 },
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4,
      }}
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ fontWeight: 600 }}
      >
        {cta.title}
      </Typography>
      {cta.description && (
        <Typography
          variant="body1"
          sx={{ maxWidth: "600px", lineHeight: 1.7, fontSize: "1rem" }}
        >
          {cta.description}
        </Typography>
      )}
      <PrimaryButton
        showArrow={false}
        endIcon={<SendIcon />}
        onClick={() => onAction(cta.buttonHref)}
        sx={{
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: theme.spacing(2, 12),
          display: "flex",
          alignItems: "center",
          gap: theme.spacing(1),
          transition: "all 0.3s ease",
          transform: "scale(1)",
          "&:hover": {
            boxShadow: "0 6px 8px rgba(0, 0, 0, 0.2)",
            transform: "scale(1.05)",
            bgcolor: theme.palette.primary.main,
          },
          "& .MuiSvgIcon-root": {
            color: "#CF8B7F",
            transition: "color 0.3s ease",
          },
          "&:hover .MuiSvgIcon-root": {
            color: "#212529",
          },
        }}
      >
        {cta.buttonText}
      </PrimaryButton>
    </Box>
  );
};

export default ProjectCallToActionSection;

