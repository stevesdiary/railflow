# Phase 1: Identity — Step Log

## Session 2 — Phase 1: Identity (COMPLETE)

### Decisions (user-confirmed, 2026-08-08)
1.  Token strategy: **JWT access + opaque refresh tokens in Redis** (refresh rotated/revocable)
2.  Password hashing: **Argon2id** (`argon2` package; native build → Docker build deps + allowBuilds)
3.  Login identifier: **email** (unique)
4.  Verification: **email verification with dev mailer** (link logged in dev; SMTP wired later)

### Refinement decisions (from implementation, documented as made)
-   Refresh tokens: base64url 48-byte random; SHA-256 hash stored as Redis key
    (`rf:<hash>`) so a leak never exposes usable tokens; TTL = refresh TTL;
    rotation on refresh
-   Verification tokens: base64url 32-byte random; SHA-256 hash stored in
    `EmailVerificationToken` table; single-use, expiring, cascade delete
-   Refresh token transport: returned in JSON body (cookie/httpOnly is a later
    hardening step)
-   DI pattern: AuthService takes injectable stores (userRepo, refreshStore,
    verificationStore, mailer, tokenService) so tests run against in-memory
    fakes — CI stays DB/Redis-free, matching Session 1 constraint

### Step log (timestamped)

#### 2026-08-08 — deps added
-   `pnpm add` to `apps/api`: `@fastify/jwt`, `argon2`, `ioredis`
-   Added `argon2` to `allowBuilds` in pnpm-workspace.yaml (native compile)
-   Install successful; `argon2` compiled locally (macOS)

#### 2026-08-08 — config
-   `packages/config`: added `JWT_ACCESS_SECRET`/`JWT_REFRESH_SECRET` (min 32),
    `JWT_ACCESS_TTL`/`JWT_REFRESH_TTL`/`EMAIL_VERIFICATION_TOKEN_TTL`
    (regex-validated), `PUBLIC_BASE_URL`; new `parseDuration()` helper. Config
    tests now 15.
-   `apps/api/.env` + `.env.example`: dev secrets (flagged change-me), TTLs,
    base URL.
-   `@railflow/testing` `createTestConfig` supplies test JWT secrets.

#### 2026-08-08 — schema/migrations
-   `EmailVerificationToken` model (tokenHash unique, userId FK cascade,
    expiresAt, usedAt single-use guard; indexes on userId + expiresAt).
-   `User.phone` made nullable (`String?`) since registration is email-based.
-   Migrations created with `--create-only` + applied via `db:deploy`:
    `20260808001017_add_email_verification_tokens`,
    `20260808001046_make_phone_optional`.

#### 2026-08-08 — infrastructure
-   `infrastructure/redis/redis.ts`: ioredis singleton (`getRedis`/`closeRedis`).
-   `infrastructure/redis/refresh-token.store.ts`: `RedisRefreshTokenStore`, key
    `rf:<sha256>`, TTL = refresh TTL.
-   `infrastructure/prisma/identity-repositories.ts`: `PrismaUserRepository` +
    `PrismaVerificationTokenStore` (single-use via `updateMany ... usedAt null`).
-   `infrastructure/mailer/dev-mailer.ts`: logs the verification link (SMTP later).

#### 2026-08-08 — identity module
-   `auth.types.ts`: DI interfaces (UserRepository, RefreshTokenStore,
    VerificationTokenStore, TokenService, Mailer, AuthDependencies, PublicUser).
-   `password.ts`: argon2id hash/verify (tunable params for tests).
-   `tokens.ts`: sha256 `hashToken`, `FastifyJwtTokenService` (wraps app.jwt),
    `RefreshTokenService` (48B base64url, rotate/revoke), `VerificationTokenService`
    (32B base64url).
-   `auth.service.ts`: register (ConflictError on dup, sends verification mail),
    login (401 INVALID credentials, 403 unverified), refresh (rotate + revoke),
    logout (idempotent revoke), verifyEmail (single-use, expiry checks),
    getProfile.
-   `auth.schemas.ts` (zod) + `auth.routes.ts` (routes under `/auth/*`,
    `buildDefaultAuthDeps` factory; `parseOrThrow` → ValidationError with issues).
-   `common/auth/require-auth.ts`: `authenticate` preHandler + `requireRole(...)`.

#### 2026-08-08 — wiring + authz
-   `app.ts`: registers `@fastify/jwt` (access secret, expiresIn), identity
    module with injectable `identity` option (object or factory, for tests);
    onClose closes Redis too.
-   `fastify.d.ts`: augmented `@fastify/jwt` `FastifyJWT.payload/user`.

#### 2026-08-08 — tests
-   `tests/helpers.ts`: `MemoryAuthInfra` (in-memory user/refresh/verification
    stores + mail capture + seed helpers), `testConfig`, `createFakeTokenService`.
-   `tests/identity/auth.service.test.ts` (15) + `tests/identity/auth.routes.test.ts`
    (8): register/login/refresh/logout/verify/me + error paths + full happy path.
-   Existing `app.test.ts`/`error-handler.test.ts` now inject fake identity deps
    (no Redis/Prisma in unit tests; CI stays infra-free).
-   `apps/web` `test:run` set to `--passWithNoTests` so repo-wide `test:run`
    stays green.
-   Total: 63 tests (config 15, contracts 5, logger 4, testing 3, api 36).

#### 2026-08-08 — Dockerfile
-   Added `python3 make g++` to `dependencies` and `production` stages (argon2
    compiles via node-gyp on alpine). Image-size reduction is a later hardening
    item.

### Notes / gotchas
-   Fastify's `app.log` is `FastifyBaseLogger`; pino `Logger` requires
    `msgPrefix`, so `AuthDependencies.logger` is typed `FastifyBaseLogger` (same
    fix pattern as Session 1's `createLoggerOptions`).
-   `parseOrThrow` needed a real `zod.ZodType<T>` param for TS inference.
-   `noUncheckedIndexedAccess` trips on array/record access even in tests.
-   Real JWT only comes from `FastifyJwtTokenService(app, ttl)`; unit tests use
    the fake token service, route tests use the real one via the `identity`
    factory.
-   Refresh-token reuse after rotation/logout correctly returns 401 (verified live).

### Verification (all green, 2026-08-08)
-   `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test:run`
    (63 tests), `pnpm build` all pass.
-   Live smoke (real Postgres + Redis): register 201 → dev-mailer logs link →
    verify 200 → login 200 (access 243B, refresh 64B, expiresIn 900) →
    `/auth/me` 200 (ACTIVE, emailVerified true) → refresh rotates (old token
    reuse 401) → logout 204 (refresh after logout 401). Server + Redis shut
    down cleanly.
