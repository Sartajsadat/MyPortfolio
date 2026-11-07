import { ArrowUp } from 'lucide-react';
import { navigation, profile } from '@/data/profile';
import { Icon } from '@/utils/icons';
import { asset } from '@/utils/cn';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line-soft">
      <div aria-hidden="true" className="absolute inset-x-0 -top-px mx-auto h-px max-w-3xl bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />
      <div className="container max-w-site py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <a href="#top" className="flex items-center gap-3">
              <img src={asset('favicon.svg')} alt="" width={36} height={36} />
              <span className="font-display text-lg font-semibold">{profile.name}</span>
            </a>
            <p className="mt-4 text-sm leading-relaxed text-muted">{profile.titles.join(' · ')}</p>
          </div>

          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-10 gap-y-2.5 text-sm sm:grid-cols-4">
              {navigation.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-muted transition hover:text-ink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            {profile.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('mailto:') ? undefined : '_blank'}
                rel="noreferrer"
                className="icon-btn"
                aria-label={s.label}
              >
                <Icon name={s.icon} size={16} />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line-soft pt-6 text-xs text-faint sm:flex-row sm:items-center">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p className="font-mono tracking-wide">Designed with passion. Built with purpose.</p>
          <a href="#top" className="group inline-flex items-center gap-1.5 transition hover:text-ink">
            Back to top <ArrowUp size={13} className="transition-transform group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
