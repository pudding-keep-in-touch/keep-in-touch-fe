FROM node:22-slim

WORKDIR /app

RUN npm install -g pnpm

RUN apt-get update && apt-get install -y \
    git \
    vim \
    && rm -rf /var/lib/apt/lists/*

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

EXPOSE 3000

ENTRYPOINT ["pnpm", "run", "start:dev"]
