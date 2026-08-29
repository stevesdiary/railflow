# Phase 4: Inventory — Task Checklist

Status: IN PROGRESS (Session 9: seat map + hold/release + Journey Details UI)

## Session 9 — seat map / availability / hold / release

-   [x] Public contracts: PublicSeatMap/Coach/Seat, PublicAvailabilitySummary,
        PublicHeldSeat + InventoryRepository interface
-   [x] GET /journeys/:journeyId/seats (public)
-   [x] GET /journeys/:journeyId/availability (public, optional class)
-   [x] POST /inventory/holds (requireAuth; preference-first + fallback, count 1..10)
-   [x] POST /inventory/holds/release (requireAuth; idempotent restore)
-   [x] Concurrency guard: status-conditional updateMany in a transaction
-   [x] Hold expiry: holdExpiresAt + eager expireHolds on reads + SEAT_HOLD_TTL
-   [x] confirmHolds (HELD → BOOKED) service/repo methods (used by Phase 5)
-   [x] InventoryService (validation, SCHEDULED guard, effective seat status)
-   [x] PrismaInventoryRepository (getSeatMap, getAvailability, findAvailableSeats,
        holdSeats, releaseHolds, confirmHolds, expireHolds, getHeldSeat)
-   [x] Wire registerInventoryModule + options.inventory into buildApp
-   [x] Test helpers: createFakeInventoryRepository (in-memory, no DB)
-   [x] Tests: inventory.service.test.ts (17), inventory.routes.test.ts (7)
-   [x] Web: createInventoryApi (getSeatMap, getAvailability, holdSeats, releaseHolds)
-   [x] JourneySelectionPage → /journeys/:id with summary in location.state
-   [x] JourneyDetailsPage: class tabs, seat grids, selection, hold, countdown,
        release, anonymous prompt
-   [x] Web tests: tests/inventory.test.ts (3)
-   [x] Verify: typecheck/lint/format/build + full suite + live smoke

## Remaining (later sessions)

-   [ ] Holds table + user ownership (assign holds, persist across restart)
-   [ ] Booking flow (Phase 5): confirmHolds into booking + payment
-   [ ] Wire availability into search response (per-train summary)
-   [ ] Stitch design tokens/theme pass on the seat-map UI

See docs/STEPS/phase-04-inventory.md for the step log and verification.
