# RailFlow — Worklog

Append-only chronological session log. Each session records: decisions, task
checklist, steps taken, verification results, and next steps.

The structured docs live in `docs/` — see `docs/PROCESS.md` for the index and
workflow:

- `docs/PLANS/*` — per-phase plans (scope + exit criteria)
- `docs/TASKS/*` — per-phase checklists (mirrors the live in-session todo list)
- `docs/STEPS/*` — per-phase append-only step logs

Top-level indexes: `IMPLEMENTATION_PLAN.md` (master architecture + phase
backlog §49/§57; its phase checkboxes are ticked as work lands) and this file.

---

## Session 1 — Phase 0: Foundation (COMPLETE)

### Decisions (user-confirmed)
- Monorepo: pnpm workspaces (`apps/*`, `packages/*`)
- Web framework: Fastify; validation: zod; logging: pino; testing: Vitest
- DB access: Prisma 7 (new `prisma-client` generator) + `@prisma/adapter-pg`
- TypeScript strict, ESLint (typescript-eslint flat) + Prettier, GitHub Actions CI
- CI must not require a live DB; `DATABASE_URL` set only on the Build step
- Error contract: `{ error: { code, message, details?, requestId } }`
- Health: `GET /healthz` (liveness), `GET /readyz` (readiness incl. DB check)

### Steps taken
1. Appended section 60 "Refined Foundation Plan (Phase 0)" to IMPLEMENTATION_PLAN.md
2. Scaffolded repo root: package.json, pnpm-workspace.yaml (+`allowBuilds` for pnpm 11),
   tsconfig.base.json, .gitignore, .npmrc, .editorconfig, .prettierrc.json,
   .prettierignore, eslint.config.js
3. Built packages: `@railflow/config`, `@railflow/logger`, `@railflow/contracts`,
   `@railflow/testing` (each with unit tests)
4. Built `apps/api` scaffold: `buildApp()` + `server.ts`, requestId (`genReqId`,
   `x-request-id` echo), graceful shutdown (SIGINT/SIGTERM), pino structured logs,
   global error handler mapping `AppError` -> standard error shape (dev stack),
   404 handler, health module (healthz/readyz with injectable DB check)
5. Prisma foundation: `prisma/schema.prisma` (User model + UserRole/UserStatus
   enums, `users` table brought forward from Phase 1), `apps/api/prisma.config.ts`
   (required by Prisma 7 CLI), initial migration `20260807234633_init` applied
6. Docker/CI: `infrastructure/docker/docker-compose.yml` (postgres/redis/kafka),
   multi-stage Dockerfile, `.github/workflows/ci.yml`

### Notes / gotchas
- pnpm 11 ignores the `pnpm` field in package.json; settings live in pnpm-workspace.yaml
- Prisma 7 requires `prisma.config.ts` + driver adapter; no `url` in datasource block
- `prisma migrate dev` HANGS locally (shadow-DB step) — use `--create-only` then
  `migrate deploy`
- Fastify 5 + pino 9: pass a pino *options object* via `logger`, not an instance
  (instance causes a build-time `msgPrefix` type mismatch) — resolved via
  `createLoggerOptions()` in `@railflow/logger`
- Vitest 4 requires Vite 6+ peer (vite@^6 pinned at root and every package)

### Verification (all green)
- 34 tests pass; typecheck/lint/format:check clean; build produces runnable dist
- Live smoke test: healthz 200, readyz 200 (real DB), 404 standard shape, requestId
  in logs, graceful shutdown on SIGTERM
- Git: work uncommitted (for review)

### Next steps
- Phase 1: Identity (see Session 2)

---

## Session 2 — Phase 1: Identity (IN PROGRESS)

### Decisions (user-confirmed, 2026-08-08)
1. Token strategy: **JWT access + opaque refresh tokens in Redis** (refresh rotated/revocable)
2. Password hashing: **Argon2id** (`argon2` package; native build -> Docker build deps + allowBuilds)
3. Login identifier: **email** (unique)
4. Verification: **email verification with dev mailer** (link logged in dev; SMTP wired later)

### Refinement decisions (from implementation, documented as made)
- Refresh tokens: base64url 48-byte random; SHA-256 hash stored as Redis key
  (`rf:<hash>`) so a leak never exposes usable tokens; TTL = refresh TTL; rotation on refresh
