# RailFlow — Process Documentation

Every plan, task and step is tracked as a markdown file so the entire process is
documented and auditable. This file is the index and explains the workflow.

## How the documentation is structured

For each phase (and the cross-cutting frontend track) there are three documents:

| Folder        | What it holds                                                    | Updated |
| ------------- | ---------------------------------------------------------------- | ------- |
| `PLANS/`      | What we intend to build: scope, exit criteria, design references | When the phase is planned |
| `TASKS/`      | The granular checklist of work items                             | As work lands (tick `[ ]` → `[x]`) |
| `STEPS/`      | Append-only log of what was actually done, gotchas, verification | During/after each session |

Top-level index documents:

| File                          | What it holds                                          |
| ----------------------------- | ------------------------------------------------------ |
| `IMPLEMENTATION_PLAN.md`      | Master architecture + full phase-by-phase backlog (§49) |
| `WORKLOG.md`                  | Chronological session log (one section per session)    |
| `RAILWAY_BOOKING_UI_DESIGN_PROMPTS.md` | UI/UX design prompts for the web frontend       |
| `docs/PROCESS.md`             | This index + workflow rules                            |

## The workflow

1. **Plan** — when a phase starts, ensure its `PLANS/` file exists with scope +
   exit criteria (extracted from `IMPLEMENTATION_PLAN.md` §49 or written fresh).
2. **Task** — break the phase into checklist items in `TASKS/`. The live
   in-session todo list mirrors this file; tick items as they land.
3. **Step** — during the session, append timestamped entries to `STEPS/` and to
   `WORKLOG.md` (decisions, steps taken, gotchas, verification results).
4. **Verify** — every session ends with the verification commands and their
   results written to `STEPS/` and `WORKLOG.md`.
5. **Index** — flip the phase `Status:` line to `DONE` in `PLANS/` and tick the
   matching checkboxes in `IMPLEMENTATION_PLAN.md` §57 backlog.

## Phase index

| Phase | Name | Plan | Tasks | Steps | Status |
| ----- | ---- | ---- | ----- | ----- | ------ |
| 0 | Foundation | [PLANS/phase-00-foundation.md](PLANS/phase-00-foundation.md) | [TASKS/phase-00-foundation.md](TASKS/phase-00-foundation.md) | [STEPS/phase-00-foundation.md](STEPS/phase-00-foundation.md) | DONE |
| 1 | Identity | [PLANS/phase-01-identity.md](PLANS/phase-01-identity.md) | [TASKS/phase-01-identity.md](TASKS/phase-01-identity.md) | [STEPS/phase-01-identity.md](STEPS/phase-01-identity.md) | DONE |
| 2 | Railway Master Data | [PLANS/phase-02-railway-master-data.md](PLANS/phase-02-railway-master-data.md) | [TASKS/phase-02-railway-master-data.md](TASKS/phase-02-railway-master-data.md) | [STEPS/phase-02-railway-master-data.md](STEPS/phase-02-railway-master-data.md) | DONE |
| 3 | Search | [PLANS/phase-03-search.md](PLANS/phase-03-search.md) | [TASKS/phase-03-search.md](TASKS/phase-03-search.md) | [STEPS/phase-03-search.md](STEPS/phase-03-search.md) | DONE |
| 4 | Inventory | [PLANS/phase-04-inventory.md](PLANS/phase-04-inventory.md) | [TASKS/phase-04-inventory.md](TASKS/phase-04-inventory.md) | [STEPS/phase-04-inventory.md](STEPS/phase-04-inventory.md) | DONE |
| 5 | Booking | [PLANS/phase-05-booking.md](PLANS/phase-05-booking.md) | [TASKS/phase-05-booking.md](TASKS/phase-05-booking.md) | [STEPS/phase-05-booking.md](STEPS/phase-05-booking.md) | IN PROGRESS |
| 6 | Payment | [PLANS/phase-06-payment.md](PLANS/phase-06-payment.md) | — (not started) | — (not started) | NOT STARTED |
| 7 | RAC + Waitlist | [PLANS/phase-07-rac-waitlist.md](PLANS/phase-07-rac-waitlist.md) | — (not started) | — (not started) | NOT STARTED |
| 8 | Tatkal Queue | [PLANS/phase-08-tatkal-queue.md](PLANS/phase-08-tatkal-queue.md) | — (not started) | — (not started) | NOT STARTED |
| 9 | Anti-Abuse | [PLANS/phase-09-anti-abuse.md](PLANS/phase-09-anti-abuse.md) | — (not started) | — (not started) | NOT STARTED |
| 10 | Notifications | [PLANS/phase-10-notifications.md](PLANS/phase-10-notifications.md) | — (not started) | — (not started) | NOT STARTED |
| 11 | Observability | [PLANS/phase-11-observability.md](PLANS/phase-11-observability.md) | — (not started) | — (not started) | NOT STARTED |
| 12 | AWS | [PLANS/phase-12-aws.md](PLANS/phase-12-aws.md) | — (not started) | — (not started) | NOT STARTED |
| 13 | Performance | [PLANS/phase-13-performance.md](PLANS/phase-13-performance.md) | — (not started) | — (not started) | NOT STARTED |
| 14 | Production Hardening | [PLANS/phase-14-production-hardening.md](PLANS/phase-14-production-hardening.md) | — (not started) | — (not started) | NOT STARTED |
| — | Frontend (web) — cross-cutting | [PLANS/frontend-web.md](PLANS/frontend-web.md) | [TASKS/frontend-web.md](TASKS/frontend-web.md) | [STEPS/frontend-web.md](STEPS/frontend-web.md) | IN PROGRESS |

## Starting a new phase

Copy `TEMPLATE.md` into `PLANS/`, `TASKS/` and `STEPS/`, fill in the plan, then
follow the workflow above. When a phase completes, update the `Status:` column
here and tick `IMPLEMENTATION_PLAN.md` §57.
