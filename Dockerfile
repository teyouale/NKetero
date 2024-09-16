# Use Node.js as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR .

# Copy package.json and package-lock.json or pnpm-lock.yaml
COPY pnpm-lock.yaml ./
# Use pnpm-lock.yaml if you are using PNPM, or use package-lock.json for npm/yarn

# Install dependencies using pnpm
RUN npm install -g pnpm 

# Copy the rest of the application code
COPY . . 

RUN pnpm install

RUN pnpm run -r build