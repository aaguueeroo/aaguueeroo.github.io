import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
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
  isSubmitting?: boolean;
  nextLabel?: string;
  nextButtonTone?: 'default' | 'neutral';
}

const MotionButton = motion(Button);

export const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  canGoBack,
  canGoNext,
  isLastStep,
  onBack,
  onNext,
  onSubmit,
  isSubmitting = false,
  nextLabel,
  nextButtonTone = 'default',
}) => {
  const handleNext = () => {
    if (isLastStep && onSubmit) {
      onSubmit();
    } else {
      onNext();
    }
  };

  const getNextButtonText = () => {
    if (isSubmitting) {
      return 'Submitting...';
    }

    if (isLastStep) {
      return 'Submit';
    }

    return nextLabel || 'Continue';
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 2,
        width: '100%',
      }}
      role="group"
      aria-label="Form navigation"
    >
      {/* Back Button */}
      {canGoBack && (
        <MotionButton
          variant="text"
          size="large"
          startIcon={<ArrowBackIcon />}
          onClick={onBack}
          whileHover={buttonHover}
          whileTap={buttonTap}
          sx={{
            minWidth: { xs: 100, sm: 120 },
            px: { xs: 2, sm: 3 },
          }}
        >
          Back
        </MotionButton>
      )}

      {/* Next/Submit Button */}
      <MotionButton
        variant="contained"
        size="large"
        endIcon={
          isSubmitting ? (
            <CircularProgress size={20} color="inherit" />
          ) : isLastStep ? (
            <SendIcon />
          ) : (
            <ArrowForwardIcon />
          )
        }
        onClick={handleNext}
        disabled={!canGoNext || isSubmitting}
        whileHover={canGoNext && !isSubmitting ? buttonHover : undefined}
        whileTap={canGoNext && !isSubmitting ? buttonTap : undefined}
        sx={(theme) => ({
          minWidth: { xs: 120, sm: 140 },
          px: { xs: 3, sm: 4 },
          backgroundColor:
            nextButtonTone === 'neutral'
              ? theme.palette.grey[200]
              : undefined,
          color:
            nextButtonTone === 'neutral'
              ? theme.palette.text.primary
              : undefined,
          '&:hover': {
            backgroundColor:
              nextButtonTone === 'neutral'
                ? theme.palette.grey[300]
                : undefined,
          },
        })}
      >
        {getNextButtonText()}
      </MotionButton>
    </Box>
  );
};