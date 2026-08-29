# Phase 3: Search — Step Log

## Session 7 — Search endpoint + real journey results (COMPLETE)

### Decisions (user-confirmed, 2026-08-08)
-   First slice = **journey search endpoint** (`GET /search?from&to&date`) +
    wiring the Journey Selection page to real data. Redis caching deferred.
-   Search is **public read-only** (no auth), consistent with the railway module.
-   Availability summary derived from seat inventory already in the schema
    (per-class `capacity` + `availableSeats`); class-level limited/waitlist
    derivation stays on the client for now.

### Steps taken
1.  `search.types.ts`: `PublicSearchJourney/Class/Result` + `SearchJourneyRow`
    (journey + ordered stops + per-class capacity/availableSeats + corridor fares)
2.  `search.service.ts`: code normalization (uppercase, ≤10), required-param
    guards, date format validation, corridor check (origin index < destination
    index), departure/arrival/duration across `dayOffset`, class shaping (fares
    only, sorted ascending), departure-time sort
3.  `search.routes.ts`: `GET /search`; service owns validation (zod-free)
4.  `PrismaSearchRepository`: journeys on the UTC day of the requested date
    (SCHEDULED, ACTIVE train, origin stop present), filter to trains also
    stopping at destination, corridor fares, per-class capacity/available counts
5.  `app.ts`: registered search module after railway + `options.search` override
6.  `tests/helpers.ts`: `createFakeSearchRepository`/`createSeededSearchRepository`;
    `buildTestApp` injects search fakes
7.  Web: `createSearchApi` (`listStations`, `searchJourneys`), `JourneySearch`
    dropdowns load real stations, `JourneySelectionPage` fetches real journeys
    (loading skeleton / empty / error states), `tests/search.test.ts`
8.  `JourneySelectionPage.css`: shimmer skeleton for loading state

### Notes / gotchas
-   `journeyDate` is `@db.Date`; query by UTC-day range from the `YYYY-MM-DD`
    string so Prisma compares the right day.
-   Only classes with a corridor fare are returned; classes sorted by fare
    ascending (cheapest first).
-   Availability badge derives from the class with the fewest free seats;
    "seats left" shown when it dips below 50%.
-   Web `apiFetch` always adds `Content-Type: application/json`, so route tests
    assert with `expect.objectContaining({ method: 'GET' })`.

### Verification (all green)
-   `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test:run`,
    `pnpm build` all pass
-   API tests: 72 (58 + 16 search); web tests: 11 (8 + 3 search)
-   Live smoke (seeded DB): LAG→ABJ → NRC-101 08:00→19:30 (STD ₦18k /
    SLEEPER ₦28k / EC ₦32k); ABJ→KADUNA → NRC-202 07:00→09:45 (STD ₦8k /
    EC ₦14.5k); KADUNA→LAG → empty; 400 on same origin/dest, bad date, missing
    `from`; Vite proxy verified

### Next steps
-   Seat selection + hold (inventory slice), then booking
-   Explicit per-train availability summary in the search response
-   Redis caching for search (plan exit criteria)

## Session 8 — Redis cache-aside + class filter (COMPLETE)

### Decisions
-   Redis caching lands now to satisfy the plan exit criteria ("served from
    cache where possible"). Cache is **read-aside**: hit → serve cached result;
    miss → query PostgreSQL → write through. Cache failures (e.g. local Redis
    down) are **non-fatal** — the service logs and falls back to the DB.
-   Availability is a snapshot cached briefly; §25 still makes PostgreSQL the
    source of truth and the cache never authorizes a reservation.
-   Added optional `class` query param (plan scope) — filters a journey's
    classes to the requested one and drops journeys not offering it.

### Steps taken
1.  `packages/config`: `SEARCH_CACHE_TTL` (duration `^\d+[smhd]$`, default `5m`);
    config tests assert the default.
2.  `search.types.ts`: `SearchCache` interface (`get`/`set`).
3.  `infrastructure/redis/search-cache.ts`: `RedisSearchCache` — keys prefixed
    `railflow:search:`, JSON-serialized results, `EX` TTL clamped to 1..86400s,
    all Redis errors caught and logged (returns `null` on read failure).
4.  `search.service.ts`: optional `cache` + `cacheTtlSeconds`; cache key
    `<FROM>:<TO>:<YYYY-MM-DD>:<CLASS|ALL>`; cache read/write wrapped in
    try/catch; optional class normalization (`normalizeOptionalClass`); class
    filter applied before fare mapping in `buildJourney`.
5.  `search.routes.ts`: reads `class` query param; `buildDefaultSearchCache()`;
    `registerSearchModule(app, repo, cache?, ttl?)`.
6.  `app.ts`: `options.search` now accepts `{ repository?, cache?, cacheTtlSeconds? }`;
    default cache `RedisSearchCache`, default TTL `parseDuration(SEARCH_CACHE_TTL)`.
7.  `tests/helpers.ts`: `createMemorySearchCache()`; `buildTestApp` injects a
    memory cache (TTL 300s) so tests never touch Redis; search option is nested.
8.  Tests: service — class filter, drop-without-class, long class code, cache
    hit (repo not called), miss→write-through, cache read/write failures fall
    back, no-TTL bypasses cache; routes — class filter, long class → 400.

### Notes / gotchas
-   Route tests previously passed the repository directly to `buildTestApp`;
    the option is now nested (`{ search: { repository } }`) — updated all call sites.
-   `getRedis()` reads `process.env.REDIS_URL`; when Redis is down the client
    fails fast (maxRetriesPerRequest 2) and the cache layer swallows the error.
-   Cache key encodes the class so STD and EC searches don't clobber each other.

### Verification (all green)
-   `pnpm --filter @railflow/api test`: 82 passed (58 + 24 search: 16 service, 8 routes)
-   `pnpm --filter @railflow/config test`: 15 passed (SEARCH_CACHE_TTL default)
-   `pnpm --filter @railflow/api typecheck`, `pnpm lint`, `pnpm format` clean
-   Live smoke (seeded DB, Redis down): `GET /search?from=LAG&to=ABJ&date=...`
    → NRC-101 with STD/SLEEPER/EC classes + fares; `&class=EC` → only EC; cache
    misses gracefully with Redis offline; 400 on same origin/dest + bad date.

