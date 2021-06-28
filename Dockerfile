# ------------------------------------------------------------------------------
# Generate build
# ------------------------------------------------------------------------------
FROM node:12-alpine as generator

LABEL stage=generator

WORKDIR /jci

# Install app dependencies
COPY package*.json ./
RUN npm ci

# Bundle app source
COPY . .

# Build typescript files with full dependencies
RUN npm run build
# Package only Docker version
RUN npm run package:docker

# Install production dependencies
RUN npm ci --only=prod

# ------------------------------------------------------------------------------
# Second image (release image)
# ------------------------------------------------------------------------------
FROM node:12-alpine

WORKDIR /usr/src/jira-ci-cd-integration

# Now we copy the compiled ncc build folder
COPY --from=generator /jci/dist/docker dist
COPY --from=generator /jci/node_modules ./node_modules

CMD ["node", "dist/index.js"]
