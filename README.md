# Boilerplate Monorepo

Full-stack boilerplate for quickly spinning up web apps with a Next.js frontend and Supabase-powered backend services.

## Tech Stack

- Next.js (App Router) for the main web app
- React + TypeScript across apps and shared packages
- Supabase for Postgres, auth, and storage
- Tailwind CSS for styling
- ShadCN UI components

## Prerequisites

- Node.js 20+ (LTS recommended)
- pnpm (preferred) or npm
- A Supabase project (free tier is fine)

## Quickstart (Local Development)

1. Clone the repo

   ```bash
   git clone <your-repo-url> my-app
   cd my-app
   ```

2. Install dependencies

   Using pnpm (recommended):

   ```bash
   pnpm install
   ```

   Or with npm:

   ```bash
   npm install
   ```

3. Set up environment variables

   - Create `.env.local` in the project root (or copy from an example file when available):

     ```bash
     cp .env.example .env.local  # if .env.example exists
     ```

   - Add your Supabase credentials (from the Supabase dashboard):

     ```bash
     NEXT_PUBLIC_SUPABASE_URL=...
     NEXT_PUBLIC_SUPABASE_ANON_KEY=...
     SUPABASE_SERVICE_ROLE_KEY=...
     ```

4. Start the dev server

   If you are using a single Next.js app at the root:

   ```bash
   pnpm dev
   ```

   Or with npm:

   ```bash
   npm run dev
   ```

   If you use a monorepo layout (for example, an app in `apps/web`), change into that directory first:

   ```bash
   cd apps/web
   pnpm dev
   ```

5. Open your browser

   Visit `http://localhost:3000` to see the app running.

## Common Scripts

These are typical scripts you may have in `package.json` (adjust to match your setup). Replace `pnpm` with `npm run` if you prefer npm:

- `pnpm dev` – Start the local development server
- `pnpm build` – Create a production build
- `pnpm start` – Start the production server from the build output
- `pnpm test` – Run tests (if configured)

## Project Layout (Suggested)

This repository is intended to support a monorepo structure. A common layout looks like:

```text
.
├── apps/
│   └── web/           # Next.js app (primary frontend + API routes)
├── services/          # Optional microservices
├── packages/          # Shared UI, utils, config
├── db/                # Postgres .sql files (schema, reset, seed)
├── .env.example       # Example env file (structure only)
├── .env.local         # Local environment variables (gitignored)
└── README.md
```

Adjust these paths, commands, and env vars to match your actual project. This README is an example starting point for developers new to the repo.
