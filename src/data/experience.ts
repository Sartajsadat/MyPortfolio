import type { Experience } from '@/types/content';

/**
 * ✏️  Professional experience, newest first.
 * `start` / `end` are free text — fill them in when you want dates shown.
 */
export const experience: Experience[] = [
  {
    id: 'mcit',
    organization: 'Ministry of Telecommunication',
    position: 'Software Developer',
    start: '', // e.g. 'Jan 2023'
    end: 'Present',
    current: true,
    type: 'Government',
    description:
      'Working on software development and digital transformation initiatives, developing systems for government organizations and supporting the delivery of internally hosted digital services.',
    icon: 'landmark',
  },
  {
    id: 'knu',
    organization: 'Khana-e-Noor University',
    position: 'University Lecturer',
    start: '', // e.g. 'Mar 2023'
    end: 'Present',
    current: true,
    type: 'Academia',
    description:
      'Teaching computer science subjects, explaining programming concepts, and helping students develop practical technical skills.',
    highlights: ['Data Structures & Algorithms', 'Web Technologies', 'Script Writing'],
    icon: 'graduation',
  },
  {
    id: 'amra',
    organization: 'Afghan Mobile Reconstruction Association',
    position: 'Software Developer',
    start: 'Mar 2021',
    end: 'Dec 2022',
    type: 'Non-profit',
    description: 'Contributed to software development activities and technical solutions.',
    icon: 'code',
  },
];
