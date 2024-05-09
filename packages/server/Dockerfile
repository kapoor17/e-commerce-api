FROM node:16.20.2
WORKDIR /server
COPY package.json ./
COPY --from=root-builder /app/package-lock.json ./
RUN npm install
COPY ./src ./src
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]