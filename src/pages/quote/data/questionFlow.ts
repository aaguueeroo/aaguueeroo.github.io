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
    description: 'Tell us about your project and we\'ll provide you with a custom quote tailored to your needs. This will only take a few minutes.',
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
        id: 'user-auth',
        label: 'User Authentication',
        description: 'Login, signup, and user profiles',
        icon: 'Lock',
        value: 'user-auth',
      },
      {
        id: 'payments',
        label: 'Payment Processing',
        description: 'In-app purchases or subscriptions',
        icon: 'Payment',
        value: 'payments',
      },
      {
        id: 'realtime',
        label: 'Real-time Features',
        description: 'Chat, notifications, or live updates',
        icon: 'Sync',
        value: 'realtime',
      },
      {
        id: 'offline',
        label: 'Offline Mode',
        description: 'Works without internet connection',
        icon: 'CloudOff',
        value: 'offline',
      },
      {
        id: 'geolocation',
        label: 'Location Services',
        description: 'Maps and location-based features',
        icon: 'LocationOn',
        value: 'geolocation',
      },
      {
        id: 'camera',
        label: 'Camera & Media',
        description: 'Photo/video capture and processing',
        icon: 'CameraAlt',
        value: 'camera',
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

  // Question 2: Project Details (Composite)
  {
    id: QUESTION_IDS.PROJECT_DETAILS,
    type: QuestionType.COMPOSITE,
    title: 'Tell us about your project',
    description: 'This helps us provide an accurate estimate',
    subQuestions: [
      {
        id: 'size',
        label: 'Project Size',
        options: [
          {
            id: 'small',
            label: 'Small',
            description: 'Simple project with basic features',
            icon: 'FiberManualRecord',
            value: 'small',
          },
          {
            id: 'medium',
            label: 'Medium',
            description: 'Moderate complexity with multiple features',
            icon: 'Circle',
            value: 'medium',
          },
          {
            id: 'large',
            label: 'Large',
            description: 'Complex project with advanced features',
            icon: 'Album',
            value: 'large',
          },
          {
            id: 'enterprise',
            label: 'Enterprise',
            description: 'Large-scale solution for organizations',
            icon: 'BusinessCenter',
            value: 'enterprise',
          },
        ],
      },
      {
        id: 'budget',
        label: 'Budget Range',
        options: [
          {
            id: 'budget-1',
            label: 'Under $5,000',
            description: 'Starter budget for simple projects',
            icon: 'AttachMoney',
            value: 'under-5k',
          },
          {
            id: 'budget-2',
            label: '$5,000 - $15,000',
            description: 'Standard budget for most projects',
            icon: 'MonetizationOn',
            value: '5k-15k',
          },
          {
            id: 'budget-3',
            label: '$15,000 - $50,000',
            description: 'Premium budget for complex projects',
            icon: 'AccountBalance',
            value: '15k-50k',
          },
          {
            id: 'budget-4',
            label: '$50,000+',
            description: 'Enterprise-level investment',
            icon: 'Diamond',
            value: '50k-plus',
          },
          {
            id: 'budget-flexible',
            label: 'Flexible',
            description: 'Open to discussion',
            icon: 'TrendingFlat',
            value: 'flexible',
          },
        ],
      },
      {
        id: 'timeline',
        label: 'Timeline',
        options: [
          {
            id: 'rush',
            label: 'ASAP',
            description: 'Need it done as soon as possible',
            icon: 'BoltOutlined',
            value: 'asap',
          },
          {
            id: 'one-month',
            label: '1 Month',
            description: 'Quick turnaround',
            icon: 'Today',
            value: '1-month',
          },
          {
            id: 'three-months',
            label: '3 Months',
            description: 'Standard timeline',
            icon: 'DateRange',
            value: '3-months',
          },
          {
            id: 'six-months',
            label: '6+ Months',
            description: 'Long-term project',
            icon: 'CalendarMonth',
            value: '6-months-plus',
          },
          {
            id: 'flexible-timeline',
            label: 'Flexible',
            description: 'No specific deadline',
            icon: 'Schedule',
            value: 'flexible',
          },
        ],
      },
    ],
    validation: {
      required: true,
    },
    nextQuestionId: QUESTION_IDS.ADDITIONAL_INFO,
  },

  // Question 3: Additional Info
  {
    id: QUESTION_IDS.ADDITIONAL_INFO,
    type: QuestionType.TEXT_INPUT,
    title: 'Anything else you\'d like to share?',
    description: 'Tell us more about your project, goals, or attach relevant files',
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
    title: 'How can we reach you?',
    description: 'We\'ll get back to you within 24 hours',
    validation: {
      required: true,
    },
  },
];

// Export a map for quick lookup
export const questionsMap = new Map(
  questions.map((q) => [q.id, q])
);

