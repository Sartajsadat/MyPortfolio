import { Icon, techIconKey } from '@/utils/icons';
import { cn } from '@/utils/cn';

export function TechBadge({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn('chip font-mono text-[0.7rem]', className)}>
      <Icon name={techIconKey(name)} size={12} brand />
      {name}
    </span>
  );
}
