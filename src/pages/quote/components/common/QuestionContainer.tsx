import React from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { questionTransition } from '../../utils/animations';

interface QuestionContainerProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  questionId: string; // Used as key for animations
}

export const QuestionContainer: React.FC<QuestionContainerProps> = ({
  title,
  description,
  children,
  questionId,
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={questionId}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={questionTransition}
        style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 2.5, sm: 3, md: 4 },
            height: '100%',
          }}
        >
          {/* Question Header */}
          <Box
            sx={{
              textAlign: 'center',
              width: '100%',
            }}
          >
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: { xs: 1, sm: 1.5, md: 2 },
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
              }}
            >
              {title}
            </Typography>
            {description && (
              <Typography
                variant="h6"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 400,
                  fontSize: { xs: '0.9375rem', sm: '1.1rem', md: '1.25rem' },
                  lineHeight: { xs: 1.4, sm: 1.5, md: 1.5 },
                }}
              >
                {description}
              </Typography>
            )}
          </Box>

          {/* Question Content */}
          <Box sx={{ width: '100%', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {children}
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

