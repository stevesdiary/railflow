# Phase 0: Foundation — Task Checklist

Status: DONE

Mirrors the `### Foundation` backlog in IMPLEMENTATION_PLAN.md §57. Items ticked
as they land; the in-session todo list mirrors this file.

-   [x] Initialize repository (pnpm workspaces: apps/*, packages/*)
-   [x] Configure TypeScript (strict, tsconfig.base.json)
-   [x] Configure application framework (Fastify)
-   [x] Configure Prisma (v7 prisma-client generator + adapter-pg + prisma.config.ts)
-   [x] Create PostgreSQL development environment
-   [x] Create Redis development environment
-   [x] Create Kafka development environment
-   [x] Configure Docker Compose
-   [x] Add environment configuration (@railflow/config + zod)
-   [x] Add structured logging (pino)
-   [x] Add global error handling (AppError → standard error shape)
-   [x] Add request validation (zod + parseOrThrow)
-   [x] Add health/readiness endpoints (/healthz, /readyz)
-   [x] Configure CI (GitHub Actions, infra-free unit tests)

See docs/STEPS/phase-00-foundation.md for the step log and verification.
