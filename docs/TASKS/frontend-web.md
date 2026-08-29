# Frontend (Web) — Task Checklist

Status: IN PROGRESS

Started from the original `task.md` scratch list (folded in here) plus the
Session 3/4 scope. Auth flow + real search results are done; seat selection and
booking screens are still ahead.

## Foundation (Session 3)

-   [x] Initialize the frontend React + Vite + TS project in `apps/web`
-   [x] Apply the design system (CSS design tokens; Google Stitch tokens where
      authenticated) to `apps/web/src/index.css`
-   [x] Set up basic routing (react-router-dom)
-   [x] Integrate foundational Stitch HTML components (Homepage / Journey
      Selection)
-   [x] Routing: Layout (Header/Footer) + Homepage, Journey Selection, Journey Details
-   [x] JourneySearch widget + journey cards with availability states
      (available/limited/RAC/waitlist/soldout)

## Auth flow + API client (Session 4)

-   [x] API client: `apiFetch` wrapper honoring the error contract +
      `createAuthApi` (register/login/refresh/logout/me/verifyEmail)
-   [x] Token store + `AuthProvider` context (loading/authenticated/anonymous,
      restore via refresh)
-   [x] Login page (redirect back via `location.state.from`)
-   [x] SignUp page (per-field validation, password strength, "check your email")
-   [x] Verify Email page (token from query string, success/error states)
-   [x] Header user menu (first name + logout) when authenticated
-   [x] Routes /login, /signup, /verify-email; provider wired in main.tsx
-   [x] Tests: tests/client.test.ts (4), tests/auth.test.ts (4)
-   [x] Verify: lint/format/typecheck/test/build + dev-server route smoke test

## Next (railway data)

-   [x] Replace mock journey cards with real stations/search data (Session 7:
      JourneySearch loads real stations, JourneySelectionPage fetches real
      journeys from `GET /search`)
-   [ ] Protected route wrapper (RequireAuth) for My Bookings / Profile
-   [ ] Seat selection + booking screens when inventory/booking phases land
-   [ ] Journey Details page to show real coach/seat maps from the train endpoint

See docs/STEPS/frontend-web.md for the step log and verification.
