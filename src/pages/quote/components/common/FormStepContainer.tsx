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
}) => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.paper',
        borderRadius: { xs: 1, sm: 1, md: 0.9 },
        boxShadow: {
          xs: '0 4px 16px rgba(0, 0, 0, 0.06)',
          sm: '0 6px 24px rgba(0, 0, 0, 0.07)',
          md: '0 8px 32px rgba(0, 0, 0, 0.08)',
        },
        py: { xs: 4, sm: 6, md: 16 },
        px: { xs: 2.5, sm: 4, md: 12 },
        width: '100%',
        maxWidth: '1200px',
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        minHeight: { xs: '500px', sm: '550px', md: '600px' },
        height: '100%',
      }}
    >
      {/* Main Content Area */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
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
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: { xs: 3, sm: 2 },
            }}
          >
            {/* Progress Indicator */}
            {showProgress && progress && (
              <Box
                sx={{
                  order: { xs: 2, sm: 1 },
                  width: { xs: '100%', sm: 'auto' },
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <ProgressIndicator progress={progress} />
              </Box>
            )}

            {/* Navigation Buttons */}
            {showNavigation && onNext && (
              <Box
                sx={{
                  order: { xs: 1, sm: 2 },
                  width: { xs: '100%', sm: 'auto' },
                  ml: { xs: 0, sm: showProgress ? 0 : 'auto' },
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
        </Box>
      )}
    </Box>
  );
};