# syntax=docker/dockerfile:1

FROM node:22-alpine AS dependencies
RUN corepack enable
RUN apk add --no-cache python3 make g++
WORKDIR /workspace
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY packages ./packages
COPY apps ./apps
RUN pnpm install --frozen-lockfile

FROM dependencies AS builder
ARG DATABASE_URL=postgresql://railflow:railflow@postgres:5432/railflow
ENV DATABASE_URL=$DATABASE_URL
COPY tsconfig.base.json ./
COPY prisma ./prisma
COPY . .
RUN pnpm --filter @railflow/api db:generate
RUN pnpm build

FROM node:22-alpine AS production
ENV NODE_ENV=production
RUN corepack enable
RUN apk add --no-cache python3 make g++
WORKDIR /workspace
COPY --from=builder /workspace/pnpm-lock.yaml /workspace/pnpm-workspace.yaml /workspace/package.json ./
RUN pnpm install --prod --frozen-lockfile
COPY --from=builder /workspace/packages ./packages
COPY --from=builder /workspace/apps/api/dist ./apps/api/dist
COPY --from=builder /workspace/apps/api/package.json ./apps/api/package.json
COPY --from=builder /workspace/prisma ./prisma
USER node
EXPOSE 3000
CMD ["node", "apps/api/dist/server.js"]
