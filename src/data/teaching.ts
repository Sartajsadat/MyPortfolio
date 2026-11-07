import type { Course } from '@/types/content';

/**
 * ✏️  Courses taught. Add lecture materials, slides or tutorials to `resources`:
 *   { label: 'Week 1 — Arrays & Complexity', type: 'slides', href: 'teaching/dsa-week1.pdf' }
 * Files can live in public/teaching/ or be external links.
 */
export const courses: Course[] = [
  {
    id: 'dsa',
    code: 'CS · 01',
    title: 'Data Structures & Algorithms',
    description:
      'Building the problem-solving foundation every engineer needs: how data is organized, and how to reason about the cost of an algorithm.',
    topics: ['Complexity analysis', 'Arrays & linked lists', 'Stacks & queues', 'Trees & graphs', 'Sorting & searching'],
    icon: 'binary',
    resources: [],
  },
  {
    id: 'web',
    code: 'CS · 02',
    title: 'Web Technologies',
    description:
      'From semantic HTML and modern CSS to JavaScript and client–server architecture, taught through building real pages.',
    topics: ['HTML5 & semantics', 'CSS3 & responsive layout', 'JavaScript & the DOM', 'HTTP & REST', 'Client–server model'],
    icon: 'globe',
    resources: [],
  },
  {
    id: 'scripting',
    code: 'CS · 03',
    title: 'Script Writing',
    description:
      'Writing scripts that automate work: control flow, functions, files and the habits that keep small programs readable.',
    topics: ['Variables & control flow', 'Functions', 'File handling', 'Automation tasks', 'Debugging'],
    icon: 'terminal',
    resources: [],
  },
];
