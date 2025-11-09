import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { QuestionOption } from '../../types';
import {
  InteractiveOptionCardLayout,
  InteractiveOptionCardLayoutProps,
} from '../common/InteractiveOptionCardLayout';

interface GridOptionCardProps {
  option: QuestionOption;
  isSelected: boolean;
  onClick: (value: string) => void;
  disabled?: boolean;
  renderExtraContent?: InteractiveOptionCardLayoutProps['slots']['renderExtraContent'];
}

export const GridOptionCard: React.FC<GridOptionCardProps> = ({
  option,
  isSelected,
  onClick,
  disabled = false,
  renderExtraContent,
}) => {
  const IconComponent = (MuiIcons as any)[option.icon] || MuiIcons.Help;

  return (
    <InteractiveOptionCardLayout
      ariaLabel={`${option.label}: ${option.description}`}
      isSelected={isSelected}
      disabled={disabled}
      onSelect={() => onClick(option.value)}
      contentSx={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        textAlign: 'left',
        gap: { xs: 1.5, sm: 1.75, md: 2 },
        p: { xs: 2, sm: 2.5, md: 3 },
      }}
      iconWrapperSx={{
        width: { xs: 48, sm: 52, md: 60 },
        height: { xs: 48, sm: 52, md: 60 },
        mb: { xs: 1, sm: 1.25, md: 1.5 },
      }}
      titleSx={{
        fontSize: { xs: '1rem', sm: '1.0625rem', md: '1.125rem' },
        lineHeight: { xs: 1.3, sm: 1.25, md: 1.2 },
        mb: { xs: 0.5, sm: 0.5, md: 0.75 },
      }}
      descriptionSx={{
        fontSize: { xs: '0.85rem', sm: '0.875rem', md: '0.9rem' },
      }}
      extraContentSx={{
        width: '100%',
      }}
      slots={{
        renderIcon: ({ isSelected: selected }) => (
          <IconComponent
            sx={{
              fontSize: { xs: 24, sm: 28, md: 34 },
              color: selected ? 'primary.contrastText' : 'primary.main',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
        ),
        renderTitle: () => option.label,
        renderDescription: () => option.description,
        renderExtraContent: renderExtraContent,
      }}
    />
  );
};

