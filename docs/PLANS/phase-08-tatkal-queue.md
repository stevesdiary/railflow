# Phase 8: Tatkal Queue

Status: NOT STARTED

## Scope

-   Virtual waiting room
-   FIFO queue
-   Tokens
-   Admission controller
-   Redis state
-   Durable records
-   Reconciliation

## Exit criteria

``` text
During high-demand windows, users pass through a virtual waiting room with
FIFO admission, queue state in Redis backed by durable records, and a
reconciliation path if Redis state is lost.
```

## References

-   IMPLEMENTATION_PLAN.md §49 Phase 8, §19 (tatkal / high-demand queue), §21
    (queue token), §11 (redis responsibilities)
-   docs/TASKS/phase-08-tatkal-queue.md (created when phase starts)
-   docs/STEPS/phase-08-tatkal-queue.md (created when phase starts)
