# ---- deps ----
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# ---- runtime ----
FROM node:20-alpine
WORKDIR /app
ENV NODE_ENV=production

# Package managers are not needed at runtime: remove them to shrink attack surface
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/lib/node_modules/corepack \
    /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/corepack \
    /usr/local/bin/yarn /usr/local/bin/yarnpkg /opt/yarn-*

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ARG GIT_SHA=dev
ENV APP_VERSION=$GIT_SHA

USER node
EXPOSE 5000
CMD ["node", "index.js"]