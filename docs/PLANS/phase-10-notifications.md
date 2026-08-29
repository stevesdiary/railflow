# Phase 10: Notifications

Status: NOT STARTED

## Scope

-   Email
-   Push
-   Kafka consumers
-   Templates
-   Retry
-   DLQ
-   Notification history

## Exit criteria

``` text
Bookings and payments produce email/push notifications via Kafka consumers
with templates, retry and a dead-letter queue; notification failures never
cancel bookings.
```

## References

-   IMPLEMENTATION_PLAN.md §49 Phase 10, §33 (notification system), §31 (Kafka)
-   docs/TASKS/phase-10-notifications.md (created when phase starts)
-   docs/STEPS/phase-10-notifications.md (created when phase starts)
