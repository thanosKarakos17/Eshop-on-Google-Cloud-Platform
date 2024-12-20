# Step 1: Build the React app (This is the build stage)
FROM node:16-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Step 2: Set up Apache to serve the app
FROM httpd:2.4

# Copy the build folder to Apache's htdocs directory
COPY --from=builder /app/build/ /usr/local/apache2/htdocs/

# Expose the default HTTP port
EXPOSE 80
