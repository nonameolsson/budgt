# Use the base image for TypeScript and Node.js development
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:0-18

# Install additional dependencies
RUN npm install libsql drizzle-orm

# Set the working directory
WORKDIR /workspace

# Copy the project files
COPY . /workspace
