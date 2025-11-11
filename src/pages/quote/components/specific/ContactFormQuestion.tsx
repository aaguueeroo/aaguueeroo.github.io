import React, { useState, useCallback } from 'react';
import { Box, TextField, Grid, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { ContactAnswer } from '../../types';
import { slideUp, cardStagger } from '../../utils/animations';

interface ContactFormQuestionProps {
  value: ContactAnswer;
  onChange: (value: ContactAnswer) => void;
}

export const ContactFormQuestion: React.FC<ContactFormQuestionProps> = ({
  value,
  onChange,
}) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputTypographySx = {
    '& .MuiOutlinedInput-root': {
      fontSize: { xs: '0.95rem', sm: '1rem', md: '1.2rem' },
      lineHeight: 1.5,
    },
  };

  const inputSlotProps = {
    inputLabel: {
      sx: {
        fontSize: { xs: '0.8rem', sm: '0.85rem', md: '1rem' },
        fontWeight: 500,
      },
    },
  };

  const handleFieldChange = useCallback((field: keyof ContactAnswer, fieldValue: string) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });

    // Clear error when user starts typing
    setErrors((prev) => {
      if (!prev[field]) {
        return prev;
      }

      const updatedErrors = { ...prev };
      delete updatedErrors[field];
      return updatedErrors;
    });
  }, [value, onChange]);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = useCallback(() => {
    if (value?.email && !validateEmail(value.email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address',
      }));
    }
  }, [value?.email]);

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
          <motion.div
            variants={cardStagger.container}
            initial="initial"
            animate="animate"
          >
            <Grid container spacing={{ xs: 2.5, sm: 3, md: 3.5 }}>
              {/* Name Field */}
              <Grid item xs={12} sm={6}>
                <motion.div variants={cardStagger.item}>
                  <TextField
                    fullWidth
                    required
                    label="Full Name"
                    value={value?.name || ''}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    error={!!errors.name}
                    helperText={errors.name}
                    placeholder="John Doe"
                    autoComplete="name"
                    sx={inputTypographySx}
                    slotProps={inputSlotProps}
                  />
                </motion.div>
              </Grid>

              {/* Email Field */}
              <Grid item xs={12} sm={6}>
                <motion.div variants={cardStagger.item}>
                  <TextField
                    fullWidth
                    required
                    label="Email Address"
                    type="email"
                    value={value?.email || ''}
                    onChange={(e) => handleFieldChange('email', e.target.value)}
                    onBlur={handleEmailBlur}
                    error={!!errors.email}
                    helperText={errors.email}
                    placeholder="john@example.com"
                    autoComplete="email"
                    sx={inputTypographySx}
                    slotProps={inputSlotProps}
                  />
                </motion.div>
              </Grid>

              {/* Phone Field */}
              <Grid item xs={12} sm={6}>
                <motion.div variants={cardStagger.item}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    type="tel"
                    value={value?.phone || ''}
                    onChange={(e) => handleFieldChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                    autoComplete="tel"
                    sx={inputTypographySx}
                    slotProps={inputSlotProps}
                  />
                </motion.div>
              </Grid>

              {/* Company Field */}
              <Grid item xs={12} sm={6}>
                <motion.div variants={cardStagger.item}>
                  <TextField
                    fullWidth
                    label="Company (Optional)"
                    value={value?.company || ''}
                    onChange={(e) => handleFieldChange('company', e.target.value)}
                    placeholder="Acme Inc."
                    autoComplete="organization"
                    sx={inputTypographySx}
                    slotProps={inputSlotProps}
                  />
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Paper>
      </Box>
    </motion.div>
  );
};

