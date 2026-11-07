import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { fadeUp, inView, stagger } from '@/utils/motion';
import { cn } from '@/utils/cn';

interface Props {
  eyebrow: string;
  index?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
  id?: string;
}

export function SectionHeading({ eyebrow, index, title, description, align = 'left', className, id }: Props) {
  return (
    <motion.header
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={cn('max-w-3xl', align === 'center' && 'mx-auto text-center', className)}
    >
      <motion.p variants={fadeUp} className={cn('eyebrow', align === 'center' && 'justify-center')}>
        {index && <span className="text-faint">{index}</span>}
        <span className="h-px w-6 bg-cyan/60" aria-hidden="true" />
        {eyebrow}
      </motion.p>
      <motion.h2 id={id} variants={fadeUp} className="section-title mt-5">
        {title}
      </motion.h2>
      {description && (
        <motion.p variants={fadeUp} className={cn('mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg', align === 'center' && 'mx-auto')}>
          {description}
        </motion.p>
      )}
    </motion.header>
  );
}
