import React from 'react';
import { Box, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SendIcon from '@mui/icons-material/Send';
import { buttonHover, buttonTap } from '../../utils/animations';

interface NavigationButtonsProps {
  canGoBack: boolean;
  canGoNext: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit?: () => void;
}

const MotionButton = motion(Button);

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  canGoBack,
  canGoNext,
  isLastStep,
  onBack,
  onNext,
  onSubmit,
}) => {
  const handleNext = () => {
    if (isLastStep && onSubmit) {
      onSubmit();
    } else {
      onNext();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
        {/* Back Button */}
        {canGoBack ? (
          <MotionButton
            variant="text"
            size="large"
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
            whileHover={buttonHover}
            whileTap={buttonTap}
            sx={{
              minWidth: 120,
            }}
          >
            Back
          </MotionButton>
        ) : (
          <Box sx={{ minWidth: 120 }} /> // Spacer
        )}

        {/* Next/Submit Button */}
        <MotionButton
          variant="contained"
          size="large"
          endIcon={isLastStep ? <SendIcon /> : <ArrowForwardIcon />}
          onClick={handleNext}
          disabled={!canGoNext}
          whileHover={canGoNext ? buttonHover : undefined}
          whileTap={canGoNext ? buttonTap : undefined}
          sx={{
            minWidth: 140,
          }}
        >
          {isLastStep ? 'Submit' : 'Continue'}
        </MotionButton>
      </Box>
  );
};

