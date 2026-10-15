# ---- deps ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ---- runtime ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Traceability: baked in at build time by CI (git SHA)
ARG GIT_SHA=dev
ENV APP_VERSION=$GIT_SHA

USER node
EXPOSE 5000
CMD ["node", "index.js"]
