# MAS Admin Frontend

**Version 1.0**

Admin frontend for MAS (critical company project). Backend is implemented separately; this repository is frontend only.

---

## Quick start

```bash
npm ci
cp .env.example .env.local   # then edit .env.local with your values
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Requirements

- **Node.js** 20+
- **npm** (or compatible package manager)

---

## Scripts

| Script   | Description                    |
|----------|--------------------------------|
| `npm run dev`   | Start dev server (Next.js)     |
| `npm run build` | Production build               |
| `npm run start` | Start production server        |
| `npm run lint`  | Run ESLint                     |

---

## Folder structure

```
src/
├── app/                    # Next.js App Router (layout, pages, globals.css)
├── components/
│   ├── ui/                 # Reusable UI primitives (export via index.ts)
│   └── features/          # Feature-specific components (admin tables, sidebars, etc.)
├── config/                 # App config (e.g. env.ts for typed env)
├── hooks/                  # Custom React hooks
├── lib/
│   ├── api/                # Backend API client (getApiUrl, apiFetch)
│   └── utils/              # Pure utilities (e.g. cn for classNames)
└── types/                  # Shared TypeScript types and API DTOs
```

Path alias **`@/*`** in `tsconfig.json` points to **`./src/*`**.

---

## Environment variables

| Variable               | Description                          |
|------------------------|--------------------------------------|
| `NEXT_PUBLIC_API_URL`  | Backend API base URL (e.g. `https://api.example.com`) |

Copy `.env.example` to `.env.local` and set values. Never commit `.env.local`.

---

## Documentation

- [Architecture](docs/ARCHITECTURE.md) — Folder structure, conventions, imports, API, env, types
- [Setup](docs/SETUP.md) — Prerequisites, one-time setup, daily workflow, troubleshooting
- [Release](docs/RELEASE.md) — Release checklist, versioning, tagging, hotfix process

Releases: see [CHANGELOG.md](CHANGELOG.md) and [docs/RELEASE.md](docs/RELEASE.md). For each release: bump version, add CHANGELOG section, build, lint, tag, and publish release notes.
