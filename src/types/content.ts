/**
 * Content types for the whole site.
 *
 * These shapes are deliberately plain JSON-friendly objects so the same
 * structure can later be served by a Spring Boot REST API (see
 * src/services/contentApi.ts) without changing any component.
 */

/** Key into the icon registry in src/utils/icons.tsx */
export type IconKey = string;

export interface SocialLink {
  label: string;
  href: string;
  icon: IconKey;
}

export interface Profile {
  name: string;
  shortName: string;
  initials: string;
  /** Path under /public, e.g. "profile.jpg". Leave empty to show the monogram. */
  photo: string;
  titles: string[];
  headline: string;
  status: string;
  intro: string;
  supporting: string;
  summary: string[];
  email: string;
  location: string;
  /** Path under /public. Replace the file to update the CV. */
  cvFile: string;
  availability: string;
  socials: SocialLink[];
  /** Used for SEO / canonical links */
  siteUrl: string;
}

export interface CurrentRole {
  role: string;
  organization: string;
  icon: IconKey;
}

export interface Highlight {
  title: string;
  description: string;
  icon: IconKey;
}

export interface Technology {
  name: string;
  icon: IconKey;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  icon: IconKey;
  /** Visual accent for the card */
  accent: 'accent' | 'cyan' | 'violet';
  /** Bento size on large screens */
  size: 'full' | 'lg' | 'md' | 'sm';
  items: Technology[];
}

export type MockupVariant = 'workflow' | 'monitoring' | 'hosting' | 'school' | 'agriculture' | 'finance' | 'generic';

export interface Project {
  /** Unique, URL-friendly id (used for deep links: #project/<id>) */
  id: string;
  title: string;
  shortTitle?: string;
  category: string;
  summary: string;
  description: string;
  technologies: string[];
  features: string[];
  /** Optional label, only set when it is accurate (e.g. "In Development") */
  status?: string;
  statusTone?: 'live' | 'progress' | 'concept' | 'academic';
  /** Optional screenshots under /public (e.g. "projects/rems-1.png"). */
  images?: string[];
  /** Built-in illustrated mockup, used when no images are provided */
  mockup: MockupVariant;
  githubUrl?: string;
  liveUrl?: string;
  year?: string;
  role?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  organization: string;
  position: string;
  /** Free text so you can write "Mar 2021", "2023", etc. Leave empty if not shown. */
  start?: string;
  /** "Present" for current roles */
  end?: string;
  current?: boolean;
  location?: string;
  type?: string;
  description: string;
  highlights?: string[];
  technologies?: string[];
  icon: IconKey;
}

export interface Education {
  degree: string;
  field: string;
  institution: string;
  year: string;
  description?: string;
  location?: string;
}

export interface Interest {
  title: string;
  icon: IconKey;
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  url?: string;
}

export interface Achievement {
  title: string;
  description?: string;
  date?: string;
}

export interface Publication {
  title: string;
  venue?: string;
  year?: string;
  url?: string;
}

export interface TeachingResource {
  label: string;
  type: 'slides' | 'notes' | 'tutorial' | 'link' | 'video' | 'code';
  /** Absolute URL or path under /public (e.g. "teaching/dsa-week1.pdf") */
  href: string;
}

export interface Course {
  id: string;
  code: string;
  title: string;
  description: string;
  topics: string[];
  icon: IconKey;
  resources: TeachingResource[];
}

export interface Principle {
  title: string;
  description: string;
  icon: IconKey;
}
