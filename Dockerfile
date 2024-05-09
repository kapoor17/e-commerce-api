FROM node:16.20.2 AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
