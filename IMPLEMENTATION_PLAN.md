# IRCTC-Style Railway Booking System

**Date:** 2026-08-06\
**Status:** Implementation-ready baseline\
**Architecture:** Modular Monolith\
**Backend:** Node.js + TypeScript\
**Database:** PostgreSQL + Prisma\
**Cloud:** AWS\
**Containerization:** Docker\
**Messaging:** Kafka\
**Payment Gateway:** Paystack\
**Currency:** NGN\
**Initial deployment:** Single tenant\
**Notifications:** Email + Push\
**Allocation:** Confirmed seats + RAC + Waitlist\
**Queue policy:** Strict FIFO\
**Seat preference:** User-selected seat when available, system-selected
fallback\
**Bot protection:** Real anti-bot / anti-abuse controls\
**Initial scope:** No agent portal

> **Documentation layout:** this file is the master architecture + phase backlog.
> Per-phase plans, task checklists and step logs live in `docs/` (see
> `docs/PROCESS.md` for the index). Phase scope and exit criteria are in
> `docs/PLANS/`, working checklists in `docs/TASKS/`, and the append-only log of
> what was actually done in `docs/STEPS/`.

------------------------------------------------------------------------

## 1. Purpose

This document converts the approved system design into an actionable
engineering implementation plan.

The platform supports:

-   User registration and authentication
-   Train and route search
-   Schedule and fare discovery
-   Real-time seat availability
-   Seat selection
-   Tatkal-style controlled access during high-demand windows
-   Booking and passenger management
-   RAC and waitlist allocation
-   Paystack payment processing
-   PNR generation
-   Cancellation and refunds
-   Email and push notifications
-   Bot and abuse prevention
-   Auditability
-   Operational monitoring
-   Failure recovery
-   Horizontal scaling

The first implementation should be a **modular monolith**, not a
microservices deployment.

The codebase must still have strong module boundaries so high-load
modules can later be extracted without redesigning the domain.

------------------------------------------------------------------------

## 2. Approved Architecture Decisions

  Area                      Decision
  ------------------------- ---------------------------------------------
  Architecture              Modular Monolith
  Backend                   Node.js + TypeScript
  API                       REST
  Database                  PostgreSQL
  ORM                       Prisma
  Cache / ephemeral state   Redis
  Message broker            Kafka
  Payment                   Paystack
  Currency                  NGN
  Cloud                     AWS
  Runtime                   Docker
  Tenant model              Single tenant
  Queue policy              FIFO
  Tatkal admission          Virtual waiting room + controlled admission
  Seat preference           User choice first, system fallback
  Allocation                Confirmed seats + RAC + Waitlist
  Notifications             Email + Push
  Agent portal              Out of initial scope
  Bot protection            Real anti-bot controls
  Infrastructure            Infrastructure as Code
  Testing                   Unit + integration + load + failure testing

------------------------------------------------------------------------

## 3. Core Engineering Principle

> **Correctness first, controlled traffic second, scale third.**

Do not prematurely distribute the system.

A modular monolith provides:

-   One deployment unit
-   One database
-   Simple local development
-   Simple transactions
-   Lower operational complexity
-   Easier debugging
-   Faster MVP development

Module boundaries must remain explicit. Modules should not arbitrarily
access each other's repositories or tables.

------------------------------------------------------------------------

## 4. Repository Structure

``` text
railway-booking/
├── apps/
│   └── api/
│       ├── src/
│       │   ├── config/
│       │   ├── common/
│       │   ├── modules/
│       │   │   ├── auth/
│       │   │   ├── users/
│       │   │   ├── stations/
│       │   │   ├── trains/
│       │   │   ├── schedules/
│       │   │   ├── fares/
│       │   │   ├── inventory/
│       │   │   ├── search/
│       │   │   ├── queue/
│       │   │   ├── bookings/
│       │   │   ├── passengers/
│       │   │   ├── payments/
│       │   │   ├── refunds/
│       │   │   ├── rac/
│       │   │   ├── waitlist/
│       │   │   ├── notifications/
│       │   │   ├── anti-abuse/
│       │   │   ├── audit/
│       │   │   └── health/
│       │   ├── infrastructure/
│       │   │   ├── prisma/
│       │   │   ├── redis/
│       │   │   ├── kafka/
│       │   │   ├── paystack/
│       │   │   ├── email/
│       │   │   ├── push/
│       │   │   └── storage/
│       │   ├── app.ts
│       │   └── server.ts
│       └── tests/
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed/
├── packages/
│   ├── contracts/
│   ├── logger/
│   ├── config/
│   └── testing/
├── infrastructure/
│   ├── terraform/
│   └── docker/
├── docs/
│   ├── architecture/
│   ├── api/
│   ├── runbooks/
│   └── decisions/
├── scripts/
├── .github/
│   └── workflows/
├── docker-compose.yml
├── Dockerfile
├── package.json
└── README.md
```

------------------------------------------------------------------------

## 5. Domain Modules

### Auth

Owns registration, login, token issuance, refresh, logout, verification
and authentication.

### Users

Owns user profiles, contact information, account status and user-facing
booking history.

### Stations

Owns station master data, codes, names and zones.

### Trains

Owns train master data.

### Schedules / Journeys

A train is reusable master data. A journey represents a specific train
service on a specific date.

Recommended:

``` text
Journey
-------
id
trainId
journeyDate
departureTime
arrivalTime
status
```

Indexes:

``` text
(trainId, journeyDate)
(journeyDate, status)
```

### Search

Owns read-heavy journey discovery and availability summaries. Search
must not mutate booking state.

