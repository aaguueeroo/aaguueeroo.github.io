import { Question, QuestionType, FormAnswers } from '../types';

// Question IDs as constants for type safety
export const QUESTION_IDS = {
  WELCOME: 'welcome',
  PROJECT_TYPE: 'project-type',
  WEB_TYPE: 'web-type',
  APP_FEATURES: 'app-features',
  DESIGN_TYPE: 'design-type',
  PROJECT_DETAILS: 'project-details',
  ADDITIONAL_INFO: 'additional-info',
  CONTACT_INFO: 'contact-info',
} as const;

// Helper function to determine next question based on project type selections
const getNextQuestionAfterProjectType = (answers: FormAnswers): string | null => {
  const projectTypes = answers[QUESTION_IDS.PROJECT_TYPE] as string[];
  
  if (!projectTypes || projectTypes.length === 0) {
    return null;
  }

  // Priority order: Web -> App -> Design
  if (projectTypes.includes('web') && !answers[QUESTION_IDS.WEB_TYPE]) {
    return QUESTION_IDS.WEB_TYPE;
  }
  
  if (projectTypes.includes('app') && !answers[QUESTION_IDS.APP_FEATURES]) {
    return QUESTION_IDS.APP_FEATURES;
  }
  
  if (projectTypes.includes('design') && !answers[QUESTION_IDS.DESIGN_TYPE]) {
    return QUESTION_IDS.DESIGN_TYPE;
  }

  // All sub-questions answered, move to project details
  return QUESTION_IDS.PROJECT_DETAILS;
};

