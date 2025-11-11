import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { keyframes } from '@mui/system';
import { ProgressInfo } from '../../types';

interface ProgressIndicatorProps {
  progress: ProgressInfo;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
}) => {
  const { currentStep, totalSteps } = progress;
  const progressFraction =
    totalSteps === 0 ? 0 : Math.min(currentStep / totalSteps, 1);

  const shimmerAnimation = keyframes`
    from {
      background-position: 200% 50%;
    }
    to {
      background-position: 0% 50%;
    }
  `;

  return (
    <Box
      sx={{
        position: 'relative',
        width: {
          xs: 'min(100%, 480px)',
          sm: 'clamp(150px, 10vw, 260px)',
        },
        height: 16,
        borderRadius: 999,
        overflow: 'hidden',
        background: 'linear-gradient(90deg, rgba(183,110,121,0.12) 0%, rgba(222,173,178,0.08) 50%, rgba(250,227,224,0.12) 100%)',
        boxShadow: 'inset 0 0 0 1px rgba(183, 110, 121, 0.22)',
      }}
      role="progressbar"
      aria-valuenow={currentStep}
      aria-valuemin={1}
      aria-valuemax={totalSteps}
      aria-label={`Step ${currentStep} of ${totalSteps}`}
    >
      <Box
        component={motion.div}
        initial={{ width: 0 }}
        animate={{ width: `${progressFraction * 100}%` }}
        transition={{
          type: 'spring',
          stiffness: 160,
          damping: 18,
          mass: 0.65,
        }}
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          borderRadius: 'inherit',
          background:
            'linear-gradient(90deg, rgba(248, 204, 198, 0.9) 0%, rgba(237, 170, 166, 0.7) 40%, rgba(209, 136, 144, 0.45) 70%, rgba(209, 136, 144, 0) 100%)',
          boxShadow: '0 6px 14px rgba(183, 110, 121, 0.2)',
          backgroundSize: '220% 100%',
          animation: `${shimmerAnimation} 2.5s ease-in-out infinite`,
          backdropFilter: 'blur(0.5px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background:
            'linear-gradient(90deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 55%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          borderRadius: 'inherit',
          background:
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.28), transparent 55%), radial-gradient(circle at 80% 50%, rgba(209,144,152,0.18), transparent 60%)',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};

