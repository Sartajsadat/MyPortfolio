import type { Project } from '@/types/content';
import { cn } from '@/utils/cn';

const tones: Record<NonNullable<Project['statusTone']>, string> = {
  live: 'text-success border-success/30 bg-success/10',
  progress: 'text-warning border-warning/30 bg-warning/10',
  concept: 'text-violet border-violet/30 bg-violet/10',
  academic: 'text-cyan border-cyan/30 bg-cyan/10',
};

export function StatusBadge({ status, tone = 'concept', className }: { status: string; tone?: Project['statusTone']; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-wider backdrop-blur',
        tones[tone ?? 'concept'],
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        {tone === 'progress' && <span className="absolute inset-0 animate-pulse-ring rounded-full bg-current" />}
        <span className="relative h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {status}
    </span>
  );
}
