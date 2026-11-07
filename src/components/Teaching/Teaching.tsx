import { motion } from 'framer-motion';
import { BookMarked, Code2, FileText, Link2, Presentation, PlayCircle, GraduationCap } from 'lucide-react';
import { courses as localCourses } from '@/data/teaching';
import type { Course, TeachingResource } from '@/types/content';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { useContent } from '@/hooks/useContent';
import { useSpotlight } from '@/hooks/useSpotlight';
import { Icon } from '@/utils/icons';
import { asset } from '@/utils/cn';
import { fadeUp, inView, stagger } from '@/utils/motion';

const resourceIcon: Record<TeachingResource['type'], typeof FileText> = {
  slides: Presentation,
  notes: FileText,
  tutorial: BookMarked,
  link: Link2,
  video: PlayCircle,
  code: Code2,
};

function CourseCard({ course }: { course: Course }) {
  const spot = useSpotlight<HTMLElement>();
  return (
    <motion.article variants={fadeUp} onMouseMove={spot} className="card spotlight group flex flex-col overflow-hidden" aria-labelledby={`course-${course.id}`}>
      {/* Notebook header */}
      <div className="relative overflow-hidden border-b border-line-soft bg-bg/50 px-6 pb-6 pt-7">
        <div aria-hidden="true" className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_23px,rgb(var(--c-line)/0.07)_24px)]" />
        <div aria-hidden="true" className="absolute inset-y-0 left-10 w-px bg-danger/20" />
        <div className="relative flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line-soft bg-surface text-cyan transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
            <Icon name={course.icon} size={22} />
          </span>
          <span className="font-mono text-xs text-faint">{course.code}</span>
        </div>
        <h3 id={`course-${course.id}`} className="relative mt-6 font-display text-[1.4rem] font-semibold leading-tight text-ink">
          {course.title}
        </h3>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-[0.93rem] leading-relaxed text-muted">{course.description}</p>
        <p className="mt-6 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint">Topics</p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {course.topics.map((t) => (
            <li key={t} className="chip">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-faint">Materials</p>
          {course.resources.length ? (
            <ul className="mt-3 space-y-1.5">
              {course.resources.map((r) => {
                const I = resourceIcon[r.type] ?? Link2;
                return (
                  <li key={r.href}>
                    <a
                      href={asset(r.href)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 rounded-xl border border-line-soft px-3 py-2 text-sm text-ink/90 transition hover:border-cyan/40 hover:bg-elevated"
                    >
                      <I size={15} className="text-cyan" aria-hidden="true" />
                      {r.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="mt-3 rounded-xl border border-dashed border-line-soft px-3 py-2.5 text-xs text-faint">
              Lecture notes, slides and tutorials will be published here.
            </p>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function Teaching() {
  const { data: courses } = useContent<Course[]>('courses', localCourses);
  return (
    <section id="teaching" aria-labelledby="teaching-title" className="section overflow-hidden bg-surface/30">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-line/20 to-transparent" />
      <div aria-hidden="true" className="glow pointer-events-none absolute -right-40 top-20 h-[26rem] w-[26rem] rounded-full bg-violet" />
      <div className="container relative max-w-site">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <SectionHeading
            id="teaching-title"
            index="06"
            eyebrow="Teaching & Knowledge Sharing"
            title={<>Knowledge Is Meant to Be <span className="text-gradient">Shared.</span></>}
          />
          <Reveal className="space-y-4 text-muted lg:pb-2">
            <p className="flex items-center gap-2 font-medium text-ink">
              <GraduationCap size={18} className="text-cyan" aria-hidden="true" /> University Lecturer · Khana-e-Noor University
            </p>
            <p className="leading-relaxed">
              I teach computer science subjects, explain programming concepts, and help students develop practical technical skills, connecting theory to the way software is built in industry.
            </p>
          </Reveal>
        </div>

        <motion.div variants={stagger(0.12)} initial="hidden" whileInView="show" viewport={inView} className="mt-14 grid gap-5 md:grid-cols-3">
          {courses.map((c) => (
            <CourseCard key={c.id} course={c} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
