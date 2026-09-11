# CI/CD Pipeline — Frontend (2027)

## Core Sections (Required)

### 1) Pipeline Overview

| Attribute          | Value                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------- |
| CI platform        | GitHub Actions                                                                                    |
| Workflow file      | `.github/workflows/ci.yml` (repo root)                                                            |
| Trigger branches   | `main` and `develop` — on both `push` and `pull_request`                                          |
| Runner             | `ubuntu-latest`                                                                                   |
| Node version       | 22 (matches Dockerfile base image)                                                                |
| Package manager    | pnpm 11.15.1 (auto-detected by `pnpm/action-setup@v4` from `package.json` `packageManager` field) |
| Concurrency policy | Cancel in-progress runs on the same branch when a newer push arrives                              |

### 2) Pipeline Steps (in order)

| Step                        | Command / Action                                    | What it guards against                                                              |
| --------------------------- | --------------------------------------------------- | ----------------------------------------------------------------------------------- |
| Checkout                    | `actions/checkout@v4`                               | —                                                                                   |
| Install pnpm                | `pnpm/action-setup@v4`                              | Ensures correct pnpm version (11.15.1) is available                                 |
| Setup Node.js 22            | `actions/setup-node@v4` with cache                  | Ensures consistent Node version; caches `pnpm-store` for faster installs            |
| Install dependencies        | `pnpm install --frozen-lockfile`                    | Stale or out-of-sync `pnpm-lock.yaml` (fails early if lockfile doesn't match)       |
| Formatting check            | `pnpm run format:check` (Prettier)                  | Unformatted code — enforces consistent style without requiring editor plugins       |
| Lint                        | `pnpm run lint` (ESLint)                            | Code-quality issues, unused imports, common mistakes                                |
| Type check                  | `pnpm exec tsc --noEmit`                            | TypeScript type errors that `next build` might silently skip                        |
| Build                       | `pnpm run build` (Next.js)                          | Broken builds, missing exports, compilation errors; verifies `output: "standalone"` |
| Install Playwright browsers | `pnpm exec playwright install --with-deps chromium` | Ensures Chromium + system deps are available for E2E tests                          |
| E2E tests                   | `pnpm run test:e2e` (Playwright)                    | Regressions in user-facing flows; auto-starts `pnpm dev` via `webServer` config     |
| Upload Playwright report    | `actions/upload-artifact@v4` (always runs)          | Saves `playwright-report/` as a downloadable artifact (retained 7 days)             |

> **Note:** All `run` steps default to `working-directory: web_client/2027` — commands execute inside the Next.js app subdirectory.

### 3) CI Behavior Details

- **E2E retries:** `playwright.config.ts` sets `retries: 2` and `workers: 1` when `process.env.CI` is truthy — flaky tests get two automatic retries before failing.
- **`forbidOnly`:** The `forbidOnly: !!process.env.CI` flag in `playwright.config.ts` prevents a test file containing `test.only(...)` from being merged — the pipeline will fail immediately if one is committed.
- **Dev server in CI:** Playwright's `webServer` config auto-starts `pnpm dev` against `http://localhost:3000` with a 120-second timeout. Since dev-only UI (`DevThemeSwitcher`) only renders when `NODE_ENV === "development"`, the E2E suite must test against the dev server, not a production build.
- **Artifact retention:** The Playwright HTML report is uploaded even if tests fail (`if: always()`), so failures can be debugged locally. Retained for 7 days.

### 4) What Is NOT in CI (and why)

| Feature                       | Not included because...                                                                  |
| ----------------------------- | ---------------------------------------------------------------------------------------- |
| Docker image build/push       | The project uses Docker locally via `docker-compose`; no deployment target is configured |
| Vitest / Storybook tests      | Storybook integration is recent; tests need stabilization before adding to CI gate       |
| Unit tests                    | No unit test runner is configured in the project                                         |
| Deployment                    | No production deployment target (SSH, registry, or PaaS) has been set up                 |
| Dependency vulnerability scan | Not configured — can be added via `pnpm audit` or Dependabot separately                  |

### 5) Adding / Modifying the Pipeline

- **To add a new step:** Edit `.github/workflows/ci.yml` at the repo root (NOT inside `web_client/2027/` — the 2027 `.gitignore` ignores its own `.github/` directory).
- **To add a new branch trigger:** Add the branch name to the `push` / `pull_request` arrays in the `on:` block of `ci.yml`.
- **To skip CI for a commit:** Include `[skip ci]` or `[ci skip]` in the commit message.
- **To add caching:** `actions/setup-node` already caches the pnpm store. If install times become slow, consider adding `pnpm-store` caching via `pnpm/action-setup`'s built-in cache, or split the pipeline into separate jobs (lint → test → build) for parallel execution.

### 6) Evidence

- `.github/workflows/ci.yml` — the workflow definition at the repo root
- `web_client/2027/package.json` — scripts (`build`, `lint`, `format:check`, `test:e2e`) and `packageManager` field consumed by the workflow
- `web_client/2027/playwright.config.ts` — CI-aware configuration (`process.env.CI` branches, `forbidOnly`, `retries`, `workers`, `webServer`)
- `web_client/2027/next.config.ts` — `output: "standalone"` verified by the build step
- `web_client/2027/Dockerfile` — multi-stage build (declares `node:22-alpine` which determines the CI Node version)
