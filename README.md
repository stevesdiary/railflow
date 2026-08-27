# Railflow

IRCTC-style railway booking platform built as a modular monolith.

## Stack

| Layer | Technology |
|---|---|
| Backend | Node.js + TypeScript + Fastify |
| Database | PostgreSQL + Prisma |
| Cache | Redis |
| Messaging | Kafka |
| Payment | Paystack (NGN) |
| Cloud | AWS |
| Runtime | Docker |

## Features

- User registration, authentication and profile management
- Train and route search with real-time seat availability
- Seat selection with confirmed, RAC and waitlist allocation
- Tatkal virtual waiting room with FIFO admission
- Paystack payment processing and refunds
- PNR generation and booking management
- Email and push notifications
- Anti-bot and abuse prevention
- Audit logging and observability

## Project Structure

```
railflow/
├── apps/
│   ├── api/          # Fastify REST API
│   └── web/          # Frontend
├── packages/
│   ├── contracts/    # Shared types and schemas
│   ├── config/       # Shared configuration
│   ├── logger/       # Shared logger
│   └── testing/      # Shared test utilities
├── prisma/           # Schema and migrations
├── infrastructure/   # Docker and Terraform
└── docs/             # Architecture, plans and runbooks
```

## Prerequisites

- Node.js >= 20
- pnpm >= 11
- Docker

## Getting Started

```bash
# Install dependencies
pnpm install

# Start infrastructure (PostgreSQL, Redis, Kafka)
docker compose -f infrastructure/docker/docker-compose.yml up -d

# Set up environment
cp apps/api/.env.example apps/api/.env

# Run migrations and seed
pnpm db:migrate
pnpm db:seed

# Start development server
pnpm dev
```

## Scripts

```bash
pnpm dev            # Start API in watch mode
pnpm build          # Build all packages
pnpm test           # Run all tests
pnpm lint           # Lint
pnpm format         # Format with Prettier
pnpm db:migrate     # Run Prisma migrations
pnpm db:studio      # Open Prisma Studio
```

## Documentation

- [`IMPLEMENTATION_PLAN.md`](./IMPLEMENTATION_PLAN.md) — Master architecture and phase backlog
- [`docs/PROCESS.md`](./docs/PROCESS.md) — Documentation index
- [`docs/PLANS/`](./docs/PLANS/) — Per-phase scope and exit criteria
- [`docs/TASKS/`](./docs/TASKS/) — Working checklists
- [`docs/STEPS/`](./docs/STEPS/) — Append-only log of completed work
