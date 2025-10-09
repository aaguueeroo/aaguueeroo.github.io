import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { ProgressInfo } from '../../types';

interface ProgressIndicatorProps {
  progress: ProgressInfo;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
}) => {
  const { currentStep, totalSteps } = progress;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1,
      }}
    >
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber === currentStep;
        const isPast = stepNumber < currentStep;

        return (
          <motion.div
            key={stepNumber}
            initial={{ scale: 0.8, opacity: 0.3 }}
            animate={{
              scale: isActive ? 1.2 : 1,
              opacity: isActive || isPast ? 1 : 0.3,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
          >
            <Box
              sx={{
                width: isActive ? 12 : 8,
                height: isActive ? 12 : 8,
                borderRadius: '50%',
                backgroundColor: isActive || isPast ? 'primary.main' : 'grey.300',
                transition: 'all 0.3s ease',
              }}
            />
          </motion.div>
        );
      })}
    </Box>
  );
};

