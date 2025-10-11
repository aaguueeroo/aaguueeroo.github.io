import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { Question, CompositeAnswer } from '../../types';
import { OptionCard } from '../common/OptionCard';
import { cardStagger } from '../../utils/animations';

interface CompositeQuestionProps {
  question: Question;
  selectedValues: CompositeAnswer;
  onSelect: (subQuestionId: string, value: string) => void;
}

export const CompositeQuestion: React.FC<CompositeQuestionProps> = ({
  question,
  selectedValues,
  onSelect,
}) => {
  if (!question.subQuestions) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {question.subQuestions.map((subQuestion, index) => (
        <motion.div
          key={subQuestion.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <Box>
            {/* Sub-question Label */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                mb: { xs: 2, sm: 2.5, md: 3 },
                textAlign: 'center',
                fontSize: { xs: '1.125rem', sm: '1.25rem', md: '1.5rem' },
              }}
            >
              {subQuestion.label}
            </Typography>

            {/* Options Grid */}
            <motion.div
              variants={cardStagger.container}
              initial="initial"
              animate="animate"
              style={{ width: '100%' }}
            >
              <Grid container spacing={{ xs: 1.5, sm: 2, md: 0 }} alignItems="stretch">
                {subQuestion.options.map((option) => {
                  const optionCount = subQuestion.options.length;
                  const getGridSize = () => {
                    if (optionCount <= 2) return 6;
                    if (optionCount === 3) return 4;
                    if (optionCount === 4) return 3;
                    if (optionCount === 5) return 2.4;
                    return 4; // 3 columns for 6+ items (2 rows)
                  };

                  return (
                    <Grid
                      item
                      xs={12}
                      sm={getGridSize()}
                      key={option.id}
                      sx={{ display: 'flex' }}
                    >
                      <motion.div 
                        variants={cardStagger.item}
                        style={{ width: '100%', height: '100%', display: 'flex' }}
                      >
                        <OptionCard
                          option={option}
                          isSelected={selectedValues[subQuestion.id] === option.value}
                          onClick={() => onSelect(subQuestion.id, option.value)}
                        />
                      </motion.div>
                    </Grid>
                  );
                })}
              </Grid>
            </motion.div>
          </Box>
        </motion.div>
      ))}
    </Box>
  );
};

