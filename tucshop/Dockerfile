# Use an official Node.js image as the base
FROM node:16-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Build the app
RUN npm run build

# Use a lightweight web server for the production build
FROM nginx:alpine

# Copy the built React app from the build stage to Nginx's public directory
COPY --from=builder /app/build /usr/share/nginx/html

# Copy the custom NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the app
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]