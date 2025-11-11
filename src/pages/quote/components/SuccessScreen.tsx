import React, { useCallback } from 'react';
import { Box, Typography, Container } from '@mui/material';
import { motion } from 'framer-motion';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { slideUp } from '../utils/animations';
import PrimaryButton from '../../../components/PrimaryButton';

interface SuccessScreenProps {
  onReset: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({ onReset }) => {
  const navigate = useNavigate();
  const handleGoHome = useCallback(() => {
    onReset();
    navigate('/');
  }, [navigate, onReset]);

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
            textAlign: 'center',
            maxWidth: { xs: 520, sm: 560, md: 600 },
            width: '100%',
            mx: 'auto',
            px: { xs: 3, sm: 4 },
            py: { xs: 6, sm: 7 },
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
                color: '#B76E79',
              }}
            />
          </motion.div>

          <Box>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                mb: 2,
                fontSize: { xs: '1.75rem', sm: '2.125rem', md: '2.5rem' },
              }}
            >
              Submission Successful
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: 'text.secondary',
                fontWeight: 400,
                mb: 4,
                fontSize: { xs: '1rem', sm: '1.0625rem', md: '1.125rem' },
                lineHeight: { xs: 1.5, sm: 1.55, md: 1.6 },
              }}
            >
              Thank you for sharing your project details.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'text.secondary',
                maxWidth: '600px',
                mx: 'auto',
                fontSize: { xs: '0.95rem', sm: '1rem', md: '1.05rem' },
                lineHeight: { xs: 1.6, sm: 1.65, md: 1.65 },
              }}
            >
              I will review your request and follow up quickly with the next steps. 
            </Typography>
          </Box>

          <Box
            sx={{
              mt: { xs: 4, sm: 5 },
            }}
          >
            <PrimaryButton
              onClick={handleGoHome}
              responsiveArrow
              arrowSize={{ xs: '1.125rem', sm: '1.5rem', md: '1.75rem' }}
            >
              Go to Home
            </PrimaryButton>
          </Box>
        </Box>
      </motion.div>
    </Container>
  );
};

