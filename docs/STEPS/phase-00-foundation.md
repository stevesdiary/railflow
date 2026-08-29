# Phase 0: Foundation — Step Log

## Session 1 — Phase 0: Foundation (COMPLETE)

### Decisions (user-confirmed)
-   Monorepo: pnpm workspaces (`apps/*`, `packages/*`)
-   Web framework: Fastify; validation: zod; logging: pino; testing: Vitest
-   DB access: Prisma 7 (new `prisma-client` generator) + `@prisma/adapter-pg`
-   TypeScript strict, ESLint (typescript-eslint flat) + Prettier, GitHub Actions CI
-   CI must not require a live DB; `DATABASE_URL` set only on the Build step
-   Error contract: `{ error: { code, message, details?, requestId } }`
-   Health: `GET /healthz` (liveness), `GET /readyz` (readiness incl. DB check)

### Steps taken
1.  Appended section 60 "Refined Foundation Plan (Phase 0)" to IMPLEMENTATION_PLAN.md
2.  Scaffolded repo root: package.json, pnpm-workspace.yaml (+`allowBuilds` for
    pnpm 11), tsconfig.base.json, .gitignore, .npmrc, .editorconfig,
    .prettierrc.json, .prettierignore, eslint.config.js
3.  Built packages: `@railflow/config`, `@railflow/logger`, `@railflow/contracts`,
    `@railflow/testing` (each with unit tests)
4.  Built `apps/api` scaffold: `buildApp()` + `server.ts`, requestId (`genReqId`,
    `x-request-id` echo), graceful shutdown (SIGINT/SIGTERM), pino structured
    logs, global error handler mapping `AppError` → standard error shape (dev
    stack), 404 handler, health module (healthz/readyz with injectable DB check)
5.  Prisma foundation: `prisma/schema.prisma` (User model + enums, `users` table
    brought forward from Phase 1), `apps/api/prisma.config.ts` (required by Prisma
    7 CLI), initial migration `20260807234633_init` applied
6.  Docker/CI: `infrastructure/docker/docker-compose.yml`
    (postgres/redis/kafka), multi-stage Dockerfile, `.github/workflows/ci.yml`

### Notes / gotchas
-   pnpm 11 ignores the `pnpm` field in package.json; settings live in
    pnpm-workspace.yaml
-   Prisma 7 requires `prisma.config.ts` + driver adapter; no `url` in datasource
-   `prisma migrate dev` HANGS locally (shadow-DB step) — use `--create-only`
    then `migrate deploy`
-   Fastify 5 + pino 9: pass a pino *options object* via `logger`, not an
    instance (instance causes a build-time `msgPrefix` type mismatch) —
    resolved via `createLoggerOptions()` in `@railflow/logger`
-   Vitest 4 requires Vite 6+ peer (vite@^6 pinned at root and every package)

### Verification (all green)
-   34 tests pass; typecheck/lint/format:check clean; build produces runnable dist
-   Live smoke test: healthz 200, readyz 200 (real DB), 404 standard shape,
    requestId in logs, graceful shutdown on SIGTERM
