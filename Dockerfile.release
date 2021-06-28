FROM node:12-alpine

WORKDIR /usr/jira-ci-cd-integration

# Bundle app source
COPY . .

CMD ["node", "dist/docker/index.js"]
