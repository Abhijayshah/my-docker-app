# Use Node base image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all source code
COPY . .

# Expose port 3000
EXPOSE 3000

# Run the app
CMD ["node", "app.js"]
