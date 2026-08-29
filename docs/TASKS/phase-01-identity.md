# Phase 1: Identity — Task Checklist

Status: DONE

-   [x] User schema
-   [x] Registration
-   [x] Login
-   [x] Password hashing (Argon2id)
-   [x] Access tokens (JWT via @fastify/jwt)
-   [x] Refresh tokens (opaque, Redis-backed, rotated/revoked)
-   [x] Verification (email verification tokens, dev mailer)
-   [x] Logout/session revocation
-   [x] Authorization middleware (requireAuth / requireRole)
-   [x] Deps + allowBuilds + install (@fastify/jwt, argon2, ioredis)
-   [x] Config: JWT secrets/TTLs, REDIS_URL, PUBLIC_BASE_URL + tests
-   [x] Prisma: EmailVerificationToken model + migrations
-   [x] Infrastructure: ioredis client + shutdown
-   [x] Mailer: Mailer interface + DevMailer
-   [x] Token service: JWT sign/verify, refresh store, verification tokens
-   [x] AuthService: register/login/verifyEmail/refresh/logout/profile + unit tests
-   [x] Identity routes: /auth/register|login|refresh|logout|verify-email|me
-   [x] Wire identity module + jwt into app.ts (injectable for tests)
-   [x] Dockerfile: argon2 build deps
-   [x] Verify: tests/typecheck/lint/build + live smoke register→login→me

See docs/STEPS/phase-01-identity.md for the step log and verification.
