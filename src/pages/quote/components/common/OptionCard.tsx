import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { QuestionOption } from '../../types';
import { InteractiveOptionCardLayout } from './InteractiveOptionCardLayout';

interface OptionCardProps {
  option: QuestionOption;
  isSelected: boolean;
  onClick: (optionId: string) => void;
  disabled?: boolean;
}

export const OptionCard: React.FC<OptionCardProps> = ({
  option,
  isSelected,
  onClick,
  disabled = false,
}) => {
  const IconComponent = (MuiIcons as any)[option.icon] || MuiIcons.Help;

  return (
    <InteractiveOptionCardLayout
      ariaLabel={`${option.label}: ${option.description}`}
      isSelected={isSelected}
      disabled={disabled}
      onSelect={() => onClick(option.id)}
      slots={{
        renderIcon: ({ isSelected: selected }) => (
          <IconComponent
            sx={{
              fontSize: { xs: 22, sm: 26, md: 32 },
              color: selected ? 'primary.contrastText' : 'primary.main',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          />
        ),
        renderTitle: () => option.label,
        renderDescription: () => option.description,
      }}
    />
  );
};