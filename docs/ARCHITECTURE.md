# Architecture — MAS Admin Frontend

This document describes the folder structure, conventions, and what lives where.

---

## Folder structure under `src/`

| Path | Purpose |
|------|--------|
| `src/app/` | Next.js App Router: root layout, pages, routes, `globals.css`. Keep routing and layout here; move UI into `components/`. |
| `src/components/ui/` | Reusable UI primitives (buttons, inputs, cards). Export via `src/components/ui/index.ts`. |
| `src/components/features/` | Feature-specific components (admin tables, sidebars, dashboards). One folder per feature if needed. |
| `src/config/` | App configuration. `env.ts` provides typed access to env vars (e.g. `NEXT_PUBLIC_API_URL`). |
| `src/hooks/` | Custom React hooks. Export via `src/hooks/index.ts`. |
| `src/lib/api/` | Backend API client: `getApiUrl()`, `apiFetch()`. Uses base URL from env. |
| `src/lib/utils/` | Pure utilities (e.g. `cn` for classNames). No React or side effects. |
| `src/types/` | Shared TypeScript types and API DTOs. Single place for contracts with the backend. |

---

## Conventions

### Imports

- Use the **`@/`** path alias for anything under `src/`:
  - `import { cn } from "@/lib/utils"`
  - `import { apiFetch } from "@/lib/api"`
  - `import { getApiBaseUrl } from "@/config/env"`
  - `import type { User } from "@/types"`

### Components

- **UI primitives** live in `src/components/ui/` and are re-exported from `index.ts`.
- **Feature components** live in `src/components/features/` and can import from `@/components/ui` and `@/lib/utils`.

### API

- All backend calls go through `src/lib/api/` (e.g. `apiFetch({ path: "/v1/users" })`).
- Base URL comes from `NEXT_PUBLIC_API_URL` via `src/config/env.ts`. Never hardcode the API URL.

### Environment

- Only `NEXT_PUBLIC_*` variables are exposed to the client. Use `src/config/env.ts` for typed access.
- Copy `.env.example` to `.env.local`; never commit `.env.local`.

### Types

- Shared types and API request/response DTOs live in `src/types/`. Keep them in sync with the backend contract.

---

## Outside `src/`

- **Root:** `package.json`, `tsconfig.json`, `next.config.ts`, `README.md`, `CHANGELOG.md`, `CONTRIBUTING.md`, `.env.example`, `.editorconfig`.
- **docs/** — Architecture, Setup, Release, and optional step-by-step summary.
- **.next/** — Next.js build output (gitignored).

Nothing else at root that belongs inside the app; the app lives under `src/` for a clean separation.
