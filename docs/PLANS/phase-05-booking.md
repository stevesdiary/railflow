# Phase 5: Booking

Status: IN PROGRESS

## Scope

-   Booking creation
-   Passenger details
-   Seat assignment
-   State machine
-   Idempotency
-   PNR

## Exit criteria

``` text
A booking can be created with passenger details, seats assigned, transitions
through its state machine, is idempotent against duplicate requests, and
carries a generated PNR.
```

## References

-   IMPLEMENTATION_PLAN.md §49 Phase 5, §14 (booking lifecycle), §15 (booking
    model), §16 (idempotency), §17 (PNR generation)
-   docs/TASKS/phase-05-booking.md (created when phase starts)
-   docs/STEPS/phase-05-booking.md (created when phase starts)
