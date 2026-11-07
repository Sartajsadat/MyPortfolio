import { useState } from 'react';
import type { Project } from '@/types/content';
import { asset, cn } from '@/utils/cn';
import { ProjectMockup } from './ProjectMockup';

/** Shows a real screenshot when provided (with a loading skeleton), otherwise the illustrated mockup. */
export function ProjectMedia({ project, index = 0, className }: { project: Project; index?: number; className?: string }) {
  const src = project.images?.[index];
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={className}>
        <ProjectMockup variant={project.mockup} />
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden rounded-[14px] border border-line-soft bg-elevated', className)} style={{ aspectRatio: '16 / 10' }}>
      {!loaded && (
        <div
          aria-hidden="true"
          className="absolute inset-0 animate-shimmer bg-[linear-gradient(90deg,transparent,rgb(var(--c-line)/0.08),transparent)] bg-[length:200%_100%]"
        />
      )}
      <img
        src={asset(src)}
        alt={`${project.title} screenshot`}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className={cn('h-full w-full object-cover object-top transition-opacity duration-500', loaded ? 'opacity-100' : 'opacity-0')}
      />
    </div>
  );
}
