FROM node:22-alpine

WORKDIR /app

# Copy package files first for better layer caching
COPY backend/package.json .
RUN npm install --omit=dev

# Copy all backend source files
COPY backend/src ./src

# Copy frontend assets
COPY frontend/src ./public

EXPOSE 3000

# Update the start command to use correct path
CMD ["npm", "run", "start"]