### Inventory

Owns physical seat/coach inventory, holds, releases and authoritative
allocation.

### Bookings

Owns booking lifecycle, passenger records and PNRs.

### Payments

Owns Paystack interaction, payment state, webhook processing and
reconciliation.

### RAC / Waitlist

Owns allocation queues and promotion rules.

### Queue

Owns Tatkal virtual waiting room, admission tokens and FIFO admission.

### Anti-Abuse

Owns rate limits, risk signals, challenges and abuse decisions.

### Notifications

Owns email and push delivery.

### Audit

Owns security and business audit records.

------------------------------------------------------------------------

# 6. Database Design

Core tables:

``` text
users
stations
trains
train_stops
journeys
coaches
seats
quotas
journey_quotas
inventory
bookings
booking_passengers
booking_seats
payments
refunds
rac_entries
waitlist_entries
queue_entries
idempotency_keys
outbox_events
notifications
audit_logs
```

### Important constraints

``` text
users.email UNIQUE
users.phone UNIQUE
stations.code UNIQUE
trains.number UNIQUE
bookings.pnr UNIQUE
payments.provider_reference UNIQUE
queue_entries.position UNIQUE
idempotency_keys.key UNIQUE
```

The database must enforce important invariants instead of relying only
on application checks.

------------------------------------------------------------------------

# 7. Railway Inventory Model

## Train and stops

``` text
Train
  |
  └── TrainStop
        ├── stationId
        ├── sequence
        ├── arrivalTime
        ├── departureTime
        └── dayOffset
```

This supports journeys such as:

``` text
Lagos -> Ibadan -> Ilorin -> Abuja
```

and searches between intermediate stations.

## Coach

``` text
Coach
-----
id
trainId
coachNumber
class
capacity
status
```

## Seat

``` text
Seat
----
id
coachId
seatNumber
seatType
position
status
```

------------------------------------------------------------------------

# 8. Generic Quota Model

Avoid hardcoding quota categories throughout the application.

``` text
Quota
-----
id
code
name
description
priority
status
```

Initial examples can include:

``` text
GENERAL
TATKAL
LADIES
SENIOR
OTHER
```

The system should be able to add quota types without rewriting the
booking engine.

------------------------------------------------------------------------

# 9. Seat State Machine

A physical seat should have an explicit lifecycle:

``` text
AVAILABLE
    |
    v
HELD
    |
    +----> EXPIRED ----> AVAILABLE
    |
    +----> RELEASED ---> AVAILABLE
    |
    v
BOOKED
    |
    v
CANCELLED
    |
    v
AVAILABLE
```

RAC and waitlist are allocation states, not physical seat states.

------------------------------------------------------------------------

# 10. Seat Reservation and Concurrency

The most important invariant is:

> **Two concurrent requests must never successfully confirm the same
> physical seat.**

Use PostgreSQL transactions for the authoritative reservation.

Conceptually:

``` sql
BEGIN;

SELECT *
FROM seats
WHERE id = $1
FOR UPDATE;

-- Verify availability

UPDATE inventory
SET status = 'HELD'
WHERE seat_id = $1;

INSERT INTO booking_seats (...);

COMMIT;
```

Use Prisma transactions and raw SQL only where required for locking
semantics.

Redis locks can reduce contention, but Redis must not be the sole
protection against double booking.

------------------------------------------------------------------------

# 11. Redis Responsibilities

Redis is for high-speed, ephemeral or coordination workloads:

-   Sessions
-   Rate limits
-   Queue positions
-   Admission tokens
-   Short-lived seat holds
-   Distributed coordination
-   Availability cache
-   Temporary counters
-   Anti-abuse state

PostgreSQL remains the durable source of truth for booking correctness.

------------------------------------------------------------------------

# 12. Seat Selection

The user can request preferred seats.

``` json
{
  "preferredSeats": ["A12", "A13"]
}
```

Allocation:

``` text
Preferred seats available?
        |
     +--+--+
     |     |
    Yes    No
     |     |
Use them  Find alternatives
             |
             v
       System selects
```

The fallback algorithm should be deterministic and configurable.

------------------------------------------------------------------------

# 13. Seat Hold

Flow:

``` text
Client
  |
  v
Check cached availability
  |
  v
Authoritative DB check
  |
  v
PostgreSQL transaction
  |
  +--> lock seat
  +--> verify AVAILABLE
  +--> create HOLD
  +--> commit
  |
  v
Return hold token
```

A hold must have an expiry timestamp.

A worker releases expired holds transactionally.

------------------------------------------------------------------------

# 14. Booking Lifecycle

``` text
INITIATED
  |
  v
SEATS_HELD
  |
  v
PAYMENT_PENDING
  |
  +----> PAYMENT_FAILED
  |
  v
PAYMENT_SUCCESS
  |
  v
CONFIRMED
  |
  +----> CANCELLED
  |
  v
COMPLETED
```

A payment transaction should never hold an open PostgreSQL transaction
while the user is interacting with the payment provider.

------------------------------------------------------------------------

# 15. Booking Model

``` text
Booking
-------
id
bookingReference
pnr
userId
journeyId
quotaId
status
totalAmount
currency
expiresAt
createdAt
updatedAt
```

Passenger details:

``` text
BookingPassenger
----------------
id
bookingId
name
age
gender
documentType
documentReference
```

Seat assignment:

``` text
BookingSeat
-----------
id
bookingId
seatId
passengerId
allocationType
status
```

------------------------------------------------------------------------

# 16. Idempotency

Critical APIs must support idempotency.

Client:

