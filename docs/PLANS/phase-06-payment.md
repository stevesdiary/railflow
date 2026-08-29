# Phase 6: Payment

Status: NOT STARTED

## Scope

-   Paystack initialization
-   Payment records
-   Webhook verification
-   Idempotency
-   Reconciliation
-   Refunds
-   Booking confirmation

## Exit criteria

``` text
Payments initialize against Paystack, webhooks are verified and idempotent,
reconciliation reconciles async payment state, refunds work, and only a
successful payment produces a confirmed booking.
```

## References

-   IMPLEMENTATION_PLAN.md §49 Phase 6, §26 (payment architecture), §27 (payment
    states), §28 (webhooks), §29 (failure handling), §30 (refund flow)
-   docs/TASKS/phase-06-payment.md (created when phase starts)
-   docs/STEPS/phase-06-payment.md (created when phase starts)
