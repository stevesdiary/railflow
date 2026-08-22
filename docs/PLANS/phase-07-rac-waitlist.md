# Phase 7: RAC + Waitlist

Status: NOT STARTED

## Scope

-   RAC
-   Waitlist
-   FIFO
-   Promotion
-   Expiration
-   Cancellation-triggered promotion

## Exit criteria

``` text
When a train is full, new bookings enter RAC/waitlist in FIFO order and are
promoted as seats free up; promotions honour configured rules and handle
expiration.
```

## References

-   IMPLEMENTATION_PLAN.md §49 Phase 7, §18 (RAC and waitlist), §20 (FIFO queue)
-   docs/TASKS/phase-07-rac-waitlist.md (created when phase starts)
-   docs/STEPS/phase-07-rac-waitlist.md (created when phase starts)