``` http
Idempotency-Key: <unique-request-key>
```

The server stores the result associated with the key.

Repeated requests return the existing result rather than creating
another booking.

This protects against:

-   Double clicks
-   Mobile retries
-   Network timeouts
-   Gateway retries
-   Client reconnects

------------------------------------------------------------------------

# 17. PNR Generation

PNR generation must be collision-resistant and database-enforced.

Use a database-backed sequence or another controlled unique ID strategy.

Example:

``` text
PNR: 5829417362
```

Constraint:

``` text
UNIQUE(pnr)
```

Do not rely on random generation alone.

------------------------------------------------------------------------

# 18. RAC and Waitlist

Allocation flow:

``` text
Booking Request
      |
      v
Confirmed inventory available?
      |
   +--+--+
   |     |
  Yes    No
   |     |
 Book   RAC available?
         |
      +--+--+
      |     |
     Yes    No
      |     |
     RAC   Waitlist
```

Waitlist ordering is strictly FIFO.

Example:

``` text
WL-001
WL-002
WL-003
WL-004
```

When inventory becomes available, the next eligible passenger is
promoted according to the configured rules.

RAC and waitlist rules must be centralized in their own module rather
than scattered through booking code.

------------------------------------------------------------------------

# 19. Tatkal / High-Demand Queue

Millions of users should not directly hit the booking transaction path
at the same time.

Flow:

``` text
Users
  |
  v
CDN / WAF
  |
  v
Rate limit + anti-abuse
  |
  v
Virtual waiting room
  |
  v
FIFO admission queue
  |
  v
Controlled admission
  |
  v
Search / inventory / booking
```

The admission rate is a capacity-control parameter.

It must be established through load testing rather than guessed
permanently.

------------------------------------------------------------------------

# 20. FIFO Queue

Queue entry:

``` text
QueueEntry
----------
id
userId
sessionId
position
token
status
joinedAt
expiresAt
```

Important constraints:

``` text
UNIQUE(position)
UNIQUE(token)
```

Redis can maintain the active high-speed queue while PostgreSQL stores
durable queue records and reconciliation state.

------------------------------------------------------------------------

# 21. Queue Token

Conceptual token payload:

``` json
{
  "userId": "123",
  "queueId": "tatkal-2026-08-06",
  "position": 15234,
  "issuedAt": "2026-08-06T10:00:01Z",
  "expiresAt": "2026-08-06T10:30:00Z"
}
```

The token must be cryptographically signed.

Never trust a client-supplied queue position.

------------------------------------------------------------------------

# 22. Rate Limiting

Apply controls at multiple dimensions:

-   IP
-   Account
-   Device/session
-   Endpoint

Different endpoints should have different limits because their cost
differs.

Example starting policy:

  Endpoint                    Example Limit
  ------------------------ ----------------
  Login                            5/min/IP
  Search                     60/min/account
  Availability               30/min/account
  Booking                     3/min/account
  Payment initialization     5/5min/account

These are initial values, not final production limits.

------------------------------------------------------------------------

# 23. Bot and Abuse Protection

Use multiple layers:

``` text
WAF
 |
 v
IP reputation
 |
 v
Rate limiting
 |
 v
Device/session signals
 |
 v
Account risk scoring
 |
 v
Behavior analysis
 |
 v
Challenge / block
```

Signals may include:

-   Request frequency
-   Availability polling rate
-   Account creation velocity
-   Device changes
-   IP changes
-   Datacenter/proxy indicators
-   Failed authentication patterns
-   Abnormal booking velocity
-   Concurrent session count
-   Timing patterns

Do not depend on browser fingerprinting alone.

------------------------------------------------------------------------

# 24. Anti-Abuse Risk Engine

Start with deterministic rules rather than machine learning.

Example:

``` text
+20 excessive availability polling
+30 suspicious IP
+20 device/account mismatch
+30 abnormal booking velocity
+40 repeated automation-like behavior
```

Illustrative decisions:

``` text
0-39   ALLOW
40-69  CHALLENGE
70-89  THROTTLE
90+    BLOCK
```

The scoring model must be configurable and tuned using real traffic
data.

------------------------------------------------------------------------

# 25. Search and Availability

Search is read-heavy.

``` text
Search API
   |
   v
Redis cache
   |
   +---- hit ---> response
   |
 miss
   |
   v
PostgreSQL
   |
   v
Cache result
```

Availability can be cached for speed, but cached availability must never
be the final authority during reservation.

Correctness path:

``` text
Cache says available
       |
       v
DB verifies availability
       |
       v
Transaction locks inventory
       |
       v
Hold
```

------------------------------------------------------------------------

# 26. Payment Architecture

Payment provider: **Paystack**.

Flow:

``` text
User
 |
 v
Create booking intent
 |
 v
Create payment record
 |
 v
Initialize Paystack transaction
 |
 v
User completes payment
 |
 v
Paystack webhook
 |
 v
Verify transaction
 |
 v
Update payment
 |
 v
Confirm booking
 |
 v
Generate PNR
 |
 v
Publish notification event
```

The browser redirect is not the source of truth.

Webhook/provider verification is authoritative.

------------------------------------------------------------------------

# 27. Payment States

``` text
INITIATED
   |
   v
PROCESSING
   |
   +----> FAILED
   |
   v
SUCCESS
   |
   v
COMPLETED
```

Refund:

``` text
REFUND_REQUESTED
      |
      v
REFUND_PROCESSING
      |
   +--+--+
   |     |
SUCCESS  FAILED
```

------------------------------------------------------------------------

