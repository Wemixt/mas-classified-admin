# Release process — MAS Admin Frontend

**Owner:** Tech lead / release manager. Only they bump version and edit CHANGELOG.

---

## Full release checklist

### 1. Pre-release

- [ ] All changes for the release are merged to `master`.
- [ ] Branch is up to date: `git pull origin master`.
- [ ] Run `npm ci`, then `npm run build` and `npm run lint` — both pass.
- [ ] Optional: smoke test (start app, hit main flows).

### 2. Version bump and CHANGELOG

- [ ] Bump **version** in `package.json` (e.g. `1.0.0` → `1.1.0`).
- [ ] In **CHANGELOG.md**:
  - Add a new section for the new version (e.g. `[1.1.0] — YYYY-MM-DD`).
  - List changes under Added / Changed / Fixed / Technical (Keep a Changelog style).
- [ ] Commit: e.g. `chore: release v1.1.0`.

### 3. Build, lint, smoke test

- [ ] `npm run build`
- [ ] `npm run lint`
- [ ] Quick smoke test (manual or automated).

### 4. Tag and push

- [ ] Create tag: `git tag v1.1.0` (match version in package.json).
- [ ] Push branch and tags: `git push origin master && git push origin v1.1.0`.

### 5. Release notes

- [ ] Publish release notes (e.g. GitHub Releases) using the CHANGELOG section for this version.
- [ ] Notify stakeholders if needed.

---

## Hotfix process

- Branch from the **release tag** or the commit that was released (e.g. `v1.0.0`).
- Fix the bug, run build + lint.
- Merge to `master`.
- Follow the checklist above: bump **patch** version (e.g. `1.0.0` → `1.0.1`), update CHANGELOG, tag (e.g. `v1.0.1`), push, release notes.
- If needed, cherry-pick or merge the hotfix back into mainline development.

---

## Summary

For each release: **bump version** → **CHANGELOG section** → **build + lint + smoke** → **tag** → **push** → **release notes**. Only tech lead/release manager performs version bump and CHANGELOG edits.
