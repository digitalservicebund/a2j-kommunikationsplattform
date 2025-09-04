# Download and install the dependenciees for building the app
FROM node:22-alpine AS build-dependencies

WORKDIR /kompla-app
COPY package*.json ./
RUN npm ci

# Download and install the dependencies for running the app
FROM node:22-alpine AS production-dependencies

ENV NODE_ENV=production
WORKDIR /kompla-app
COPY package*.json ./
RUN npm ci

# Build the app
FROM node:22-alpine AS build

ARG COMMIT_SHA
ENV APP_VERSION=$COMMIT_SHA

# Create app directory
WORKDIR /kompla-app

# Copy the build dependencies
COPY --from=build-dependencies /kompla-app/node_modules /kompla-app/node_modules

# Required files are whitelisted in dockerignore
COPY . ./
RUN npm run build

# Final image that runs the app
FROM node:22-alpine

USER node
ENV NODE_ENV=production
ENV npm_config_cache=/tmp/.npm
ARG COMMIT_SHA
ENV APP_VERSION=$COMMIT_SHA

WORKDIR /home/node/kompla-app
# Move only the files to the final image that are really needed
COPY package*.json LICENSE SECURITY.md server.js ./
COPY --from=production-dependencies /kompla-app/node_modules/ ./node_modules/
COPY --from=build /kompla-app/build/server ./build/server
COPY --from=build /kompla-app/build/client ./build/client

EXPOSE 3000
CMD ["npm", "run", "start"]
