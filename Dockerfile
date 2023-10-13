FROM ghcr.io/puppeteer/puppeteer:21.3.8
FROM node:latest as ts-compiler

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run tsc
