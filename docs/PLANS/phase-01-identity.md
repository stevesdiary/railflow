# Phase 1: Identity

Status: DONE

## Scope

-   Registration
-   Login
-   Password hashing (Argon2id)
-   Token handling (JWT access + opaque refresh tokens)
-   Verification (email verification)
-   Profile
-   Authorization (role middleware)

## Exit criteria

``` text
A user can register, verify their email, log in, refresh their session and
log out. Protected routes reject missing/invalid tokens. Refresh tokens are
revocable and rotate.
```

## References

-   IMPLEMENTATION_PLAN.md §49 Phase 1, §5 (domain modules — Auth/Users)
-   docs/TASKS/phase-01-identity.md
-   docs/STEPS/phase-01-identity.md
