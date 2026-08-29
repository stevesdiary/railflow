# Phase 2: Railway Master Data — Task Checklist

Status: DONE

-   [x] Station schema
-   [x] Train schema
-   [x] Train stop schema
-   [x] Coach schema
-   [x] Seat schema
-   [x] Journey schema
-   [x] Quota schema
-   [x] Fare schema
-   [x] Seed data (idempotent, Nigerian corridor)
-   [x] GET /stations (optional query: code/name/city contains, cap 100)
-   [x] GET /stations/:code (404 NOT_FOUND when unknown)
-   [x] GET /trains (active trains: origin/destination + stopCount)
-   [x] GET /trains/:number (stops ordered + coaches with class; 404 when unknown)
-   [x] GET /classes (reference data)
-   [x] GET /quotas (reference data)
-   [x] GET /fares?from&to&class (uppercased filters; 400 when origin == destination)
-   [x] RailwayService (query trim/length validation, NotFoundError mapping)
-   [x] PrismaRailwayRepository (findMany cap 100, ordered stops, filtered fares)
-   [x] Wire registerRailwayModule + options.railway into buildApp
-   [x] Test helpers: buildTestApp + fake/seeded railway repos (infra-free CI)
-   [x] Tests: railway.service.test.ts (12), railway.routes.test.ts (10)
-   [x] Verify: typecheck/lint/format/build + full suite + live smoke vs seeded DB

See docs/STEPS/phase-02-railway-master-data.md for the step log and verification.
