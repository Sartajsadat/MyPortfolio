import type { Principle } from '@/types/content';

/** ✏️  Engineering principles */
export const principles: Principle[] = [
  {
    title: 'Build solutions, not just features.',
    description: 'Start from the problem and the people who have it. A feature only matters if it moves that problem forward.',
    icon: 'target',
  },
  {
    title: 'Write maintainable and scalable code.',
    description: 'Code is read far more than it is written. Clear boundaries and simple designs let systems grow without breaking.',
    icon: 'layers',
  },
  {
    title: 'Focus on security and performance.',
    description: 'Authentication, authorization and auditability are designed in from day one, and performance is measured, not guessed.',
    icon: 'shield',
  },
  {
    title: 'Design systems around real-world problems.',
    description: 'Government workflows, approvals and records are messy. Good architecture models that reality honestly.',
    icon: 'workflow',
  },
  {
    title: 'Continuously learn and improve.',
    description: 'Technology moves fast. I keep learning, from AI and data science to cloud and DevOps practices.',
    icon: 'trending',
  },
  {
    title: 'Share knowledge and help others grow.',
    description: 'Teaching sharpens understanding. Helping students and teammates grow is part of the job.',
    icon: 'users',
  },
];
