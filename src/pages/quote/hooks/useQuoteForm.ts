import { useState, useEffect, useCallback } from 'react';
import {
  FormState,
  FormAnswers,
  Answer,
  ProgressInfo,
  Question,
  ContactAnswer,
} from '../types';
import { questionsMap } from '../data/questionFlow';
import {
  getFirstQuestionId,
  getNextQuestionId,
  calculateProgress,
  canProceed,
  isLastQuestion,
} from '../data/flowLogic';
import {
  saveFormState,
  loadFormState,
  clearFormState,
} from '../utils/storage';

interface UseQuoteFormReturn {
  currentQuestion: Question | null;
  currentAnswer: Answer | undefined;
  progress: ProgressInfo;
  canGoNext: boolean;
  canGoBack: boolean;
  isLastStep: boolean;
  setAnswer: (answer: Answer) => void;
  goNext: () => void;
  goBack: () => void;
  resetForm: () => void;
  submitForm: () => Promise<void>;
  allAnswers: FormAnswers;
  isSubmitting: boolean;
  submitError: string | null;
}

const createInitialState = (): FormState => ({
  currentQuestionId: getFirstQuestionId(),
  answers: {},
  history: [],
  isComplete: false,
});

export const useQuoteForm = (): UseQuoteFormReturn => {
  const [formState, setFormState] = useState<FormState>(() => {
    // Try to load from localStorage on mount
    const savedState = loadFormState();
    return savedState || createInitialState();
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveFormState(formState);
  }, [formState]);

  // Get current question
  const currentQuestion = questionsMap.get(formState.currentQuestionId) || null;

  // Get current answer
  const currentAnswer = formState.answers[formState.currentQuestionId];

  // Calculate progress
  const progress = calculateProgress(
    formState.currentQuestionId,
    formState.answers
  );

  // Check if can proceed
  const canGoNext = canProceed(formState.currentQuestionId, formState.answers);

  // Check if can go back
  const canGoBack = formState.history.length > 0;

  // Check if this is the last step
  const isLastStep = isLastQuestion(formState.currentQuestionId);

  /**
   * Set answer for current question
   */
  const setAnswer = useCallback(
    (answer: Answer) => {
      setFormState((prev) => ({
        ...prev,
        answers: {
          ...prev.answers,
          [prev.currentQuestionId]: answer,
        },
      }));
    },
    []
  );

  /**
   * Go to next question
   */
  const goNext = useCallback(() => {
    if (!canGoNext) {
      return;
    }

    const nextQuestionId = getNextQuestionId(
      formState.currentQuestionId,
      formState.answers
    );

    if (!nextQuestionId) {
      // No next question, form is complete
      setFormState((prev) => ({
        ...prev,
        isComplete: true,
      }));
      return;
    }

    // Save current state to history
    setFormState((prev) => ({
      ...prev,
      currentQuestionId: nextQuestionId,
      history: [
        ...prev.history,
        {
          questionId: prev.currentQuestionId,
          answers: { ...prev.answers },
        },
      ],
    }));
  }, [formState.currentQuestionId, formState.answers, canGoNext]);

  /**
   * Go back to previous question
   */
  const goBack = useCallback(() => {
    if (!canGoBack) {
      return;
    }

    setFormState((prev) => {
      const history = [...prev.history];
      const previousState = history.pop();

      if (!previousState) {
        return prev;
      }

      return {
        ...prev,
        currentQuestionId: previousState.questionId,
        answers: previousState.answers,
        history,
      };
    });
  }, [canGoBack]);

  /**
   * Reset form to initial state
   */
  const resetForm = useCallback(() => {
    clearFormState();
    setFormState(createInitialState());
  }, []);

  /**
   * Submit form
   */
  const submitForm = useCallback(async () => {
    setSubmitError(null);

    const contactAnswer = formState.answers['contact-info'] as ContactAnswer | undefined;

    const submissionModule = await import('../utils/submission');
    const { validateContactInfo, submitQuoteForm } = submissionModule;

    if (!contactAnswer || !validateContactInfo(contactAnswer)) {
      setSubmitError('Please add your name and a valid email before submitting the form.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitQuoteForm(formState.answers);

      // Clear form after successful submission
      clearFormState();

      // Mark as complete
      setFormState((prev) => ({
        ...prev,
        isComplete: true,
      }));
    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to submit form. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [formState.answers]);

  return {
    currentQuestion,
    currentAnswer,
    progress,
    canGoNext,
    canGoBack,
    isLastStep,
    setAnswer,
    goNext,
    goBack,
    resetForm,
    submitForm,
    allAnswers: formState.answers,
    isSubmitting,
    submitError,
  };
};

