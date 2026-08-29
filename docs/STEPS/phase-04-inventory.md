# Phase 4: Inventory — Step Log

## Session 9 — Seat map + availability + hold/release API + Journey Details UI (IN PROGRESS)

### Decisions (user-confirmed, 2026-08-08)
-   First slice = **seat map endpoint** (`GET /journeys/:journeyId/seats`),
    **availability endpoint** (`GET /journeys/:journeyId/availability`), and
    **hold/release endpoints** (`POST /inventory/holds`,
    `POST /inventory/holds/release`), wired to the Journey Details page so the
    select-seats flow works end to end.
-   Seat map + availability are **public read-only** (consistent with
    search/railway). Hold and release require a **Bearer access token** (they
    mutate inventory state).
-   Holds are **preference-first with system fallback**: the request sends a
    class, a count, and an optional list of preferred seat numbers. The service
    honours preferred numbers still `AVAILABLE`, back-fills the remainder from
    other available seats in that class, and fails with `CONFLICT` if fewer
    seats exist than requested. Every seat the user selects in the UI is sent as
    a preference, so their picks win.
-   The hold write is **optimistic, guarded by the seat state**: a
    `updateMany where status = AVAILABLE` inside a Prisma transaction flips only
    seats that are still free — concurrent requests for the same seat cannot
    both hold it. (Row locking / `FOR UPDATE` is deliberately not used here; the
    guarded update is simpler and correct for single-row state transitions.)
-   `count` is validated 1..10 per hold. Expiry is server-authoritative:
    `holdExpiresAt = now + SEAT_HOLD_TTL`, restored to `AVAILABLE` by `expireHolds`
    which runs eagerly on every seat-map/availability read. The UI renders a
    live countdown from the `expiresAt` the API returns.
-   `confirmHolds` (HELD → BOOKED) and `expireHolds` (HELD → AVAILABLE) exist in
    the service/repository now; `confirmHolds` is used by the booking phase.
    Holds have no owner column yet — ownership + a holds table land with booking.

### Task checklist
-   [x] `PublicSeatMap/Coach/Seat` + `PublicAvailabilitySummary` contracts,
        `InventoryRepository` interface
-   [x] `PrismaInventoryRepository`: `getSeatMap`, `getAvailability`,
        `findAvailableSeats` (preference + fallback + exclude),
        `holdSeats` (guarded updateMany in a transaction), `releaseHolds`,
        `confirmHolds`, `expireHolds`, `getHeldSeat`, `getJourney`, `getClassIdByCode`
-   [x] `InventoryService`: `getSeatMap`, `getAvailability` (optional class),
        `holdSeats` (validation, preference→fallback, count check, conflict),
        `releaseHolds`, `confirmHolds`, `expireHolds`; eager hold expiry on reads
-   [x] Routes: `GET /journeys/:journeyId/seats` + `/availability` (public),
        `POST /inventory/holds` + `POST /inventory/holds/release` (requireAuth)
-   [x] `SEAT_HOLD_TTL` config (default `10m`) + `options.inventory` in buildApp
-   [x] Tests: `inventory.service.test.ts` (17), `inventory.routes.test.ts` (7)
        — fake repo, no DB; conflict/full/unknown paths covered
-   [x] Web: `createInventoryApi` (`getSeatMap`, `getAvailability`, `holdSeats`,
        `releaseHolds`) + barrel export
-   [x] `JourneySelectionPage`: journey card "Select seats" links to
        `/journeys/:journeyId` passing the journey summary via `location.state`
-   [x] `JourneyDetailsPage`: real seat map — class tabs, coach seat grids,
        selection (max 6), legend, hold action, held-seat panel + live
        countdown, release, sign-in prompt for anonymous users
-   [x] Web tests: `tests/inventory.test.ts` (3) — web total now 14
-   [x] Verify: typecheck/lint/format/build + full suite

### Steps taken
1.  `inventory.types.ts`: Public contracts (`PublicSeatMap`, `PublicCoachSeatMap`,
    `PublicSeatMapSeat`, `PublicSeatStatus`, `PublicAvailabilitySummary`,
    `PublicHeldSeat`) + `SeatCandidate`/`SeatMapRow` repo rows +
    `InventoryRepository` interface (getJourney, getSeatMap, getAvailability,
    findAvailableSeats, holdSeats, releaseHolds, confirmHolds, expireHolds,
    getHeldSeat, getClassIdByCode).
