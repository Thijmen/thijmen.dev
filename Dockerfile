FROM node:20-alpine AS base

ARG COOLIFY_URL
ENV NEXT_PUBLIC_SERVER_URL=$COOLIFY_URL

RUN apk add --no-cache \
    gcc \
    g++ \
    make \
    curl \
    wget \
    cmake \
    linux-headers

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    corepack enable pnpm && pnpm install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable pnpm && pnpm run ci

# Stage 3: Production server
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

RUN echo "NODE_ENV: ${NODE_ENV}" > test.txt
RUN echo "NEXT_PUBLIC_SERVER_URL: ${NEXT_PUBLIC_SERVER_URL}" > next.txt

EXPOSE 3001
CMD ["sh", "-c", "HOSTNAME=0.0.0.0 PORT=3001 node server.js"]