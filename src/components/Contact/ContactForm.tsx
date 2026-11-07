import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, RotateCcw, Send } from 'lucide-react';
import { useId, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { profile } from '@/data/profile';
import { hasContactEndpoint, sendContactMessage } from '@/services/contentApi';
import { cn } from '@/utils/cn';
import { ease } from '@/utils/motion';
import { validateContact, type ContactErrors, type ContactValues } from './validation';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const empty: ContactValues = { name: '', email: '', subject: '', message: '' };

function Field({
  id,
  label,
  error,
  children,
  hint,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        {hint && <span className="font-mono text-[0.65rem] text-faint">{hint}</span>}
      </div>
      {children}
      <AnimatePresence initial={false}>
        {error && (
          <motion.p
            id={`${id}-error`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-1.5 flex items-center gap-1.5 text-xs text-danger"
            role="alert"
          >
            <AlertCircle size={12} aria-hidden="true" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState<ContactValues>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof ContactValues, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [honeypot, setHoneypot] = useState('');

  const id = (k: string) => `${uid}-${k}`;

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name as keyof ContactValues]) setErrors(validateContact(next));
  };

  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name as keyof ContactValues;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validateContact(values));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'submitting') return;
    const errs = validateContact(values);
    setErrors(errs);
    setTouched({ name: true, email: true, subject: true, message: true });
    if (Object.keys(errs).length) {
      const first = Object.keys(errs)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    if (honeypot) {
      setStatus('success');
      return;
    }

    const payload = {
      name: values.name.trim(),
      email: values.email.trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    };

    if (!hasContactEndpoint) {
      // No backend configured: hand off to the visitor's email client.
      const body = `${payload.message}\n\n— ${payload.name} (${payload.email})`;
      window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(payload.subject)}&body=${encodeURIComponent(body)}`;
      setStatus('success');
      return;
    }

    setStatus('submitting');
    try {
      await sendContactMessage(payload);
      setStatus('success');
      setValues(empty);
      setTouched({});
    } catch {
      setStatus('error');
    }
  };

  const inputProps = (k: keyof ContactValues) => ({
    id: id(k),
    name: k,
    value: values[k],
    onChange,
    onBlur,
    'aria-invalid': touched[k] && errors[k] ? true : undefined,
    'aria-describedby': touched[k] && errors[k] ? `${id(k)}-error` : undefined,
    disabled: status === 'submitting',
  });

  return (
    <div className="glass relative overflow-hidden rounded-[2rem] p-6 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.5)] md:p-9">
      <AnimatePresence mode="wait" initial={false}>
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="flex min-h-[28rem] flex-col items-center justify-center text-center"
            role="status"
          >
            <motion.span
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
              className="grid h-16 w-16 place-items-center rounded-full bg-success/15 text-success"
            >
              <CheckCircle2 size={30} />
            </motion.span>
            <h3 className="mt-6 font-display text-2xl font-semibold">{hasContactEndpoint ? 'Message sent.' : 'Almost there.'}</h3>
            <p className="mt-3 max-w-sm text-muted">
              {hasContactEndpoint
                ? "Thanks for reaching out. I'll get back to you as soon as I can."
                : 'Your email app should now be open with the message ready to send.'}
            </p>
            <button type="button" className="btn-ghost mt-8" onClick={() => setStatus('idle')}>
              <RotateCcw size={15} /> Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            ref={formRef}
            onSubmit={onSubmit}
            noValidate
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-5"
            aria-label="Contact form"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id={id('name')} label="Full Name" error={touched.name ? errors.name : undefined}>
                <input {...inputProps('name')} type="text" autoComplete="name" placeholder="Your name" className="input" />
              </Field>
              <Field id={id('email')} label="Email Address" error={touched.email ? errors.email : undefined}>
                <input {...inputProps('email')} type="email" autoComplete="email" inputMode="email" placeholder="you@company.com" className="input" />
              </Field>
            </div>
            <Field id={id('subject')} label="Subject" error={touched.subject ? errors.subject : undefined}>
              <input {...inputProps('subject')} type="text" placeholder="Project, role or collaboration" className="input" />
            </Field>
            <Field id={id('message')} label="Message" error={touched.message ? errors.message : undefined} hint={`${values.message.trim().length}/4000`}>
              <textarea {...inputProps('message')} rows={6} placeholder="Tell me a little about what you have in mind…" className="input resize-y" />
            </Field>

            {/* Honeypot: hidden from people, catches simple bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Leave this empty
                <input tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
              </label>
            </div>

            <AnimatePresence>
              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="alert"
                  className="flex items-start gap-3 rounded-2xl border border-danger/30 bg-danger/10 p-4 text-sm"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0 text-danger" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-ink">Your message couldn't be sent.</p>
                    <p className="mt-1 text-muted">
                      Please try again, or email me directly at{' '}
                      <a className="text-cyan underline-offset-2 hover:underline" href={`mailto:${profile.email}`}>
                        {profile.email}
                      </a>
                      .
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex flex-col-reverse items-start justify-between gap-4 pt-1 sm:flex-row sm:items-center">
              <p className="text-xs text-faint">I usually reply within a few working days.</p>
              <button type="submit" className={cn('btn-primary group w-full sm:w-auto')} disabled={status === 'submitting'}>
                {status === 'submitting' ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    {status === 'error' ? 'Try Again' : 'Send Message'}
                    <Send size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
