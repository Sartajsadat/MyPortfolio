import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { principles } from '@/data/philosophy';
import type { Principle } from '@/types/content';
import { Icon } from '@/utils/icons';
import { cn } from '@/utils/cn';
import { ease, fadeUp, inView } from '@/utils/motion';

function Row({ p, i }: { p: Principle; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const active = useInView(ref, { margin: '-45% 0px -45% 0px' });
  return (
    <li
      ref={ref}
      className={cn(
        'group relative grid grid-cols-[auto_1fr] gap-5 border-t border-line-soft py-8 transition-all duration-500 md:gap-8 md:py-10',
        active ? 'opacity-100' : 'opacity-100 md:opacity-40 md:hover:opacity-100',
      )}
    >
      <span className={cn('font-mono text-sm transition-colors duration-500', active ? 'text-cyan' : 'text-faint')}>
        {String(i + 1).padStart(2, '0')}
      </span>
      <div className="flex items-start gap-5">
        <div className="min-w-0 flex-1">
          <h3 className="font-display text-2xl font-semibold leading-tight text-ink md:text-[2rem]">{p.title}</h3>
          <motion.p
            initial={false}
            animate={{ opacity: active ? 1 : 0.7 }}
            transition={{ duration: 0.5, ease }}
            className="mt-3 max-w-xl leading-relaxed text-muted"
          >
            {p.description}
          </motion.p>
        </div>
        <span
          className={cn(
            'hidden h-14 w-14 shrink-0 place-items-center rounded-2xl border transition-all duration-500 sm:grid',
            active ? 'border-cyan/40 bg-cyan/10 text-cyan shadow-[0_0_40px_-10px_rgb(var(--c-cyan))]' : 'border-line-soft text-faint',
          )}
        >
          <Icon name={p.icon} size={22} />
        </span>
      </div>
      {/* progress tick */}
      <motion.span
        aria-hidden="true"
        initial={false}
        animate={{ scaleX: active ? 1 : 0 }}
        transition={{ duration: 0.6, ease }}
        className="absolute -top-px left-0 h-px w-full origin-left bg-gradient-to-r from-cyan via-accent to-transparent"
      />
    </li>
  );
}

export function Philosophy() {
  return (
    <section id="philosophy" aria-labelledby="philosophy-title" className="section">
      <div className="container max-w-site">
        <div className="relative overflow-hidden rounded-[2.25rem] border border-line-soft bg-surface/60 px-6 py-16 md:px-14 md:py-20">
          <div aria-hidden="true" className="bg-grid mask-radial pointer-events-none absolute inset-0 opacity-70" />
          <div aria-hidden="true" className="glow pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-accent" />

          <div className="relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={inView} className="eyebrow">
                <span className="text-faint">07</span>
                <span className="h-px w-6 bg-cyan/60" aria-hidden="true" />
                Engineering Philosophy
              </motion.p>
              <motion.h2 id="philosophy-title" variants={fadeUp} initial="hidden" whileInView="show" viewport={inView} className="section-title mt-5">
                How I Approach <span className="text-gradient">Engineering.</span>
              </motion.h2>
              <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={inView} className="mt-8 rounded-2xl border border-line-soft bg-bg/60 p-5 font-mono text-[0.8rem] leading-relaxed">
                <p className="text-faint">// principles.config</p>
                <p className="mt-2">
                  <span className="text-violet">const</span> <span className="text-ink">goal</span> <span className="text-faint">=</span>{' '}
                  <span className="text-success">"software that lasts"</span>
                  <span className="text-faint">;</span>
                </p>
                <p>
                  <span className="text-violet">const</span> <span className="text-ink">focus</span> <span className="text-faint">= [</span>
                  <span className="text-success">"people"</span>
                  <span className="text-faint">, </span>
                  <span className="text-success">"problems"</span>
                  <span className="text-faint">];</span>
                </p>
              </motion.div>
            </div>

            <ol className="border-b border-line-soft">
              {principles.map((p, i) => (
                <Row key={p.title} p={p} i={i} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
