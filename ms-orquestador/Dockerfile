FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY package-lock.json ./
COPY src ./src

RUN npm ci --unsafe-perm=false --no-audit --no-fund
RUN npm run build

FROM node:22-alpine

WORKDIR /app

RUN addgroup -g 1001 nodeapp && adduser -S -G nodeapp -u 1001 nodeapp

COPY --chown=nodeapp:nodeapp --from=builder /app/package*.json ./

COPY --chown=nodeapp:nodeapp --from=builder /app/build ./build

ENV NODE_ENV=production\
    PORT=3000

USER nodeapp

EXPOSE 3000

CMD ["node", "build/index.js"]