- Verification tokens: base64url 32-byte random; SHA-256 hash stored in
  `EmailVerificationToken` table; single-use, expiring, cascade delete
- Refresh token transport: returned in JSON body (cookie/httpOnly is a later
  hardening step)
- DI pattern: AuthService takes injectable stores (userRepo, refreshStore,
  verificationStore, mailer, tokenService) so tests run against in-memory fakes —
  CI stays DB/Redis-free, matching Session 1 constraint

### Task checklist
- [x] Deps + allowBuilds + install (@fastify/jwt, argon2, ioredis)
- [x] Config: JWT secrets/TTLs, REDIS_URL, PUBLIC_BASE_URL + tests
- [x] Prisma: EmailVerificationToken model + migration
- [x] Infrastructure: ioredis client + shutdown
- [x] Mailer: Mailer interface + DevMailer
- [x] Token service: JWT sign/verify, refresh store, verification tokens
- [x] AuthService: register/login/verifyEmail/refresh/logout/profile + unit tests
- [x] Identity routes: /auth/register|login|refresh|logout|verify-email|me
- [x] Authorization: fastify.jwt + requireAuth/requireRole + type augmentation
- [x] Wire identity module + jwt into app.ts
- [x] Dockerfile: argon2 build deps
- [x] Verify: tests/typecheck/lint/build; live smoke register->login->me

### Step log (timestamped, append as you go)

#### 2026-08-08 — deps added
- `pnpm add` to `apps/api`: `@fastify/jwt`, `argon2`, `ioredis`
- Added `argon2` to `allowBuilds` in pnpm-workspace.yaml (native compile)
- Install successful; `argon2` compiled locally (macOS)

#### 2026-08-08 — config
- `packages/config`: added `JWT_ACCESS_SECRET`/`JWT_REFRESH_SECRET` (min 32),
  `JWT_ACCESS_TTL`/`JWT_REFRESH_TTL`/`EMAIL_VERIFICATION_TOKEN_TTL` (regex-validated),
  `PUBLIC_BASE_URL`; new `parseDuration()` helper. Config tests now 15.
- `apps/api/.env` + `.env.example`: dev secrets (flagged change-me), TTLs, base URL.
- `@railflow/testing` `createTestConfig` supplies test JWT secrets.

#### 2026-08-08 — schema/migrations
- `EmailVerificationToken` model (tokenHash unique, userId FK cascade, expiresAt,
  usedAt single-use guard; indexes on userId + expiresAt).
- `User.phone` made nullable (`String?`) since registration is email-based.
- Migrations created with `--create-only` + applied via `db:deploy`:
  `20260808001017_add_email_verification_tokens`, `20260808001046_make_phone_optional`.

#### 2026-08-08 — infrastructure
- `infrastructure/redis/redis.ts`: ioredis singleton (`getRedis`/`closeRedis`).
- `infrastructure/redis/refresh-token.store.ts`: `RedisRefreshTokenStore`, key
  `rf:<sha256>`, TTL = refresh TTL.
- `infrastructure/prisma/identity-repositories.ts`: `PrismaUserRepository` +
  `PrismaVerificationTokenStore` (single-use via `updateMany ... usedAt null`).
- `infrastructure/mailer/dev-mailer.ts`: logs the verification link (SMTP later).

#### 2026-08-08 — identity module
- `auth.types.ts`: DI interfaces (UserRepository, RefreshTokenStore,
  VerificationTokenStore, TokenService, Mailer, AuthDependencies, PublicUser).
- `password.ts`: argon2id hash/verify (tunable params for tests).
- `tokens.ts`: sha256 `hashToken`, `FastifyJwtTokenService` (wraps app.jwt),
  `RefreshTokenService` (48B base64url, rotate/revoke), `VerificationTokenService`
  (32B base64url).
- `auth.service.ts`: register (ConflictError on dup, sends verification mail),
  login (401 INVALID credentials, 403 unverified), refresh (rotate + revoke),
  logout (idempotent revoke), verifyEmail (single-use, expiry checks), getProfile.
- `auth.schemas.ts` (zod) + `auth.routes.ts` (routes under `/auth/*`,
  `buildDefaultAuthDeps` factory; `parseOrThrow` -> ValidationError with issues).
- `common/auth/require-auth.ts`: `authenticate` preHandler + `requireRole(...)`.

