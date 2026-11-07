import type { CurrentRole, Highlight, Profile } from '@/types/content';

/**
 * ✏️  Personal information — edit this file to update the site.
 * Anything marked "placeholder" should be replaced with your real details.
 */
export const profile: Profile = {
  name: 'Sartaj Sadat',
  shortName: 'Sartaj',
  initials: 'SS',
  // Add your photo to /public (e.g. public/profile.jpg) and set: photo: 'profile.jpg'
  photo: '',
  titles: ['Software Engineer', 'Full-Stack Developer', 'AI/ML Enthusiast', 'DevOps Practitioner', 'University Lecturer'],
  status: 'Software Engineer | Building Digital Solutions',
  headline: 'Turning Complex Ideas Into Powerful Digital Solutions.',
  intro:
    "I'm Sartaj Sadat, a Software Engineer specializing in Full-Stack Development, Enterprise Systems, and Modern Digital Technologies.",
  supporting:
    'I build software for government organizations, design system architectures that hold up in production, and teach the next generation of engineers at university.',
  summary: [
    'I am a Software Engineer passionate about designing, developing, and deploying scalable, secure, and user-friendly software solutions.',
    'I have practical experience in full-stack development, enterprise application development, database design, system architecture, and digital transformation.',
    'Currently, I work as a developer at the Ministry of Telecommunication, contributing to software systems and digital solutions for government organizations.',
    'Alongside my software engineering career, I work as a university lecturer, teaching computer science subjects and helping students develop practical programming and problem-solving skills.',
    'My professional interests include enterprise software architecture, artificial intelligence, machine learning, data science, distributed systems, cloud technologies, and DevOps.',
  ],
  // placeholder — replace with your public email address
  email: 'hello@example.com',
  // placeholder — replace with your city, country
  location: 'Afghanistan',
  // Replace public/cv/Sartaj-Sadat-CV.pdf with your latest CV (keep the same name or update this path)
  cvFile: 'cv/Sartaj-Sadat-CV.pdf',
  availability: 'Open to engineering, consulting and research opportunities',
  socials: [
    { label: 'GitHub', href: 'https://github.com/Sartajsadat', icon: 'github' },
    // placeholder — replace with your LinkedIn profile URL
    { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: 'linkedin' },
    { label: 'Email', href: 'mailto:hello@example.com', icon: 'mail' },
  ],
  siteUrl: import.meta.env.VITE_SITE_URL || 'https://sartajsadat.github.io/MyPortfolio/',
};

export const currentRoles: CurrentRole[] = [
  { role: 'Software Developer', organization: 'Ministry of Telecommunication', icon: 'landmark' },
  { role: 'University Lecturer', organization: 'Khana-e-Noor University', icon: 'graduation' },
];

/** "Beyond Writing Code" highlight tiles */
export const highlights: Highlight[] = [
  {
    title: 'Software Engineering',
    description: 'Clean architecture, maintainable code and disciplined delivery from requirements to release.',
    icon: 'code',
  },
  {
    title: 'Full-Stack Development',
    description: 'Spring Boot and Laravel back ends paired with React and Angular interfaces.',
    icon: 'layers',
  },
  {
    title: 'Enterprise Systems',
    description: 'Role-based, auditable, multi-level workflow systems built for real organizations.',
    icon: 'building',
  },
  {
    title: 'Government Digital Transformation',
    description: 'Moving paper-based processes into secure, internally hosted digital services.',
    icon: 'landmark',
  },
  {
    title: 'Teaching & Mentoring',
    description: 'Lecturing on algorithms and web technologies, and helping students think like engineers.',
    icon: 'graduation',
  },
  {
    title: 'Continuous Learning in AI',
    description: 'Exploring machine learning, data science and AI-powered applications.',
    icon: 'brain',
  },
];

/** Navigation — `id` must match a section id on the page */
export const navigation = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'teaching', label: 'Teaching' },
  { id: 'contact', label: 'Contact' },
] as const;
