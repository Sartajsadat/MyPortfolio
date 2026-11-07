import { Check, Copy, Download, Mail, MapPin } from 'lucide-react';
import { useState } from 'react';
import { profile } from '@/data/profile';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/utils/icons';
import { asset } from '@/utils/cn';
import { ContactForm } from './ContactForm';

function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <button type="button" onClick={copy} className="icon-btn !h-9 !w-9 shrink-0" aria-label={copied ? 'Email copied' : 'Copy email address'}>
      {copied ? <Check size={15} className="text-success" /> : <Copy size={15} />}
    </button>
  );
}

export function Contact() {
  const socials = profile.socials.filter((s) => s.icon !== 'mail');
  return (
    <section id="contact" aria-labelledby="contact-title" className="section overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0" />
        <div className="glow absolute bottom-0 left-1/2 h-[28rem] w-[50rem] -translate-x-1/2 rounded-full bg-accent" />
      </div>
      <div className="container max-w-site">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="contact-title"
              index="08"
              eyebrow="Contact"
              title={<>Have an Idea? Let's Build Something <span className="text-gradient">Great.</span></>}
              description="Engineering roles, consulting, freelance projects, research collaboration or guest lectures. I'd be glad to hear from you."
            />

            <Reveal className="mt-10 space-y-3">
              <div className="card flex items-center gap-4 rounded-2xl p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                  <Mail size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-faint">Email</p>
                  <a href={`mailto:${profile.email}`} className="block truncate font-medium text-ink hover:text-cyan">
                    {profile.email}
                  </a>
                </div>
                <CopyEmail />
              </div>
              <div className="card flex items-center gap-4 rounded-2xl p-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet/10 text-violet">
                  <MapPin size={18} />
                </span>
                <div>
                  <p className="text-xs text-faint">Location</p>
                  <p className="font-medium text-ink">{profile.location}</p>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="card group flex items-center gap-3 rounded-2xl p-4 transition hover:border-cyan/30"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-elevated text-ink transition group-hover:scale-105">
                      <Icon name={s.icon} size={18} brand />
                    </span>
                    <span>
                      <span className="block text-xs text-faint">{s.label}</span>
                      <span className="block text-sm font-medium text-ink">View profile ↗</span>
                    </span>
                  </a>
                ))}
              </div>
              <a href={asset(profile.cvFile)} download className="btn-ghost mt-3 w-full sm:w-auto">
                <Download size={16} /> Download CV
              </a>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