# 28. Paystack Webhooks

Webhook processing must:

1.  Validate authenticity.
2.  Parse the event.
3.  Locate the internal payment.
4.  Check whether it was already processed.
5.  Verify the provider transaction where required.
6.  Update payment state transactionally.
7.  Confirm booking only once.
8.  Publish downstream events after persistence.
9.  Return quickly.

Unique provider references are mandatory.

Example:

``` text
UNIQUE(provider, providerReference)
```

------------------------------------------------------------------------

# 29. Payment and Booking Failure

Critical case:

``` text
Payment succeeds
       |
       v
Booking confirmation fails
```

Use reconciliation:

``` text
Payment SUCCESS
       |
       v
Booking confirmation
       |
       +---- success ---> CONFIRMED
       |
       +---- failure ---> RECONCILIATION
                              |
                              +--> retry
                              |
                              +--> refund
                              |
                              +--> manual review
```

Never leave this scenario to manual database inspection as the primary
recovery strategy.

------------------------------------------------------------------------

# 30. Refund Flow

``` text
User cancellation
      |
      v
Check cancellation policy
      |
      v
Create refund record
      |
      v
Request Paystack refund
      |
      v
Provider response/webhook
      |
      v
Update refund
      |
      v
Notify user
```

Refund requests must be idempotent.

------------------------------------------------------------------------

# 31. Kafka

Kafka is for asynchronous processing.

Initial event types:

``` text
booking.created
booking.confirmed
booking.cancelled
payment.initiated
payment.succeeded
payment.failed
refund.created
refund.completed
seat.released
rac.promoted
waitlist.promoted
notification.requested
user.registered
audit.created
```

Example:

``` text
Booking
   |
   v
Kafka
   |
   +--> Notification
   +--> Audit
   +--> Analytics
```

Assume at-least-once delivery.

Consumers must therefore be idempotent.

------------------------------------------------------------------------

# 32. Transactional Outbox

Use the outbox pattern for important domain events.

``` text
Business transaction
       |
       +--> update business tables
       |
       +--> insert outbox event
       |
       v
COMMIT
       |
       v
Outbox publisher
       |
       v
Kafka
```

Example:

``` text
OutboxEvent
-----------
id
aggregateType
aggregateId
eventType
payload
status
attempts
availableAt
publishedAt
createdAt
```

This prevents a successful database transaction from losing its
corresponding Kafka event.

------------------------------------------------------------------------

# 33. Notification System

Initial channels:

-   Email
-   Push

Events:

``` text
Booking confirmed
Payment successful
Payment failed
RAC allocated
Waitlist promoted
Booking cancelled
Refund completed
Queue admission
```

Notifications must be asynchronous.

A notification provider outage must never invalidate a booking.

------------------------------------------------------------------------

# 34. AWS Architecture

Recommended starting topology:

``` text
Internet
   |
   v
Route 53
   |
   v
CloudFront / WAF
   |
   v
Application Load Balancer
   |
   v
Containerized API
   |
   +----------------+
   |                |
   v                v
PostgreSQL        Redis
   |
   v
Read replicas when required

API
 |
 +--> Kafka
 |
 +--> S3
 |
 +--> Paystack
 |
 +--> Email provider
 |
 +--> Push provider
```

A practical AWS starting stack:

``` text
ECS/Fargate
RDS PostgreSQL
ElastiCache Redis
Amazon MSK Kafka
S3
CloudFront
AWS WAF
ALB
Route 53
CloudWatch
Secrets Manager
```

Exact service selection can be adjusted during infrastructure
implementation.

------------------------------------------------------------------------

# 35. Docker

Production containers should be:

-   Multi-stage
-   Minimal
-   Deterministic
-   Dependency-pinned
-   Health-checkable
-   Non-root where practical

Build:

``` text
dependencies
    |
    v
builder
    |
    v
production
```

Endpoints:

``` text
/health
/ready
```

------------------------------------------------------------------------

# 36. Terraform

Infrastructure must be reproducible.

Recommended:

``` text
infrastructure/terraform/
├── modules/
│   ├── vpc/
│   ├── ecs/
│   ├── rds/
│   ├── redis/
│   ├── kafka/
│   ├── alb/
│   ├── s3/
│   ├── monitoring/
│   └── waf/
└── environments/
    ├── dev/
    ├── staging/
    └── production/
```

Do not manually build production infrastructure and postpone codifying
it.

------------------------------------------------------------------------

# 37. Environments

Minimum:

``` text
development
staging
production
```

Each environment should have separate:

-   Database
-   Redis
-   Kafka topics
-   Secrets
-   Storage
-   Configuration

Production data must not be casually copied into development.

------------------------------------------------------------------------

# 38. Observability

Every request should have:

``` text
requestId
traceId
userId when available
route
statusCode
latency
```

Production logs should be structured JSON.

Track:

### API

``` text
request_count
request_latency
error_rate
5xx_rate
```

### Queue

``` text
queue_depth
admission_rate
average_wait_time
expired_tokens
```

### Inventory

``` text
hold_count
hold_expiry_count
booking_conflicts
allocation_failures
```

### Payments

``` text
payment_success_rate
payment_failure_rate
payment_pending_count
refund_success_rate
```

### Kafka

``` text
consumer_lag
failed_messages
retry_count
DLQ_count
```

------------------------------------------------------------------------

# 39. Failure Handling

Every external call should have:

``` text
timeout
retry policy
circuit breaker where appropriate
```

Never blindly retry payment operations.

Idempotency must be established before retrying financial operations.

------------------------------------------------------------------------

# 40. Failure Scenarios

