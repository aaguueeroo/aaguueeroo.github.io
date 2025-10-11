import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { motion } from 'framer-motion';
import * as MuiIcons from '@mui/icons-material';
import { QuestionOption } from '../../types';
import { cardHover, cardTap } from '../../utils/animations';

interface OptionCardProps {
  option: QuestionOption;
  isSelected: boolean;
  onClick: (optionId: string) => void;
  disabled?: boolean;
}

const MotionCard = motion(Card);

export const OptionCard: React.FC<OptionCardProps> = ({
  option,
  isSelected,
  onClick,
  disabled = false,
}) => {
  // Dynamically get the icon component
  const IconComponent = (MuiIcons as any)[option.icon] || MuiIcons.Help;

  const handleClick = () => {
    if (!disabled) {
      onClick(option.id);
    }
  };

  return (
    <MotionCard
      onClick={handleClick}
      whileHover={!disabled ? cardHover : undefined}
      whileTap={!disabled ? cardTap : undefined}
      sx={{
        cursor: disabled ? 'not-allowed' : 'pointer',
        border: 'none',
        backgroundColor: isSelected ? 'primary.light' : 'background.paper',
        opacity: disabled ? 0.5 : 1,
        boxShadow: isSelected 
          ? '0 4px 12px rgba(0, 0, 0, 0.12)' 
          : '0 2px 8px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          boxShadow: !disabled 
            ? isSelected 
              ? '0 6px 16px rgba(0, 0, 0, 0.14)' 
              : '0 4px 12px rgba(0, 0, 0, 0.12)' 
            : undefined,
          transform: !disabled ? 'scale(1.03)' : undefined,
          transformOrigin: 'center center',
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: { xs: 'row', sm: 'column' },
          alignItems: { xs: 'center', sm: 'center' },
          justifyContent: { xs: 'flex-start', sm: 'center' },
          textAlign: { xs: 'left', sm: 'center' },
          gap: { xs: 1.5, sm: 1.25, md: 1.5 },
          p: 0,
          flex: 1,
          '&:last-child': {
            pb: 0,
          },
        }}
      >
        <Box
          sx={{
            width: { xs: 44, sm: 48, md: 56 },
            height: { xs: 44, sm: 48, md: 56 },
            flexShrink: 0,
            borderRadius: '50%',
            backgroundColor: isSelected ? 'primary.main' : 'primary.light',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <IconComponent
            sx={{
              fontSize: { xs: 22, sm: 26, md: 32 },
              color: isSelected ? 'primary.contrastText' : 'primary.main',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
        </Box>

        <Box sx={{ flex: { xs: 1, sm: 'initial' }, minWidth: 0 }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: isSelected ? 'primary.main' : 'text.primary',
              transition: 'color 0.2s ease',
              fontSize: { xs: '0.9375rem', sm: '1rem', md: '1.125rem' },
              lineHeight: { xs: 1.3, sm: 1.2, md: 1.2 },
              mb: { xs: 0.25, sm: 0, md: 0 },
            }}
          >
            {option.label}
          </Typography>

          <Typography
            sx={{
              color: 'text.secondary',
              lineHeight: { xs: 1.4, sm: 1.3, md: 1.3 },
              fontSize: { xs: '0.8125rem', sm: '0.813rem', md: '0.875rem' },
            }}
          >
            {option.description}
          </Typography>
        </Box>
      </CardContent>
    </MotionCard>
  );
};

