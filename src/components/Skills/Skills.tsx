import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import type { SkillCategory } from '@/types/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useSpotlight } from '@/hooks/useSpotlight';
import { Icon, getIcon } from '@/utils/icons';
import { fadeUp, inView, stagger } from '@/utils/motion';
import { cn } from '@/utils/cn';

const accentText: Record<SkillCategory['accent'], string> = {
  accent: 'text-accent',
  cyan: 'text-cyan',
  violet: 'text-violet',
};
const accentBg: Record<SkillCategory['accent'], string> = {
  accent: 'from-accent/25',
  cyan: 'from-cyan/20',
  violet: 'from-violet/25',
};

/** Bento placement on large screens (6-column grid) */
const span: Record<SkillCategory['size'], string> = {
  full: 'lg:col-span-6',
  lg: 'lg:col-span-4',
  md: 'lg:col-span-2',
  sm: 'lg:col-span-2',
};

function TechTile({ name, icon }: { name: string; icon: string }) {
  const { color } = getIcon(icon);
  return (
    <li
      className="group/tile relative flex items-center gap-3 rounded-2xl border border-line-soft bg-bg/40 px-3.5 py-3 transition duration-300 hover:-translate-y-0.5 hover:bg-elevated"
      style={{ ['--brand' as string]: color ?? 'rgb(var(--c-cyan))' }}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-elevated text-muted transition-colors duration-300 group-hover/tile:text-[var(--brand)] group-hover/tile:shadow-[0_0_24px_-6px_var(--brand)]">
        <Icon name={icon} size={18} />
      </span>
      <span className="text-[0.85rem] font-medium leading-tight text-ink/90">{name}</span>
    </li>
  );
}

function TechPill({ name, icon }: { name: string; icon: string }) {
  const { color } = getIcon(icon);
  return (
    <li
      className="group/tile flex items-center gap-2 rounded-full border border-line-soft bg-bg/40 py-1.5 pl-1.5 pr-3.5 transition duration-300 hover:-translate-y-0.5 hover:bg-elevated"
      style={{ ['--brand' as string]: color ?? 'rgb(var(--c-cyan))' }}
    >
      <span className="grid h-7 w-7 place-items-center rounded-full bg-elevated text-muted transition-colors duration-300 group-hover/tile:text-[var(--brand)]">
        <Icon name={icon} size={15} />
      </span>
      <span className="text-[0.82rem] font-medium text-ink/90">{name}</span>
    </li>
  );
}

function CategoryCard({ cat, index }: { cat: SkillCategory; index: number }) {
  const spot = useSpotlight<HTMLElement>();
  const wide = cat.size === 'lg' || cat.size === 'full';
  const full = cat.size === 'full';
  return (
    <motion.article
      variants={fadeUp}
      onMouseMove={spot}
      className={cn('card spotlight group overflow-hidden p-6 md:p-7', span[cat.size], wide ? 'md:col-span-2' : '')}
      aria-labelledby={`skill-${cat.id}`}
    >
      <div aria-hidden="true" className={cn('pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gradient-to-br to-transparent blur-2xl transition-opacity duration-500 group-hover:opacity-100', accentBg[cat.accent], 'opacity-60')} />
      <div className="relative flex items-start justify-between gap-6">
        <div>
          <span className={cn('grid h-12 w-12 place-items-center rounded-2xl border border-line-soft bg-elevated', accentText[cat.accent])}>
            <Icon name={cat.icon} size={22} />
          </span>
          <h3 id={`skill-${cat.id}`} className="mt-5 font-display text-xl font-semibold text-ink">
            {cat.title}
          </h3>
          <p className="mt-1.5 max-w-sm text-sm text-muted">{cat.description}</p>
        </div>
        <span className="whitespace-nowrap font-mono text-xs text-faint">
          {String(index + 1).padStart(2, '0')} / {String(cat.items.length).padStart(2, '0')}
        </span>
      </div>
      {wide ? (
        <ul className={cn('relative mt-7 grid gap-2.5', full ? 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-6' : 'grid-cols-2 sm:grid-cols-3 xl:grid-cols-4')}>
          {cat.items.map((t) => (
            <TechTile key={t.name} {...t} />
          ))}
        </ul>
      ) : (
        <ul className="relative mt-7 flex flex-wrap gap-2">
          {cat.items.map((t) => (
            <TechPill key={t.name} {...t} />
          ))}
        </ul>
      )}
    </motion.article>
  );
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section overflow-hidden">
      <div aria-hidden="true" className="bg-dots pointer-events-none absolute inset-x-0 top-0 h-[60%] opacity-40 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <div className="container relative max-w-site">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionHeading
            id="skills-title"
            index="02"
            eyebrow="Technical Expertise"
            title={<>My Technical <span className="text-gradient">Arsenal.</span></>}
            description="The tools I use to design, build, ship and operate software, from the database schema to the production server."
          />
          <p className="max-w-[16rem] font-mono text-xs leading-relaxed text-faint md:text-right">
            {skillCategories.length} domains · {skillCategories.reduce((n, c) => n + c.items.length, 0)} technologies
            <br />
            hover a tile to light it up
          </p>
        </div>

        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6"
        >
          {skillCategories.map((cat, i) => (
            <CategoryCard key={cat.id} cat={cat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
