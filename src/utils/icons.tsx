import type { ComponentType, SVGProps } from 'react';
import {
  Activity, BarChart3, Binary, Bot, BrainCircuit, Building2, ChartNoAxesCombined, Code2, Cpu, Database,
  DatabaseZap, FileCode2, FlaskConical, Gauge, GitBranch, Globe, GraduationCap, Infinity as InfinityIcon,
  Landmark, Layers, LayoutTemplate, Mail, MapPin, Network, Server, ShieldCheck, Sparkles, Table2, Target,
  Terminal, TrendingUp, Users, Workflow, Webhook, KeyRound, Boxes,
} from 'lucide-react';
import {
  SiAngular, SiApache, SiBootstrap, SiCss, SiDocker, SiGit, SiGithub, SiGithubactions, SiHibernate, SiHtml5,
  SiJavascript, SiJsonwebtokens, SiLaravel, SiLinux, SiMui, SiMysql, SiPhp, SiPostgresql, SiPython, SiReact,
  SiScikitlearn, SiSpringboot, SiSpringsecurity, SiTypescript,
} from 'react-icons/si';
import { FaJava, FaLinkedin } from 'react-icons/fa6';

type IconComponent = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

interface IconEntry {
  icon: IconComponent;
  /** Brand color (used for technology logos on hover) */
  color?: string;
}

const registry: Record<string, IconEntry> = {
  // Brand / technology logos
  java: { icon: FaJava as IconComponent, color: '#f89820' },
  springboot: { icon: SiSpringboot as IconComponent, color: '#6db33f' },
  springsecurity: { icon: SiSpringsecurity as IconComponent, color: '#6db33f' },
  hibernate: { icon: SiHibernate as IconComponent, color: '#bcae79' },
  jwt: { icon: SiJsonwebtokens as IconComponent, color: '#d63aff' },
  php: { icon: SiPhp as IconComponent, color: '#777bb4' },
  laravel: { icon: SiLaravel as IconComponent, color: '#ff2d20' },
  javascript: { icon: SiJavascript as IconComponent, color: '#f7df1e' },
  typescript: { icon: SiTypescript as IconComponent, color: '#3178c6' },
  react: { icon: SiReact as IconComponent, color: '#61dafb' },
  angular: { icon: SiAngular as IconComponent, color: '#dd0031' },
  html: { icon: SiHtml5 as IconComponent, color: '#e34f26' },
  css: { icon: SiCss as IconComponent, color: '#2965f1' },
  bootstrap: { icon: SiBootstrap as IconComponent, color: '#7952b3' },
  mui: { icon: SiMui as IconComponent, color: '#007fff' },
  postgresql: { icon: SiPostgresql as IconComponent, color: '#4169e1' },
  mysql: { icon: SiMysql as IconComponent, color: '#4479a1' },
  oracle: { icon: DatabaseZap, color: '#f80000' },
  docker: { icon: SiDocker as IconComponent, color: '#2496ed' },
  linux: { icon: SiLinux as IconComponent, color: '#fcc624' },
  git: { icon: SiGit as IconComponent, color: '#f05032' },
  github: { icon: SiGithub as IconComponent },
  cicd: { icon: SiGithubactions as IconComponent, color: '#2088ff' },
  apache: { icon: SiApache as IconComponent, color: '#d22128' },
  python: { icon: SiPython as IconComponent, color: '#3776ab' },
  ml: { icon: SiScikitlearn as IconComponent, color: '#f7931e' },
  linkedin: { icon: FaLinkedin as IconComponent, color: '#0a66c2' },

  // Concepts / UI
  api: { icon: Webhook, color: '#22d3ee' },
  schema: { icon: Table2, color: '#a78bfa' },
  gauge: { icon: Gauge, color: '#34d399' },
  dbadmin: { icon: Database, color: '#60a5fa' },
  database: { icon: Database },
  server: { icon: Server },
  activity: { icon: Activity, color: '#34d399' },
  sparkles: { icon: Sparkles, color: '#c084fc' },
  chart: { icon: BarChart3, color: '#22d3ee' },
  flask: { icon: FlaskConical, color: '#a78bfa' },
  bot: { icon: Bot, color: '#60a5fa' },
  brain: { icon: BrainCircuit },
  layout: { icon: LayoutTemplate },
  infinity: { icon: InfinityIcon },
  code: { icon: Code2 },
  layers: { icon: Layers },
  building: { icon: Building2 },
  landmark: { icon: Landmark },
  graduation: { icon: GraduationCap },
  binary: { icon: Binary },
  globe: { icon: Globe },
  terminal: { icon: Terminal },
  target: { icon: Target },
  shield: { icon: ShieldCheck },
  workflow: { icon: Workflow },
  trending: { icon: TrendingUp },
  users: { icon: Users },
  cpu: { icon: Cpu },
  mail: { icon: Mail },
  map: { icon: MapPin },
  network: { icon: Network, color: '#22d3ee' },
  key: { icon: KeyRound },
  branch: { icon: GitBranch },
  boxes: { icon: Boxes },
  growth: { icon: ChartNoAxesCombined },
  file: { icon: FileCode2 },
};

const fallback: IconEntry = { icon: Code2 };

export function getIcon(key: string): IconEntry {
  return registry[key] ?? fallback;
}

/** Maps human-readable technology names (as used in projects.ts) to icon keys */
const techNameMap: Record<string, string> = {
  react: 'react',
  'react.js': 'react',
  'spring boot': 'springboot',
  'spring security': 'springsecurity',
  postgresql: 'postgresql',
  'rest apis': 'api',
  'rest api': 'api',
  java: 'java',
  linux: 'linux',
  docker: 'docker',
  networking: 'network',
  mysql: 'mysql',
  php: 'php',
  laravel: 'laravel',
  angular: 'angular',
  python: 'python',
  javascript: 'javascript',
  typescript: 'typescript',
  'hibernate / jpa': 'hibernate',
  hibernate: 'hibernate',
  jwt: 'jwt',
  git: 'git',
  github: 'github',
  bootstrap: 'bootstrap',
  'material ui': 'mui',
  html5: 'html',
  css3: 'css',
  apache: 'apache',
  oracle: 'oracle',
};

export function techIconKey(name: string): string {
  return techNameMap[name.toLowerCase()] ?? 'code';
}

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  /** Render in brand color */
  brand?: boolean;
}

export function Icon({ name, size = 18, brand, style, ...rest }: IconProps) {
  const { icon: Cmp, color } = getIcon(name);
  return (
    <Cmp
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      style={brand && color ? { color, ...style } : style}
      {...rest}
    />
  );
}