#### 2026-08-08 — wiring + authz
- `app.ts`: registers `@fastify/jwt` (access secret, expiresIn), identity module
  with injectable `identity` option (object or factory, for tests); onClose closes
  Redis too.
- `fastify.d.ts`: augmented `@fastify/jwt` `FastifyJWT.payload/user`.

#### 2026-08-08 — tests
- `tests/helpers.ts`: `MemoryAuthInfra` (in-memory user/refresh/verification stores
  + mail capture + seed helpers), `testConfig`, `createFakeTokenService`.
- `tests/identity/auth.service.test.ts` (15) + `tests/identity/auth.routes.test.ts`
  (8): register/login/refresh/logout/verify/me + error paths + full happy path.
- Existing `app.test.ts`/`error-handler.test.ts` now inject fake identity deps
  (no Redis/Prisma in unit tests; CI stays infra-free).
- `apps/web` `test:run` set to `--passWithNoTests` so repo-wide `test:run` stays green.
- Total: 63 tests (config 15, contracts 5, logger 4, testing 3, api 36).

#### 2026-08-08 — Dockerfile
- Added `python3 make g++` to `dependencies` and `production` stages (argon2
  compiles via node-gyp on alpine). Image-size reduction is a later hardening item.

### Notes / gotchas
- Fastify's `app.log` is `FastifyBaseLogger`; pino `Logger` requires `msgPrefix`,
  so `AuthDependencies.logger` is typed `FastifyBaseLogger` (same fix pattern as
  Session 1's `createLoggerOptions`).
- `parseOrThrow` needed a real `zod.ZodType<T>` param for TS inference.
- `noUncheckedIndexedAccess` trips on array/record access even in tests.
- Real JWT only comes from `FastifyJwtTokenService(app, ttl)`; unit tests use the
  fake token service, route tests use the real one via the `identity` factory.
- Refresh-token reuse after rotation/logout correctly returns 401 (verified live).

### Verification (all green, 2026-08-08)
- `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test:run` (63 tests),
  `pnpm build` all pass.
- Live smoke (real Postgres + Redis): register 201 -> dev-mailer logs link ->
  verify 200 -> login 200 (access 243B, refresh 64B, expiresIn 900) -> `/auth/me`
  200 (ACTIVE, emailVerified true) -> refresh rotates (old token reuse 401) ->
  logout 204 (refresh after logout 401). Server + Redis shut down cleanly.

### Next steps
- Phase 2 (Railway Master Data): stations/trains/stops/coaches/seats/classes/
  quotas/journeys/fares + seed data (see IMPLEMENTATION_PLAN.md §49).
- Frontend: wire register/login + verification UI to the API (apps/web), then
  stations/trains screens. Frontend items tracked in `docs/TASKS/frontend-web.md`.
- Hardening (later): refresh token in httpOnly cookie, SMTP mailer, rate limiting
  on auth endpoints, argon2 prebuilds / smaller Docker image.

---

## Session 3 — Frontend: apps/web (COMPLETE)

### Decisions (user-confirmed, 2026-08-08)
- Design system: **hand-authored CSS design tokens** (Google Stitch API was not
  authenticated), based on the railway booking design prompts in
  `RAILWAY_BOOKING_UI_DESIGN_PROMPTS.md` (Nigeria / NGN, trust-focused). Tokens
  land in `apps/web/src/index.css`; components consume tokens exclusively.
- Stitch-generated screens/components can be wired in later once auth is fixed.

### Task checklist
- [x] Initialize `apps/web` (React 19 + Vite 6 + TS, `react-router-dom` v7)
- [x] Design tokens + base styles in `apps/web/src/index.css`
- [x] Routing: Layout (Header/Footer) + Homepage, Journey Selection, Journey Details
- [x] Foundational components: JourneySearch widget, journey cards w/ availability
      states (available/limited/RAC/waitlist/soldout)
- [x] Verify: typecheck/lint/format/build + dev-server smoke test

### Steps taken
1. Scaffolded `apps/web`: package.json, tsconfig.json, vite.config.ts (dev proxy
   `/api` → `:3000`), vitest.config.ts, index.html, `src/main.tsx`, `src/App.tsx`
2. Wrote design tokens (color/typography/spacing/radius/shadow + semantic
   inventory-state colors) and base component styles in `index.css`
3. Components: `layout/Header|Footer|Layout`, `journey/JourneySearch` (used as
   hero widget + results bar), `pages/HomePage`, `pages/JourneySelectionPage`,
   `pages/JourneyDetailsPage`
4. Homepage: hero + search widget, quick actions, popular routes, benefits, FAQ
5. Journey Selection: search bar reads `?origin&destination&date&passengers`,
   sample journey cards with status badges and NGN fares
6. Fixed pre-existing lint (unused `ttlSeconds` in api tests helper) + API test
   typecheck issues that were blocking CI
7. `pnpm exec prettier --write .` to restore format:check green repo-wide

### Notes / gotchas
- `@vitejs/plugin-react@4.x` used (v6 requires Vite 8; repo pins Vite 6)
- Journey cards are mock data; real data comes from search/inventory APIs later
- Pre-existing API lint/typecheck failures surfaced from Session 2's uncommitted
  work — fixed so `pnpm lint`/`pnpm typecheck` are green repo-wide

### Verification (all green)
- `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test:run`,
  `pnpm build` all pass
- Dev server smoke test: `/`, `/search?...`, module transforms all 200

### Next steps
- Design tokens/components still to be replaced/refined with Stitch output when
  auth is available
- Wire real API: register/login (identity already built), stations/trains (Phase 2)

---

## Session 4 — Frontend: Auth flow + API client (COMPLETE)

### Decisions (user-confirmed, 2026-08-08)
- Build the first end-to-end vertical: Login / Sign Up / Verify Email wired to the
  already-built identity API, plus a small typed API client layer in `apps/web`.
- Token strategy on the client: access + refresh tokens in `localStorage`
  (`railflow.accessToken`, `railflow.refreshToken`, `railflow.user`); session is
  restored on boot via `/auth/refresh`. (httpOnly cookies remain a later hardening
  step, matching the API-side note.)

### Task checklist
- [x] API client: `apiFetch` wrapper honoring `{ error: { code, message, details?, requestId } }`
      + `createAuthApi` (register/login/refresh/logout/me/verifyEmail)
- [x] Token store + `AuthProvider` context (loading/authenticated/anonymous, restore via refresh)
- [x] Login page (redirect back to protected route via `location.state.from`)
- [x] SignUp page (per-field validation, password strength, terms, "check your email" success)
- [x] Verify Email page (token from query string, success/error states)
- [x] Header shows user menu (first name + logout) when authenticated
- [x] Routes `/login`, `/signup`, `/verify-email`; provider wired in `main.tsx`
- [x] Tests: `tests/client.test.ts` (4), `tests/auth.test.ts` (4)
- [x] Verify: lint/format/typecheck/test/build + dev-server route smoke test

### Notes / gotchas
- `apiFetch` must merge `init.headers` AND the third `headers` arg (Authorization was
  being dropped) — fixed + covered by a unit test
- `localStorage` is unavailable in vitest node env — tests stub an in-memory Storage
- Live end-to-end smoke test deferred: Docker (Postgres/Redis) not running locally,
  so the API can't boot; page render + module transforms verified instead

### Verification (all green)
- `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test:run`, `pnpm build`
- Web tests: 8 passed (client + auth)
- Dev server: `/`, `/login`, `/signup`, `/verify-email?token=abc`, `/search` all 200
- Live smoke (Postgres + local redis-server; API already running): register→201 with
  PENDING_VERIFICATION, dev-mailer verify link captured from API log, verify→200
  `{verified:true}`, login→access+refresh tokens, `/auth/me` 200 with ACTIVE user,
  `/auth/me` w/o bearer→401 standard envelope, refresh rotation→200 then reuse→401;
  Vite proxy `/api/*`→`:3000` confirmed for login + healthz; smoke users/tokens cleaned up

### Next steps
- ~~Live smoke test register→verify→login once Docker/DB is up~~ DONE (see above)
- Replace mock journey cards with real stations/trains/search data (Phase 2 API)
- Protected route wrapper (`RequireAuth`) for My Bookings/Profile when those pages land

---

## Session 5 — Railway master data API: stations, trains, classes, fares (COMPLETE)

### Decisions (user-confirmed, 2026-08-08)
- Phase 2 first slice is **read-only railway master data**, layered on the existing
  Prisma schema (Station/Train/TrainStop/Coach/Seat/Journey/Quota/Fare already migrated).
- New module mirrors the identity module's structure: `railway.types.ts` (contracts +
  repository interface), `railway.service.ts` (domain/validation), `railway.routes.ts`
  (Fastify plugin), `infrastructure/prisma/railway-repositories.ts` (Prisma impl).
