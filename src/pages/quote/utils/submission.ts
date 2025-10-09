import { FormAnswers, ContactAnswer } from '../types';

/**
 * Format form data for submission
 */
export const formatFormData = (answers: FormAnswers): Record<string, any> => {
  return {
    timestamp: new Date().toISOString(),
    answers,
  };
};

/**
 * Validate contact information
 */
export const validateContactInfo = (contact: ContactAnswer): boolean => {
  if (!contact.name || !contact.email) {
    return false;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(contact.email);
};

/**
 * Submit form data
 * TODO: Implement actual backend submission
 */
export const submitQuoteForm = async (answers: FormAnswers): Promise<void> => {
  const formattedData = formatFormData(answers);

  // TODO: Replace with actual API call
  console.log('Submitting form data:', formattedData);

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Form submitted successfully!');
      resolve();
    }, 1000);
  });
};

/**
 * Generate email body from form answers
 * Useful for email services like EmailJS or similar
 */
export const generateEmailBody = (answers: FormAnswers): string => {
  let body = 'New Quote Request\n\n';

  // Project Type
  const projectTypes = answers['project-type'] as string[];
  if (projectTypes) {
    body += `Project Type: ${projectTypes.join(', ')}\n`;
  }

  // Web Type
  if (answers['web-type']) {
    body += `Web Type: ${answers['web-type']}\n`;
  }

  // App Features
  if (answers['app-features']) {
    const features = answers['app-features'] as string[];
    body += `App Features: ${features.join(', ')}\n`;
  }

  // Design Type
  if (answers['design-type']) {
    const designTypes = answers['design-type'] as string[];
    body += `Design Type: ${designTypes.join(', ')}\n`;
  }

  body += '\n';

  // Project Details
  if (answers['project-details']) {
    const details = answers['project-details'] as Record<string, string>;
    body += 'Project Details:\n';
    body += `  Size: ${details.size || 'N/A'}\n`;
    body += `  Budget: ${details.budget || 'N/A'}\n`;
    body += `  Timeline: ${details.timeline || 'N/A'}\n`;
  }

  body += '\n';

  // Additional Info
  if (answers['additional-info']) {
    body += `Additional Information:\n${answers['additional-info']}\n\n`;
  }

  // Contact Info
  if (answers['contact-info']) {
    const contact = answers['contact-info'] as ContactAnswer;
    body += 'Contact Information:\n';
    body += `  Name: ${contact.name}\n`;
    body += `  Email: ${contact.email}\n`;
    if (contact.phone) {
      body += `  Phone: ${contact.phone}\n`;
    }
    if (contact.company) {
      body += `  Company: ${contact.company}\n`;
    }
  }

  return body;
};

