import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import { slideUp } from "../../utils/animations";

interface WelcomeScreenProps {
  title: string;
  description?: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  title,
  description,
}) => {
  return (
    <motion.div 
      variants={slideUp} 
      initial="initial" 
      animate="animate"
      style={{ height: '100%', display: 'flex' }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          width: "100%",
          height: "100%",
          minHeight: { xs: '300px', sm: '350px', md: '400px' },
        }}
      >
        {/* Content Container - Aligned to Bottom */}
        <Box
          sx={{
            maxWidth: { xs: '100%', sm: '100%', md: '70%' },
          }}
        >
          {/* Icon */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              mb: { xs: 3, sm: 4, md: 5 },
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
                  fontSize: { xs: 72, sm: 88, md: 104 },
                  color: "primary.main",
                }}
              />
            </motion.div>
          </Box>

          {/* Text */}
          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: { xs: 2, sm: 2.5, md: 3 },
                fontSize: { xs: "1.75rem", sm: "2.5rem", md: "3.5rem" },
                textAlign: "left",
                lineHeight: { xs: 1.2, sm: 1.2, md: 1.2 },
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
                  lineHeight: { xs: 1.5, sm: 1.6, md: 1.6 },
                  fontSize: { xs: "0.9375rem", sm: "1.0625rem", md: "1.25rem" },
                  textAlign: "left",
                }}
              >
                {description}
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};