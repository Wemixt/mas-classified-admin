# Setup — MAS Admin Frontend

Prerequisites, one-time setup, daily workflow, and troubleshooting.

---

## Prerequisites

- **Node.js** 20 or later
- **npm** (or compatible package manager)
- Git

---

## One-time setup

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd mass-classified-admin
   ```

2. **Install dependencies**
   ```bash
   npm ci
   ```

3. **Environment**
   - Copy `.env.example` to `.env.local`.
   - Set `NEXT_PUBLIC_API_URL` to your backend API base URL (e.g. `https://api.example.com`).
   - Never commit `.env.local`.

4. **Verify**
   ```bash
   npm run build
   npm run lint
   ```

---

## Daily workflow

- **Start dev server:** `npm run dev` → [http://localhost:3000](http://localhost:3000)
- **Build:** `npm run build`
- **Run production build:** `npm run start`
- **Lint:** `npm run lint`

Use the `@/` alias for imports under `src/`. See [ARCHITECTURE.md](ARCHITECTURE.md) for folder and import conventions.

---

## Troubleshooting

- **Build fails after pull:** Run `npm ci` and ensure `.env.local` exists if the app expects env vars.
- **API calls fail:** Check `NEXT_PUBLIC_API_URL` in `.env.local` and that the backend is reachable (CORS, network).
- **Path alias `@/` not resolved:** Ensure `tsconfig.json` has `"paths": { "@/*": ["./src/*"] }` and the IDE has picked up the config.
- **Lint errors:** Run `npm run lint` and fix reported issues; follow CONTRIBUTING for style and structure.

For release and versioning, see [RELEASE.md](RELEASE.md).
