FROM node:12-alpine

WORKDIR /usr/local/jira-ci-cd-integration

# Bundle app source
COPY . .

ENV PATH=/usr/local/jira-ci-cd-integration/bin:$PATH

CMD ["node", "/usr/local/jira-ci-cd-integration/dist/docker/index.js"]
