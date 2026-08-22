# Phase 5: Booking — Step Log

## Session 10 — Booking: create/retrieve/cancel + PNR + idempotency (COMPLETE)

### Decisions
-   Booking creation consumes **held** inventory: the client holds seats
    (Phase 4), then submits passenger details against those hold ids. The
    service atomically confirms the holds (`HELD → BOOKED`, guarded by
    `WHERE status='HELD'`) inside the same transaction that creates the booking
    aggregate, so a booking can never claim seats that aren't actually held.
-   PNR is a **DB-backed sequence** (Postgres sequence + `UNIQUE(pnr)`), not
    random — per §17.
-   Idempotency follows §16: the client sends `Idempotency-Key`; the first
    request stores the created booking keyed by that header (plus userId);
    replays return the stored booking instead of creating another one.
-   State machine is a small allowed-transitions map; `CONFIRMED` is reached
    via `PAYMENT_SUCCESS` (Phase 6 wires the payment hook), `CANCELLED`
    releases seats back to AVAILABLE.
-   Retrieval and cancellation are owner-scoped (JWT required).

### Steps taken
1.  Prisma: `Booking`, `BookingPassenger`, `BookingSeat` models + `BookingStatus`
    enum + migration (…).
2.  PNR generator: `prisma.$queryRaw` on a Postgres sequence with retry on
    unique collision.
3.  `booking.types.ts`: public DTOs + `BookingRepository` interface.
4.  `booking.service.ts`: `createBooking`, `getBooking`, `cancelBooking`;
    passenger/seat validation; state-machine transitions; idempotency lookup.
5.  `booking.routes.ts`: `POST /bookings`, `GET /bookings/:reference`,
    `POST /bookings/:reference/cancel` (all JWT); `buildDefaultBookingRepository()`.
6.  `app.ts`: `options.booking` override; module registration.
7.  Tests: service (create/retrieve/cancel/state machine/idempotency/PNR),
    routes (auth, validation, replay, ownership), concurrency (parallel
    creates with same idempotency key → one booking).
8.  Web: `createBookingApi` + checkout flow (tracked under frontend-web).
9.  Live smoke vs seeded DB (below).

### Notes / gotchas
-   …

### Verification (all green)
-   `pnpm --filter @railflow/api test`: N passed (incl. booking suite)
-   `pnpm --filter @railflow/api typecheck`, `pnpm --filter @railflow/web typecheck`,
    `pnpm lint`, `pnpm build` clean
-   Live smoke (seeded DB): register/verify/login → hold 2 seats → create
    booking with `Idempotency-Key` → PNR returned; replay returns same booking;
    cancel releases seats; availability restored.