## API instance crash

Load balancer removes unhealthy instance and routes traffic to healthy
instances.

## Database failure

Use managed PostgreSQL Multi-AZ, backups and failover.

## Redis failure

Cache and ephemeral features may degrade, but authoritative booking
correctness remains in PostgreSQL.

## Kafka failure

Committed business transactions remain safe through the outbox table.
Publishing retries later.

## Payment timeout

Mark payment pending and verify asynchronously.

## Duplicate payment webhook

Detect existing provider reference and return safely.

## Notification failure

Retry asynchronously. Booking remains confirmed.

------------------------------------------------------------------------

# 41. Scheduled Workers

Required workers:

``` text
hold-expiration-worker
queue-reconciliation-worker
payment-reconciliation-worker
refund-reconciliation-worker
outbox-publisher
notification-worker
waitlist-promotion-worker
cleanup-worker
```

Do not depend on a single cron process inside the API container for
critical work.

------------------------------------------------------------------------

# 42. Testing Strategy

## Unit

Test:

-   Fare calculation
-   Quota rules
-   Seat allocation
-   RAC promotion
-   Waitlist ordering
-   Cancellation
-   Payment state transitions
-   Risk scoring

## Integration

Test:

-   PostgreSQL
-   Redis
-   Kafka
-   Paystack boundaries

## API

Test complete request/response behavior.

## End-to-end

Test:

``` text
Search
 -> select
 -> hold
 -> payment
 -> confirmation
 -> PNR
```

------------------------------------------------------------------------

# 43. Concurrency Tests

Mandatory scenario:

``` text
1,000 concurrent users
        |
        v
same train
        |
        v
same seat
```

Expected:

``` text
1 successful allocation
999 rejected/alternative allocations
```

Never accept two confirmed owners for one seat.

This test must pass before large-scale optimization.

------------------------------------------------------------------------

# 44. Tatkal Load Testing

Do not jump directly to 2 million users.

Ramp:

``` text
10k
50k
100k
250k
500k
1m
2m
```

Measure:

-   Admission latency
-   Queue throughput
-   Redis memory
-   Database load
-   Kafka lag
-   CPU
-   Memory
-   Network
-   Error rate

Then establish the safe admission rate from evidence.

------------------------------------------------------------------------

# 45. Chaos Testing

Test:

-   API instance crash
-   Database failover
-   Redis outage
-   Kafka outage
-   Network latency
-   Payment timeout
-   Duplicate webhook
-   Notification outage
-   Worker crash
-   Container restart

The objective is not simply uptime.

The objective is **correctness under failure**.

------------------------------------------------------------------------

# 46. CI/CD

Pipeline:

``` text
Pull Request
    |
    v
Lint
    |
    v
Typecheck
    |
    v
Unit Tests
    |
    v
Integration Tests
    |
    v
Build
    |
    v
Security Scan
    |
    v
Docker Build
    |
    v
Deploy Staging
    |
    v
Smoke Tests
    |
    v
Production Approval
    |
    v
Production Deployment
```

------------------------------------------------------------------------

# 47. Database Migration Rules

Use Prisma migrations.

Rules:

1.  Never modify an already-applied production migration.
2.  Every schema change gets a migration.
3.  Test migrations against realistic data.
4.  Prefer backward-compatible changes.
5.  Separate schema deployment from application behavior where
    necessary.

Safe pattern:

``` text
Add nullable column
      |
      v
Deploy code that writes it
      |
      v
Backfill
      |
      v
Add stricter constraint
```

------------------------------------------------------------------------

# 48. Security Baseline

Implement:

-   HTTPS
-   Secure headers
-   CORS
-   Request validation
-   Rate limiting
-   WAF
-   Secrets Manager
-   Audit logs
-   Authentication
-   Authorization
-   Sensitive-data redaction
-   Dependency scanning
-   Container scanning
-   Security logging

Never log:

``` text
passwords
access tokens
refresh tokens
payment secrets
sensitive payment data
```

------------------------------------------------------------------------

# 49. Implementation Phases

## Phase 0: Foundation

-   Repository
-   TypeScript
-   PostgreSQL
-   Prisma
-   Redis
-   Docker
-   Configuration
-   Logging
-   Error handling
-   Validation
-   Health endpoints
-   CI

### Exit criteria

``` text
Application starts
Database migrations work
Health checks work
CI passes
```

## Phase 1: Identity

-   Registration
-   Login
-   Password hashing
-   Token handling
-   Verification
-   Profile
-   Authorization

## Phase 2: Railway Master Data

-   Stations
-   Trains
-   Train stops
-   Coaches
-   Seats
-   Classes
-   Quotas
-   Journeys
-   Fares
-   Seed data

## Phase 3: Search

-   Origin/destination
-   Date
-   Class
-   Journey
-   Fare
-   Availability summary
-   Redis caching

## Phase 4: Inventory

-   Seat availability
-   Seat hold
-   Release
-   Expiration
-   DB transactions
-   Row locking
-   Seat preference
-   System fallback

### Exit criteria

``` text
Concurrent requests cannot double-book seats.
```

## Phase 5: Booking

-   Booking creation
-   Passenger details
-   Seat assignment
-   State machine
-   Idempotency
-   PNR

## Phase 6: Payment

-   Paystack initialization
-   Payment records
-   Webhook verification
-   Idempotency
-   Reconciliation
-   Refunds
-   Booking confirmation

## Phase 7: RAC + Waitlist

-   RAC
-   Waitlist
-   FIFO
-   Promotion
-   Expiration
-   Cancellation-triggered promotion

