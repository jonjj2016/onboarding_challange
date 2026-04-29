FROM node:20-alpine
WORKDIR /workspace

# Copy manifests needed for workspace install
COPY package*.json ./
COPY shared/package*.json ./shared/
COPY mock-services/rover-mock/package*.json ./mock-services/rover-mock/

# Install only this workspace's deps (workspace protocol resolves @contently/types locally)
RUN npm install --workspace=mock-services/rover-mock --ignore-scripts

# Copy source
COPY shared/ ./shared/
COPY mock-services/rover-mock/ ./mock-services/rover-mock/

WORKDIR /workspace/mock-services/rover-mock
EXPOSE 4001
CMD ["npm", "start"]
