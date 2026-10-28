# AldMind

AldMind is an interactive chatbot portfolio and personal AI assistant for **Bren Alden**.

Instead of navigating a conventional portfolio site, visitors can ask questions and explore Bren's background, experience, projects, achievements, and contact information through a conversation-first interface.

## Vision

AldMind begins as a polished personal portfolio interface. It is designed to evolve into a private AI assistant that understands Bren's work, preferences, knowledge base, and ongoing projects.

Planned capabilities include:

- Conversational portfolio exploration
- Personal profile, experience, project, and achievement information
- Contact and collaboration enquiries
- Supabase-backed data storage and authentication
- A personal AI agent for Bren

## Current Scope

The current version focuses on the front-end experience:

- Chatbot-centered home screen
- Quick prompts for About, Experience, Projects, Achievement, and Contact
- Desktop sidebar and responsive mobile navigation
- Minimal dark visual system using black , gray, and white
- Inter and JetBrains Mono typography
- UI-only chat interactions, ready to be connected to an AI backend later

## Tech Stack

- [Next.js](https://nextjs.org) with App Router
- TypeScript
- CSS Modules
- React


## Adding Routes

Each folder inside `src/app` becomes a route. For example, `src/app/about/page.tsx` creates `/about`.

To add another portfolio page, such as `/projects`:

1. Create `src/app/projects/page.tsx` as a thin route that renders a component from `src/components/projects`.
2. Put the page component in its own folder, for example `src/components/projects/projects-page.tsx`.
3. Reuse shared UI from `src/components/shared`, including `Sidebar`, `Topbar`, and `styles/shell.module.css`.
4. Add or update the pathname in `src/components/shared/data/navigation.ts`, for example `{ label: "Projects", href: "/projects", icon: "folder" }`.
5. Pass the same pathname to `Sidebar`, for example `<Sidebar activeHref="/projects" ... />`, so the selected navigation item is highlighted.
6. For regular CSS like About, create `src/components/projects/projects.css`, prefix its class names with `projects-`, and import it once from `src/app/projects/page.tsx`. You can use a `.module.css` file instead when you want locally scoped styles.

Use `src/components/about` and `src/app/about/page.tsx` as the regular-CSS starting pattern. Home-only chat code lives in `src/components/home`; shared navigation and shell code lives in `src/components/shared`.
