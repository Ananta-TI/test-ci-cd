# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build


# Stage 2: Production (Node + Express menyajikan API dan file statis)
FROM node:20-alpine

WORKDIR /app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm ci --omit=dev

COPY server ./server

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["node", "server/index.js"]