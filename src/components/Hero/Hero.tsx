import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, Download, Landmark, GraduationCap, Network, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { profile } from '@/data/profile';
import { asset } from '@/utils/cn';
import { ease } from '@/utils/motion';
import { HeroVisual } from './HeroVisual';
import { TechMarquee } from './TechMarquee';

const HIGHLIGHT = 'Powerful Digital Solutions.';

function AnimatedHeadline() {
  const [before] = profile.headline.split(HIGHLIGHT);
  const words = before.trim().split(' ');
  const hl = HIGHLIGHT.split(' ');
  const word = (w: string, i: number, gradient = false) => (
    <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.12em] align-bottom">
      <motion.span
        className={`inline-block ${gradient ? 'text-gradient' : ''}`}
        initial={{ y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.07 }}
      >
        {w}
      </motion.span>
      &nbsp;
    </span>
  );
  return (
    <h1 className="font-display text-[2.5rem] font-semibold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[3.4rem] lg:text-[3.5rem] xl:text-[4rem]">
      {words.map((w, i) => word(w, i))}
      {hl.map((w, i) => word(w, words.length + i, true))}
    </h1>
  );
}

function RoleRotator() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % profile.titles.length), 2600);
    return () => window.clearInterval(id);
  }, [reduce]);
  return (
    <span className="relative inline-flex h-[1.5em] min-w-[12rem] overflow-hidden align-bottom" aria-live="off">
      <AnimatePresence mode="wait">
        <motion.span
          key={profile.titles[i]}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className="absolute left-0 whitespace-nowrap text-ink"
        >
          {profile.titles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const pillars = [
  { icon: Landmark, label: 'Government software' },
  { icon: Network, label: 'System architecture' },
  { icon: GraduationCap, label: 'Academic teaching' },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const item = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease, delay },
  });

  return (
    <section id="top" ref={ref} aria-labelledby="hero-heading" className="relative isolate overflow-hidden pt-28 md:pt-28">
      {/* Background */}
      <motion.div style={{ y: yBg }} aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid mask-radial absolute inset-0" />
        <div className="glow absolute -left-40 top-10 h-[34rem] w-[34rem] rounded-full bg-accent" />
        <div className="glow absolute -right-32 top-40 h-[30rem] w-[30rem] rounded-full bg-violet" />
        <div className="glow absolute left-1/3 top-[70%] h-[20rem] w-[28rem] rounded-full bg-cyan" style={{ opacity: "calc(var(--glow-alpha) * 0.6)" }} />
      </motion.div>

      <motion.div style={{ opacity: fadeOut }} className="container max-w-site">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-10 [&>*]:min-w-0">
          <div className="relative">
            <motion.div {...item(0.1)}>
              <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2 pr-4 text-xs font-medium text-muted">
                <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-success/15">
                  <span className="absolute h-2 w-2 animate-pulse-ring rounded-full bg-success" />
                  <span className="relative h-2 w-2 rounded-full bg-success" />
                </span>
                {profile.status}
              </span>
            </motion.div>

            <div className="mt-7" id="hero-heading">
              <AnimatedHeadline />
            </div>

            <motion.p {...item(0.75)} className="mt-6 max-w-xl text-lg leading-relaxed text-ink/85">
              {profile.intro}
            </motion.p>
            <motion.p {...item(0.85)} className="mt-4 max-w-xl text-[0.98rem] leading-relaxed text-muted">
              {profile.supporting}
            </motion.p>

            <motion.div {...item(0.95)} className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn-primary group">
                Explore My Work
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
              <a href={asset(profile.cvFile)} download className="btn-ghost group">
                <Download size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
                Download My CV
              </a>
              <a href="#contact" className="btn-ghost group">
                <Send size={15} className="transition-transform duration-300 group-hover:rotate-12" />
                Let's Connect
              </a>
            </motion.div>

            <motion.div {...item(1.1)} className="mt-9 flex flex-col gap-5 border-t border-line-soft pt-6 xl:flex-row xl:items-center xl:gap-8">
              <p className="font-mono text-xs text-faint">
                <span className="text-cyan">~/</span>role:&nbsp;
                <RoleRotator />
              </p>
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {pillars.map(({ icon: I, label }) => (
                  <li key={label} className="flex items-center gap-2 text-xs text-muted">
                    <I size={14} className="text-cyan" aria-hidden="true" />
                    {label}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <HeroVisual />
        </div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="group mx-auto mt-16 hidden w-fit flex-col items-center gap-2 text-faint transition hover:text-ink md:flex"
          aria-label="Scroll to about section"
        >
          <span className="font-mono text-[0.62rem] uppercase tracking-[0.25em]">Scroll</span>
          <span className="grid h-9 w-6 place-items-start justify-center rounded-full border border-line-soft pt-1.5">
            <motion.span
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="h-1.5 w-1 rounded-full bg-current"
            />
          </span>
          <ArrowDown size={12} className="sr-only" />
        </motion.a>
      </motion.div>

      <TechMarquee />
    </section>
  );
}
