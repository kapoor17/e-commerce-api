FROM node:18.18.2
WORKDIR /client
COPY package.json tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "preview" ]