# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2025-02-16

### Added

- Next.js App Router under `src/app/` (layout, pages, globals.css).
- Folder architecture: `src/components/ui/`, `src/components/features/`, `src/config/`, `src/hooks/`, `src/lib/api/`, `src/lib/utils/`, `src/types/`.
- Path alias `@/*` → `./src/*` in tsconfig.
- Typed env in `src/config/env.ts` (e.g. `NEXT_PUBLIC_API_URL`).
- API client in `src/lib/api/` (`getApiUrl`, `apiFetch`).
- Utilities in `src/lib/utils/` (e.g. `cn` for classNames).
- README, CONTRIBUTING, .env.example, .editorconfig.
- Documentation: docs/ARCHITECTURE.md, docs/SETUP.md, docs/RELEASE.md, docs/STEP-BY-STEP-SUMMARY.md.

### Technical

- Package version set to 1.0.0; description set for MAS Admin Frontend.
- Dependencies: clsx, tailwind-merge for `cn` utility.

---

**Release reminder (for tech lead):** For each release: bump version in package.json, add a new section above, run build + lint + smoke test, tag (e.g. `v1.0.0`), push, and publish release notes. See [docs/RELEASE.md](docs/RELEASE.md).
