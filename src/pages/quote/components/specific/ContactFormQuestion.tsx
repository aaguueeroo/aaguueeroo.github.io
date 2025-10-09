import React, { useState } from 'react';
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

  const handleFieldChange = (field: keyof ContactAnswer, fieldValue: string) => {
    onChange({
      ...value,
      [field]: fieldValue,
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailBlur = () => {
    if (value?.email && !validateEmail(value.email)) {
      setErrors((prev) => ({
        ...prev,
        email: 'Please enter a valid email address',
      }));
    }
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
          <motion.div
            variants={cardStagger.container}
            initial="initial"
            animate="animate"
          >
            <Grid container spacing={3}>
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

