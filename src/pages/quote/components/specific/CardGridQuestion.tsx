import React from 'react';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Question } from '../../types';
import { OptionCard } from '../common/OptionCard';
import { cardStagger } from '../../utils/animations';

interface CardGridQuestionProps {
  question: Question;
  selectedValues: string | string[];
  onSelect: (value: string) => void;
}

export const CardGridQuestion: React.FC<CardGridQuestionProps> = ({
  question,
  selectedValues,
  onSelect,
}) => {
  const selectedArray = Array.isArray(selectedValues)
    ? selectedValues
    : selectedValues
    ? [selectedValues]
    : [];

  const handleCardClick = (optionId: string) => {
    onSelect(optionId);
  };

  const isSelected = (optionId: string): boolean => {
    return selectedArray.includes(optionId);
  };

  if (!question.options) {
    return null;
  }

  const optionCount = question.options?.length || 0;
  
  // Calculate grid columns based on number of options (for sm and above)
  const getGridSize = () => {
    if (optionCount <= 2) return 6; // 2 columns for 1-2 items
    if (optionCount === 3) return 4; // 3 columns for 3 items
    if (optionCount === 4) return 3; // 4 columns for 4 items
    if (optionCount === 5) return 2.4; // 5 columns for 5 items
    return 2; // 6 columns for 6+ items
  };

  return (
    <motion.div
      variants={cardStagger.container}
      initial="initial"
      animate="animate"
      style={{ width: '100%' }}
    >
      <Grid container spacing={{ xs: 1.5, sm: 2, md: 3 }}>
        {question.options.map((option) => (
          <Grid
            item
            xs={12}
            sm={getGridSize()}
            key={option.id}
            sx={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch' }}
          >
            <motion.div 
              variants={cardStagger.item}
              style={{ width: '100%', display: 'flex' }}
            >
              <OptionCard
                option={option}
                isSelected={isSelected(option.value)}
                onClick={() => handleCardClick(option.value)}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

