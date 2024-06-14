# Use an official Node.js runtime as a base image
FROM node:lts-buster-slim
# FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY src/app/* .

# Start the application (replace with your actual command)
CMD ["node", "index.js"]