- Fares `amount` is **integer NGN** (matches `Fare.amount Int`); payments phase converts
  to kobo when it lands.
- Fares are corridor-specific and NOT route-specific (per the plan's fare model): a
  `from`/`to` pair + class yields one amount regardless of train.
- Test infra extended with `buildTestApp()` in `tests/helpers.ts` (single entry point
  supplying identity + railway fakes) so infra-free CI stays infra-free.

### Task checklist
- [x] `GET /stations` (optional `query`, code/name/city contains, ≤50 chars, cap 100)
- [x] `GET /stations/:code` (404 `NOT_FOUND` when unknown)
- [x] `GET /trains` (active trains with origin/destination + stopCount)
- [x] `GET /trains/:number` (stops ordered + coaches with class, 404 when unknown)
- [x] `GET /classes`, `GET /quotas` (reference data)
- [x] `GET /fares?from&to&class` (uppercased filters, 400 when origin == destination)
- [x] Idempotent seed `apps/api/src/prisma/seed.ts` via `pnpm db:seed` (prisma db seed)
- [x] Tests: `railway.service.test.ts` (12), `railway.routes.test.ts` (10)
- [x] Refactored existing tests onto `buildTestApp()` helper (still 36 passing)
- [x] Verify: typecheck/lint/format/build + full test suite + live smoke test vs seeded DB

### Steps taken
1. Wrote `railway.types.ts`: Public* contracts + `RailwayRepository` interface + `RailwayService`
2. `railway.service.ts`: station query trim/length validation, uppercase fare filters,
   same-origin/destination guard, `NotFoundError` mapping for stations/trains
3. `railway.routes.ts`: register `/stations`, `/trains`, `/classes`, `/quotas`, `/fares`
   (no auth — public reference data, consistent with the plan)
4. `PrismaRailwayRepository` in `infrastructure/prisma/railway-repositories.ts`
   (station findMany cap 100, train stops ordered, fares filtered by from/to/class)
5. Wired `registerRailwayModule` + `options.railway` override into `buildApp`
6. Added `buildTestApp()` + `createFakeRailwayRepository()`/`createSeededRailwayRepository()`
   to `tests/helpers.ts`; moved app/error-handler/identity route tests onto the helper
7. Wrote service + route tests (fake repo, no DB)
8. Created idempotent seed (`src/prisma/seed.ts`): 6 corridor stations, 2 trains,
   7 stops, 6 coaches, 280 seats, 32 fares, 4 quotas, 14 days of journeys
9. Wired `prisma db seed` via `prisma.config.ts` `migrations.seed` + `db:seed` scripts
   (api + root); fixed `create` payload leaking non-schema fare fields
10. Verified against the local Postgres (seeded) with a live server: query, detail,
    fares, classes, quotas all return real rows; 400/404 shapes confirmed

### Notes / gotchas
- Found the local Postgres (not Docker — Docker isn't running) had migrations applied
  but zero data; the seed from an earlier session didn't exist on disk, so I created it.
- Prisma 7 `findMany` with `mode: 'insensitive'` needs the `as const` on the mode field.
- Seed's `prisma db seed` runs with cwd = `apps/api`, so the seed command is
  `tsx src/prisma/seed.ts` (resolves `tsx` + `@prisma/adapter-pg` from the api package).

### Verification (all green)
- `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test:run`, `pnpm build`
- API tests: 58 passed (36 existing + 22 new railway)
- Live smoke (seeded DB): `/stations?query=ibadan`→IBADAN, `/trains`→2 trains with
  stops, `/trains/NRC-101`→5 stops + 4 coaches, `/fares?from=LAG&to=ABJ`→3 class fares,
  400 for `from=LAG&to=LAG`, 404 for unknown station/train

### Next steps
- Search endpoint: available journeys between origin/destination on a date + fares
- Availability summary per train (seats free vs held/booked per class)
- Seat selection + hold (inventory slice); wire Journey Selection UI to real data

---

## Session 6 — Documentation: structured PLANS / TASKS / STEPS (COMPLETE)

### Decision (user-confirmed, 2026-08-08)
- Organize all planning and process documentation as markdown files under
  `docs/` with per-phase folders: `PLANS/` (scope + exit criteria), `TASKS/`
  (checklists), `STEPS/` (append-only step logs). Root `IMPLEMENTATION_PLAN.md`
  and `WORKLOG.md` stay as top-level indexes.

### Task checklist
- [x] `docs/PROCESS.md` — index + workflow rules (Plan → Task → Step → Verify)
- [x] `docs/TEMPLATE.md` — template for starting new phases
- [x] `docs/PLANS/` — files for phases 0–14 (extracted from IMPLEMENTATION_PLAN.md §49)
      + cross-cutting `frontend-web.md`
- [x] `docs/TASKS/` — phase 0, 1, 2 + frontend-web checklists (ticked)
- [x] `docs/STEPS/` — step logs for sessions 1–5, split per track
- [x] Folded stale `task.md` into `docs/TASKS/frontend-web.md` and removed it
- [x] Updated WORKLOG.md + IMPLEMENTATION_PLAN.md headers to reference `docs/`

### Notes / gotchas
- `docs/PLANS/` for not-yet-started phases exist as forward references; their
  `TASKS/`/`STEPS/` files are created when the phase starts (template applies).
- The frontend track is cross-cutting (not a numbered phase) — documented
  separately and linked from the phase index.

### Verification (all green)
- `pnpm format:check` clean after docs edits
- All process knowledge preserved: nothing dropped, only relocated

### Next steps
- Phase 3 (Search): see `docs/PLANS/phase-03-search.md`

---

## Session 7 — Search API + real journey results in the UI (COMPLETE)

### Decisions (user-confirmed, 2026-08-08)
- Phase 3 first slice = **journey search endpoint** (`GET /search?from&to&date`)
  plus wiring the Journey Selection page to real data. Redis caching is a later
  slice (the plan's exit criteria mention cache; deferred to keep this slice lean).
- Search is **public read-only** (no auth), consistent with the railway module.
- Availability summary is derived from the seat inventory already in the schema:
  per-class `capacity` + `availableSeats` (count of `Seat.status = AVAILABLE`
  across the train's coaches). Class-level RAC/waitlist/limited derivation stays
  on the client for now.

### Task checklist
- [x] API search module: `search.types.ts` (contracts + `SearchRepository`),
      `search.service.ts` (validation + corridor/duration/class shaping),
      `search.routes.ts` (`GET /search`), `PrismaSearchRepository`
- [x] Wired `registerSearchModule` + `options.search` override into `buildApp`
- [x] Tests: `search.service.test.ts` (10), `search.routes.test.ts` (6); helpers
      extended with `createFakeSearchRepository`/`createSeededSearchRepository`
- [x] Web: `createSearchApi` (`listStations`, `searchJourneys`) + exports
- [x] `JourneySearch` dropdowns load real stations (code as value, name as label)
- [x] `JourneySelectionPage` fetches real journeys; loading skeleton / empty /
      error states; availability badge + "seats left" derived from seat counts
- [x] Tests: `tests/search.test.ts` (3) — web total now 11
- [x] Verify: lint/format/typecheck/test/build + live smoke vs seeded DB

### Steps taken
1. `search.types.ts`: `PublicSearchJourney/Class/Result` + `SearchJourneyRow`
   (journey + ordered stops + per-class capacity/availableSeats + corridor fares)
2. `search.service.ts`: code normalization (uppercase, ≤10), required-param
   guards, date format validation (`YYYY-MM-DD`), corridor check (origin index <
   destination index), departure/arrival/duration across `dayOffset`, class
   shaping (fares only, sorted by amount), departure-time sort
3. `search.routes.ts`: `GET /search` passing raw query strings to the service
   (zod-free like the railway module; service owns validation)
4. `PrismaSearchRepository`: find journeys on the UTC day of the requested date
   (`journeyDate gte/lt`), SCHEDULED, ACTIVE train, origin stop present; filter
   to trains that also stop at destination; fetch corridor fares; fold coaches
   into per-class capacity/available-seat counts
5. `app.ts`: registered search module after railway; `options.search.repository`
   override for tests
6. `tests/helpers.ts`: `createFakeSearchRepository` (empty) +
   `createSeededSearchRepository(rows)`; `buildTestApp` now injects search fakes
7. Web API client `lib/api/search.ts` + barrel exports; `tests/search.test.ts`
8. `JourneySearch.tsx`: fetch stations on mount (cancelled on unmount, error
   message on failure), options keyed by station code
9. `JourneySelectionPage.tsx`: fetch on `hasQuery` change (cancelled on unmount);
   skeleton cards while loading; "No journeys found" empty state; error card
   with `ApiError` message; real route names from the response; journey cards
   keyed by `journeyId` with real times/duration/stops/class chips/fares
10. `JourneySelectionPage.css`: shimmer skeleton for the loading state

### Notes / gotchas
- `journeyDate` is a `@db.Date` column; query by a UTC-day range built from the
  requested `YYYY-MM-DD` string so Prisma compares the right day.
- Only classes with a fare for the corridor are returned (a class with no fare
  can't be priced); classes sorted by fare ascending so the cheapest is first.
- Availability badge derives from the class with the **fewest** free seats
  (the binding constraint); "seats left" shows when it dips below 50%.
- Web `fetch` always adds `Content-Type: application/json` via `apiFetch`, so
  route tests assert with `expect.objectContaining({ method: 'GET' })`.

### Verification (all green)
- `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test:run`,
  `pnpm build` all pass
- API tests: 72 (58 + 16 search); web tests: 11 (8 + 3 search)
- Live smoke (seeded DB, restarted API + Vite dev server):
  `/search?from=LAG&to=ABJ&date=2026-08-10` → NRC-101 08:00→19:30, 3 classes
  (STD ₦18k / SLEEPER ₦28k / EC ₦32k) with seat counts; `/search?from=ABJ&to=
  KADUNA` → NRC-202 07:00→09:45 (STD ₦8k / EC ₦14.5k); reverse corridor
  KADUNA→LAG → empty; 400 for same origin/destination, malformed date, missing
  `from`; Vite proxy `/api/search` + `/api/stations` verified

### Next steps
- Seat selection + hold (inventory slice), then booking — the "Select seats"
  button currently points at the placeholder Journey Details page
- Availability *summary* per train (the plan wants an explicit per-train
  availability summary in the search response — currently derived per class)
- Redis caching for search (plan exit criteria)
- Frontend: Journey Details page to show real coach/seat maps from the train
  endpoint

## Session 8 — Search: Redis cache-aside + class filter (COMPLETE)

### Decisions (2026-08-08)
- Redis caching lands now to satisfy the Phase 3 exit criteria ("served from
  cache where possible"): read-aside pattern — hit serves the cached result,
  miss queries PostgreSQL then writes through. Cache failures are **non-fatal**
  (log + fall back to DB) so a down Redis never breaks search (§11/§25: Redis
  is an ephemeral availability cache; PostgreSQL stays the source of truth).
- Added an optional `class` query param (plan scope): filters a journey's
  classes to the requested one and drops journeys that don't offer it.
- Cache invalidation stays TTL-only for now (no inventory writes exist yet);
  explicit invalidation on inventory change lands with Phase 4.

### Task checklist
- [x] `SEARCH_CACHE_TTL` (default `5m`) in `packages/config` + config tests
- [x] `SearchCache` interface; `RedisSearchCache` (prefix `railflow:search:`,
      JSON, EX TTL clamped 1..86400s, all errors swallowed)
- [x] `SearchService` cache-aside (key `<FROM>:<TO>:<date>:<CLASS|ALL>`),
      cache read/write in try/catch, optional class normalization + filtering
- [x] `search.routes.ts` reads `class`; `buildDefaultSearchCache()`; module
      accepts `(repo, cache?, ttl?)`
- [x] `app.ts` `options.search` → `{ repository?, cache?, cacheTtlSeconds? }`,
      default cache Redis, default TTL `parseDuration(SEARCH_CACHE_TTL)`
- [x] Tests: `search.service.test.ts` (16), `search.routes.test.ts` (8);
      `createMemorySearchCache()` helper so tests never touch Redis
- [x] Verify: typecheck/lint/format/build + full suite + live smoke vs seeded DB

### Steps taken
1. Config: `SEARCH_CACHE_TTL` duration field; test asserts `5m` default.
2. `search.types.ts`: `SearchCache { get, set }`.
3. `infrastructure/redis/search-cache.ts`: `RedisSearchCache` with defensive
   parse (rejects non-object / missing `journeys`), TTL clamp, try/catch → null.
4. `search.service.ts`: constructor `(repository, cache?, cacheTtlSeconds?)`;
   cache key from normalized inputs; get-before-repo, set-after-build; class
   filter applied to `row.classes` before fare mapping in `buildJourney`;
   `normalizeOptionalClass` (uppercase, ≤10, empty → undefined).
5. `search.routes.ts`: `class` from query; cache + TTL passed through.
6. `app.ts`: nested `options.search` shape; default cache/TTL wiring.
7. `tests/helpers.ts`: `createMemorySearchCache`; `buildTestApp` injects it
   (TTL 300); updated the three route-test call sites to the nested shape.
8. Added 8 service tests (class filter, drop-without-class, long class, cache
   hit skips repo, miss write-through, read-fail/write-fail fallback, no-TTL
   bypass) + 2 route tests (class filter, long class → 400).

### Notes / gotchas
- Route tests used to pass the repository straight to `buildTestApp`; the
  option is now nested (`{ search: { repository } }`).
- `getRedis()` reads `process.env.REDIS_URL`; ioredis fails fast
  (`maxRetriesPerRequest: 2`), and the cache layer swallows the error → search
  degrades cleanly to the DB when Redis is down (as in local dev).
- Cache key includes the class so STD and EC searches never clobber each other.

### Verification (all green)
- `pnpm --filter @railflow/api test`: 82 passed (58 + 24 search: 16 service, 8 routes)
- `pnpm --filter @railflow/config test`: 15 passed
- `pnpm --filter @railflow/api typecheck`, `pnpm lint`, `pnpm format` clean
- Live smoke (seeded DB, Redis down): LAG→ABJ returns NRC-101 with STD/SLEEPER/
  EC classes + fares; `&class=EC` returns only EC; cache degrades gracefully
  with Redis offline; 400 on same origin/dest + bad date

## Session 9 — Phase 4: Inventory (COMPLETE)

### Decisions (2026-08-08)
-   Phase 4 exit criteria ("concurrent requests cannot double-book seats")
    satisfied by an **atomic compare-and-swap hold** (`updateMany ... WHERE
    id IN (...) AND status='AVAILABLE'` in a transaction): concurrent holds on
    the same inventory row can never both win.
-   Lazy `expireHolds` sweep runs on availability/seat-map reads (no background
    worker yet — deferred to scheduled-workers milestone, §41).
-   Holds require JWT; availability + seat map are public reads.
-   Seat map exposes **effective status** per seat (live InventoryStatus wins;
    physical MAINTENANCE/CANCELLED still surfaces).

### What landed
-   `GET /journeys/:journeyId/availability` (optional `class`) — per-status counts
-   `GET /journeys/:journeyId/seats` — coach/class/seat map with effective status
-   `POST /inventory/holds` (JWT) — preferred-seat-first then fallback; `SEAT_HOLD_TTL`
-   `POST /inventory/holds/release` (JWT)
-   `PrismaInventoryRepository` (guarded transactional updateMany holds);
    `InventoryService` (validation: count 1..10, classCode ≤10, preferred ≤16);
    `app.ts` `options.inventory` wiring; test helpers (fake + seeded repos,
    `accessToken(app)` token helper)
-   Web: `createInventoryApi`, JourneyDetailsPage seat-map + hold/release UI
-   Tests: 106 total (20 inventory service + 9 inventory routes)

### Verification (all green)
-   `pnpm --filter @railflow/api test`: 106 passed; typecheck (api + web), lint,
    build clean
-   Live smoke (seeded DB, NRC-101): availability 184 available; seat map C1/C2
    STD + C3 EC; register→verify→login; hold 2 → `1A` (WINDOW), `1B` (MIDDLE),
    availability → 182 available / 2 held; release → `{released:2}` → back to 184;
    smoke user cleaned up.

### Docs
-   `docs/TASKS/phase-04-inventory.md`, `docs/STEPS/phase-04-inventory.md` created;
    `PLANS/phase-04` → DONE; `PROCESS.md` index updated; §57 Inventory backlog ticked.

### Next
-   Phase 5: Booking (aggregate, passengers, booking seats, state machine,
    idempotency, PNR, retrieval, cancellation)
