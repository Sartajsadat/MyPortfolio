import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import type { Project } from '@/types/content';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TechBadge } from '@/components/ui/TechBadge';
import { useSpotlight } from '@/hooks/useSpotlight';
import { cn } from '@/utils/cn';
import { ease } from '@/utils/motion';
import { ProjectMedia } from './ProjectMedia';

interface Props {
  project: Project;
  index: number;
  large?: boolean;
  onOpen: (p: Project) => void;
}

export function ProjectCard({ project, index, large, onOpen }: Props) {
  const spot = useSpotlight<HTMLElement>();
  const num = String(index + 1).padStart(2, '0');

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.2 } }}
      transition={{ duration: 0.6, ease }}
      onMouseMove={spot}
      className={cn(
        'card spotlight group flex flex-col overflow-hidden p-3 sm:p-4',
        large && 'lg:col-span-2 lg:grid lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-4',
      )}
      aria-labelledby={`project-${project.id}`}
    >
      {/* Media */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="relative block overflow-hidden rounded-2xl bg-bg/60 p-3 text-left sm:p-5"
        aria-label={`View details for ${project.title}`}
        tabIndex={-1}
      >
        <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
        <div aria-hidden="true" className="absolute -bottom-16 left-1/2 h-40 w-3/4 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl transition-opacity duration-500 group-hover:opacity-100 sm:opacity-60" />
        <div className="relative transition-transform duration-700 ease-out [transform:perspective(1200px)_rotateX(4deg)] group-hover:[transform:perspective(1200px)_rotateX(0deg)_translateY(-4px)_scale(1.015)]">
          <ProjectMedia project={project} className="shadow-[0_30px_60px_-25px_rgb(0_0_0/0.6)]" />
        </div>
        {project.status && (
          <StatusBadge status={project.status} tone={project.statusTone} className="absolute left-5 top-5 bg-bg/70 sm:left-7 sm:top-7" />
        )}
      </button>

      {/* Body */}
      <div className={cn('flex flex-1 flex-col px-2 pb-2 pt-6 sm:px-3', large && 'lg:py-6 lg:pr-6')}>
        <div className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.18em]">
          <span className="text-cyan">{num}</span>
          <span className="h-px w-5 bg-line/20" />
          <span className="text-faint">{project.category}</span>
          {project.year && <span className="text-faint">· {project.year}</span>}
        </div>
        <h3 id={`project-${project.id}`} className={cn('mt-3 font-display font-semibold leading-tight text-ink', large ? 'text-2xl md:text-[1.9rem]' : 'text-xl')}>
          {project.title}
          {project.shortTitle && project.shortTitle !== project.title && (
            <span className="ml-2 align-middle font-mono text-xs font-normal text-faint">({project.shortTitle})</span>
          )}
        </h3>
        <p className="mt-3 text-[0.94rem] leading-relaxed text-muted">{large ? project.description : project.summary}</p>

        <ul className="mt-5 grid gap-1.5 text-sm text-ink/85" aria-label="Key features">
          {project.features.slice(0, large ? 4 : 3).map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-cyan" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>

        {project.technologies.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Technologies">
            {project.technologies.map((t) => (
              <li key={t}>
                <TechBadge name={t} />
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-6">
          <button type="button" onClick={() => onOpen(project)} className="btn-ghost group/btn !px-4 !py-2.5">
            View Details
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </button>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="icon-btn" aria-label={`${project.title} source code on GitHub`}>
              <SiGithub size={16} />
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="icon-btn" aria-label={`${project.title} live demo`}>
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
