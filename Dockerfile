FROM oven/bun:1 AS base

ARG COOLIFY_URL
ENV NEXT_PUBLIC_SERVER_URL=https://$COOLIFY_URL

RUN apt-get update && apt-get install -y \
    gcc \
    g++ \
    make \
    curl \
    wget \
    cmake

# Stage 1: Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN --mount=type=cache,target=/root/.bun \
    bun install --frozen-lockfile

# Stage 2: Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run ci

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
CMD ["sh", "-c", "HOSTNAME=0.0.0.0 PORT=3001 bun server.js"]