2.  `infrastructure/prisma/inventory-repositories.ts`: `PrismaInventoryRepository`
    — seat map fetch (ACTIVE coaches ordered by coachNumber, seats by position,
    per-seat inventory status), availability counts (available/held/booked),
    `findAvailableSeats` (status AVAILABLE, optional preferred seatNumbers +
    exclude set, ACTIVE coach, ordered coach→position, `take: limit`),
    `holdSeats` = `prisma.$transaction(updateMany where id in ids AND status
    AVAILABLE → HELD + holdExpiresAt)`, `releaseHolds`/`confirmHolds` guarded by
    status, `expireHolds` (HELD with holdExpiresAt < now → AVAILABLE), `getHeldSeat`.
3.  `inventory.service.ts`: `requireJourney` + SCHEDULED guard, `classIdOrThrow`
    (normalize uppercase, ≤10, NotFound), `validateCount` (integer 1..10),
    `validateSeatNumbers` (trim/uppercase, ≤16, no empties); `holdSeats` flow:
    preferred → fallback → if fewer than count CONFLICT → guarded hold → if
    `heldCount < count` CONFLICT → fetch `getHeldSeat` per id. `effectiveStatus`
    maps physical seat status vs inventory status (MAINTENANCE/CANCELLED win,
    else inventory status).
4.  `inventory.routes.ts`: seat map + availability public; holds/release behind
    `authenticate`; `buildDefaultInventoryRepository()`.
5.  `packages/config`: `SEAT_HOLD_TTL` (regex `^\d+[smhd]$`, default `10m`).
6.  `app.ts`: `registerInventoryModule(app, repo, holdTtlSeconds)` with
    `options.inventory?.repository` / `holdTtlSeconds` overrides.
7.  `tests/helpers.ts`: `createFakeInventoryRepository()` in-memory fake
    (journeys, classes, seats, hold/expire semantics) + `buildTestApp` injection.
8.  API tests: service (17) + routes (7).
9.  Web: `lib/api/inventory.ts` (`createInventoryApi`) + barrel export;
    `tests/inventory.test.ts`.
10. `JourneySelectionPage`: per-journey `<Link>` → `/journeys/:journeyId` with
    summary in `location.state`.
11. `JourneyDetailsPage.tsx` + `.css`: class tabs, seat grids with per-status
    styling, selection cap (6), hold → held-seat panel with live countdown,
    release, anonymous sign-in prompt; fallback header when arriving without
    state.

### Notes / gotchas
-   Seat map status is computed by `effectiveStatus`: physical
    MAINTENANCE/CANCELLED always win; otherwise the inventory item's status
    (AVAILABLE/HELD/BOOKED) is used — a HELD/BOOKED seat shows as such even
    though the physical seat row is still ACTIVE.
-   Holds are preference-first: the UI sends every selected seat number as a
    preference, so what the user picks is what gets held; the fallback only
    fills seats the user did not explicitly choose.
-   The concurrency guard is the status-conditional `updateMany` inside a
    transaction — not row locks. Two concurrent holds for the same seat both run
    the update, but only one row matches `status = AVAILABLE` at execution time,
    so only one wins; the loser's `heldCount` check raises CONFLICT.
-   `expireHolds` is eager (runs on seat-map/availability reads) so a stale hold
    frees its seat on the next look at that journey. A cron sweep is a later
    hardening option.
-   `expiresAt` is serialized by Fastify as an ISO-8601 string; the web client
    types it as `string` and computes the countdown client-side.
-   Web `apiFetch` merges `Content-Type: application/json` onto every request,
    so route tests assert headers with `expect.objectContaining`.

### Verification (all green)
-   `pnpm lint`, `pnpm format:check`, `pnpm typecheck`, `pnpm build` all pass
-   API tests: 106 (82 + 24 inventory: 17 service + 7 routes)
-   Web tests: 14 (11 + 3 inventory client)
-   Live smoke (seeded DB): seat map for a journey returns coaches + seats with
    correct statuses; availability returns per-class counts; hold returns held
    seats + `expiresAt`; release frees the seats; unauth hold → 401; unknown
    journey → 404.

### Next steps
-   Holds table + ownership (assign holds to a user, persist across restart)
-   Booking flow (Phase 5): `confirmHolds` a held seat into a booking + payment
-   Wire `getAvailability` into search results for a per-train availability summary
-   Cron sweep for stale holds (currently eager on read only)
-   Stitch design tokens/theme pass on the Journey Details seat-map UI
