# Introduction
This repository stores portable boilerplate for projects that combine frontend and backend setup for rapid prototyping (e.g. hackathons).

# Architecture
- Monorepo layout with a primary Next.js app and optional microservices.
- Example microservices live in submodules to keep the core boilerplate small and reusable.
- Supabase provides managed services (database, auth, storage) that all apps can use.
- React and TypeScript are used across all apps and shared packages.

# Frontend
For web frontends in this repo:
- Use Next.js (App Router) with React and TypeScript for the main product surface (SSR/SSG + API routes).
- Use ShadCN UI components (stick to their defaults first; customize later as needed).
- Use Tailwind CSS for styling and layout.
- Do not ship both dark and light themes by default; ask the user which they want. Default to light mode.
- Use Inter as the default font.
- Prioritize accessibility (contrast, base font size, keyboard navigation, and screen-reader labels).

# Backend
- Use Next.js for backend logic (route handlers / API routes and server components), written in TypeScript.
- Use Supabase for core backend services: Postgres database, auth, and storage.
- Access Supabase from Next.js server components, route handlers, and any microservices that need shared data.
 - Keep Postgres schema and data scripts as `.sql` files in a dedicated directory (for example `db/`): include scripts to drop/recreate the schema, set up tables, and repopulate with seed data for local development.

# Tooling
- Use pnpm as the default package manager for this repository.
- npm is also supported for users who prefer it or do not have pnpm installed.
