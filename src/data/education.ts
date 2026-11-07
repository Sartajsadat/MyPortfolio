import type { Achievement, Certification, Education, Interest, Publication } from '@/types/content';

/** ✏️  Academic background */
export const education: Education[] = [
  {
    degree: "Bachelor's Degree",
    field: 'Software Engineering',
    institution: 'Nangarhar University',
    year: '2022',
    description:
      'Graduated with a foundation in programming, software design and databases. Final-year project: a Finance Management System for a construction company.',
  },
];

export const researchInterests: Interest[] = [
  { title: 'Artificial Intelligence', icon: 'sparkles' },
  { title: 'Machine Learning', icon: 'ml' },
  { title: 'Data Science', icon: 'chart' },
  { title: 'Software Engineering Research', icon: 'flask' },
  { title: 'Advanced Computing', icon: 'cpu' },
];

/**
 * ✏️  Add certifications, achievements and publications here.
 * Each list is hidden on the site while it is empty.
 *
 * Example:
 *   { name: 'Oracle Certified Professional, Java SE', issuer: 'Oracle', date: '2025', url: 'https://…' }
 */
export const certifications: Certification[] = [];

/** Example: { title: 'Best Final-Year Project', description: '…', date: '2022' } */
export const achievements: Achievement[] = [];

/** Example: { title: 'Paper title', venue: 'Conference / Journal', year: '2026', url: 'https://…' } */
export const publications: Publication[] = [];
