FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./
COPY src ./src

RUN npm ci
RUN npm run build

FROM node:22-alpine

WORKDIR /app

RUN addgroup -g 1001 nodeapp && adduser -S -G nodeapp -u 1001 nodeapp

COPY --chown=nodeapp:nodeapp --from=builder /app/package*.json ./
COPY --chown=nodeapp:nodeapp --from=builder /app/node_modules ./node_modules
COPY --chown=nodeapp:nodeapp --from=builder /app/build ./build

ENV NODE_ENV=production

USER nodeapp

EXPOSE 3001

CMD ["node", "build/index.js"]