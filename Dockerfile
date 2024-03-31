# Use the official lightweight Node.js 21 image.
# https://hub.docker.com/_/node
FROM node:21-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy local code to the container image
COPY . .

# Build the application
RUN yarn build

# Run the web service on container startup
CMD [ "yarn", "start" ]