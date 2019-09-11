FROM node:11-alpine as builder

# A bunch of `LABEL` fields for GitHub to index
LABEL "com.github.actions.name"="trap-bot"
LABEL "com.github.actions.description"="Trapbot is a Github Probot App that enforces JIRA issue reference on PR titles."
LABEL "com.github.actions.icon"="gear"
LABEL "com.github.actions.color"="red"
LABEL "repository"="http://github.com/Dev-Force/trap-bot"
LABEL "homepage"="http://github.com/Dev-Force/trap-bot"
LABEL "maintainer"="Apostolos Tsaganos <apostolos94@gmail.com>"


COPY package*.json ./

RUN apk add --no-cache --virtual .gyp python make g++ && \
    # && npm install --save-dev smee-client \
    npm ci && \
    npm install --production probot && \
    apk del .gyp

COPY . .
RUN npm run build

FROM node:11-alpine

COPY --from=builder . .

ENV PATH=$PATH:/node_modules/.bin

ENTRYPOINT ["probot", "receive"]
CMD ["/lib/index.js"]
