FROM node:16.20.2 AS server-builder
WORKDIR /server
COPY package.json ./
COPY --from=root-builder /app/package-lock.json ./
RUN npm ci
COPY ./src ./src
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]