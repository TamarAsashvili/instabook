# Use an image with pre-installed Node.js 10.x version on the Alpine Linux distribution
FROM node:10-alpine

# Set our work directory
WORKDIR /opt/app

# Copy the Node.js dependencies file from the host to the container
COPY ./package.json /opt/app/package.json

# Install Node.js dependencies
RUN npm install --quiet --no-optional --loglevel=error

# Copy the Node.js source code files from the host to the container
COPY ./config /opt/app/config
COPY ./src /opt/app/src

# Set the project startup command
CMD ["node", "."]
