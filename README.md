# AldMind

AldMind is an interactive chatbot portfolio and personal AI assistant for **Bren Alden**.

Instead of navigating a conventional portfolio site, visitors can ask questions and explore Bren's background, experience, projects, achievements, and contact information through a conversation-first interface.

## Current Scope

- Chatbot-centered home screen
- Quick prompts for About, Experience, Projects, Achievement, and Contact
- Gemini-powered chat grounded only in the portfolio's About, Experience, Projects, Achievements, and Contact data
- Answers include links to website pages used as sources; questions without supported source data receive a fixed fallback
- About and Experience chatbot context is maintained in `src/lib/portfolio-content.ts`; Projects and Achievements are read from Supabase
- Desktop sidebar and responsive mobile navigation
- Minimal dark visual system using black , gray, and white
- Inter and JetBrains Mono typography

## Tech Stack

- [Next.js](https://nextjs.org) with App Router
- TypeScript
- CSS Modules
- React
- Gemini API
- Supabase

