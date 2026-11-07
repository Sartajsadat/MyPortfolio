import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, X } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { useRef } from 'react';
import type { Project } from '@/types/content';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { TechBadge } from '@/components/ui/TechBadge';
import { useFocusTrap } from '@/hooks/useFocusTrap';
import { useLockBody } from '@/hooks/useLockBody';
import { ease } from '@/utils/motion';
import { ProjectMedia } from './ProjectMedia';

interface Props {
  project: Project;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  position: string;
}

export default function ProjectModal({ project, onClose, onPrev, onNext, position }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useLockBody(true);
  useFocusTrap(ref, true, onClose);

  const images = project.images?.length ? project.images : [undefined];

  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') onNext();
        if (e.key === 'ArrowLeft') onPrev();
      }}
    >
      <div className="absolute inset-0 bg-bg/80 backdrop-blur-md" onClick={onClose} aria-hidden="true" />
      <motion.div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        tabIndex={-1}
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.45, ease }}
        className="card relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-b-none bg-surface sm:rounded-3xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-line-soft px-5 py-3.5 md:px-7">
          <div className="flex min-w-0 items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-faint">
            <span className="text-cyan">{position}</span>
            <span className="truncate">{project.category}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button type="button" onClick={onPrev} className="icon-btn !h-9 !w-9" aria-label="Previous project">
              <ArrowLeft size={16} />
            </button>
            <button type="button" onClick={onNext} className="icon-btn !h-9 !w-9" aria-label="Next project">
              <ArrowRight size={16} />
            </button>
            <button type="button" onClick={onClose} className="icon-btn ml-1 !h-9 !w-9" aria-label="Close project details">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="overflow-y-auto overscroll-contain">
          <motion.div key={project.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
            <div className="relative bg-bg/60 p-4 sm:p-8">
              <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
              <div aria-hidden="true" className="absolute -bottom-10 left-1/2 h-40 w-2/3 -translate-x-1/2 rounded-full bg-accent/30 blur-3xl" />
              <div className="relative mx-auto max-w-3xl space-y-4">
                {images.map((_, i) => (
                  <ProjectMedia key={i} project={project} index={i} className="shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)]" />
                ))}
              </div>
            </div>

            <div className="grid gap-10 p-6 md:grid-cols-[1.4fr_1fr] md:p-10">
              <div>
                {project.status && <StatusBadge status={project.status} tone={project.statusTone} className="mb-4" />}
                <h2 id="project-modal-title" className="font-display text-3xl font-semibold leading-tight text-ink md:text-4xl">
                  {project.title}
                </h2>
                {project.shortTitle && <p className="mt-2 font-mono text-sm text-faint">{project.shortTitle}</p>}
                <p className="mt-5 leading-relaxed text-muted">{project.description}</p>

                <h3 className="mt-9 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-faint">
                  {project.statusTone === 'progress' ? 'Planned capabilities' : project.statusTone === 'concept' ? 'Potential features' : 'Key features'}
                </h3>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 rounded-xl border border-line-soft bg-elevated/40 px-3.5 py-3 text-sm text-ink/90">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              <aside className="space-y-7">
                <div>
                  <h3 className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-faint">Technologies</h3>
                  {project.technologies.length ? (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {project.technologies.map((t) => (
                        <li key={t}>
                          <TechBadge name={t} className="!text-xs" />
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm text-faint">Technology details coming soon.</p>
                  )}
                </div>

                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-faint">Category</dt>
                    <dd className="mt-1 text-ink">{project.category}</dd>
                  </div>
                  {project.year && (
                    <div>
                      <dt className="text-faint">Year</dt>
                      <dd className="mt-1 text-ink">{project.year}</dd>
                    </div>
                  )}
                  {project.role && (
                    <div>
                      <dt className="text-faint">Role</dt>
                      <dd className="mt-1 text-ink">{project.role}</dd>
                    </div>
                  )}
                  {project.status && (
                    <div>
                      <dt className="text-faint">Status</dt>
                      <dd className="mt-1 text-ink">{project.status}</dd>
                    </div>
                  )}
                </dl>

                {(project.githubUrl || project.liveUrl) && (
                  <div className="flex flex-wrap gap-2">
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                        <ExternalLink size={15} /> Live Demo
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                        <SiGithub size={15} /> Source Code
                      </a>
                    )}
                  </div>
                )}
                {!project.githubUrl && !project.liveUrl && (
                  <p className="rounded-xl border border-dashed border-line-soft px-4 py-3 text-xs leading-relaxed text-faint">
                    Source code and demo aren't public for this project. Happy to walk through the architecture on a call.
                  </p>
                )}
              </aside>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
