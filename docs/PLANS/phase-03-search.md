# Phase 3: Search

Status: DONE — journey search (endpoint + real UI results) landed in Session 7; Redis cache-aside + class filter landed in Session 8.

## Scope

-   Origin/destination
-   Date
-   Class
-   Journey
-   Fare
-   Availability summary
-   Redis caching

## Exit criteria

``` text
A search returns available journeys between origin and destination for a
date, with fares and an availability summary per train, served from cache
where possible.
```

## References

-   IMPLEMENTATION_PLAN.md §49 Phase 3, §25 (search and availability), §11
    (redis responsibilities)
-   docs/TASKS/phase-03-search.md (created when phase starts)
-   docs/STEPS/phase-03-search.md (created when phase starts)
