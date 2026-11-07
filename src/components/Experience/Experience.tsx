import { motion, useScroll, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { experience as localExperience } from '@/data/experience';
import type { Experience as Exp } from '@/types/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useContent } from '@/hooks/useContent';
import { useSpotlight } from '@/hooks/useSpotlight';
import { Icon } from '@/utils/icons';
import { cn } from '@/utils/cn';
import { ease, inView } from '@/utils/motion';

function period(e: Exp) {
  if (e.start && e.end) return `${e.start} — ${e.end}`;
  if (e.start) return `${e.start} — Present`;
  if (e.current) return 'Present';
  return e.end ?? '';
}

function TimelineItem({ item, index }: { item: Exp; index: number }) {
  const spot = useSpotlight<HTMLDivElement>();
  const right = index % 2 === 1;
  return (
    <li className="relative grid md:grid-cols-2 md:gap-24">
      {/* Node */}
      <motion.span
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={inView}
        transition={{ duration: 0.5, ease, delay: 0.1 }}
        className="absolute left-5 top-7 z-10 grid h-10 w-10 -translate-x-1/2 place-items-center rounded-full border border-cyan/40 bg-surface text-cyan shadow-[0_0_0_6px_rgb(var(--c-bg))] md:left-1/2"
        aria-hidden="true"
      >
        <Icon name={item.icon} size={17} />
        {item.current && <span className="absolute inset-0 animate-pulse-ring rounded-full border border-cyan/60" />}
      </motion.span>

      {/* Date column (desktop) */}
      <div className={cn('hidden pt-9 md:block', right ? 'md:order-2 md:pl-2' : 'md:pr-2 md:text-right')}>
        <p className="font-mono text-sm text-ink/80">{period(item)}</p>
        {item.type && <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faint">{item.type}</p>}
      </div>

      <motion.div
        initial={{ opacity: 0, x: right ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inView}
        transition={{ duration: 0.8, ease }}
        className={cn('pl-14 md:pl-0', right ? 'md:order-1' : '')}
      >
        <div onMouseMove={spot} className="card spotlight p-6 md:p-7">
          <div className="flex flex-wrap items-center gap-2">
            {item.current && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-success">
                <span className="h-1.5 w-1.5 rounded-full bg-success" /> Current
              </span>
            )}
            <span className="font-mono text-xs text-muted md:hidden">{period(item)}</span>
          </div>
          <h3 className="mt-3 font-display text-xl font-semibold text-ink md:text-2xl">{item.position}</h3>
          <p className="mt-1 text-[0.95rem] font-medium text-cyan">{item.organization}</p>
          <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{item.description}</p>
          {(item.highlights?.length || item.technologies?.length) && (
            <ul className="mt-5 flex flex-wrap gap-1.5">
              {[...(item.highlights ?? []), ...(item.technologies ?? [])].map((h) => (
                <li key={h} className="chip">
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </li>
  );
}

export function Experience() {
  const { data: experience } = useContent<Exp[]>('experience', localExperience);
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section id="experience" aria-labelledby="experience-title" className="section bg-surface/30">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line/20 to-transparent" />
      <div className="container max-w-site">
        <SectionHeading
          id="experience-title"
          index="04"
          align="center"
          eyebrow="Experience"
          title={<>My Professional <span className="text-gradient">Journey.</span></>}
          description="Building software for government and organizations, and teaching computer science at university."
        />

        <div className="relative mx-auto mt-20 max-w-5xl">
          <div aria-hidden="true" className="absolute bottom-0 left-5 top-0 w-px bg-line/15 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-5 top-0 w-px origin-top bg-gradient-to-b from-cyan via-accent to-violet md:left-1/2 md:-translate-x-1/2"
          />
          <ol ref={ref} className="relative space-y-12 md:space-y-16">
            {experience.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