## Phase 8: Tatkal Queue

-   Virtual waiting room
-   FIFO queue
-   Tokens
-   Admission controller
-   Redis state
-   Durable records
-   Reconciliation

## Phase 9: Anti-Abuse

-   WAF
-   Rate limiting
-   Account throttling
-   Device/session signals
-   IP reputation
-   Behavioral rules
-   Challenge
-   Risk scoring
-   Audit logs

## Phase 10: Notifications

-   Email
-   Push
-   Kafka consumers
-   Templates
-   Retry
-   DLQ
-   Notification history

## Phase 11: Observability

-   Metrics
-   Logs
-   Tracing
-   Dashboards
-   Alerts
-   Queue monitoring
-   Payment monitoring
-   DB monitoring
-   Kafka monitoring

## Phase 12: AWS

-   VPC
-   RDS
-   Redis
-   Kafka
-   ECS/Fargate
-   ALB
-   WAF
-   S3
-   CloudFront
-   Secrets Manager
-   CloudWatch
-   Terraform
-   CI/CD

## Phase 13: Performance

-   Baseline load test
-   Search test
-   Availability test
-   Booking concurrency test
-   Payment test
-   Tatkal test
-   Kafka stress test
-   Database stress test

## Phase 14: Production Hardening

-   Disaster recovery
-   Restore test
-   Payment reconciliation
-   Duplicate webhook test
-   Double-booking test
-   Security testing
-   Queue recovery
-   Kafka recovery
-   Redis recovery
-   Load test
-   Penetration testing
-   Runbooks

------------------------------------------------------------------------

# 50. MVP Scope

### User

-   Registration
-   Login
-   Profile
-   Verification

### Search

-   Station search
-   Train search
-   Journey search
-   Availability

### Booking

-   Passenger details
-   Seat selection
-   System fallback
-   Seat hold
-   Booking
-   PNR

### Payment

-   Paystack
-   Payment verification
-   Webhook
-   Refund foundation

### Inventory

-   Confirmed seats
-   RAC
-   Waitlist
-   Expiration
-   Promotion

### Traffic

-   FIFO queue
-   Rate limiting
-   Anti-abuse
-   Tatkal admission

### Notifications

-   Email
-   Push

### Operations

-   Logging
-   Metrics
-   Audit
-   Health checks

------------------------------------------------------------------------

# 51. Explicit Initial Exclusions

Do not expand the first implementation with:

-   Agent portal
-   Multi-tenancy
-   Machine-learning bot detection
-   Loyalty programs
-   Dynamic pricing
-   Multiple currencies
-   Advanced analytics platform
-   Full microservice decomposition
-   Multiple payment gateways
-   Complex partner integrations
-   Native mobile applications

These can be future phases.

------------------------------------------------------------------------

# 52. Future Service Extraction

Potential extraction candidates:

``` text
Queue Service
Inventory Service
Payment Service
Notification Service
Search Service
Anti-Abuse Service
```

Future architecture could become:

``` text
API Gateway
     |
     +--> Search
     +--> Booking
     +--> Inventory
     +--> Payment
     +--> Queue
     +--> Notification
```

Do not deploy these independently until real scaling or organizational
requirements justify extraction.

------------------------------------------------------------------------

# 53. Critical Invariants

The following must always remain true:

### Seat

``` text
A physical seat cannot have two active confirmed owners.
```

### Payment

``` text
One provider transaction cannot produce multiple successful internal payments.
```

### Booking

``` text
One idempotency key cannot create multiple independent bookings.
```

### PNR

``` text
Every confirmed booking has one unique PNR.
```

### Queue

``` text
Clients cannot manipulate authoritative FIFO positions.
```

### RAC / Waitlist

``` text
Promotion follows configured priority and FIFO rules.
```

### Cancellation

``` text
Cancelled inventory is released exactly once.
```

### Notifications

``` text
Duplicate events cannot create duplicate business side effects.
```

These invariants must have automated tests.

------------------------------------------------------------------------

# 54. Definition of Done

A feature is not complete merely because its endpoint works.

A production-ready feature requires:

``` text
Domain logic
API
Validation
Database migration
Indexes
Authorization
Error handling
Logging
Metrics
Tests
Idempotency where required
Concurrency handling where required
Documentation
Operational considerations
```

Critical workflows additionally require:

``` text
Failure recovery
Load testing
Race-condition testing
Audit trail
```

------------------------------------------------------------------------

# 55. Recommended Implementation Order

``` text
1. Foundation
2. Auth
3. Railway master data
4. Search
5. Inventory
6. Booking
7. Payment
8. RAC / Waitlist
9. Queue
10. Anti-abuse
11. Notifications
12. Observability
13. AWS infrastructure
14. Load testing
15. Failure testing
16. Production hardening
```

Do not start with the Tatkal queue.

First prove:

``` text
Correct booking
       ↓
Correct inventory
       ↓
Correct payment
       ↓
Correct RAC/WL
       ↓
Controlled admission
       ↓
Scale
```

------------------------------------------------------------------------

# 56. First Vertical Slice

The first complete engineering milestone should be:

``` text
Register
   ↓
Login
   ↓
Search journey
   ↓
View seats
   ↓
Select seat
   ↓
Hold seat
   ↓
Initialize Paystack
   ↓
Receive webhook
   ↓
Confirm booking
   ↓
Generate PNR
   ↓
Send notification
```

Only after this works reliably should the team optimize for millions of
users.

------------------------------------------------------------------------

# 57. Immediate Engineering Backlog

### Foundation

