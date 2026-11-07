export interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type ContactErrors = Partial<Record<keyof ContactValues, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(v: ContactValues): ContactErrors {
  const e: ContactErrors = {};
  const name = v.name.trim();
  const subject = v.subject.trim();
  const message = v.message.trim();

  if (!name) e.name = 'Please enter your full name.';
  else if (name.length < 2) e.name = 'Name looks too short.';
  else if (name.length > 80) e.name = 'Please keep your name under 80 characters.';

  if (!v.email.trim()) e.email = 'Please enter your email address.';
  else if (!EMAIL.test(v.email.trim())) e.email = 'Please enter a valid email address.';

  if (!subject) e.subject = 'Please add a subject.';
  else if (subject.length < 3) e.subject = 'Subject looks too short.';
  else if (subject.length > 120) e.subject = 'Please keep the subject under 120 characters.';

  if (!message) e.message = 'Please write a message.';
  else if (message.length < 20) e.message = 'Please write at least 20 characters.';
  else if (message.length > 4000) e.message = 'Please keep your message under 4000 characters.';

  return e;
}
