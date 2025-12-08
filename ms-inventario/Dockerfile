FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json tsconfig.json ./
COPY src ./src

RUN if [ -f package-lock.json ]; then npm ci; else npm install; fi

RUN npm run build

FROM node:22-alpine

WORKDIR /app

RUN addgroup -g 1001 nodeapp && adduser -S -G nodeapp -u 1001 nodeapp

COPY --chown=nodeapp:nodeapp --from=builder /app/package.json ./
COPY --chown=nodeapp:nodeapp --from=builder /app/node_modules ./node_modules
COPY --chown=nodeapp:nodeapp --from=builder /app/build ./build

ENV NODE_ENV=production

USER nodeapp

EXPOSE 3003

CMD ["node", "build/index.js"]