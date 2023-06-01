# Use a base image with Node.js pre-installed
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /src

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the React app dependencies
RUN npm install

# Copy the React app source code to the working directory
COPY . .

# Build the React app for production
RUN npm run build

# Expose the React app port
EXPOSE 3000

# Set the command to serve the built React app
CMD ["npm", "start"]
