# Frontend (Web) — Step Log

## Session 3 — Frontend: apps/web (COMPLETE)

### Decisions (user-confirmed, 2026-08-08)
-   Design system: **hand-authored CSS design tokens** (Google Stitch API was not
    authenticated), based on the railway booking design prompts in
    `RAILWAY_BOOKING_UI_DESIGN_PROMPTS.md` (Nigeria / NGN, trust-focused).
    Tokens land in `apps/web/src/index.css`; components consume tokens exclusively.
-   Stitch-generated screens/components can be wired in later once auth is fixed.

### Steps taken
1.  Scaffolded `apps/web`: package.json, tsconfig.json, vite.config.ts (dev proxy
    `/api` → `:3000`), vitest.config.ts, index.html, `src/main.tsx`, `src/App.tsx`
2.  Wrote design tokens (color/typography/spacing/radius/shadow + semantic
    inventory-state colors) and base component styles in `index.css`
3.  Components: `layout/Header|Footer|Layout`, `journey/JourneySearch` (used as
    hero widget + results bar), `pages/HomePage`, `pages/JourneySelectionPage`,
    `pages/JourneyDetailsPage`
4.  Homepage: hero + search widget, quick actions, popular routes, benefits, FAQ
5.  Journey Selection: search bar reads `?origin&destination&date&passengers`,
    sample journey cards with status badges and NGN fares
6.  Fixed pre-existing lint (unused `ttlSeconds` in api tests helper) + API test
    typecheck issues that were blocking CI
7.  `pnpm exec prettier --write .` to restore format:check green repo-wide

### Notes / gotchas
-   `@vitejs/plugin-react@4.x` used (v6 requires Vite 8; repo pins Vite 6)
-   Journey cards were mock data until Session 7 wired them to `GET /search`
-   Pre-existing API lint/typecheck failures surfaced from Session 2's
    uncommitted work — fixed so `pnpm lint`/`pnpm typecheck` are green repo-wide

### Verification (all green)
-   `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test:run`,
    `pnpm build` all pass
-   Dev server smoke test: `/`, `/search?...`, module transforms all 200

## Session 4 — Frontend: Auth flow + API client (COMPLETE)

### Decisions (user-confirmed, 2026-08-08)
-   Build the first end-to-end vertical: Login / Sign Up / Verify Email wired to
    the already-built identity API, plus a small typed API client layer in
    `apps/web`.
-   Token strategy on the client: access + refresh tokens in `localStorage`
    (`railflow.accessToken`, `railflow.refreshToken`, `railflow.user`); session
    is restored on boot via `/auth/refresh`. (httpOnly cookies remain a later
    hardening step, matching the API-side note.)

### Steps taken
1.  `apiFetch` wrapper honoring `{ error: { code, message, details?, requestId } }`
    + `createAuthApi` (register/login/refresh/logout/me/verifyEmail)
2.  Token store + `AuthProvider` context (loading/authenticated/anonymous,
    restore via refresh)
3.  Login page (redirect back to protected route via `location.state.from`)
4.  SignUp page (per-field validation, password strength, terms, "check your
    email" success)
5.  Verify Email page (token from query string, success/error states)
6.  Header shows user menu (first name + logout) when authenticated
7.  Routes `/login`, `/signup`, `/verify-email`; provider wired in `main.tsx`
8.  Tests: `tests/client.test.ts` (4), `tests/auth.test.ts` (4)

### Notes / gotchas
-   `apiFetch` must merge `init.headers` AND the third `headers` arg
    (Authorization was being dropped) — fixed + covered by a unit test
-   `localStorage` is unavailable in vitest node env — tests stub an in-memory
    Storage
-   Live end-to-end smoke test deferred: Docker (Postgres/Redis) not running
    locally, so the API can't boot; page render + module transforms verified instead

### Verification (all green)
-   `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test:run`,
    `pnpm build` all pass
-   Web tests: 8 passed (client + auth)
-   Dev server: `/`, `/login`, `/signup`, `/verify-email?token=abc`, `/search`
    all 200

## Session 7 — Real journey search in the UI (COMPLETE)

### Decisions (user-confirmed, 2026-08-08)
-   Wire the Journey Selection page to the new `GET /search` API endpoint
    (Session 7, Phase 3) plus load real stations for the search dropdowns.

### Steps taken
1.  `lib/api/search.ts`: `createSearchApi` with `listStations` (optional query)
    + `searchJourneys(from, to, date)`; exported from the API barrel
2.  `tests/search.test.ts` (3): stations list, station query param, search URL
3.  `JourneySearch.tsx`: fetch stations on mount (cancelled on unmount, error
    message on failure); `<option>` values are station codes, labels are names
4.  `JourneySelectionPage.tsx`: fetch on `hasQuery` change (cancelled on
    unmount); skeleton cards while loading; "No journeys found" empty state;
    error card with `ApiError` message; real route names/times/duration/class
    chips/fares from the response; availability badge + "seats left" derived
    from per-class free-seat counts
5.  `JourneySelectionPage.css`: shimmer skeleton for the loading state

### Notes / gotchas
-   URL params now carry station **codes** (e.g. `origin=LAG`), not names; the
    results header uses the real names from the search response.
-   Availability badge derives from the class with the fewest free seats; "seats
    left" shows when it dips below 50%.

### Verification (all green)
-   `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm test:run`,
    `pnpm build` all pass; web tests: 11 (8 + 3 search)
-   Live: Vite proxy `/api/search` and `/api/stations` verified against the
    seeded DB
