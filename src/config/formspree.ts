const buildFormspreeEndpoint = (): string => {
  const rawFormId = import.meta.env.VITE_FORMSPREE_FORM_ID;
  const trimmedFormId =
    typeof rawFormId === 'string' ? rawFormId.trim() : '';

  if (trimmedFormId.length > 0) {
    return `https://formspree.io/f/${trimmedFormId}`;
  }

  if (import.meta.env.DEV) {
    throw new Error(
      'Formspree configuration missing. Set VITE_FORMSPREE_FORM_ID in your environment file.'
    );
  }

  return '';
};

export const formspreeEndpoint = buildFormspreeEndpoint();

export const isFormspreeConfigured = (): boolean =>
  formspreeEndpoint.length > 0;

