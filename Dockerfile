FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN yarn

# Copy the rest of the application code
COPY . .

RUN npm run prisma:build

# Build the NestJS application
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Run the NestJS application
CMD ["npm", "run", "start:prod"]
