# ── Stage 1: Build the React frontend ────────────────────────────────────────
FROM node:20-alpine AS frontend
WORKDIR /workspace

# Copy workspace manifests first to cache npm install
COPY package*.json ./
COPY apps/contently/package*.json ./apps/contently/
COPY packages/toolkit/package*.json ./packages/toolkit/

# Install all workspace deps from the root (hoists shared packages)
RUN npm install

# Copy source
COPY apps/contently/ ./apps/contently/
COPY packages/toolkit/ ./packages/toolkit/

# Build the React app
WORKDIR /workspace/apps/contently
RUN npm run build

# ── Stage 2: Run the BFF / Apollo Gateway ────────────────────────────────────
FROM node:20-alpine
WORKDIR /app

COPY server/package*.json ./
RUN npm install

COPY server/ ./

# Pull the React build from stage 1 into the server's public folder
COPY --from=frontend /workspace/apps/contently/dist ./public

EXPOSE 8080
CMD ["npm", "start"]
