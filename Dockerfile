FROM node:20-slim

WORKDIR /app

RUN npm install -g pnpm

RUN apt-get update && apt-get install -y \
    git \
    vim \
    && rm -rf /var/lib/apt/lists/*

EXPOSE 3000

ENTRYPOINT ["next", "start"]