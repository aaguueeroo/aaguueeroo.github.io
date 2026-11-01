// How someone joins the testers. There's no form or database behind the page: every way in is a
// link that prepares a message, and the visitor is the one who sends it.

export interface EmailDraft {
  to: string;
  subject: string;
  body: string;
}

export const buildMailtoLink = ({ to, subject, body }: EmailDraft): string =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

// mailto does nothing for someone who only uses Gmail in a browser, so they get their own way in.
export const buildGmailLink = ({ to, subject, body }: EmailDraft): string =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

export const buildWhatsAppLink = (message: string): string =>
  `https://wa.me/?text=${encodeURIComponent(message)}`;
