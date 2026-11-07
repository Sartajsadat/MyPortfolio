import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

interface Props {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
  layoutId: string;
  counts?: Record<string, number>;
}

/** Accessible segmented filter (radio group semantics). */
export function FilterGroup({ label, options, value, onChange, layoutId, counts }: Props) {
  return (
    <div role="radiogroup" aria-label={label} className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1 py-1">
      {options.map((opt) => {
        const active = opt === value;
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt)}
            className={cn(
              'relative shrink-0 whitespace-nowrap rounded-full px-3.5 py-2 text-[0.8rem] font-medium transition-colors',
              active ? 'text-ink' : 'text-muted hover:text-ink',
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                className="absolute inset-0 rounded-full border border-cyan/30 bg-elevated"
                transition={{ type: 'spring', stiffness: 400, damping: 34 }}
              />
            )}
            <span className="relative flex items-center gap-1.5">
              {opt}
              {counts && <span className="font-mono text-[0.65rem] text-faint">{counts[opt] ?? 0}</span>}
            </span>
          </button>
        );
      })}
    </div>
  );
}
