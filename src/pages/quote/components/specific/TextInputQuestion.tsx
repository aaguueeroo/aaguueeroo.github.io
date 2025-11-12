import React, { useState, useCallback } from 'react';
import { Box, TextField, Typography, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Question } from '../../types';
import { slideUp } from '../../utils/animations';

interface TextInputQuestionProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
}

export const TextInputQuestion: React.FC<TextInputQuestionProps> = ({
  question,
  value,
  onChange,
}) => {
  const maxLength = question.validation?.maxLength || 2000;
  const [charCount, setCharCount] = useState(value?.length || 0);

  const handleChange = useCallback((event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setCharCount(newValue.length);
    onChange(newValue);
  }, [onChange]);

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate="animate"
    >
      <Box
        sx={{
          maxWidth: '900px',
          mx: 'auto',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4, md: 5 },
            border: 'none',
            boxShadow: 'none',
            backgroundColor: 'transparent',
          }}
        >
          <TextField
            fullWidth
            multiline
            rows={8}
            value={value || ''}
            onChange={handleChange}
            placeholder="Share details about your project, goals, target audience, or any specific requirements..."
            inputProps={{
              maxLength: maxLength,
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                fontSize: { xs: '0.9375rem', sm: '1rem', md: '1rem' },
                lineHeight: 1.6,
                borderRadius: 0.5,
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'divider',
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: { xs: 1, sm: 1.5, md: 1.5 },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: charCount > maxLength * 0.9 ? 'warning.main' : 'text.secondary',
              }}
            >
              {charCount} / {maxLength}
            </Typography>
          </Box>
        </Paper>
      </Box>
    </motion.div>
  );
};