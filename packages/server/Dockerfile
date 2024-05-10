FROM node:18.18.2
WORKDIR /server
COPY package.json tsconfig.json ./
RUN npm install
COPY ./src ./src
RUN npm run build
ENV PORT=4000
ENV NODE_ENV=development

ENV PGUSER=postgres
ENV PGHOST=localhost
ENV PGDATABASE=e_commerce
ENV PGPORT=5432

ENV SESSION_SECRET=thisisasessionsecret

ENV MONGO_USERNAME=himanshu
ENV MONGO_PASSWORD=Himkap@1705
ENV MONGO_DB_NAME=e_commerce
EXPOSE 3000
CMD [ "npm", "run", "start" ]