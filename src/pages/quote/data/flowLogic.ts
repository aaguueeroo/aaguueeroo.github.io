import {
  Question,
  QuestionType,
  ContactAnswer,
  FormAnswers,
  ProgressInfo,
  ValidationResult,
} from '../types';
import { questionsMap, QUESTION_IDS } from './questionFlow';

/**
 * Get the next question ID based on current question and answers
 */
export const getNextQuestionId = (
  currentQuestionId: string,
  answers: FormAnswers
): string | null => {
  const currentQuestion = questionsMap.get(currentQuestionId);
  
  if (!currentQuestion) {
    return null;
  }

  // If nextQuestionId is a function, call it with answers
  if (typeof currentQuestion.nextQuestionId === 'function') {
    return currentQuestion.nextQuestionId(answers);
  }

  // If it's a string, return it directly
  if (typeof currentQuestion.nextQuestionId === 'string') {
    return currentQuestion.nextQuestionId;
  }

  // No next question (end of form)
  return null;
};

/**
 * Calculate total steps for the form based on selected options
 */
export const calculateTotalSteps = (answers: FormAnswers): number => {
  let totalSteps = 1; // Start with project type question (welcome doesn't count)

  const projectTypes = answers[QUESTION_IDS.PROJECT_TYPE] as string[] || [];

  // Add sub-questions based on project type selections
  if (projectTypes.includes('web')) {
    totalSteps++; // Web type question
  }
  if (projectTypes.includes('app')) {
    totalSteps++; // App features question
  }
  if (projectTypes.includes('design')) {
    totalSteps++; // Design type question
  }

  // Always add remaining questions
  totalSteps += 3; // Project details, additional info, contact info

  return totalSteps;
};

/**
 * Calculate current step number based on question ID and answers
 */
export const calculateCurrentStep = (
  currentQuestionId: string,
  answers: FormAnswers
): number => {
  let step = 0;
  const projectTypes = answers[QUESTION_IDS.PROJECT_TYPE] as string[] || [];

  // Welcome screen doesn't count as a step
  if (currentQuestionId === QUESTION_IDS.WELCOME) {
    return 0;
  }

  // Map question IDs to their step numbers
  if (currentQuestionId === QUESTION_IDS.PROJECT_TYPE) {
    return 1;
  }
  
  step = 1; // After project type

  // Count sub-questions
  if (projectTypes.includes('web')) {
    step++;
    if (currentQuestionId === QUESTION_IDS.WEB_TYPE) {
      return step;
    }
  }

  if (projectTypes.includes('app')) {
    step++;
    if (currentQuestionId === QUESTION_IDS.APP_FEATURES) {
      return step;
    }
  }

  if (projectTypes.includes('design')) {
    step++;
    if (currentQuestionId === QUESTION_IDS.DESIGN_TYPE) {
      return step;
    }
  }

  // Remaining questions
  step++;
  if (currentQuestionId === QUESTION_IDS.PROJECT_DETAILS) {
    return step;
  }

  step++;
  if (currentQuestionId === QUESTION_IDS.ADDITIONAL_INFO) {
    return step;
  }

  step++;
  if (currentQuestionId === QUESTION_IDS.CONTACT_INFO) {
    return step;
  }

  return step;
};

/**
 * Calculate progress information
 */
export const calculateProgress = (
  currentQuestionId: string,
  answers: FormAnswers
): ProgressInfo => {
  const totalSteps = calculateTotalSteps(answers);
  const currentStep = calculateCurrentStep(currentQuestionId, answers);
  const percentage = (currentStep / totalSteps) * 100;

  return {
    currentStep,
    totalSteps,
    percentage,
  };
};

/**
 * Validate an answer for a specific question
 */
export const validateAnswer = (
  question: Question,
  answer: any
): ValidationResult => {
  const validation = question.validation;

  if (!validation) {
    return { isValid: true };
  }

  // Check required
  if (validation.required) {
    if (answer === undefined || answer === null || answer === '') {
      return { isValid: false, error: 'This question is required' };
    }

    // For arrays
    if (Array.isArray(answer) && answer.length === 0) {
      return { isValid: false, error: 'Please select at least one option' };
    }

    // For objects (composite or slider triangle)
    if (typeof answer === 'object' && !Array.isArray(answer)) {
      if (question.type === QuestionType.CONTACT_FORM) {
        const contactAnswer = answer as ContactAnswer;
        const requiredContactFields: Array<keyof ContactAnswer> = ['name', 'email'];
        const missingRequiredField = requiredContactFields.some((field) => {
          const fieldValue = contactAnswer[field];
          return typeof fieldValue !== 'string' || fieldValue.trim().length === 0;
        });

        if (missingRequiredField) {
          return {
            isValid: false,
            error: 'Please provide your name and email',
          };
        }
      } else {
        const values = Object.values(answer);
        const hasEmptyValue =
          values.length === 0 ||
          values.some((value) => {
            if (typeof value === 'string') {
              return value.trim().length === 0;
            }

            return value === undefined || value === null;
          });

        if (hasEmptyValue) {
          return { isValid: false, error: 'Please complete all fields' };
        }
      }
    }
  }

  // Check min selections
  if (validation.minSelections && Array.isArray(answer)) {
    if (answer.length < validation.minSelections) {
      return {
        isValid: false,
        error: `Please select at least ${validation.minSelections} option${
          validation.minSelections > 1 ? 's' : ''
        }`,
      };
    }
  }

  // Check max selections
  if (validation.maxSelections && Array.isArray(answer)) {
    if (answer.length > validation.maxSelections) {
      return {
        isValid: false,
        error: `Please select no more than ${validation.maxSelections} option${
          validation.maxSelections > 1 ? 's' : ''
        }`,
      };
    }
  }

  // Check min length (for text)
  if (validation.minLength && typeof answer === 'string') {
    if (answer.length < validation.minLength) {
      return {
        isValid: false,
        error: `Minimum ${validation.minLength} characters required`,
      };
    }
  }

  // Check max length (for text)
  if (validation.maxLength && typeof answer === 'string') {
    if (answer.length > validation.maxLength) {
      return {
        isValid: false,
        error: `Maximum ${validation.maxLength} characters allowed`,
      };
    }
  }

  return { isValid: true };
};

/**
 * Check if user can proceed to next question
 */
export const canProceed = (
  currentQuestionId: string,
  answers: FormAnswers
): boolean => {
  const question = questionsMap.get(currentQuestionId);
  
  if (!question) {
    return false;
  }

  // Welcome screen always allows proceeding
  if (currentQuestionId === QUESTION_IDS.WELCOME) {
    return true;
  }

  const answer = answers[currentQuestionId];
  const validation = validateAnswer(question, answer);

  return validation.isValid;
};

/**
 * Get the first question ID
 */
export const getFirstQuestionId = (): string => {
  return QUESTION_IDS.WELCOME;
};

/**
 * Check if this is the last question
 */
export const isLastQuestion = (questionId: string): boolean => {
  return questionId === QUESTION_IDS.CONTACT_INFO;
};

