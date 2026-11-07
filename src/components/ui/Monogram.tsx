import { profile } from '@/data/profile';
import { asset, cn } from '@/utils/cn';

/** Profile photo if one is configured, otherwise an elegant monogram. */
export function Monogram({ className }: { className?: string }) {
  if (profile.photo) {
    return (
      <img
        src={asset(profile.photo)}
        alt={`Portrait of ${profile.name}`}
        className={cn('h-full w-full object-cover', className)}
        loading="eager"
      />
    );
  }
  return (
    <div className={cn('relative grid h-full w-full place-items-center overflow-hidden bg-elevated', className)} role="img" aria-label={`${profile.name} monogram`}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgb(var(--c-accent)/0.35),transparent_60%),radial-gradient(circle_at_80%_90%,rgb(var(--c-violet)/0.3),transparent_55%)]" />
      <span className="text-gradient relative font-display text-3xl font-bold tracking-tight">{profile.initials}</span>
    </div>
  );
}
