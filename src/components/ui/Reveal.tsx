import { motion, type HTMLMotionProps } from 'framer-motion';
import { fadeUp, inView } from '@/utils/motion';

/** Fades and lifts its children into view once, when scrolled to. */
export function Reveal({ delay = 0, ...props }: HTMLMotionProps<'div'> & { delay?: number }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delay }}
      {...props}
    />
  );
}
