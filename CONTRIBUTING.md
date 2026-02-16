# Contributing to MAS Admin Frontend

Thank you for contributing. Please follow the guidelines below.

---

## Before you start

1. **Read the README** and the docs (especially [Architecture](docs/ARCHITECTURE.md) and [Setup](docs/SETUP.md)).
2. **Use the `@/` path alias** for imports under `src/` (e.g. `import { cn } from "@/lib/utils"`, `import { apiFetch } from "@/lib/api"`).
3. **Follow the folder structure** under `src/`:
   - `src/app/` — App Router only.
   - `src/components/ui/` — Reusable UI primitives; export via `index.ts`.
   - `src/components/features/` — Feature-specific components.
   - `src/config/` — App config (e.g. env).
   - `src/hooks/` — Custom React hooks.
   - `src/lib/api/` — Backend API client.
   - `src/lib/utils/` — Pure utilities.
   - `src/types/` — Shared types and API DTOs.

---

## Branch, commit, and PR workflow

- Create a **branch** from `master` (e.g. `feature/xyz`, `fix/abc`).
- Make **focused commits** with clear messages.
- Open a **Pull Request** against `master`. Describe what changed and why.
- Ensure **build and lint pass** before requesting review.

---

## Version and CHANGELOG

- **Only the tech lead / release manager** should:
  - Bump the version in `package.json`.
  - Edit `CHANGELOG.md` (add new sections for releases).

Do not bump version or add CHANGELOG sections in feature or fix PRs. See [docs/RELEASE.md](docs/RELEASE.md) for the release process.
