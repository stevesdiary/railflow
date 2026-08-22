# Phase 5: Booking — Task Checklist

Status: IN PROGRESS

-   [ ] Booking aggregate (`Booking` model: id, bookingReference, pnr, userId,
      journeyId, quotaId, status, totalAmount, currency, expiresAt)
-   [ ] Passenger records (`BookingPassenger`: name, age, gender, documentType,
      documentReference)
-   [ ] Booking seats (`BookingSeat`: seatId, passengerId, allocationType, status)
-   [ ] Booking state machine (`INITIATED → SEATS_HELD → PAYMENT_PENDING →
      PAYMENT_SUCCESS → CONFIRMED`; `CANCELLED`, `COMPLETED`)
-   [ ] PNR generation (DB-backed sequence, `UNIQUE(pnr)` constraint)
-   [ ] Idempotency (`Idempotency-Key` header; stored result returned on replay)
-   [ ] Booking creation endpoint (from held seats + passenger details; confirms
      holds → BOOKED)
-   [ ] Booking retrieval endpoint (get by id/reference for the owner)
-   [ ] Cancellation endpoint (state machine → CANCELLED, seats released)
-   [ ] Seat assignment (passenger ↔ seat mapping, allocation type)
-   [ ] Tests: service (state machine, idempotency, PNR, cancellation),
      routes (auth, validation, replay), concurrency
-   [ ] Web: createBookingApi + checkout flow wiring (tracked in
      docs/TASKS/frontend-web.md)
-   [ ] Verify: typecheck/lint/build + full suite + live smoke vs seeded DB

See docs/STEPS/phase-05-booking.md for the step log and verification.
