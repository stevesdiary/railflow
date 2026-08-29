# Phase 0: Foundation

Status: DONE

## Scope

-   Repository (pnpm workspaces, apps/* + packages/*)
-   TypeScript (strict, shared base config)
-   PostgreSQL
-   Prisma 7 (prisma-client generator + driver adapter)
-   Redis
-   Docker (compose + multi-stage image)
-   Configuration (@railflow/config)
-   Logging (pino)
-   Error handling (standard error contract)
-   Validation (zod)
-   Health endpoints (/healthz, /readyz)
-   CI (GitHub Actions; infra-free unit tests)

## Exit criteria

``` text
Application starts
Database migrations work
Health checks work
CI passes
```

## References

-   IMPLEMENTATION_PLAN.md §49 Phase 0, §6 (database), §35 (docker), §46 (CI/CD)
-   docs/TASKS/phase-00-foundation.md
-   docs/STEPS/phase-00-foundation.md
