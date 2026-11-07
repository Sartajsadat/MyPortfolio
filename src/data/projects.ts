import type { Project } from '@/types/content';

/**
 * ✏️  Projects. Add a new project by appending an object to this array —
 * cards, filters and the detail view update automatically.
 *
 * Screenshots: put images in public/projects/ and list them in `images`
 * (e.g. images: ['projects/rems-dashboard.png']). Until then, the built-in
 * `mockup` illustration is shown.
 *
 * Only set `status`, `githubUrl` and `liveUrl` when they are accurate.
 */
export const projects: Project[] = [
  {
    id: 'rems',
    title: 'Requirement Engineering Management System',
    shortTitle: 'REMS',
    category: 'Government Systems',
    summary:
      'A digital requirement engineering and project management platform for government IT projects.',
    description:
      'A digital requirement engineering and project management platform designed to support government organizations in submitting, reviewing, analyzing, approving, and tracking IT project requirements.',
    technologies: ['React', 'Spring Boot', 'PostgreSQL', 'REST APIs'],
    features: [
      'Government organization management',
      'Requirements submission',
      'Multi-level approval workflow',
      'Requirements documentation',
      'Project progress tracking',
      'Audit logs',
      'Multilingual interface',
      'Document management',
    ],
    mockup: 'workflow',
    featured: true,
  },
  {
    id: 'linux-monitoring',
    title: 'Linux Infrastructure Monitoring Platform',
    shortTitle: 'Infra Monitor',
    category: 'Infrastructure & DevOps',
    summary: 'Visualizes Linux server resources, network traffic, logs and historical system events.',
    description:
      'An infrastructure monitoring and network management platform designed to visualize Linux server resources, network traffic, logs, and historical system events.',
    technologies: ['Linux', 'Java', 'Spring Boot', 'React', 'PostgreSQL', 'Networking'],
    features: [
      'CPU, RAM, disk, and network monitoring',
      'Historical event timeline',
      'Traffic analysis',
      'Log monitoring',
      'Server health dashboards',
      'Network visibility and management',
    ],
    status: 'In Development',
    statusTone: 'progress',
    mockup: 'monitoring',
    featured: true,
  },
  {
    id: 'hosted-services',
    title: 'Hosted Services Management Platform',
    shortTitle: 'Hosting Hub',
    category: 'Infrastructure & DevOps',
    summary: 'One place to manage internally hosted services, servers, websites and applications.',
    description:
      'A centralized platform concept for managing internally hosted services, servers, websites, applications, and hosting resources.',
    technologies: ['React', 'Spring Boot', 'Linux', 'PostgreSQL', 'Docker'],
    features: [
      'Service management',
      'Hosting management',
      'Server monitoring',
      'User and access management',
      'Resource allocation',
      'Centralized administration',
    ],
    status: 'Concept',
    statusTone: 'concept',
    mockup: 'hosting',
  },
  {
    id: 'rgms',
    title: 'School Management System',
    shortTitle: 'RGMS',
    category: 'Management Systems',
    summary: 'Manages users, students, teachers, classes, fees and school administration.',
    description:
      'A school management application designed to manage users, students, teachers, classes, fees, and administrative activities.',
    technologies: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'React'],
    features: [
      'User management',
      'Student records',
      'Teacher management',
      'Class management',
      'Fee management',
      'Administrative activities',
    ],
    mockup: 'school',
  },
  {
    id: 'agriculture',
    title: 'Agriculture Management System',
    shortTitle: 'AgriManage',
    category: 'Management Systems',
    summary: 'Organizes farm locations, legal status, livestock and administrative records.',
    description:
      'A management system designed to organize agricultural and farm-related information, including farm locations, legal status, livestock, and administrative records.',
    technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'React'],
    features: ['Farm location records', 'Legal status tracking', 'Livestock records', 'Administrative records'],
    mockup: 'agriculture',
  },
  {
    id: 'finance',
    title: 'Finance Management System',
    shortTitle: 'FinanceMS',
    category: 'Management Systems',
    summary: 'A financial management system built for a construction company.',
    description:
      'A financial management system developed as my final-year university project for a construction company.',
    // ✏️  Add the technologies you used, e.g. ['PHP', 'Laravel', 'MySQL']
    technologies: [],
    features: ['Financial management for a construction company', 'Final-year university project'],
    status: 'Final-Year Project',
    statusTone: 'academic',
    year: '2022',
    mockup: 'finance',
  },
];
