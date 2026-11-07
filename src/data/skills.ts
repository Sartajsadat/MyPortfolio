import type { SkillCategory } from '@/types/content';

/**
 * ✏️  Technology stack. Add a technology by appending { name, icon } to a category.
 * Icon keys are defined in src/utils/icons.tsx (unknown keys fall back to a generic icon).
 * No proficiency percentages on purpose.
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    title: 'Backend Development',
    description: 'Secure, well-structured services and APIs for enterprise workloads.',
    icon: 'server',
    accent: 'accent',
    size: 'lg',
    items: [
      { name: 'Java', icon: 'java' },
      { name: 'Spring Boot', icon: 'springboot' },
      { name: 'Spring Security', icon: 'springsecurity' },
      { name: 'REST APIs', icon: 'api' },
      { name: 'Hibernate / JPA', icon: 'hibernate' },
      { name: 'JWT Authentication', icon: 'jwt' },
      { name: 'PHP', icon: 'php' },
      { name: 'Laravel', icon: 'laravel' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend Development',
    description: 'Responsive, accessible interfaces for complex workflows.',
    icon: 'layout',
    accent: 'cyan',
    size: 'md',
    items: [
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'React.js', icon: 'react' },
      { name: 'Angular', icon: 'angular' },
      { name: 'HTML5', icon: 'html' },
      { name: 'CSS3', icon: 'css' },
      { name: 'Bootstrap', icon: 'bootstrap' },
      { name: 'Material UI', icon: 'mui' },
    ],
  },
  {
    id: 'database',
    title: 'Database Technologies',
    description: 'Relational modelling, tuning and day-to-day administration.',
    icon: 'database',
    accent: 'violet',
    size: 'md',
    items: [
      { name: 'PostgreSQL', icon: 'postgresql' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'Oracle Database', icon: 'oracle' },
      { name: 'Database Design', icon: 'schema' },
      { name: 'Query Optimization', icon: 'gauge' },
      { name: 'Database Administration', icon: 'dbadmin' },
    ],
  },
  {
    id: 'devops',
    title: 'DevOps & Infrastructure',
    description: 'Shipping, hosting and keeping services healthy on Linux.',
    icon: 'infinity',
    accent: 'cyan',
    size: 'lg',
    items: [
      { name: 'Docker', icon: 'docker' },
      { name: 'Linux', icon: 'linux' },
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'CI/CD', icon: 'cicd' },
      { name: 'Apache', icon: 'apache' },
      { name: 'Server Administration', icon: 'server' },
      { name: 'Deployment & Monitoring', icon: 'activity' },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Data Science',
    description: 'Turning data into insight and intelligent features.',
    icon: 'brain',
    accent: 'violet',
    size: 'full',
    items: [
      { name: 'Python', icon: 'python' },
      { name: 'Machine Learning', icon: 'ml' },
      { name: 'Artificial Intelligence', icon: 'sparkles' },
      { name: 'Data Analysis', icon: 'chart' },
      { name: 'Data Science', icon: 'flask' },
      { name: 'AI-powered Applications', icon: 'bot' },
    ],
  },
];

/** Technologies shown in the scrolling strip and hero orbit */
export const marqueeTech = [
  'java', 'springboot', 'react', 'angular', 'postgresql', 'docker', 'linux', 'python',
  'laravel', 'php', 'mysql', 'git', 'github', 'javascript', 'html', 'css', 'mui', 'bootstrap', 'apache', 'hibernate',
];
