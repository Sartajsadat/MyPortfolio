import { motion } from 'framer-motion';
import { Award, BookOpen, ExternalLink, GraduationCap, Trophy } from 'lucide-react';
import { achievements, certifications, education, publications, researchInterests } from '@/data/education';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Icon } from '@/utils/icons';
import { fadeUp, inView, stagger } from '@/utils/motion';

function DegreeCard() {
  return (
    <div className="space-y-5">
      {education.map((ed) => (
        <Reveal key={ed.institution + ed.degree} className="card group relative overflow-hidden p-7 md:p-9">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[conic-gradient(from_180deg,rgb(var(--c-accent)/0.35),rgb(var(--c-violet)/0.3),rgb(var(--c-cyan)/0.3),rgb(var(--c-accent)/0.35))] opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70" />
          <div className="relative flex items-start justify-between gap-6">
            <span className="grid h-14 w-14 place-items-center rounded-2xl border border-line-soft bg-elevated text-cyan">
              <GraduationCap size={26} />
            </span>
            <span className="font-display text-5xl font-semibold tracking-tight text-ink/10 md:text-7xl" aria-hidden="true">
              {ed.year}
            </span>
          </div>
          <p className="relative mt-8 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-faint">{ed.degree}</p>
          <h3 className="relative mt-2 font-display text-3xl font-semibold text-ink md:text-[2.4rem]">{ed.field}</h3>
          <p className="relative mt-3 text-lg text-cyan">{ed.institution}</p>
          {ed.description && <p className="relative mt-5 max-w-lg leading-relaxed text-muted">{ed.description}</p>}
          <div className="relative mt-7 flex items-center gap-3 border-t border-line-soft pt-5 text-sm text-muted">
            <span className="h-2 w-2 rounded-full bg-success" aria-hidden="true" />
            Graduated {ed.year}
          </div>
        </Reveal>
      ))}
    </div>
  );
}

function Extras() {
  const groups = [
    { title: 'Certifications', icon: Award, items: certifications.map((c) => ({ t: c.name, s: [c.issuer, c.date].filter(Boolean).join(' · '), url: c.url })) },
    { title: 'Achievements', icon: Trophy, items: achievements.map((a) => ({ t: a.title, s: [a.description, a.date].filter(Boolean).join(' · '), url: undefined })) },
    { title: 'Publications', icon: BookOpen, items: publications.map((p) => ({ t: p.title, s: [p.venue, p.year].filter(Boolean).join(' · '), url: p.url })) },
  ].filter((g) => g.items.length > 0);

  if (!groups.length) return null;

  return (
    <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {groups.map(({ title, icon: I, items }) => (
        <Reveal key={title} className="card p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold">
            <I size={18} className="text-cyan" aria-hidden="true" /> {title}
          </h3>
          <ul className="mt-4 space-y-3">
            {items.map((it) => (
              <li key={it.t} className="text-sm">
                {it.url ? (
                  <a href={it.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-medium text-ink hover:text-cyan">
                    {it.t} <ExternalLink size={12} />
                  </a>
                ) : (
                  <span className="font-medium text-ink">{it.t}</span>
                )}
                {it.s && <span className="block text-muted">{it.s}</span>}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  );
}

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="section">
      <div className="container max-w-site">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading
              id="education-title"
              index="05"
              eyebrow="Education"
              title={<>Education & Academic <span className="text-gradient">Development.</span></>}
              description="A software engineering degree, followed by ongoing study in the areas shaping the future of computing."
            />

            <Reveal className="mt-12">
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-faint">Research & learning interests</p>
            </Reveal>
            <motion.ul variants={stagger(0.07)} initial="hidden" whileInView="show" viewport={inView} className="mt-5 flex flex-wrap gap-2.5">
              {researchInterests.map((r) => (
                <motion.li
                  key={r.title}
                  variants={fadeUp}
                  whileHover={{ y: -3 }}
                  className="flex items-center gap-2.5 rounded-2xl border border-line-soft bg-surface/70 px-4 py-3 text-sm font-medium text-ink/90 transition-colors hover:border-violet/40"
                >
                  <span className="grid h-8 w-8 place-items-center rounded-xl bg-violet/10 text-violet">
                    <Icon name={r.icon} size={16} />
                  </span>
                  {r.title}
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <DegreeCard />
        </div>
        <Extras />
      </div>
    </section>
  );
}
