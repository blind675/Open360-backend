FROM ghcr.io/puppeteer/puppeteer:latest
FROM node:latest as ts-compiler

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run tsc
