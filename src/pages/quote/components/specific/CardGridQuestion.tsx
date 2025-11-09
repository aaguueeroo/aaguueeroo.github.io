import React from 'react';
import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Question } from '../../types';
import { GridOptionCard } from './GridOptionCard';
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

  const optionCount = question.options.length;

  const getGridItemSizes = () => {
    if (optionCount === 1) {
      return { xs: 12, sm: 12, md: 8, lg: 6 };
    }

    if (optionCount === 2) {
      return { xs: 12, sm: 6, md: 5, lg: 4 };
    }

    if (optionCount === 3) {
      return { xs: 12, sm: 6, md: 4, lg: 4 };
    }

    if (optionCount === 4) {
      return { xs: 12, sm: 6, md: 3, lg: 3 };
    }

    if (optionCount === 5) {
      return { xs: 12, sm: 6, md: 4, lg: 3 };
    }

    return { xs: 12, sm: 6, md: 4, lg: 3 };
  };

  const gridItemSizes = getGridItemSizes();

  return (
    <motion.div
      variants={cardStagger.container}
      initial="initial"
      animate="animate"
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, sm: 2.5, md: 3 }}
        alignItems="stretch"
        columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
        sx={{
          flex: 1,
          width: '100%',
          alignContent: 'stretch',
        }}
      >
        {question.options.map((option) => (
          <Grid
            item
            xs={12}
            sm={gridItemSizes.sm}
            md={gridItemSizes.md}
            lg={gridItemSizes.lg}
            key={option.id}
            sx={{ display: 'flex', width: '100%' }}
          >
            <motion.div
              variants={cardStagger.item}
              style={{ width: '100%', height: '100%', display: 'flex', flex: 1 }}
            >
              <GridOptionCard
                option={option}
                isSelected={isSelected(option.value)}
                onClick={handleCardClick}
              />
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </motion.div>
  );
};

