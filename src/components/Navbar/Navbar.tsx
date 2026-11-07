import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { navigation, profile } from '@/data/profile';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrolled } from '@/hooks/useScrolled';
import { useTheme } from '@/hooks/useTheme';
import { useLockBody } from '@/hooks/useLockBody';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { asset, cn } from '@/utils/cn';
import { ease } from '@/utils/motion';

const ids = navigation.map((n) => n.id);

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      className={cn('icon-btn overflow-hidden', className)}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={theme}
          initial={{ y: 14, opacity: 0, rotate: -40 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: -14, opacity: 0, rotate: 40 }}
          transition={{ duration: 0.25, ease }}
          className="grid place-items-center"
        >
          {isDark ? <Moon size={17} /> : <Sun size={17} />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}

export function Navbar() {
  const active = useActiveSection(ids);
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useLockBody(open);
  useFocusTrap(panelRef, open, () => setOpen(false));

  useEffect(() => {
    const close = () => window.innerWidth >= 1024 && setOpen(false);
    window.addEventListener('resize', close);
    return () => window.removeEventListener('resize', close);
  }, []);

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-full bg-accent px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>

      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent via-cyan to-violet"
        style={{ scaleX: progress }}
      />

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <motion.nav
          aria-label="Primary"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease, delay: 0.1 }}
          className={cn(
            'mx-auto flex max-w-site items-center justify-between gap-4 rounded-full px-3 py-2 transition-all duration-500 md:px-4',
            scrolled ? 'glass shadow-[0_20px_50px_-25px_rgb(0_0_0/0.55)]' : 'border border-transparent',
          )}
        >
          <a href="#top" className="group flex items-center gap-3 rounded-full pr-2" aria-label={`${profile.name} — back to top`}>
            <img src={asset('favicon.svg')} alt="" width={34} height={34} className="h-[34px] w-[34px] transition duration-500 group-hover:rotate-[8deg]" />
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-[0.95rem] font-semibold tracking-tight text-ink">{profile.name}</span>
              <span className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-faint">Software Engineer</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id} className="relative">
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'relative z-10 block rounded-full px-3.5 py-2 text-[0.84rem] font-medium transition-colors',
                      isActive ? 'text-ink' : 'text-muted hover:text-ink',
                    )}
                  >
                    {item.label}
                  </a>
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full border border-line-soft bg-elevated"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <a href={asset(profile.cvFile)} download className="btn-primary hidden !py-2.5 md:inline-flex">
              <Download size={15} />
              CV
            </a>
            <button
              type="button"
              className="icon-btn lg:hidden"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[70] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-bg/70 backdrop-blur-md" onClick={() => setOpen(false)} />
            <motion.div
              id="mobile-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              tabIndex={-1}
              initial={{ y: -20, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -12, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease }}
              className="glass absolute inset-x-3 top-3 overflow-hidden rounded-3xl p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-semibold">{profile.name}</span>
                <button type="button" className="icon-btn" onClick={() => setOpen(false)} aria-label="Close menu">
                  <X size={18} />
                </button>
              </div>
              <ul className="mt-6 grid gap-1">
                {navigation.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i + 0.1, duration: 0.4, ease }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl font-medium transition',
                        active === item.id ? 'bg-elevated text-ink' : 'text-muted hover:bg-elevated/60 hover:text-ink',
                      )}
                    >
                      {item.label}
                      <span className="font-mono text-xs text-faint">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <a href={asset(profile.cvFile)} download className="btn-primary">
                  <Download size={15} /> Download CV
                </a>
                <a href="#contact" onClick={() => setOpen(false)} className="btn-ghost">
                  Let's Connect
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
