# Sartaj Sadat — Portfolio

Personal portfolio of **Sartaj Sadat**, Software Engineer, Full-Stack Developer and University Lecturer.

Built with **React 18 + TypeScript + Vite**, **Tailwind CSS**, **Framer Motion** and **Lucide / Simple Icons**.

## Features

- Animated hero with a live-typing Spring Boot code console, floating tech icons, architecture card and mouse parallax
- Dark theme by default, light theme toggle (remembered per visitor, no flash on load)
- Scroll-triggered reveals, scroll progress bar, active-section navigation, smooth scrolling
- Bento-grid technology section with cursor spotlight cards
- Project showcase with category + technology filters, illustrated UI mockups, and a detail modal (keyboard navigation, deep links like `#project/rems`)
- Experience timeline that fills as you scroll
- Teaching section ready for lecture slides, notes and tutorials
- Contact form with validation, loading, success and error states (JSON endpoint or email fallback)
- Accessible: skip link, focus trapping in dialogs, Escape to close, visible focus, respects "reduce motion"
- SEO: meta + Open Graph tags, JSON-LD `Person` schema, canonical URL, favicon, web manifest
- Fully responsive (mobile, tablet, desktop)

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # preview the production build
```

## Updating content (no component changes needed)

All content lives in `src/data/`:

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, titles, hero text, summary, **email, location, social links**, CV path, photo, navigation |
| `skills.ts` | Technology categories and items (icons from `src/utils/icons.tsx`) |
| `projects.ts` | Projects: description, features, technologies, status, GitHub / live links, screenshots |
| `experience.ts` | Jobs, dates and descriptions |
| `education.ts` | Degree, research interests, **certifications, achievements, publications** (hidden while empty) |
| `teaching.ts` | Courses and teaching materials |
| `philosophy.ts` | Engineering principles |

Common tasks:

- **Add a project** – append an object to `projects.ts`. Filters update automatically.
- **Add screenshots** – put images in `public/projects/` and set `images: ['projects/my-shot.png']`. Without images, a built-in illustrated mockup (`mockup: 'workflow' | 'monitoring' | 'hosting' | 'school' | 'agriculture' | 'finance' | 'generic'`) is shown.
- **Update the CV** – replace `public/cv/Sartaj-Sadat-CV.pdf` (the included file is a starter generated from this site's content).
- **Add a profile photo** – put `profile.jpg` in `public/` and set `photo: 'profile.jpg'` in `profile.ts`.
- **Add a technology** – add `{ name, icon }` to a category in `skills.ts`. New icon keys go in `src/utils/icons.tsx`.
- **Add teaching material** – add `{ label, type: 'slides', href: 'teaching/file.pdf' }` to a course's `resources`.

> Placeholders to replace in `src/data/profile.ts`: `email` (currently `hello@example.com`), the LinkedIn URL, and `location`. Employment start dates for current roles are in `experience.ts`.

## Contact form

Set `VITE_CONTACT_ENDPOINT` (see `.env.example`) to any URL that accepts a JSON `POST` of
`{ name, email, subject, message }`, for example a [Formspree](https://formspree.io) form or a Spring Boot controller.
Without it, the form opens the visitor's email client with the message pre-filled.

For GitHub Pages, add it as a repository **variable** named `VITE_CONTACT_ENDPOINT` (Settings → Secrets and variables → Actions → Variables).

## Future backend (Spring Boot)

Content shapes are defined in `src/types/content.ts`. Set `VITE_API_BASE_URL` and expose
`GET /api/content/{projects|experience|courses}` returning the same JSON — sections load local data instantly and swap in API data when available (see `src/services/contentApi.ts` and `src/hooks/useContent.ts`). If the API fails, local data is kept.

## Deployment

### GitHub Pages (included)

`.github/workflows/deploy.yml` deploys **only when you run it manually** — pushing code does not publish anything.
One-time setup: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
To publish: **Actions → Deploy to GitHub Pages → Run workflow**.
The site will be served at `https://<user>.github.io/MyPortfolio/`.

### Other hosts (Netlify, Vercel, Nginx/Apache)

```bash
npm run build
```

Upload `dist/`. Use `VITE_BASE=/` (default) when serving from a domain root.

## Project structure

```
src/
  components/   Navbar, Hero, About, Skills, Projects, Experience, Education,
                Teaching, Philosophy, Contact, Footer, ui/ (shared pieces)
  data/         Editable content
  hooks/        Theme, active section, focus trap, content loading, …
  layouts/      MainLayout
  pages/        HomePage (section order)
  services/     Content + contact API layer
  styles/       Design tokens and global styles
  types/        Content types
  utils/        Icons, motion presets, helpers
```

## Design system

- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (labels/code)
- **Colors:** midnight backgrounds (`#06080d`), electric blue `#3b82f6`, cyan `#22d3ee`, violet `#8b5cf6`; tokens in `src/styles/globals.css`, both themes
- **Surfaces:** rounded cards with hairline borders, glass used only for navbar, hero console and contact form
