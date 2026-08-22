# Phase 3: Search — Task Checklist

Status: DONE

-   [x] GET /search (public, read-only)
-   [x] Origin/destination validation (required, uppercase, differ, ≤10 chars)
-   [x] Date validation (YYYY-MM-DD, real date)
-   [x] Optional class filter (uppercase, ≤10 chars, drops journeys without the class)
-   [x] Journey filtering (trains whose route serves origin before destination)
-   [x] Corridor fare retrieval (per-class, cheapest first)
-   [x] Availability summary per class (capacity + availableSeats)
-   [x] Departure-time sorting
-   [x] SearchService (validation + shaping, zod-free)
-   [x] PrismaSearchRepository (journey + stops + coaches + seats + fares)
-   [x] Redis cache-aside (SearchCache interface, RedisSearchCache, TTL)
-   [x] Graceful degradation when Redis is down (cache errors are non-fatal)
-   [x] SEARCH_CACHE_TTL config (default 5m)
-   [x] Wire registerSearchModule + options.search (repository/cache/TTL) into buildApp
-   [x] Test helpers: fake + seeded search repos, in-memory cache
-   [x] Tests: search.service.test.ts (16), search.routes.test.ts (8)
-   [x] Web: createSearchApi, JourneySearch real stations, JourneySelectionPage
      real journeys (Session 7)
-   [x] Verify: typecheck/lint/format/build + full suite + live smoke vs seeded DB

See docs/STEPS/phase-03-search.md for the step log and verification.
