FROM node:18-slim AS base

# Install necessary packages
RUN apt-get update && apt-get install -y \
    cloc \
    dumb-init \
    python3 \
    python3-pip \
    git \
    curl \
    wget \
    && rm -rf /var/lib/apt/lists/*

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY ./prisma/ ./
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npm run prisma:generate
RUN pnpm build
RUN pnpm prune --prod

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/prisma ./prisma

COPY ./docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
COPY python-requirements.txt /app/python-requirements.txt
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Install Python requirements
RUN pip3 install --break-system-packages setuptools && \
    pip3 install --break-system-packages -r /app/python-requirements.txt

ENV DATABASE_URL="file:/app/data/gradle-project-analyzer.db"

ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]