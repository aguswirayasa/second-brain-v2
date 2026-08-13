# syntax=docker/dockerfile:1

# ---- deps: install ALL deps (incl. dev needed for next build) ----
FROM node:22-bookworm-slim AS deps
WORKDIR /app
# Force dev install so next/typescript/tailwind are present for the build,
# even if NODE_ENV=production is injected as a build arg by the platform.
COPY package*.json ./
RUN npm ci --include=dev

# ---- builder ----
FROM node:22-bookworm-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- runner ----
FROM node:22-bookworm-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV VAULT_DIR=/vault
# Next standalone output is self-contained (no node_modules needed at runtime).
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
