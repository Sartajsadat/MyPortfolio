import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { Loader2, SearchX } from 'lucide-react';
import { Suspense, lazy, useCallback, useEffect, useMemo, useState } from 'react';
import { projects as localProjects } from '@/data/projects';
import type { Project } from '@/types/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useContent } from '@/hooks/useContent';
import { FilterGroup } from './ProjectFilters';
import { ProjectCard } from './ProjectCard';

const ProjectModal = lazy(() => import('./ProjectModal'));

const ALL = 'All';
const HASH = '#project/';

export function Projects() {
  const { data: projects } = useContent<Project[]>('projects', localProjects);
  const [category, setCategory] = useState(ALL);
  const [tech, setTech] = useState(ALL);
  const [openId, setOpenId] = useState<string | null>(null);

  const categories = useMemo(() => [ALL, ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const technologies = useMemo(() => {
    const freq = new Map<string, number>();
    projects.forEach((p) => p.technologies.forEach((t) => freq.set(t, (freq.get(t) ?? 0) + 1)));
    return [ALL, ...Array.from(freq.entries()).sort((a, b) => b[1] - a[1]).map(([t]) => t)];
  }, [projects]);

  const categoryCounts = useMemo(() => {
    const c: Record<string, number> = { [ALL]: projects.length };
    projects.forEach((p) => (c[p.category] = (c[p.category] ?? 0) + 1));
    return c;
  }, [projects]);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) => (category === ALL || p.category === category) && (tech === ALL || p.technologies.includes(tech)),
      ),
    [projects, category, tech],
  );

  // Deep links: #project/<id>
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash;
      setOpenId(h.startsWith(HASH) ? decodeURIComponent(h.slice(HASH.length)) : null);
    };
    sync();
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  const open = useCallback((p: Project) => {
    window.history.pushState(null, '', `${HASH}${p.id}`);
    setOpenId(p.id);
  }, []);

  const close = useCallback(() => {
    window.history.replaceState(null, '', '#projects');
    setOpenId(null);
  }, []);

  const list = filtered.length ? filtered : projects;
  const openIndex = list.findIndex((p) => p.id === openId);
  const current = openIndex >= 0 ? list[openIndex] : projects.find((p) => p.id === openId);

  const step = useCallback(
    (dir: 1 | -1) => {
      if (!list.length) return;
      const i = openIndex < 0 ? 0 : (openIndex + dir + list.length) % list.length;
      window.history.replaceState(null, '', `${HASH}${list[i].id}`);
      setOpenId(list[i].id);
    },
    [list, openIndex],
  );

  const reset = () => {
    setCategory(ALL);
    setTech(ALL);
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-40 -z-10 h-[40rem] bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgb(var(--c-accent)/0.10),transparent_70%)]" />
      <div className="container max-w-site">
        <SectionHeading
          id="projects-title"
          index="03"
          eyebrow="Featured Projects"
          title={<>Systems I've <span className="text-gradient">Designed & Built.</span></>}
          description="Enterprise platforms, infrastructure tooling and management systems, many of them built for government and organizational use."
        />

        {/* Filters */}
        <div className="glass sticky top-[4.75rem] z-30 mt-12 flex flex-col gap-1 rounded-3xl p-2 md:flex-row md:items-center md:justify-between md:rounded-full">
          <div className="min-w-0 md:shrink-0">
          <FilterGroup label="Filter by category" options={categories} value={category} onChange={setCategory} layoutId="cat-pill" counts={categoryCounts} />
          </div>
          <div className="hidden h-6 w-px bg-line/15 md:block" aria-hidden="true" />
          <div className="flex min-w-0 flex-1 items-center gap-2">
            <span className="pl-3 font-mono text-[0.62rem] uppercase tracking-widest text-faint">Tech</span>
            <div className="mask-fade-x min-w-0 flex-1">
              <FilterGroup label="Filter by technology" options={technologies} value={tech} onChange={setTech} layoutId="tech-pill" />
            </div>
          </div>
        </div>

        <p className="mt-6 font-mono text-xs text-faint" aria-live="polite">
          Showing {filtered.length} of {projects.length} projects
        </p>

        <LayoutGroup>
          <motion.div layout className="mt-6 grid gap-5 lg:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filtered.map((p, i) => {
                // First featured project spans the full row; a trailing odd card does too, so the grid never leaves a gap.
                const firstLarge = !!filtered[0]?.featured;
                const rest = filtered.length - (firstLarge ? 1 : 0);
                const large = (i === 0 && firstLarge) || (i > 0 && i === filtered.length - 1 && rest % 2 === 1);
                return <ProjectCard key={p.id} project={p} index={projects.indexOf(p)} large={large} onOpen={open} />;
              })}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filtered.length === 0 && (
          <div className="card mt-6 flex flex-col items-center gap-4 p-12 text-center">
            <SearchX className="text-faint" size={28} aria-hidden="true" />
            <p className="text-muted">No projects match these filters yet.</p>
            <button type="button" className="btn-ghost" onClick={reset}>
              Clear filters
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {current && (
          <Suspense
            fallback={
              <div className="fixed inset-0 z-[80] grid place-items-center bg-bg/70 backdrop-blur" role="status">
                <Loader2 className="animate-spin text-cyan" aria-label="Loading project" />
              </div>
            }
          >
            <ProjectModal
              key="modal"
              project={current}
              onClose={close}
              onPrev={() => step(-1)}
              onNext={() => step(1)}
              position={`${String((openIndex < 0 ? 0 : openIndex) + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </section>
  );
}