-   [ ] Initialize repository
-   [ ] Configure TypeScript
-   [ ] Configure application framework
-   [ ] Configure Prisma
-   [ ] Create PostgreSQL development environment
-   [ ] Create Redis development environment
-   [ ] Create Kafka development environment
-   [ ] Configure Docker Compose
-   [ ] Add environment configuration
-   [ ] Add structured logging
-   [ ] Add global error handling
-   [ ] Add request validation
-   [ ] Add health/readiness endpoints
-   [ ] Configure CI

### Identity

-   [x] User schema
-   [x] Registration
-   [x] Login
-   [x] Password hashing
-   [x] Access tokens
-   [x] Refresh tokens
-   [x] Verification
-   [x] Logout/session revocation
-   [x] Authorization middleware

### Railway

-   [x] Station schema
-   [x] Train schema
-   [x] Train stop schema
-   [x] Coach schema
-   [x] Seat schema
-   [x] Journey schema
-   [x] Quota schema
-   [x] Fare schema
-   [x] Seed data

### Search

-   [x] Search endpoint
-   [x] Journey filtering
-   [x] Fare retrieval
-   [x] Availability summary (per class)
-   [x] Class filter (optional `class` query param)
-   [x] Redis caching (cache-aside + `SEARCH_CACHE_TTL`; non-fatal when Redis down)
-   [ ] Cache invalidation (deferred — TTL-only for now; invalidation on inventory change lands with Phase 4)

### Inventory

-   [x] Inventory schema
-   [x] Availability lookup
-   [x] Seat selection
-   [x] DB row locking
-   [x] Seat hold
-   [x] Hold expiration
-   [x] Seat release
-   [x] System fallback allocation
-   [x] Concurrency tests

### Booking

-   [ ] Booking aggregate
-   [ ] Passenger records
-   [ ] Booking seats
-   [ ] Booking state machine
-   [ ] Idempotency
-   [ ] PNR generation
-   [ ] Booking retrieval
-   [ ] Cancellation

### Payment

-   [ ] Payment schema
-   [ ] Paystack configuration
-   [ ] Transaction initialization
-   [ ] Webhook endpoint
-   [ ] Webhook verification
-   [ ] Payment state machine
-   [ ] Reconciliation worker
-   [ ] Refund flow

### RAC / Waitlist

-   [ ] RAC schema
-   [ ] Waitlist schema
-   [ ] FIFO allocation
-   [ ] Promotion worker
-   [ ] Expiration handling
-   [ ] Cancellation-triggered promotion

### Queue

-   [ ] Virtual waiting room
-   [ ] FIFO queue
-   [ ] Queue token
-   [ ] Admission controller
-   [ ] Queue status API
-   [ ] Queue reconciliation
-   [ ] Admission metrics

### Anti-Abuse

-   [ ] WAF
-   [ ] IP rate limiting
-   [ ] Account rate limiting
-   [ ] Device/session signals
-   [ ] Risk rules
-   [ ] Challenge mechanism
-   [ ] Abuse audit log

### Async

-   [ ] Kafka
-   [ ] Event contracts
-   [ ] Outbox table
-   [ ] Outbox publisher
-   [ ] Consumer idempotency
-   [ ] DLQ strategy

### Notifications

-   [ ] Email provider
-   [ ] Push provider
-   [ ] Templates
-   [ ] Notification consumer
-   [ ] Retry strategy
-   [ ] Notification history

### Observability

-   [ ] Metrics
-   [ ] Structured logs
-   [ ] Tracing
-   [ ] Dashboards
-   [ ] Alerts
-   [ ] Queue metrics
-   [ ] Payment metrics
-   [ ] Inventory metrics

### AWS

-   [ ] Terraform foundation
-   [ ] VPC
-   [ ] RDS
-   [ ] Redis
-   [ ] Kafka
-   [ ] ECS/Fargate
-   [ ] ALB
-   [ ] WAF
-   [ ] S3
-   [ ] CloudFront
-   [ ] Secrets Manager
-   [ ] CloudWatch
-   [ ] Staging environment

### Production

-   [ ] Load tests
-   [ ] Concurrency tests
-   [ ] Payment failure tests
-   [ ] Queue recovery tests
-   [ ] DB failover tests
-   [ ] Redis failure tests
-   [ ] Kafka failure tests
-   [ ] Security tests
-   [ ] Disaster recovery test
-   [ ] Penetration test
-   [ ] Production runbooks

------------------------------------------------------------------------

# 58. Success Criteria

The implementation is successful when:

-   No double booking occurs under concurrent load.
-   Duplicate payment webhooks are harmless.
-   Duplicate client requests are idempotent.
-   Failed payments release inventory correctly.
-   Successful payments reliably produce confirmed bookings.
-   RAC and waitlist promotion follows the configured rules.
-   Millions of simulated users can enter the waiting room without
    overwhelming booking APIs.
-   Controlled admission protects the booking path.
-   Automated traffic can be detected, throttled or blocked.
-   Redis failure does not corrupt authoritative booking data.
-   Kafka failure does not lose committed business events.
-   Notification failures do not cancel bookings.
-   Database failover recovers within the defined RTO/RPO.
-   Engineers can trace a booking across API, inventory, payment and
    notification.
-   Application instances can scale horizontally.
-   Infrastructure can be recreated from code.
-   Load testing establishes an evidence-based safe admission rate.

------------------------------------------------------------------------

# 59. Final Engineering Position

The difficult part of this system is not creating many services.

The difficult part is preserving correctness when many users attempt to
mutate scarce inventory while payment providers, networks, queues,
caches and application instances can fail independently.

