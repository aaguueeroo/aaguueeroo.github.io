import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { slideUp } from '../utils/animations';

interface SuccessScreenProps {
  onReset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onReset }) => {
  return (
    <Container maxWidth="md">
      <motion.div
        variants={slideUp}
        initial="initial"
        animate="animate"
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            py: 8,
            gap: 4,
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 15,
              delay: 0.2,
            }}
          >
            <CheckCircleOutlineIcon
              sx={{
                fontSize: 120,
                color: 'success.main',
              }}
            />
          </motion.div>

          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '2rem', md: '3rem' },
              }}
            >
              Thank You!
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                fontWeight: 400,
                mb: 4,
              }}
            >
              Your quote request has been received successfully.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
              }}
            >
              I'll review your request and get back to you within 24 hours with a detailed proposal. 
              Check your email for a confirmation message.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            size="large"
            onClick={onReset}
            sx={{ mt: 2 }}
          >
            Submit Another Quote
          </Button>
        </Box>
      </motion.div>
    </Container>
  );
};

