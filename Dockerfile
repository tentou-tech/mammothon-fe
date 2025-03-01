# Base on offical Node.js Alpine image
FROM node:22-alpine
RUN apk add --no-cache libc6-compat
# Set working directory
WORKDIR /usr/app

COPY package.json yarn.lock ./
RUN yarn

COPY . .

# Build app
RUN yarn build

EXPOSE 3000

# Run container as non-root (unprivileged) user
# The node user is provided in the Node.js Alpine base image
USER node

# Run npm start script when container starts
CMD [ "npm", "start" ]
