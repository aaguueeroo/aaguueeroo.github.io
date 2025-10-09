import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { slideUp } from "../../utils/animations";

interface WelcomeScreenProps {
  title: string;
  description?: string;
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  title,
  description,
  onStart,
}) => {
  return (
    <motion.div variants={slideUp} initial="initial" animate="animate">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          gap: 4,
          maxWidth: "800px",
          mx: "auto",
          py: { xs: 4, md: 8 },
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
        >
          <RocketLaunchIcon
            sx={{
              fontSize: { xs: 80, md: 120 },
              color: "primary.main",
            }}
          />
        </motion.div>

        <Box>
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            {title}
          </Typography>
          {description && (
            <Typography
              variant="h6"
              sx={{
                color: "text.secondary",
                fontWeight: 400,
                maxWidth: "600px",
                mx: "auto",
                lineHeight: 1.6,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onStart}
            endIcon={<RocketLaunchIcon />}
            sx={{
              mt: 2,
              px: 6,
              py: 2,
              fontSize: "1.2rem",
              borderRadius: 3,
            }}
          >
            Get Started
          </Button>
        </motion.div>
      </Box>
    </motion.div>
  );
};

