/**
 * Google Analytics service for tracking page views and events
 */

// Type definitions for gtag
declare global {
  interface Window {
    gtag?: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Initialize Google Analytics by loading the gtag script
 */
const initializeGA = (): void => {
  if (typeof window === 'undefined' || !GA_MEASUREMENT_ID) {
    return;
  }

  // Check if script is already loaded
  const existingScript = document.querySelector(
    `script[src*="googletagmanager.com/gtag/js"]`
  );
  if (existingScript) {
    return;
  }

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname + window.location.search,
  });

  // Load the gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

// Initialize GA when the module is loaded
initializeGA();

/**
 * Check if Google Analytics is available
 */
const isGAAvailable = (): boolean => {
  return typeof window !== 'undefined' && typeof window.gtag === 'function' && !!GA_MEASUREMENT_ID;
};

/**
 * Track a page view
 * @param path - The page path to track
 */
export const trackPageView = (path: string): void => {
  if (!isGAAvailable()) {
    console.warn('Google Analytics is not available');
    return;
  }

  window.gtag!('config', GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

/**
 * Track a custom event
 * @param eventName - The name of the event
 * @param eventParams - Additional parameters for the event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, unknown>
): void => {
  if (!isGAAvailable()) {
    console.warn('Google Analytics is not available');
    return;
  }

  window.gtag!('event', eventName, eventParams);
};

/**
 * Track a click event
 * @param elementName - The name/identifier of the clicked element
 * @param additionalParams - Additional parameters for the event
 */
export const trackClickEvent = (
  elementName: string,
  additionalParams?: Record<string, unknown>
): void => {
  trackEvent('click', {
    element_name: elementName,
    ...additionalParams,
  });
};

/**
 * Track form submission
 * @param formName - The name of the form
 * @param additionalParams - Additional parameters for the event
 */
export const trackFormSubmission = (
  formName: string,
  additionalParams?: Record<string, unknown>
): void => {
  trackEvent('form_submission', {
    form_name: formName,
    ...additionalParams,
  });
};

