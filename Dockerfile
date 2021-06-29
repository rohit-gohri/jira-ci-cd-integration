FROM node:12-alpine

WORKDIR /usr/local/jira-ci-cd-integration

# Bundle app source
COPY . .

# Create executable
COPY ./bin/jira-integration /usr/local/bin/jira-integration

CMD ["node", "/usr/local/jira-ci-cd-integration/dist/docker/index.js"]
