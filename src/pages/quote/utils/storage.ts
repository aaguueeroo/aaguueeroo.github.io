import { FormState } from '../types';

const STORAGE_KEY = 'quote-form-state';

/**
 * Save form state to localStorage
 */
export const saveFormState = (state: FormState): void => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    console.error('Error saving form state to localStorage:', error);
  }
};

/**
 * Load form state from localStorage
 */
export const loadFormState = (): FormState | null => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    
    if (serialized === null) {
      return null;
    }

    return JSON.parse(serialized) as FormState;
  } catch (error) {
    console.error('Error loading form state from localStorage:', error);
    return null;
  }
};

/**
 * Clear form state from localStorage
 */
export const clearFormState = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing form state from localStorage:', error);
  }
};

/**
 * Check if there's a saved form state
 */
export const hasSavedFormState = (): boolean => {
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch (error) {
    return false;
  }
};

