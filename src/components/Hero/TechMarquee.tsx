import { marqueeTech, skillCategories } from '@/data/skills';
import { Icon } from '@/utils/icons';

const names = new Map(skillCategories.flatMap((c) => c.items.map((i) => [i.icon, i.name] as const)));

export function TechMarquee() {
  const items = [...marqueeTech, ...marqueeTech];
  return (
    <div className="relative mt-16 border-y border-line-soft bg-surface/40 py-5 md:mt-10" aria-label="Technologies I work with">
      <div className="mask-fade-x group flex overflow-hidden">
        <ul className="flex w-max shrink-0 animate-marquee items-center gap-10 pr-10 group-hover:[animation-play-state:paused]">
          {items.map((key, i) => (
            <li
              key={`${key}-${i}`}
              aria-hidden={i >= marqueeTech.length ? 'true' : undefined}
              className="flex items-center gap-2.5 whitespace-nowrap text-sm font-medium text-faint transition-colors hover:text-ink"
            >
              <Icon name={key} size={18} brand className="opacity-80" />
              {names.get(key) ?? key}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
