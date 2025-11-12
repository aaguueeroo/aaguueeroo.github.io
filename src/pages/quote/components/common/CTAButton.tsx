import React from 'react';
import { Button } from '@mui/material';
import { motion } from 'framer-motion';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { keyframes } from '@mui/system';

interface CTAButtonProps {
  onClick: () => void;
  disabled?: boolean;
  text?: string;
}

// Arrow animation - moves left and right
const arrowFloat = keyframes`
  0%, 100% {
    transform: translateX(0px);
  }
  50% {
    transform: translateX(4px);
  }
`;

// Button pulse animation - grows and shrinks
const buttonPulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`;

const MotionButton = motion(Button);

const BUTTON_BACKGROUND = '#0B0B0F';
const BUTTON_HOVER_BACKGROUND = '#1A1A20';
const ROSE_GOLD = '#B76E79';

export const CTAButton: React.FC<CTAButtonProps> = ({
  onClick,
  disabled = false,
  text = 'Start Building',
}) => {
  return (
    <MotionButton
      variant="contained"
      size="large"
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? undefined : { scale: 1.08 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      endIcon={
        <ArrowForwardIcon
          sx={(theme) => ({
            color: disabled ? theme.palette.grey[400] : ROSE_GOLD,
            animation: disabled ? 'none' : `${arrowFloat} 1.5s ease-in-out infinite`,
          })}
        />
      }
      sx={(theme) => ({
        minWidth: { xs: 220, sm: 240 },
        px: { xs: 5.25, sm: 8 },
        py: { xs: 2.15, sm: 2.45 },
        fontSize: { xs: '1.125rem', sm: '1.5rem' },
        fontWeight: 600,
        borderRadius: 3,
        backgroundColor: disabled ? theme.palette.grey[600] : BUTTON_BACKGROUND,
        color: theme.palette.common.white,
        animation: disabled ? 'none' : `${buttonPulse} 2.5s ease-in-out infinite`,
        boxShadow: disabled
          ? 'none'
          : '0 12px 28px rgba(11, 11, 15, 0.35)',
        transition: 'all 0.3s ease',
        '&:hover': {
          backgroundColor: disabled ? theme.palette.grey[600] : BUTTON_HOVER_BACKGROUND,
          boxShadow: disabled ? 'none' : '0 16px 32px rgba(11, 11, 15, 0.45)',
          animation: 'none',
        },
        '&:active': {
          backgroundColor: disabled ? theme.palette.grey[600] : BUTTON_HOVER_BACKGROUND,
          boxShadow: disabled ? 'none' : '0 8px 18px rgba(11, 11, 15, 0.4)',
        },
      })}
    >
      {text}
    </MotionButton>
  );
};



