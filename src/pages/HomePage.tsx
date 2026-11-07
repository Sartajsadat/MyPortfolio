import { Hero } from '@/components/Hero/Hero';
import { About } from '@/components/About/About';
import { Skills } from '@/components/Skills/Skills';
import { Projects } from '@/components/Projects/Projects';
import { Experience } from '@/components/Experience/Experience';
import { Education } from '@/components/Education/Education';
import { Teaching } from '@/components/Teaching/Teaching';
import { Philosophy } from '@/components/Philosophy/Philosophy';
import { Contact } from '@/components/Contact/Contact';
import { ErrorBoundary } from '@/components/ui/ErrorBoundary';

/** Section order lives here — reorder or remove sections freely. */
const sections = [
  { name: 'hero', C: Hero },
  { name: 'about', C: About },
  { name: 'skills', C: Skills },
  { name: 'projects', C: Projects },
  { name: 'experience', C: Experience },
  { name: 'education', C: Education },
  { name: 'teaching', C: Teaching },
  { name: 'philosophy', C: Philosophy },
  { name: 'contact', C: Contact },
];

export function HomePage() {
  return (
    <>
      {sections.map(({ name, C }) => (
        <ErrorBoundary key={name} name={name}>
          <C />
        </ErrorBoundary>
      ))}
    </>
  );
}
