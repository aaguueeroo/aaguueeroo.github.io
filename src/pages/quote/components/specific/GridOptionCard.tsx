import React from 'react';
import * as MuiIcons from '@mui/icons-material';
import { QuestionOption } from '../../types';
import {
  InteractiveOptionCardLayout,
  InteractiveOptionCardLayoutProps,
} from '../common/InteractiveOptionCardLayout';
import { QUESTION_IDS } from '../../data/questionFlow';

interface GridOptionCardProps {
  option: QuestionOption;
  isSelected: boolean;
  onClick: (value: string) => void;
  disabled?: boolean;
  renderExtraContent?: InteractiveOptionCardLayoutProps['slots']['renderExtraContent'];
  questionId: string;
}

export const GridOptionCard: React.FC<GridOptionCardProps> = ({
  option,
  isSelected,
  onClick,
  disabled = false,
  renderExtraContent,
  questionId,
}) => {
  const IconComponent = (MuiIcons as any)[option.icon] || MuiIcons.Help;
  const isAppFeaturesQuestion = questionId === QUESTION_IDS.APP_FEATURES;

  const cardStyles = {
    m: 0,
    px: 0,
    py: isAppFeaturesQuestion ? 0 : 8,
  };

  return (
    <InteractiveOptionCardLayout
      ariaLabel={`${option.label}: ${option.description}`}
      isSelected={isSelected}
      disabled={disabled}
      onSelect={() => onClick(option.value)}
      slots={{
        renderIcon: () => <IconComponent />,
        renderTitle: () => option.label,
        renderDescription: () => option.description,
        renderExtraContent: renderExtraContent,
      }}
      contentSx={{ m: 0, p: 0 }}
      cardSx={cardStyles}
    />
  );
};