The architecture therefore separates responsibilities:

``` text
TRAFFIC CONTROL
Queue + Rate Limiting + Anti-Abuse

CORRECTNESS
PostgreSQL + Transactions + Locking + Idempotency

SPEED AND COORDINATION
Redis

ASYNC PROCESSING
Kafka + Outbox

DURABILITY
PostgreSQL + S3 + Backups

SCALING
Stateless containers + Horizontal scaling
```

The modular monolith is the correct starting point.

Build the critical booking path correctly first.

Then measure.

Then scale the parts that actually need scaling.

------------------------------------------------------------------------

# 60. Refined Foundation Plan (Phase 0)

**Date:** 2026-08-08\
**Status:** Approved for implementation

## 60.1 Confirmed stack decisions

``` text
Package manager   pnpm workspaces (pnpm 11)
Web framework     Fastify
Language          TypeScript (strict)
Validation        zod (shared via packages/contracts)
Logging           pino (structured JSON)
ORM               Prisma
Database          PostgreSQL 16+
Cache / state     Redis
Messaging         Kafka (out of Phase 0 scope; compose only)
Testing           Vitest
Lint / format     ESLint (typescript-eslint) + Prettier
CI                GitHub Actions
Local runtime     Local Homebrew PostgreSQL + docker-compose parity
```

## 60.2 Scope of Phase 0

The exit criteria for Phase 0 remain:

``` text
Application starts
Database migrations work
Health checks work
CI passes
```

Phase 0 intentionally ships no domain features. It produces the
compilation, runtime, validation, logging, error-handling, database and
test scaffolding that every later phase depends on.

## 60.3 Workspace layout (first part)

``` text
railflow/                          <- repository root
├── apps/
│   └── api/                       <- Fastify application
│       ├── src/
│       │   ├── app.ts             <- buildApplication(): Fastify instance (no listen)
│       │   ├── server.ts          <- entrypoint: listen, signals, graceful shutdown
│       │   ├── config/            <- typed app config (from @railflow/config)
│       │   ├── common/
│       │   │   ├── errors/        <- AppError hierarchy + error handler plugin
│       │   │   ├── request-context/ <- requestId, correlation
│       │   │   └── health/        <- health module
│       │   ├── modules/           <- domain modules (empty in Phase 0)
│       │   └── infrastructure/
│       │       └── prisma/        <- PrismaClient singleton + connection lifecycle
│       └── tests/                 <- app-level tests (vitest)
├── packages/
│   ├── config/                    <- zod-validated environment configuration
│   ├── contracts/                 <- shared domain types + zod schemas
│   ├── logger/                    <- pino logger factory (redaction built in)
│   └── testing/                   <- vitest helpers, fixtures, mocks
├── prisma/                        <- schema.prisma, migrations, seed
├── infrastructure/
│   └── docker/                    <- docker-compose.yml, Dockerfile
├── scripts/                       <- repo scripts
├── .github/workflows/             <- CI
├── package.json                   <- pnpm workspace root (scripts)
├── pnpm-workspace.yaml
├── tsconfig.base.json
├── .npmrc
├── .gitignore
└── .editorconfig
```

## 60.4 Package responsibilities

``` text
@railflow/config     Loads + validates process.env via zod. Single source of
                     truth for every environment variable. Fails fast on
                     invalid or missing config.

@railflow/logger     Factory returning a configured pino instance. Applies
                     JSON formatting, redaction keys (password, tokens,
                     payment secrets), requestId binding and level control.

@railflow/contracts  Shared API types and zod schemas. API routes, services
                     and tests all consume these. Prevents drift between
                     layers.

@railflow/testing    Shared vitest helpers: memory/log capture, fake app
                     builder, prisma test database setup.
```

## 60.5 Module rules for Phase 0

1.  Every package exposes only its public API via its `index.ts`. No
    deep imports across packages.
2.  `apps/api` is the only place with Fastify and HTTP concerns.
3.  `apps/api` never reads `process.env` directly — it reads
    `@railflow/config`.
4.  Errors thrown in routes are normalized by one global error handler
    plugin into the standard `{ error: { code, message, ... } }` shape.
5.  Every request gets a `requestId` (and `traceId` when tracing lands).
6.  No feature module is written in Phase 0; the `modules/` directory is
    created to establish the boundary.

## 60.6 Health contract

``` text
GET /healthz        liveness - always 200 if process is up
GET /readyz         readiness - checks DB connectivity, returns 503 on failure
```

## 60.7 Database for Phase 0

Phase 0 creates the Prisma foundation and a baseline schema. The
`users` table is brought forward from Phase 1 into the initial migration
so that `prisma migrate deploy` is proven against a real table; all other
domain tables are added per-phase (railway master data in Phase 2, etc.).

Migrations must be created from a running local PostgreSQL (currently
available at /tmp:5432) and committed. `prisma migrate deploy` runs in
CI and Docker entrypoints, never `prisma migrate dev`.

## 60.8 CI pipeline (Phase 0)

``` text
lint -> typecheck -> unit tests -> build -> docker build (opt)
```

CI must not require a live database; integration tests that need
PostgreSQL are separated and run against a service container in a later
phase.

## 60.9 Definition of done for Phase 0

``` text
pnpm install is reproducible (lockfile committed)
pnpm typecheck passes
pnpm lint passes
pnpm test passes
pnpm build produces a runnable server bundle
pnpm dev starts the API
GET /healthz and GET /readyz respond correctly
prisma migrate deploy applies migrations cleanly
GitHub Actions runs the same checks
```
