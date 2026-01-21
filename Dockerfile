# Create an upgraded alpine image to solve CVE vulnerabilities
# See:
    # https://scout.docker.com/vulnerabilities/id/CVE-2025-64756
    # https://stackoverflow.com/a/76440791/1239760
FROM node:24-alpine AS alpine-upgraded

RUN apk upgrade --no-cache
FROM scratch

# Download and install the dependencies to build the app.
FROM alpine-upgraded AS build-dependencies

WORKDIR /build-deps
COPY package.json package-lock.json tsconfig.json vite.config.ts react-router.config.ts ./
COPY app ./app/
COPY public ./public/

RUN npm config set ignore-scripts true
RUN npm ci
RUN npm run build

# Download and install the dependencies to run the app.
FROM alpine-upgraded AS app-dependencies

WORKDIR /app-deps
COPY package.json package-lock.json ./

RUN npm config set ignore-scripts true
RUN npm ci --omit=dev --omit=optional

# Prepare kompla app relevant files and folders
FROM scratch AS kompla

WORKDIR /kompla
COPY --link --from=build-dependencies /build-deps/build ./build/
COPY --link --from=build-dependencies /build-deps/public ./public/
COPY --link --from=app-dependencies /app-deps/node_modules ./node_modules/
COPY server.js package.json ./

# Prepare prod build stage
FROM kompla AS app-copy
FROM alpine-upgraded AS prod
RUN apk add --no-cache dumb-init && rm -rf /var/cache/apk/*

# Remove npm (has vulnerable glob@10.4.5 installed)
RUN npm r -g npm

USER node
# /app-deps has only production relevant packages installed, no dev dependencies
WORKDIR /app-deps
ENV NODE_ENV=production
# copy /kompla production app relevant data into folder
COPY --link --chown=node:node --from=app-copy /kompla/ ./
EXPOSE 3000
ENTRYPOINT ["/usr/bin/dumb-init", "--"]
CMD [ "node", "./server.js" ]
