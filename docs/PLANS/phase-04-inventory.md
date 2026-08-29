# Phase 4: Inventory

Status: IN PROGRESS (Session 9: seat map + availability + hold/release + Journey Details UI)

## Scope

-   Seat availability
-   Seat hold
-   Release
-   Expiration
-   DB transactions
-   Row locking
-   Seat preference
-   System fallback allocation

## Exit criteria

``` text
Concurrent requests cannot double-book seats.
```

## References

-   IMPLEMENTATION_PLAN.md §49 Phase 4, §7 (inventory model), §9 (seat state
    machine), §10 (reservation and concurrency), §12 (seat selection), §13
    (seat hold)
-   docs/TASKS/phase-04-inventory.md
-   docs/STEPS/phase-04-inventory.md
