# Use the official Node.js runtime as the base image
FROM node:18-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN pnpm run build

# Expose port 3000 (Railway will override this if needed)
EXPOSE 3000

# Start the application
CMD ["pnpm", "run", "preview"] 