// All questions configuration
export const questions: Question[] = [
  // Welcome Screen
  {
    id: QUESTION_IDS.WELCOME,
    type: QuestionType.WELCOME,
    title: 'Let\'s bring your vision to life',
    description: 'Tell me about your project and I\'ll provide you with a custom quote tailored to your needs.',
    nextQuestionId: QUESTION_IDS.PROJECT_TYPE,
  },
  
  // Question 1: Project Type
  {
    id: QUESTION_IDS.PROJECT_TYPE,
    type: QuestionType.MULTI_SELECT,
    title: 'What type of project do you need?',
    description: 'Select all that apply',
    options: [
      {
        id: 'web',
        label: 'Web Development',
        description: 'Websites and web applications',
        icon: 'Language',
        value: 'web',
      },
      {
        id: 'app',
        label: 'Mobile App',
        description: 'iOS and Android applications',
        icon: 'PhoneIphone',
        value: 'app',
      },
      {
        id: 'design',
        label: 'Design',
        description: 'UI/UX and visual design',
        icon: 'Palette',
        value: 'design',
      },
    ],
    validation: {
      required: true,
      minSelections: 1,
    },
    nextQuestionId: getNextQuestionAfterProjectType,
  },

  // Question 1a: Web Type
  {
    id: QUESTION_IDS.WEB_TYPE,
    type: QuestionType.SINGLE_SELECT,
    title: 'What kind of website do you need?',
    description: 'Choose the option that best fits your needs',
    options: [
      {
        id: 'static',
        label: 'Static Website',
        description: 'Portfolio, landing page, or informational site',
        icon: 'Description',
        value: 'static',
      },
      {
        id: 'dynamic',
        label: 'Dynamic Web App',
        description: 'Interactive application with databases and user accounts',
        icon: 'DynamicFeed',
        value: 'dynamic',
      },
      {
        id: 'ecommerce',
        label: 'E-commerce',
        description: 'Online store with payment processing',
        icon: 'ShoppingCart',
        value: 'ecommerce',
      },
    ],
    validation: {
      required: true,
    },
    nextQuestionId: getNextQuestionAfterProjectType,
  },

  // Question 1b: App Features
  {
    id: QUESTION_IDS.APP_FEATURES,
    type: QuestionType.MULTI_SELECT,
    title: 'What features does your app need?',
    description: 'Select all that apply',
    options: [
      {
        id: 'authentication',
        label: 'Authentication',
        description: 'User accounts, login, and registration flows',
        icon: 'Lock',
        value: 'authentication',
      },
      {
        id: 'push-notifications',
        label: 'Push Notifications',
        description: 'Real-time system and user-triggered alerts',
        icon: 'NotificationsActive',
        value: 'push-notifications',
      },
      {
        id: 'payments',
        label: 'Payments',
        description: 'Payments, subscriptions, and checkout experiences',
        icon: 'Payment',
        value: 'payments',
      },
      {
        id: 'user-roles',
        label: 'User Roles',
        description: 'Role-based access, permissions, and dashboards',
        icon: 'SupervisorAccount',
        value: 'user-roles',
      },
      {
        id: 'analytics',
        label: 'Analytics',
        description: 'Usage tracking, dashboards, and reporting',
        icon: 'Insights',
        value: 'analytics',
      },
      {
        id: 'third-party-integrations',
        label: 'Third-Party Integrations',
        description: 'Integrations with external services and tools',
        icon: 'Extension',
        value: 'third-party-integrations',
      },
      {
        id: 'apis',
        label: 'APIs',
        description: 'Custom APIs, endpoints, and data orchestration',
        icon: 'Hub',
        value: 'apis',
      },
      {
        id: 'other-features',
        label: 'Other Features',
        description: 'Tell me about any requirement that is not listed here',
        icon: 'MoreHoriz',
        value: 'other-features',
      },
    ],
    validation: {
      required: true,
      minSelections: 1,
    },
    nextQuestionId: getNextQuestionAfterProjectType,
  },

  // Question 1c: Design Type
  {
    id: QUESTION_IDS.DESIGN_TYPE,
    type: QuestionType.MULTI_SELECT,
    title: 'What do you need design for?',
    description: 'Select all that apply',
    options: [
      {
        id: 'web-design',
        label: 'Web Design',
        description: 'Website UI/UX and visual design',
        icon: 'Web',
        value: 'web-design',
      },
      {
        id: 'app-design',
        label: 'App Design',
        description: 'Mobile app UI/UX and visual design',
        icon: 'Smartphone',
        value: 'app-design',
      },
      {
        id: 'branding',
        label: 'Branding',
        description: 'Logo, brand identity, and style guide',
        icon: 'Brush',
        value: 'branding',
      },
    ],
    validation: {
      required: true,
      minSelections: 1,
    },
    nextQuestionId: QUESTION_IDS.PROJECT_DETAILS,
  },

  // Question 2: Project Details (Slider Triangle)
  {
    id: QUESTION_IDS.PROJECT_DETAILS,
    type: QuestionType.SLIDER_TRIANGLE,
    title: 'Choose your project priorities',
    description: 'Select up to two priorities that matter most — quality, speed, or budget.',
    validation: {
      required: true,
      minSelections: 1,
      maxSelections: 2,
    },
    nextQuestionId: QUESTION_IDS.ADDITIONAL_INFO,
  },

  // Question 3: Additional Info
  {
    id: QUESTION_IDS.ADDITIONAL_INFO,
    type: QuestionType.TEXT_INPUT,
    title: 'Any more context that you want to share?',
    description: 'Include background details, constraints, inspirations, or anything else that will help me understand your vision.',
    validation: {
      required: false,
      maxLength: 2000,
    },
    nextQuestionId: QUESTION_IDS.CONTACT_INFO,
  },

  // Question 4: Contact Info
  {
    id: QUESTION_IDS.CONTACT_INFO,
    type: QuestionType.CONTACT_FORM,
    title: 'How can I reach you?',
    description: 'Share your contant details so I can reach you with an estimation about your project.',
    validation: {
      required: true,
    },
  },
];

// Export a map for quick lookup
export const questionsMap = new Map(
  questions.map((q) => [q.id, q])
);

