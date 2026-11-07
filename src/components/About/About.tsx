import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { currentRoles, highlights, profile } from '@/data/profile';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { useSpotlight } from '@/hooks/useSpotlight';
import { Icon } from '@/utils/icons';
import { fadeUp, inView, stagger } from '@/utils/motion';
import { cn } from '@/utils/cn';

export function About() {
  const spot = useSpotlight<HTMLLIElement>();
  const [lead, ...rest] = profile.summary;

  return (
    <section id="about" aria-labelledby="about-title" className="section">
      <div className="container max-w-site">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          {/* Left: narrative */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading id="about-title" index="01" eyebrow="About" title={<>Beyond Writing <span className="text-gradient">Code.</span></>} />

            <Reveal className="mt-8 space-y-5 text-[1.02rem] leading-relaxed text-muted">
              <p className="text-lg text-ink/90">{lead}</p>
              {rest.slice(0, 3).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="mt-10">
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-faint">Currently</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {currentRoles.map((r) => (
                  <li key={r.organization} className="card flex items-start gap-3 rounded-2xl p-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                      <Icon name={r.icon} size={18} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-ink">{r.role}</span>
                      <span className="mt-0.5 block text-[0.8rem] text-muted">{r.organization}</span>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 flex items-center gap-2 text-sm text-faint">
                <MapPin size={14} aria-hidden="true" /> Based in {profile.location}
              </p>
            </Reveal>
          </div>

          {/* Right: bento of what I combine */}
          <div>
            <motion.ul
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="grid auto-rows-[minmax(10.5rem,auto)] gap-4 sm:grid-cols-2"
            >
              {highlights.map((h, i) => (
                <motion.li
                  key={h.title}
                  variants={fadeUp}
                  onMouseMove={spot}
                  className={cn(
                    'card spotlight group flex flex-col justify-between overflow-hidden p-6',
                    i === 0 && 'sm:col-span-2 sm:flex-row sm:items-end sm:gap-8',
                    i === 3 && 'sm:row-span-2',
                  )}
                >
                  <div className={cn('flex items-start justify-between gap-4', i === 0 && 'sm:flex-col sm:justify-start')}>
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-line-soft bg-elevated text-cyan transition duration-500 group-hover:scale-110 group-hover:text-ink">
                      <Icon name={h.icon} size={20} />
                    </span>
                    <span className="font-mono text-xs text-faint">/{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className={cn('mt-8', i === 0 && 'sm:mt-0 sm:max-w-md')}>
                    <h3 className={cn('font-display font-semibold text-ink', i === 0 ? 'text-2xl' : 'text-lg')}>{h.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{h.description}</p>
                  </div>
                  {i === 3 && (
                    <div aria-hidden="true" className="relative mt-8 hidden h-28 overflow-hidden rounded-2xl border border-line-soft bg-bg/50 sm:block">
                      <div className="bg-dots absolute inset-0 opacity-70" />
                      <div className="absolute inset-x-4 top-1/2 flex -translate-y-1/2 items-center justify-between">
                        {['Paper', 'Workflow', 'Digital'].map((s, k) => (
                          <div key={s} className="flex items-center">
                            <span
                              className={cn(
                                'rounded-lg border px-2 py-1 font-mono text-[0.6rem]',
                                k === 2 ? 'border-cyan/40 bg-cyan/10 text-cyan' : 'border-line-soft bg-surface text-muted',
                              )}
                            >
                              {s}
                            </span>
                            {k < 2 && <span className="mx-1.5 h-px w-4 bg-gradient-to-r from-faint/50 to-cyan/60" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>
      </div>
    </section>
  );
}
