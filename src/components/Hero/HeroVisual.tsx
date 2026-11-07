import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { profile } from '@/data/profile';
import { Icon } from '@/utils/icons';
import { ease } from '@/utils/motion';
import { Monogram } from '@/components/ui/Monogram';
import { CodeWindow } from './CodeWindow';

const floating = [
  { icon: 'springboot', className: 'left-[2%] top-[4%]', delay: 0 },
  { icon: 'react', className: 'right-[4%] top-[34%]', delay: 0.6 },
  { icon: 'postgresql', className: 'left-[-3%] top-[54%]', delay: 1.2 },
  { icon: 'docker', className: 'right-[14%] bottom-[-2%]', delay: 1.8 },
  { icon: 'linux', className: 'left-[38%] top-[-4%]', delay: 2.4 },
  { icon: 'python', className: 'right-[-2%] bottom-[30%]', delay: 3 },
];

function FloatIcon({ icon, className, delay }: (typeof floating)[number]) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute z-20 hidden sm:block ${className}`}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 + delay * 0.15, duration: 0.6, ease }}
    >
      <motion.div
        animate={reduce ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
        className="glass grid h-11 w-11 place-items-center rounded-2xl"
      >
        <Icon name={icon} size={20} brand />
      </motion.div>
    </motion.div>
  );
}

/** Mini system-architecture diagram with animated data flow */
function ArchitectureCard() {
  const nodes = [
    { label: 'React UI', icon: 'react' },
    { label: 'REST API', icon: 'springboot' },
    { label: 'PostgreSQL', icon: 'postgresql' },
  ];
  return (
    <div className="glass w-[15.5rem] rounded-2xl !bg-surface/95 p-4">
      <div className="flex items-center justify-between">
        <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-faint">System architecture</p>
        <span className="flex items-center gap-1 font-mono text-[0.6rem] text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> healthy
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        {nodes.map((n, i) => (
          <div key={n.label} className="flex items-center">
            <div className="flex flex-col items-center gap-1.5">
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-line-soft bg-elevated">
                <Icon name={n.icon} size={18} brand />
              </div>
              <span className="font-mono text-[0.55rem] text-muted">{n.label}</span>
            </div>
            {i < nodes.length - 1 && (
              <svg width="30" height="10" viewBox="0 0 30 10" className="mx-1 -mt-4 text-cyan" aria-hidden="true">
                <line x1="0" y1="5" x2="30" y2="5" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
                <line x1="0" y1="5" x2="30" y2="5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" className="animate-dash" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 rounded-lg border border-dashed border-line-soft px-2.5 py-1.5">
        <Icon name="docker" size={13} brand />
        <span className="font-mono text-[0.58rem] text-muted">containerized · linux · ci/cd</span>
      </div>
    </div>
  );
}

function ProfileCard() {
  return (
    <div className="glass flex w-[16.5rem] items-center gap-3 rounded-2xl !bg-surface/95 p-3 pr-4">
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl ring-1 ring-cyan/30">
        <Monogram />
      </div>
      <div className="min-w-0">
        <p className="truncate font-display text-sm font-semibold">{profile.name}</p>
        <p className="truncate text-[0.7rem] text-muted">Engineer · Lecturer</p>
        <p className="mt-1 flex items-center gap-1.5 font-mono text-[0.58rem] uppercase tracking-wider text-success">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-success" />
            <span className="relative h-1.5 w-1.5 rounded-full bg-success" />
          </span>
          Open to opportunities
        </p>
      </div>
    </div>
  );
}

export function HeroVisual() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const rotY = useTransform(sx, [-1, 1], [-6, 6]);
  const rotX = useTransform(sy, [-1, 1], [5, -5]);
  const nearX = useTransform(sx, [-1, 1], [-18, 18]);
  const nearY = useTransform(sy, [-1, 1], [-14, 14]);
  const farX = useTransform(sx, [-1, 1], [10, -10]);
  const farY = useTransform(sy, [-1, 1], [8, -8]);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [mx, my, reduce]);

  return (
    <div className="relative mx-auto w-full max-w-[34rem] [perspective:1400px]">
      {/* orbit rings */}
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[118%] w-[118%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="absolute inset-0 rounded-full border border-dashed border-line-soft"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan shadow-[0_0_14px_rgb(var(--c-cyan))]" />
        </motion.div>
        <motion.div
          className="absolute inset-[14%] rounded-full border border-line-soft"
          animate={reduce ? undefined : { rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <span className="absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-violet shadow-[0_0_12px_rgb(var(--c-violet))]" />
        </motion.div>
      </div>

      {floating.map((f) => (
        <FloatIcon key={f.icon} {...f} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 12 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1.1, ease, delay: 0.35 }}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: 'preserve-3d' }}
        className="relative z-10 px-2 py-14 sm:px-8"
      >
        <CodeWindow />

        <motion.div style={{ x: nearX, y: nearY }} className="absolute -top-1 right-0 z-30 sm:-right-6">
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.4, duration: 0.8, ease }}>
            <ProfileCard />
          </motion.div>
        </motion.div>

        <motion.div style={{ x: farX, y: farY }} className="absolute -bottom-20 -left-2 z-30 hidden sm:block md:-left-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.8, ease }}>
            <ArchitectureCard />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
