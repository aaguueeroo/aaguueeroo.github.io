import React from 'react';
import { Box } from '@mui/material';
import { ProgressIndicator } from './ProgressIndicator';
import { NavigationButtons } from './NavigationButtons';
import { CTAButton } from './CTAButton';
import { ProgressInfo } from '../../types';

interface FormStepContainerProps {
  children: React.ReactNode;
  showProgress?: boolean;
  showNavigation?: boolean;
  progress?: ProgressInfo;
  canGoBack?: boolean;
  canGoNext?: boolean;
  isLastStep?: boolean;
  onBack?: () => void;
  onNext?: () => void;
  onSubmit?: () => void;
  useCTAButton?: boolean;
  ctaButtonText?: string;
  isSubmitting?: boolean;
  nextButtonText?: string;
  nextButtonTone?: 'default' | 'neutral';
  disableMinHeight?: boolean;
}

export const FormStepContainer: React.FC<FormStepContainerProps> = ({
  children,
  showProgress = false,
  showNavigation = false,
  progress,
  canGoBack = false,
  canGoNext = false,
  isLastStep = false,
  onBack,
  onNext,
  onSubmit,
  useCTAButton = false,
  ctaButtonText = 'Start Building',
  isSubmitting = false,
  nextButtonText,
  nextButtonTone = 'default',
  disableMinHeight = false,
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: { xs: 0.5, sm: 1, md: 0.9 },
        boxShadow: {
          xs: '0 4px 16px rgba(0, 0, 0, 0.06)',
          sm: '0 6px 24px rgba(0, 0, 0, 0.07)',
          md: '0 8px 32px rgba(0, 0, 0, 0.08)',
        },
        mt: { xs: 12, sm: 3, md: 4 },
        py: { xs: 4, sm: 6, md: 16 },
        px: { xs: 2.5, sm: 4, md: 12 },
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        minHeight: disableMinHeight ? 'auto' : { xs: '500px', sm: '550px', md: '600px' },
        height: disableMinHeight ? '0' : '100%',
      }}
    >
      {/* Main Content Area */}
      <Box
        sx={{
          flex: disableMinHeight ? '0 0 auto' : 1,
          display: 'flex',
          flexDirection: 'column',
          pt: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 2, sm: 3, md: 4 },
        }}
      >
        {children}
      </Box>

      {/* Bottom Container: Progress and Navigation */}
      {(showProgress || showNavigation) && (
        <Box
          sx={{
            flexShrink: 0,
            mt: { xs: 4, sm: 5, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            gap: { xs: 3, sm: 4 },
          }}
        >
          {/* Progress Indicator */}
          {showProgress && progress && (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              <ProgressIndicator progress={progress} />
            </Box>
          )}

          {/* Navigation Buttons */}
          {showNavigation && onNext && (
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              {useCTAButton ? (
                <CTAButton
                  onClick={onNext}
                  disabled={!canGoNext}
                  text={ctaButtonText}
                />
              ) : (
                <NavigationButtons
                  canGoBack={canGoBack}
                  canGoNext={canGoNext}
                  isLastStep={isLastStep}
                  onBack={onBack || (() => {})}
                  onNext={onNext}
                  onSubmit={onSubmit}
                  isSubmitting={isSubmitting}
                  nextLabel={nextButtonText}
                  nextButtonTone={nextButtonTone}
                />
              )}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
