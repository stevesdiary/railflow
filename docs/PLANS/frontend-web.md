# Frontend (Web) — cross-cutting track

Status: IN PROGRESS

This track is not a numbered phase. It spans the phases it delivers UI for:
currently Identity (auth flow) and the railway booking screens (Stations /
Journey Search → Booking).

## Scope

-   React 19 + Vite 6 + TypeScript app in `apps/web`
-   Design system (CSS design tokens; Stitch components where authenticated)
-   Routing (react-router-dom): Layout, Home, Journey Selection, Journey Details
-   Typed API client (`apiFetch`, `createAuthApi`)
-   Auth flow: login, signup, verify email, session restore, logout
-   Journey search UI wired to real stations/trains data (Phase 2 API)
-   Seat selection and booking screens (future phases)

## Exit criteria

``` text
A user can search journeys, view details, register, verify, log in and reach
their booking flow; the UI renders with the token design system and passes
lint/typecheck/test/build.
```

## References

-   IMPLEMENTATION_PLAN.md §49 (phases served), RAILWAY_BOOKING_UI_DESIGN_PROMPTS.md
-   docs/TASKS/frontend-web.md
-   docs/STEPS/frontend-web.md
