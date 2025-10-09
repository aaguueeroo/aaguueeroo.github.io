import React, { useState } from 'react';
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

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setCharCount(newValue.length);
    onChange(newValue);
  };

  return (
    <motion.div
      variants={slideUp}
      initial="initial"
      animate="animate"
    >
      <Box
        sx={{
          maxWidth: '800px',
          mx: 'auto',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            p: 4,
            border: 1,
            borderColor: 'divider',
            borderRadius: 2,
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
                fontSize: '1rem',
                lineHeight: 1.6,
              },
            }}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 1,
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

