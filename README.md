# Boilerplate Monorepo

Full-stack starter for shipping new ideas quickly with a polished frontend and backend endpoints wired to Supabase.

## What is included

- Next.js App Router app at `apps/web`
- Landing page with CTA `Get Started`
- Workspace page with:
  - Minimal dashboard on the left (sample cars dataset)
  - Compact chat UI on the right
- Backend route handlers for dashboard data
- SSE streaming chat endpoint
- WebSocket demo server for realtime presence/events
- Supabase SQL schema and seed scripts in `db/`

## Tech stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS
- shadcn-style UI components
- Supabase (`@supabase/supabase-js`)
- pnpm workspaces

## Quickstart

1. Install dependencies

   ```bash
   pnpm install
   ```

2. Set environment variables

   ```bash
   cp .env.example .env
   ```

   Then fill in:

   ```bash
   NEXT_PUBLIC_SUPABASE_URL=...
   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
   SUPABASE_SERVICE_ROLE_KEY=...
   ```

3. Apply SQL in Supabase SQL editor

   - Run `db/schema.sql`
   - Run `db/seed.sql`

4. Start development

   ```bash
   pnpm dev
   ```

   This runs:
   - Next app on `http://localhost:3000`
   - WebSocket demo server on `ws://localhost:3001`

## Pages

- `http://localhost:3000/` - landing page
- `http://localhost:3000/workspace` - dashboard + chat demo

## Backend endpoints

- `GET /api/dashboard/summary` - dataset summary stats
- `GET /api/dashboard/cars?limit=8` - cars rows
- `GET /api/chat/stream?message=...` - SSE token streaming response

## Notes on data flow

- Dashboard UI calls Next route handlers (not Supabase directly).
- Route handlers query Supabase when env vars are configured.
- If Supabase is not configured yet, endpoints return embedded sample data so the UI still works locally.
- Chat response text streams through SSE, while a separate WebSocket connection demonstrates realtime event updates.

## Scripts

- `pnpm dev` - run web app (Next + websocket server)
- `pnpm build` - production build
- `pnpm start` - start production server
- `pnpm typecheck` - TypeScript check

## Project layout

```text
.
├── apps/
│   └── web/
│       ├── app/
│       ├── components/
│       ├── lib/
│       └── ws-server.mjs
├── db/
│   ├── schema.sql
│   └── seed.sql
├── .env.example
├── pnpm-workspace.yaml
└── README.md
```
