# Alpine base image with NodeJS (lts)
FROM node:lts-alpine

LABEL maintainer="Prashant Shahi<prashant@dgraph.io>"

# Setting work directory
WORKDIR /usr/src/app

# Copy the source code of app to docker daemon
COPY . ./

# Install npm dependencies
RUN npm install

# Run the node command
CMD ["npm", "start"]
