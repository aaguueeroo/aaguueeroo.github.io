import React from "react";
import { Box } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Navbar from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useQuoteForm } from "./hooks/useQuoteForm";
import { ProgressIndicator } from "./components/common/ProgressIndicator";
import { Typography } from "@mui/material";
import { NavigationButtons } from "./components/common/NavigationButtons";
import { QuestionRenderer } from "./components/QuestionRenderer";
import { SuccessScreen } from "./components/SuccessScreen";
import { WelcomeScreen } from "./components/specific/WelcomeScreen";
import { QuestionType } from "./types";

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
  } = useQuoteForm();

  // Check if form is complete
  const isComplete = !currentQuestion && Object.keys(allAnswers).length > 0;

  if (!currentQuestion && !isComplete) {
    return (
      <Box>
        <Navbar />
        <Box
          sx={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1>Loading...</h1>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>Get a Quote | Julia Aguero - Web & App Development</title>
        <meta
          name="description"
          content="Request a custom quote for your web development, mobile app, or design project. Get started with an interactive, personalized questionnaire."
        />
        <meta property="og:title" content="Get a Quote | Julia Aguero" />
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
        {isComplete ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "calc(100vh - 64px)",
              pt: { xs: 8, sm: 10, md: 12 },
            }}
          >
            <SuccessScreen onReset={resetForm} />
          </Box>
        ) : currentQuestion?.type === QuestionType.WELCOME ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "calc(100vh - 64px)",
              pt: { xs: 10, sm: 12, md: 14 },
              px: { xs: 2, md: 4 },
            }}
          >
            <WelcomeScreen
              title={currentQuestion.title}
              description={currentQuestion.description}
              onStart={goNext}
            />
          </Box>
        ) : (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: "calc(100vh - 64px)",
              pt: { xs: 10, sm: 12, md: 14 },
            }}
          >
            {/* Card Container with equal padding on all sides */}
            <Box
              sx={{
                flex: 1,
                display: "flex",
                px: { xs: 2, md: 32 },
                pt: { xs: 2 + 64 / 8, md: 0 }, // 64px navbar height, theme spacing unit = 8px
                pb: { xs: 2, md: 16 },
              }}
            >
              <Box
                sx={{
                  backgroundColor: "background.paper",
                  borderRadius: { xs: 1, sm: 1, md: 0.9 },
                  boxShadow: {
                    xs: "0 4px 16px rgba(0, 0, 0, 0.06)",
                    sm: "0 6px 24px rgba(0, 0, 0, 0.07)",
                    md: "0 8px 32px rgba(0, 0, 0, 0.08)",
                  },
                  py: { xs: 4, sm: 6, md: 16 },
                  px: { xs: 2.5, sm: 4, md: 12 },
                  width: "100%",
                  maxWidth: "1200px",
                  mx: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
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
                  <Box sx={{ width: "100%" }}>
                    <QuestionRenderer
                      question={currentQuestion!}
                      answer={currentAnswer}
                      onAnswerChange={setAnswer}
                    />
                  </Box>
                </Box>

                {/* Bottom Container: Progress and Buttons */}
                <Box sx={{ 
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                 }}>
                  {/* Progress Indicator */}
                  <ProgressIndicator progress={progress} />

                  {/* Navigation Buttons */}
                  <NavigationButtons
                    canGoBack={canGoBack}
                    canGoNext={canGoNext}
                    isLastStep={isLastStep}
                    onBack={goBack}
                    onNext={goNext}
                    onSubmit={submitForm}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        )}

        {/* Footer */}
        <Footer />
      </Box>
    </>
  );
};

export default QuotePage;
