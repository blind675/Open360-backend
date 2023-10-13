FROM ghcr.io/puppeteer/puppeteer:21.3.8
FROM node:14-alpine3.10 as ts-compiler

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN tsc
CMD [ "node", "." ]