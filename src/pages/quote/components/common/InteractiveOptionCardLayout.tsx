import React from 'react';
import { Card, CardContent, Box, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { cardHover, cardTap } from '../../utils/animations';

const MotionCard = motion(Card);

interface InteractiveOptionCardLayoutState {
  isSelected: boolean;
  disabled: boolean;
}

interface InteractiveOptionCardLayoutSlots {
  renderIcon: (state: InteractiveOptionCardLayoutState) => React.ReactNode;
  renderTitle: (state: InteractiveOptionCardLayoutState) => React.ReactNode;
  renderDescription?: (state: InteractiveOptionCardLayoutState) => React.ReactNode;
  renderExtraContent?: (state: InteractiveOptionCardLayoutState) => React.ReactNode;
}

export interface InteractiveOptionCardLayoutProps {
  ariaLabel: string;
  isSelected: boolean;
  disabled?: boolean;
  onSelect?: () => void;
  slots: InteractiveOptionCardLayoutSlots;
  cardSx?: SxProps<Theme>;
  contentSx?: SxProps<Theme>;
  iconWrapperSx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  descriptionSx?: SxProps<Theme>;
  extraContentSx?: SxProps<Theme>;
}

const combineSx = (base: SxProps<Theme>, override?: SxProps<Theme>): SxProps<Theme> => {
  return override ? ([base, override] as SxProps<Theme>) : base;
};

export const InteractiveOptionCardLayout: React.FC<InteractiveOptionCardLayoutProps> = ({
  ariaLabel,
  isSelected,
  disabled = false,
  onSelect,
  slots,
  cardSx,
  contentSx,
  iconWrapperSx,
  titleSx,
  descriptionSx,
  extraContentSx,
}) => {
  const state: InteractiveOptionCardLayoutState = {
    isSelected,
    disabled,
  };

  const handleClick = () => {
    if (disabled || !onSelect) {
      return;
    }
    onSelect();
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled || !onSelect) {
      return;
    }
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onSelect();
    }
  };

  const baseCardSx: SxProps<Theme> = {
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    backgroundColor: isSelected ? 'primary.light' : 'background.paper',
    opacity: disabled ? 0.5 : 1,
    boxShadow: isSelected
      ? '0 4px 12px rgba(0, 0, 0, 0.12)'
      : '0 2px 8px rgba(0, 0, 0, 0.08)',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
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
  };
  
  const baseContentSx: SxProps<Theme> = {
    height: '100%',
    display: 'flex',
    flexDirection: { xs: 'row', sm: 'column' },
    alignItems: { xs: 'center', sm: 'center' },
    justifyContent: { xs: 'flex-start', sm: 'center' },
    textAlign: { xs: 'left', sm: 'center' },
    gap: { xs: 1.5, sm: 1.25, md: 1.5 },
    p: { xs: 2, sm: 2.5, md: 3 },
    flex: 1,
  };

  const baseIconWrapperSx: SxProps<Theme> = {
    width: { xs: 44, sm: 48, md: 56 },
    height: { xs: 44, sm: 48, md: 56 },
    flexShrink: 0,
    borderRadius: '50%',
    backgroundColor: isSelected ? 'primary.main' : 'primary.light',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
  };

  const baseTitleSx: SxProps<Theme> = {
    fontWeight: 600,
    color: isSelected ? 'primary.main' : 'text.primary',
    transition: 'color 0.2s ease',
    fontSize: { xs: '0.9375rem', sm: '1rem', md: '1.125rem' },
    lineHeight: { xs: 1.3, sm: 1.2, md: 1.2 },
    mb: { xs: 0.25, sm: 0, md: 0 },
  };

  const baseDescriptionSx: SxProps<Theme> = {
    color: 'text.secondary',
    lineHeight: { xs: 1.4, sm: 1.3, md: 1.3 },
    fontSize: { xs: '0.8125rem', sm: '0.813rem', md: '0.875rem' },
  };

  const baseExtraContentSx: SxProps<Theme> = {
    mt: { xs: 1, sm: 1 },
    display: 'flex',
    flexDirection: 'column',
    gap: 1,
  };

  const cardStyles = combineSx(baseCardSx, cardSx);
  const contentStyles = combineSx(baseContentSx, contentSx);
  const iconWrapperStyles = combineSx(baseIconWrapperSx, iconWrapperSx);
  const titleStyles = combineSx(baseTitleSx, titleSx);
  const descriptionStyles = combineSx(baseDescriptionSx, descriptionSx);
  const extraContentStyles = combineSx(baseExtraContentSx, extraContentSx);

  return (
    <MotionCard
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
      role="button"
      aria-pressed={isSelected}
      aria-label={ariaLabel}
      whileHover={!disabled ? cardHover : undefined}
      whileTap={!disabled ? cardTap : undefined}
      sx={cardStyles}
    >
      <CardContent
        sx={contentStyles}
      >
        <Box
          sx={iconWrapperStyles}
        >
          {slots.renderIcon(state)}
        </Box>

        <Box sx={{ flex: { xs: 1, sm: 'initial' }, minWidth: 0, width: '100%' }}>
          <Typography sx={titleStyles}>
            {slots.renderTitle(state)}
          </Typography>

          {slots.renderDescription && (
            <Typography sx={descriptionStyles}>
              {slots.renderDescription(state)}
            </Typography>
          )}

          {slots.renderExtraContent && (
            <Box sx={extraContentStyles}>
              {slots.renderExtraContent(state)}
            </Box>
          )}
        </Box>
      </CardContent>
    </MotionCard>
  );
};

