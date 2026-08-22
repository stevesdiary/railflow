# Phase 2: Railway Master Data — Step Log

## Session 5 — Railway master data API (COMPLETE)

### Decisions (user-confirmed, 2026-08-08)
-   Phase 2 first slice is **read-only railway master data**, layered on the
    existing Prisma schema (Station/Train/TrainStop/Coach/Seat/Journey/Quota/Fare
    already migrated).
-   New module mirrors the identity module's structure: `railway.types.ts`
    (contracts + repository interface), `railway.service.ts` (domain/validation),
    `railway.routes.ts` (Fastify plugin), `infrastructure/prisma/railway-repositories.ts`
    (Prisma impl).
-   Fares `amount` is **integer NGN** (matches `Fare.amount Int`); payments
    phase converts to kobo when it lands.
-   Fares are corridor-specific and NOT route-specific (per the plan's fare
    model): a `from`/`to` pair + class yields one amount regardless of train.
-   Test infra extended with `buildTestApp()` in `tests/helpers.ts` (single
    entry point supplying identity + railway fakes) so infra-free CI stays
    infra-free.

### Steps taken
1.  Wrote `railway.types.ts`: Public* contracts + `RailwayRepository` interface
    + `RailwayService`
2.  `railway.service.ts`: station query trim/length validation, uppercase fare
    filters, same-origin/destination guard, `NotFoundError` mapping for
    stations/trains
3.  `railway.routes.ts`: register `/stations`, `/trains`, `/classes`, `/quotas`,
    `/fares` (no auth — public reference data, consistent with the plan)
4.  `PrismaRailwayRepository` in `infrastructure/prisma/railway-repositories.ts`
    (station findMany cap 100, train stops ordered, fares filtered by from/to/class)
5.  Wired `registerRailwayModule` + `options.railway` override into `buildApp`
6.  Added `buildTestApp()` + `createFakeRailwayRepository()`/
    `createSeededRailwayRepository()` to `tests/helpers.ts`; moved
    app/error-handler/identity route tests onto the helper
7.  Wrote service + route tests (fake repo, no DB)
8.  Created idempotent seed (`src/prisma/seed.ts`): 6 corridor stations, 2
    trains, 7 stops, 6 coaches, 280 seats, 32 fares, 4 quotas, 14 days of journeys
9.  Wired `prisma db seed` via `prisma.config.ts` `migrations.seed` + `db:seed`
    scripts (api + root); fixed `create` payload leaking non-schema fare fields
10. Verified against the local Postgres (seeded) with a live server: query,
    detail, fares, classes, quotas all return real rows; 400/404 shapes confirmed

### Notes / gotchas
-   Found the local Postgres (not Docker — Docker isn't running) had migrations
    applied but zero data; the seed from an earlier session didn't exist on
    disk, so I created it.
-   Prisma 7 `findMany` with `mode: 'insensitive'` needs the `as const` on the
    mode field.
-   Seed's `prisma db seed` runs with cwd = `apps/api`, so the seed command is
    `tsx src/prisma/seed.ts` (resolves `tsx` + `@prisma/adapter-pg` from the api
    package).
-   Prisma's strict validation flags extra fields in `create` — build the
    `create` payload from explicit fields, not a spread of the input row.

### Verification (all green)
-   `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test:run`,
    `pnpm build` all pass
-   API tests: 58 passed (36 existing + 22 new railway)
-   Live smoke (seeded DB): `/stations?query=ibadan`→IBADAN, `/trains`→2 trains
    with stops, `/trains/NRC-101`→5 stops + 4 coaches, `/fares?from=LAG&to=ABJ`→3
    class fares, 400 for `from=LAG&to=LAG`, 404 for unknown station/train
