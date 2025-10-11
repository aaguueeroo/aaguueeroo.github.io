// Core enums
export enum QuestionType {
  WELCOME = 'WELCOME',
  SINGLE_SELECT = 'SINGLE_SELECT',
  MULTI_SELECT = 'MULTI_SELECT',
  COMPOSITE = 'COMPOSITE',
  SLIDER_TRIANGLE = 'SLIDER_TRIANGLE',
  TEXT_INPUT = 'TEXT_INPUT',
  FILE_UPLOAD = 'FILE_UPLOAD',
  CONTACT_FORM = 'CONTACT_FORM',
}

// Answer types
export type SingleAnswer = string;
export type MultiAnswer = string[];
export type CompositeAnswer = Record<string, string>;
export type SliderTriangleAnswer = {
  quality: number;
  speed: number;
  budget: number;
};
export type TextAnswer = string;
export type FileAnswer = File[];
export type ContactAnswer = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
};

export type Answer = 
  | SingleAnswer 
  | MultiAnswer 
  | CompositeAnswer 
  | SliderTriangleAnswer
  | TextAnswer 
  | FileAnswer 
  | ContactAnswer;

// Question option interface
export interface QuestionOption {
  id: string;
  label: string;
  description: string;
  icon: string; // Material-UI icon name
  value: string;
}

// Sub-question for composite questions
export interface SubQuestion {
  id: string;
  label: string;
  options: QuestionOption[];
}

// Main question interface
export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  description?: string;
  options?: QuestionOption[];
  subQuestions?: SubQuestion[]; // For composite questions
  validation?: {
    required?: boolean;
    minSelections?: number;
    maxSelections?: number;
    minLength?: number;
    maxLength?: number;
  };
  nextQuestionId?: string | ((answers: FormAnswers) => string | null);
}

// Form state types
export type FormAnswers = Record<string, Answer>;

export interface NavigationHistoryItem {
  questionId: string;
  answers: FormAnswers;
}

export interface FormState {
  currentQuestionId: string;
  answers: FormAnswers;
  history: NavigationHistoryItem[];
  isComplete: boolean;
}

// Progress tracking
export interface ProgressInfo {
  currentStep: number;
  totalSteps: number;
  percentage: number;
}

// Validation result
export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

