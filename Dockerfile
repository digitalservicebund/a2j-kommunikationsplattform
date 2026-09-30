# ==============================================================================
# STAGE: Create an upgraded alpine image to solve CVE vulnerabilities
# (See: https://stackoverflow.com/a/76440791/1239760)
# ==============================================================================

FROM node:26.10.0-alpine3.23 AS alpine-upgraded

RUN apk upgrade --no-cache

# ==============================================================================
# STAGE: Download and install build dependencies
# ==============================================================================

# Download and install the dependencies to build the app.
FROM alpine-upgraded AS build-dependencies

WORKDIR /build-deps
COPY package.json package-lock.json tsconfig.json vite.config.ts react-router.config.ts ./
COPY app ./app/
COPY public ./public/

RUN npm config set ignore-scripts true
RUN npm ci
RUN npm run build

# ==============================================================================
# STAGE: Download and install runtime dependencies
# ==============================================================================

# Download and install the dependencies to run the app.
FROM alpine-upgraded AS app-dependencies

WORKDIR /app-deps
COPY package.json package-lock.json ./

RUN npm config set ignore-scripts true
RUN npm ci --omit=dev --omit=optional

# ==============================================================================
# STAGE: Assemble app files (including dependencies) for the production image
# ==============================================================================

FROM scratch AS app

WORKDIR /app
COPY --link --from=build-dependencies /build-deps/build ./build/
COPY --link --from=build-dependencies /build-deps/public ./public/
COPY --link --from=app-dependencies /app-deps/node_modules ./node_modules/
COPY server.js package.json ./

# Copy over source files directly or transitively imported by `server.js`
COPY app/sentry.ts ./app/
COPY app/config/config.ts ./app/config/
COPY app/utils/logger.server.ts ./app/utils/

# ==============================================================================
# STAGE: Build the production image
# ==============================================================================

FROM alpine-upgraded AS prod

ENV NODE_ENV=production
EXPOSE 3000

RUN apk add --no-cache dumb-init && rm -rf /var/cache/apk/*

# Remove npm (has vulnerable glob@10.4.5 installed)
RUN npm r -g npm

# Use numeric UID instead of username for portability across build stages
# The node user in node:alpine has UID 1000 by default.
#
# See:
# - https://www.docker.com/blog/understanding-the-docker-user-instruction/#:~:text=Specify%20user%20by%20UID%20and%20GID
# - https://github.com/docker/buildx/issues/1526#issuecomment-1396768545
USER 1000


# Copy over app files files
WORKDIR /app
COPY --link --chown=1000:1000 --from=app /app/ ./

ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD [ "node", "./server.js" ]
