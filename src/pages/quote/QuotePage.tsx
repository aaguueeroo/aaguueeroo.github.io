import React from "react";
import { Box, Typography, Alert, Snackbar } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useQuoteForm } from "./hooks/useQuoteForm";
import { FormStepContainer } from "./components/common/FormStepContainer";
import { QuestionRenderer } from "./components/QuestionRenderer";
import { SuccessScreen } from "./components/SuccessScreen";
import { WelcomeScreen } from "./components/specific/WelcomeScreen";
import { QuestionType } from "./types";
import { QUESTION_IDS } from "./data/questionFlow";

const QuotePage: React.FC = () => {
  const {
    currentQuestion,
    currentAnswer,
    progress,
    canGoNext,
    canGoBack,
    isLastStep,
    setAnswer,
    goNext,
    goBack,
    submitForm,
    resetForm,
    allAnswers,
    isSubmitting,
    submitError,
  } = useQuoteForm();

  const [showError, setShowError] = React.useState(false);

  React.useEffect(() => {
    if (submitError) {
      setShowError(true);
    }
  }, [submitError]);

  // Scroll to top when question changes
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestion?.id]);

  // Check if form is complete
  const isComplete = !currentQuestion && Object.keys(allAnswers).length > 0;

  const shouldShowSkipForAdditionalInfo =
    currentQuestion?.id === QUESTION_IDS.ADDITIONAL_INFO &&
    (typeof currentAnswer !== "string" || currentAnswer.trim().length === 0);

  if (!currentQuestion && !isComplete) {
    return (
      <>
        <Helmet>
          <title>Loading... | Julia Aguero</title>
        </Helmet>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            backgroundColor: "background.default",
          }}
        >
          <Navbar />
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                fontWeight: 400,
              }}
            >
              Loading your quote form...
            </Typography>
          </Box>
          <Footer />
        </Box>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Build your app | Julia Aguero - Web & App Development</title>
        <meta
          name="description"
          content="Request a custom quote for your web development, mobile app, or design project. Get started with an interactive, personalized questionnaire."
        />
        <meta property="og:title" content="Build your app | Julia Aguero" />
        <meta
          property="og:description"
          content="Request a custom quote for your web development, mobile app, or design project."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "background.default",
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "stretch",
            justifyContent: "center",
            minHeight: "calc(100vh - 64px)",
            pt: { xs: 10, sm: 12, md: 14 },
            px: { xs: 2, md: 32 },
            pb: { xs: 2, md: 16 },
          }}
        >
          {isComplete ? (
            <FormStepContainer>
              <SuccessScreen onReset={resetForm} />
            </FormStepContainer>
          ) : currentQuestion?.type === QuestionType.WELCOME ? (
            <FormStepContainer
              showProgress={false}
              showNavigation={true}
              progress={progress}
              canGoBack={false}
              canGoNext={true}
              isLastStep={false}
              onNext={goNext}
              useCTAButton={true}
              ctaButtonText="Start Building"
            >
              <WelcomeScreen
                title={currentQuestion.title}
                description={currentQuestion.description}
              />
            </FormStepContainer>
          ) : (
            <FormStepContainer
              showProgress={true}
              showNavigation={true}
              progress={progress}
              canGoBack={canGoBack && !isSubmitting}
              canGoNext={canGoNext && !isSubmitting}
              isLastStep={isLastStep}
              onBack={goBack}
              onNext={goNext}
              onSubmit={submitForm}
              isSubmitting={isSubmitting}
              nextButtonText={shouldShowSkipForAdditionalInfo ? "Skip" : undefined}
              nextButtonTone={shouldShowSkipForAdditionalInfo ? "neutral" : "default"}
            >
              {/* Top Container: Title and Description */}
              <Box
                sx={{
                  flexShrink: 0,
                  textAlign: "center",
                  mb: { xs: 3, sm: 4, md: 5 },
                }}
              >
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: 700,
                    mb: { xs: 1, sm: 1.5, md: 2 },
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                  }}
                >
                  {currentQuestion!.title}
                </Typography>
                {currentQuestion!.description && (
                  <Typography
                    variant="h6"
                    sx={{
                      color: "text.secondary",
                      fontWeight: 400,
                      fontSize: {
                        xs: "0.9375rem",
                        sm: "1.1rem",
                        md: "1.25rem",
                      },
                      lineHeight: { xs: 1.4, sm: 1.5, md: 1.5 },
                    }}
                  >
                    {currentQuestion!.description}
                  </Typography>
                )}
              </Box>

              {/* Center Container: Question Content */}
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box sx={{ width: "100%", height: "100%" }}>
                  <QuestionRenderer
                    question={currentQuestion!}
                    answer={currentAnswer}
                    onAnswerChange={setAnswer}
                  />
                </Box>
              </Box>
            </FormStepContainer>
          )}
        </Box>

        {/* Footer */}
        <Footer />
      </Box>

      {/* Error Snackbar */}
      <Snackbar
        open={showError}
        autoHideDuration={4000}
        onClose={() => setShowError(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          top: '50% !important',
          transform: 'translate(-50%, -50%) !important',
        }}
      >
        <Alert 
          onClose={() => setShowError(false)} 
          severity="error" 
          sx={{ 
            width: '100%',
            alignItems: 'center',
            '& .MuiAlert-icon': {
              display: 'flex',
              alignItems: 'center',
            },
            '& .MuiAlert-action': {
              display: 'flex',
              alignItems: 'center',
            },
          }}
        >
          {submitError || 'An error occurred. Please try again.'}
        </Alert>
      </Snackbar>
    </>
  );
};

export default QuotePage;
